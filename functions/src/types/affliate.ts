import type { FirestoreDataConverter, Timestamp } from "firebase/firestore";
import type { ImagesPreview } from "./post";

export type Affliate = {
    id: string;
    ownerId: string;
    name: string;
    logo: ImagesPreview | null;
    affliates: string[];
    updatedAt: Timestamp | null;
}

export type UserAffliate = [
    {
        id: string;
        name: string;
        logo: string;
    }
];

export const affliateConverter: FirestoreDataConverter<Affliate> = {
    toFirestore(affliate) {
        return { ...affliate };
    },
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return { ...data } as Affliate;
    }
};