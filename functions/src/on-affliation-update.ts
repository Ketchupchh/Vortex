import { firestore, functions, regionalFunctions } from './lib/utils';
import type { Affliate } from './types/affliate';

export const onAffliationUpdate = regionalFunctions.firestore
    .document('/affliates/{affliateId}')
    .onUpdate(async (snapshot) : Promise<void> => {
        const affliateId = snapshot.after.id;
        const affliateData = snapshot.after.data() as Affliate;
        const beforeAffliateData = snapshot.before.data() as Affliate;

        functions.logger.info(`Update to ${affliateId} detected)`)

        if(
            beforeAffliateData.name === affliateData.name &&
            beforeAffliateData.ownerId === affliateData.ownerId &&
            beforeAffliateData.logo === affliateData.logo &&
            beforeAffliateData.affliates === affliateData.affliates
        ) return;

        const batch = firestore().batch();

        if(!beforeAffliateData.logo) return;
        
        const userQuery = firestore()
        .collection('users')
        .where('affliates', 'array-contains',{
            id: affliateId,
            name: beforeAffliateData.name,
            logo: beforeAffliateData.logo[0].src,
        });

        const docsSnap = await userQuery.get();

        functions.logger.info(`Updating ${docsSnap.size} user(s)`)

        docsSnap.docs.forEach(({id, ref}) => {
            functions.logger.info(`Updating ${id}`)
            batch.update(ref, {
                affliates: {
                    id: affliateId,
                    ownerId: affliateData.ownerId,
                    name: affliateData.name,
                    logo: affliateData.logo,
                    affliates: affliateData.affliates
                },
            })
        })
        
        await batch.commit();

        functions.logger.info(`Updating affliates of ${affliateId} (${affliateData.name}) complete.`);
    })
