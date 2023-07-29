'use client'

import { UserHomeLayout } from "@/components/layout/user/user-home-layout";
import { useUser } from "@/components/lib/context/user-context";
import { postsCollection } from "@/components/lib/firebase/collections";
import { useCollection } from "@/components/lib/hooks/useCollection";
import { useDocument } from "@/components/lib/hooks/useDocument";
import { Post } from "@/components/post/post";
import { PostWithParent } from "@/components/post/post-with-parent";
import { StatsEmpty } from "@/components/post/stats-empty";
import { Loading } from "@/components/ui/loading";
import { doc, orderBy, query, where } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";

export default function UserWithMedia() {

    const { user } = useUser();

    const { id, name, username, pinnedPost } = user ?? {};

    const { data: pinnedData } = useDocument(
        doc(postsCollection, pinnedPost === "" ? "null" : pinnedPost ?? 'null'),
        {
            disabled: !pinnedPost,
            allowNull: true,
            includeUser: true
        }
    );

    const { data, loading } = useCollection(
        query(
            postsCollection,
            where('createdBy', '==', id ?? 'null'),
            orderBy('createdAt', 'desc')
        ),
        { includeUser: true, allowNull: true }
    );

    return (
        <UserHomeLayout>
            <section>
                {loading ? (
                    <Loading />
                ) : !data ? (
                    <StatsEmpty
                        title={`@${username as string} hasn't posted`}
                        description='When they do, their Posts will show up here.'
                    />
                ) : (
                    <AnimatePresence mode='popLayout'>
                        {pinnedData && (
                            <Post pinned {...pinnedData} key={`pinned-${pinnedData.id}`} />
                        )}
                        <PostWithParent data={data} />
                    </AnimatePresence>
                )}
            </section>
        </UserHomeLayout>
    )
}