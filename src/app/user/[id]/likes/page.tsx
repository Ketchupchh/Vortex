'use client'

import { UserHomeLayout } from "@/components/layout/user/user-home-layout";
import { useUser } from "@/components/lib/context/user-context";
import { postsCollection } from "@/components/lib/firebase/collections";
import { useCollection } from "@/components/lib/hooks/useCollection";
import { Post } from "@/components/post/post";
import { StatsEmpty } from "@/components/post/stats-empty";
import { Loading } from "@/components/ui/loading";
import { orderBy, query, where } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";

export default function UserLikes() {

    const { user } = useUser();

    const { id, name, username } = user ?? {};

    const { data: data, loading: dataLoading } = useCollection(
        query(
            postsCollection,
            where('userLikes', 'array-contains', id ?? '1'),
            orderBy('createdAt', 'desc')
        ),
        { allowNull: true }
    );

    return (
        <UserHomeLayout>
            <section>
                {dataLoading ? (
                    <Loading />
                ) : !data ? (
                    <StatsEmpty
                        title={`@${username as string} hasn't liked any Posts`}
                        description='When they do, those Posts will show up here.'
                    />
                ) : (
                    <AnimatePresence mode="popLayout">
                        {data.map((post) => (
                            <Post key={post.id} {...post} />
                        ))}
                    </AnimatePresence>
                )}
            </section>
        </UserHomeLayout>
    );
}