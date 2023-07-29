'use client'

import { affliatesCollection, usersCollection } from "@/components/lib/firebase/collections";
import { useCollection } from "@/components/lib/hooks/useCollection";
import { useParams } from "next/navigation";
import { limit, query, where } from "firebase/firestore";
import { UserHomeLayout } from "@/components/layout/user/user-home-layout";
import { Loading } from "@/components/ui/loading";
import { StatsEmpty } from "@/components/post/stats-empty";
import { useUser } from "@/components/lib/context/user-context";
import { UserCard } from "@/components/user/user-card";
import { useEffect, useMemo, useState } from "react";
import { useArrayDocument } from "@/components/lib/hooks/useArrayDocument";
import { AnimatePresence } from "framer-motion";

export default function UserAffliates() : JSX.Element
{
    const { id } = useParams();
    const { user } = useUser();

    const [ ids, setIds ] = useState<string[]>([]);

    const { data, loading } = useCollection(
        query(affliatesCollection,
            where('affliates', 'array-contains', user?.id ?? 'null')
        ),
        { allowNull: true }
    )

    useEffect(() => {

        function gatherIds()
        {
            const arr: string[] = [];
            const affliatesArr = data?.map((aD) => {
                const ids: string[] = [];
                aD.affliates.map((afId) => {
                    ids.push(afId);
                })
                return ids;
            });
    
            const affliatesIds = affliatesArr?.map((aD) => {
                aD.map((afId) => {
                    arr.push(afId);
                })
                return arr;
            });

            const uniqueIds = Array.from(new Set(arr));

            setIds(uniqueIds);
        }
        gatherIds();
    }, [data]);

    const { data: affliateData, loading: affliateLoading } = useArrayDocument(
        ids,
        usersCollection,
    );

    return (
        <UserHomeLayout>
            <section>
                {affliateLoading ? (
                    <Loading />
                ) : !affliateData ? (
                    <StatsEmpty
                        title={`@${id} isn't affliated with anything`}
                        description="When they are, those Affliates will show up here."
                    />
                ) : (
                    <AnimatePresence mode="popLayout">
                        {affliateData.map((affliate, index) => (
                            <>
                                {affliate && affliate.id !== user?.id && (
                                    <UserCard key={index} {...affliate} />
                                )}
                            </>
                        ))}
                    </AnimatePresence>
                )}
            </section>
        </UserHomeLayout>
    );
}