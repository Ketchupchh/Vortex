'use client'

import { AnimatePresence } from 'framer-motion';
import { query, where } from 'firebase/firestore';
import { useCollection } from '@/components/lib/hooks/useCollection';
import { postsCollection } from '@/components/lib/firebase/collections';
import { useUser } from '@/components/lib/context/user-context';
import { mergeData } from '@/components/lib/merge';
import { Post } from '@/components/post/post';
import { Loading } from '@/components/ui/loading';
import { StatsEmpty } from '@/components/post/stats-empty';
import { UserHomeLayout } from '@/components/layout/user/user-home-layout';

export default function UserMedia(): JSX.Element {
  const { user } = useUser();

  const { id, name, username } = user ?? {};

  const { data, loading } = useCollection(
    query(
      postsCollection,
      where('createdBy', '==', id ?? 'null'),
      where('images', '!=', null)
    ),
    { includeUser: true, allowNull: true }
  );

  const sortedPosts = mergeData(true, data);

  return (
    <UserHomeLayout>
      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : !sortedPosts ? (
          <StatsEmpty
            title={`@${username as string} hasn't Posted Media`}
            description='Once they do, those Posts will show up here.'
            imageData={{ src: '/assets/no-media.png', alt: 'No media' }}
          />
        ) : (
          <AnimatePresence mode='popLayout'>
            {sortedPosts.map((post) => (
              <Post {...post} key={post.id} />
            ))}
          </AnimatePresence>
        )}
      </section>
    </UserHomeLayout>
  );
}
