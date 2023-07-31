'use client'

import { query, where } from 'firebase/firestore';
import { useUser } from '../lib/context/user-context';
import { useCollection } from '../lib/hooks/useCollection';
import { usersCollection } from '../lib/firebase/collections';
import { UserCards } from '@/components/user/user-cards';
import type { User } from '../lib/types/user';
import { SEO } from '../common/seo';

type UserFollowProps = {
  type: 'following' | 'followers';
};

export function UserFollow({ type }: UserFollowProps): JSX.Element {
  const { user } = useUser();
  const { name, username } = user as User;

  const { data, loading } = useCollection(
    query(
      usersCollection,
      where(
        type === 'following' ? 'followers' : 'following',
        'array-contains',
        user?.id
      )
    ),
    { allowNull: true }
  );

  return (
    <>
      <SEO
        title={`People ${
          type === 'following' ? 'followed by' : 'following'
        } ${name} (@${username}) / Vortex`}
      />
      <UserCards follow data={data} type={type} loading={loading} />
    </>
  );
}
