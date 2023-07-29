import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { UserAffliate } from './affliate';

export type ImageData = {
  src: string;
  alt: string;
};

export type ImagesPreview = (ImageData & {
  id: string;
})[];

export type Post = {
  id: string;
  text: string | null;
  images: ImagesPreview | null;
  parent: { id: string; username: string } | null;
  userLikes: string[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  userReplies: number;
  userReposts: string[];
  user: {
    id: string;
    userId: string;
    bio: string | null;
    name: string;
    website: string | null;
    location: string | null;
    username: string;
    photoURL: string;
    verified: boolean;
    following: string[];
    followers: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp | null;
    totalPosts: number;
    totalPhotos: number;
    pinnedPost: string | null;
    coverPhotoURL: string | null;
    isAdmin: boolean | null;
    isPrivate: boolean | null;
    isBusinessAccount: boolean;
    affliates: UserAffliate;
  }
};

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post) {
    return { ...post };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Post;
  }
};
