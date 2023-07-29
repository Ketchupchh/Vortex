import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { UserAffliate } from './affliate';

export type User = {
  id: string;
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
  isAdmin: boolean;
  isPrivate: boolean;
  isBusinessAccount: boolean;
  affliates: UserAffliate;
};

export type EditableData = Extract<
  keyof User,
  'bio' | 'name' | 'website' | 'photoURL' | 'location' | 'coverPhotoURL'
>;

export type EditableUserData = Pick<User, EditableData>;

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user) {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as User;
  }
};
