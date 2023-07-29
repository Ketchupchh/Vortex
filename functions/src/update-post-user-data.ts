import { firestore, functions, regionalFunctions } from './lib/utils';
import type { User } from './types';

export const updatePostUserData = regionalFunctions.firestore
    .document('/users/{userId}')
    .onUpdate(async (snapshot) : Promise<void> => {
        const userId = snapshot.after.id;
        const userData = snapshot.after.data() as User;
        const beforeUserData = snapshot.before.data() as User;

        functions.logger.info(`Update to ${userId} detected)`)

        if(
            beforeUserData.photoURL === userData.photoURL &&
            beforeUserData.coverPhotoURL === userData.coverPhotoURL &&
            beforeUserData.username === userData.username && 
            beforeUserData.name === userData.name &&
            beforeUserData.totalPosts === userData.totalPosts &&
            beforeUserData.followers === userData.followers &&
            beforeUserData.following === userData.following &&
            beforeUserData.isAdmin === userData.isAdmin &&
            beforeUserData.verified === userData.verified &&
            beforeUserData.isPrivate === userData.isPrivate &&
            beforeUserData.isBusinessAccount === userData.isBusinessAccount &&
            beforeUserData.affliates === userData.affliates
        ) return;

        const batch = firestore().batch();
        
        const userPostsQuery = firestore()
        .collection('posts')
        .where('createdBy', '==', userId);

        const docsSnap = await userPostsQuery.get();

        functions.logger.info(`Updating ${docsSnap.size} post(s)`)

        docsSnap.docs.forEach(({id, ref}) => {
            functions.logger.info(`Updating ${id}`)
            batch.update(ref, {
                user: {
                    id: userId,
                    photoURL: userData.photoURL,
                    coverPhotoURL: userData.coverPhotoURL,
                    username: userData.username,
                    name: userData.name,
                    totalPosts: userData.totalPosts,
                    followers: userData.followers,
                    following: userData.following,
                    isAdmin: userData.isAdmin,
                    verified: userData.verified,
                    private: userData.isPrivate,
                    isBusinessAccount: userData.isBusinessAccount,
                    affliates: userData.affliates
                },
            })
        })
        
        await batch.commit();

        functions.logger.info(`Updating the userdata of ${userId} (${userData.username}) post's complete.`);
    })
