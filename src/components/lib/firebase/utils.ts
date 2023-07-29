import {
  doc,
  query,
  where,
  limit,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  increment,
  writeBatch,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  getCountFromServer,
  collection
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from './app';
import {
  usersCollection,
  postsCollection,
  userStatsCollection,
  userBookmarksCollection
} from './collections';
import { userConverter } from '../types/user';
import type { WithFieldValue, Query } from 'firebase/firestore';
import type { EditableUserData, User } from '../types/user';
import type { FilesWithId, ImagesPreview } from '../types/file';
import type { Bookmark } from '../types/bookmark';

export async function checkUsernameAvailability(
  username: string
): Promise<boolean> {
  const { empty } = await getDocs(
    query(usersCollection, where('username', '==', username), limit(1))
  );
  return empty;
}

export async function getCollectionCount<T>(
  collection: Query<T>
): Promise<number> {
  const snapshot = await getCountFromServer(collection);
  return snapshot.data().count;
}

export async function updateUserData(
  userId: string,
  userData: EditableUserData
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: serverTimestamp()
  });
}

export async function updateUsername(
  userId: string,
  username?: string
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    ...(username && { username }),
    updatedAt: serverTimestamp()
  });
}

export async function managePinnedPost(
  type: 'pin' | 'unpin',
  userId: string,
  postId: string
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    updatedAt: serverTimestamp(),
    pinnedPost: type === 'pin' ? postId : null
  });
}

export async function manageFollow(
  type: 'follow' | 'unfollow',
  userId: string,
  targetUserId: string
): Promise<void> {
  const batch = writeBatch(db);

  const userDocRef = doc(usersCollection, userId);
  const targetUserDocRef = doc(usersCollection, targetUserId);

  if (type === 'follow') {
    batch.update(userDocRef, {
      following: arrayUnion(targetUserId),
      updatedAt: serverTimestamp()
    });
    batch.update(targetUserDocRef, {
      followers: arrayUnion(userId),
      updatedAt: serverTimestamp()
    });
  } else {
    batch.update(userDocRef, {
      following: arrayRemove(targetUserId),
      updatedAt: serverTimestamp()
    });
    batch.update(targetUserDocRef, {
      followers: arrayRemove(userId),
      updatedAt: serverTimestamp()
    });
  }

  await batch.commit();
}

export async function removePost(postId: string): Promise<void> {
  const userRef = doc(postsCollection, postId);
  await deleteDoc(userRef);
}

export async function manageBookmark(
  type: 'bookmark' | 'unbookmark',
  userId: string,
  postId: string
): Promise<void> {
  const bookmarkRef = doc(userBookmarksCollection(userId), postId);

  if (type === 'bookmark') {
    const bookmarkData: WithFieldValue<Bookmark> = {
      id: postId,
      createdAt: serverTimestamp()
    };
    await setDoc(bookmarkRef, bookmarkData);
  } else await deleteDoc(bookmarkRef);
}

export async function uploadImages(
  userId: string,
  files: FilesWithId
): Promise<ImagesPreview | null> {
  if (!files.length) return null;

  const imagesPreview = await Promise.all(
    files.map(async (file) => {
      let src: string;

      const { id, name: alt } = file;

      const storageRef = ref(storage, `images/${userId}/${alt}`);

      try {
        src = await getDownloadURL(storageRef);
      } catch {
        await uploadBytesResumable(storageRef, file);
        src = await getDownloadURL(storageRef);
      }

      return { id, src, alt };
    })
  );

  return imagesPreview;
}

export async function manageReply(
  type: 'increment' | 'decrement',
  postId: string
): Promise<void> {
  const postRef = doc(postsCollection, postId);

  try {
    await updateDoc(postRef, {
      userReplies: increment(type === 'increment' ? 1 : -1),
      updatedAt: serverTimestamp()
    });
  } catch {
    // do nothing, because parent post was already deleted
  }
}

export async function manageTotalPosts(
  type: 'increment' | 'decrement',
  userId: string
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    totalPosts: increment(type === 'increment' ? 1 : -1),
    updatedAt: serverTimestamp()
  });
}

export async function manageTotalPhotos(
  type: 'increment' | 'decrement',
  userId: string
): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    totalPhotos: increment(type === 'increment' ? 1 : -1),
    updatedAt: serverTimestamp()
  });
}

export function manageLike(
  type: 'like' | 'unlike',
  userId: string,
  postId: string
) {
  return async (): Promise<void> => {
    const batch = writeBatch(db);

    const userStatsRef = doc(userStatsCollection(userId), 'stats');
    const postRef = doc(postsCollection, postId);

    if (type === 'like') {
      batch.update(postRef, {
        userLikes: arrayUnion(userId),
        updatedAt: serverTimestamp()
      });
      batch.update(userStatsRef, {
        likes: arrayUnion(postId),
        updatedAt: serverTimestamp()
      });

      console.log(userStatsRef)
    } else {
      batch.update(postRef, {
        userLikes: arrayRemove(userId),
        updatedAt: serverTimestamp()
      });
      batch.update(userStatsRef, {
        likes: arrayRemove(postId),
        updatedAt: serverTimestamp()
      });
    }

    await batch.commit();
  };
}

export function manageRepost(
  type: 'repost' | 'unrepost',
  userId: string,
  postId: string
) {
  return async (): Promise<void> => {
    const batch = writeBatch(db);

    const postRef = doc(postsCollection, postId);
    const userStatsRef = doc(userStatsCollection(userId), 'stats');

    if (type === 'repost') {
      batch.update(postRef, {
        userReposts: arrayUnion(userId),
        updatedAt: serverTimestamp()
      });
      batch.update(userStatsRef, {
        posts: arrayUnion(postId),
        updatedAt: serverTimestamp()
      });
    } else {
      batch.update(postRef, {
        userReposts: arrayRemove(userId),
        updatedAt: serverTimestamp()
      });
      batch.update(userStatsRef, {
        posts: arrayRemove(postId),
        updatedAt: serverTimestamp()
      });
    }

    await batch.commit();
  };
}

export async function fetchUsers(username: string): Promise<User[]>{

  const q = query(
    collection(db, 'users'),
    where('username', '>=', username),
    limit(10))
    .withConverter(userConverter);

  try {
    const querySnapshot = await getDocs(q);

    const fetchedUsers: User[] = [];
    querySnapshot.docs.map((doc) => fetchedUsers.push(doc.data() as User));

    return fetchedUsers;

  } catch(error)
  {
    return [];
  }
}

export async function verifyUser(userId: string): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    verified: true
  });
}

export async function unverifyUser(userId: string): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    verified: false
  });
}

export async function adminUser(userId: string): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    isAdmin: true
  });
}

export async function unadminUser(userId: string): Promise<void> {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    isAdmin: false
  });
}