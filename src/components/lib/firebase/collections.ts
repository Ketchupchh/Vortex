import { collection } from 'firebase/firestore';
import { userConverter } from '../types/user';
import { postConverter } from '../types/post';
import { affliateConverter } from '../types/affliate';
import { bookmarkConverter } from '../types/bookmark';
import { statsConverter } from '../types/stats';
import { db } from './app';
import type { CollectionReference } from 'firebase/firestore';
import type { Bookmark } from '../types/bookmark';
import type { Stats } from '../types/stats';
import type { Affliate } from '../types/affliate';

export const usersCollection = collection(db, 'users').withConverter(
  userConverter
);

export const postsCollection = collection(db, 'posts').withConverter(
  postConverter
);

export const affliatesCollection = collection(db, 'affliates').withConverter(
  affliateConverter
);

export function userBookmarksCollection(
  id: string
): CollectionReference<Bookmark> {
  return collection(db, `users/${id}/bookmarks`).withConverter(
    bookmarkConverter
  );
}

export function userStatsCollection(id: string): CollectionReference<Stats> {
  return collection(db, `users/${id}/stats`).withConverter(statsConverter);
}

export function userAffliatesCollection(id: string) : CollectionReference<Affliate> {
  return collection(db, `/users/${id}/affliates`).withConverter(affliateConverter);
}
