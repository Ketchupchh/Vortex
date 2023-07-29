'use client'

import { UserHomeLayout } from "@/components/layout/user/user-home-layout";
import { useUser } from "@/components/lib/context/user-context";
import { postsCollection } from "@/components/lib/firebase/collections";
import { useCollection } from "@/components/lib/hooks/useCollection";
import { useDocument } from "@/components/lib/hooks/useDocument";
import { mergeData } from "@/components/lib/merge";
import { Post } from "@/components/post/post";
import { StatsEmpty } from "@/components/post/stats-empty";
import { Loading } from "@/components/ui/loading";
import { doc, query, where } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";

export default function UserHome() {

    const { user } = useUser();

    const { id, username, pinnedPost } = user ?? {};

    const { data: pinnedData } = useDocument(
      doc(postsCollection, pinnedPost === "" ? "null" : pinnedPost ?? 'null'),
      {
        disabled: !pinnedPost,
        allowNull: true
      }
    );

    const { data: ownerPosts, loading: ownerLoading } = useCollection(
      query(
        postsCollection,
        where('createdBy', '==', id ?? '1'),
        where('parent', '==', null)
      ),
      { allowNull: true }
    );

    const { data: peoplePosts, loading: peopleLoading } = useCollection(
      query(
        postsCollection,
        where('createdBy', '!=', id ?? '1'),
        where('userReposts', 'array-contains', id ?? '1')
      ),
      { allowNull: true }
    );

    const mergedPosts = mergeData(true, ownerPosts, peoplePosts);

    return (
      <UserHomeLayout>
        <section>
          {ownerLoading || peopleLoading ? (
            <Loading />
          ) : !mergedPosts ? (
            <StatsEmpty
              title={`@${username as string} hasn't posted`}
              description="When they do, their Posts will show up here."
            />
          ) : (
            <AnimatePresence mode="popLayout">
              {pinnedData && (
                <Post key={`pinned-${pinnedData.id}`} pinned {...pinnedData} />
              )}
              {mergedPosts.map((post) => (
                <Post key={post.id} profile={user} {...post} />
              ))}
            </AnimatePresence>
          )}
        </section>
      </UserHomeLayout>
    );
}