import { UserFollowLayout } from '@/components/layout/user/user-follow-layout';
import { UserFollow } from '@/components/user/user-follow';

export default function UserFollowing(): JSX.Element {
  return (
    <UserFollowLayout>
      <UserFollow type='following' />
    </UserFollowLayout>
  );
}
