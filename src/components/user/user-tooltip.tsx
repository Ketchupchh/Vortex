import Link from 'next/link';
import cn from 'clsx';
import { useWindow } from '../lib/context/window-context';
import { FollowButton } from '@/components/ui/follow-button';
import { NextImage } from '@/components/ui/next-image';
import { UserAvatar } from './user-avatar';
import { UserName } from './user-name';
import { UserFollowing } from './user-following';
import { UserUsername } from './user-username';
import type { ReactNode } from 'react';
import type { User } from '../lib/types/user';

type UserTooltipProps = Pick<
  User,
  | 'id'
  | 'bio'
  | 'name'
  | 'verified'
  | 'username'
  | 'photoURL'
  | 'following'
  | 'followers'
  | 'coverPhotoURL'
  | 'isBusinessAccount'
  | 'affliates'
> & {
  modal?: boolean;
  avatar?: boolean;
  children: ReactNode;
};

type Stats = [string, string, number];

export function UserTooltip({
  id,
  bio,
  name,
  modal,
  avatar,
  verified,
  children,
  photoURL,
  username,
  following,
  followers,
  coverPhotoURL,
  isBusinessAccount,
  affliates
}: UserTooltipProps): JSX.Element {
  const { isMobile } = useWindow();

  if (isMobile || modal) return <>{children}</>;

  const userLink = `/user/${username}`;

  const allStats: Readonly<Stats[]> = [
    ['following', 'Following', following.length],
    ['followers', 'Followers', followers.length]
  ];

  return (
    <div
      className={cn(
        'group relative self-start text-light-primary dark:text-dark-primary',
        avatar ? '[&>div]:translate-y-2' : 'grid [&>div]:translate-y-7'
      )}
    >
      {children}
      <div
        className='menu-container invisible absolute left-1/2 w-72 -translate-x-1/2 rounded-2xl 
                   opacity-0 [transition:visibility_0ms_ease_400ms,opacity_200ms_ease_200ms] group-hover:visible 
                   group-hover:opacity-100 group-hover:delay-500'
      >
        <div className='flex flex-col gap-3 p-4'>
          <div className='flex flex-col gap-2'>
            <div className='-mx-4 -mt-4'>
              {coverPhotoURL ? (
                <Link href={userLink}>
                  <NextImage
                    useSkeleton
                    className='blur-picture relative h-24'
                    imgClassName='rounded-t-2xl'
                    src={coverPhotoURL}
                    alt={name}
                    layout='fill'
                  />
                </Link>
              ) : (
                <div className='h-16 rounded-t-2xl bg-neutral-800' />
              )}
            </div>
            <div className='flex justify-between'>
              <div className='-mb-9'>
                <UserAvatar
                  className={cn(
                    `absolute -translate-y-1/2 ring-2 ring-black bg-black
                    hover:brightness-75 [&>figure>span]:[transition:200ms]
                    [&:hover>figure>span]:brightness-75 rounded-full`,
                    isBusinessAccount ? 'rounded-lg' : 'rounded-full'
                  )}
                  imgWrapClassName='w-20 h-20'
                  src={photoURL}
                  alt={name}
                  username={username}
                  isBusinessAccount={isBusinessAccount}
                />
              </div>
              <FollowButton userTargetId={id} userTargetUsername={username} />
            </div>
            <div>
              <UserName
                className='-mb-1 text-lg'
                name={name}
                username={username}
                verified={verified}
                isBusinessAccount={isBusinessAccount}
                affliates={affliates}
              />
              <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
                <UserUsername username={username} />
                <UserFollowing userTargetId={id} />
              </div>
            </div>
          </div>
          {bio && <p>{bio}</p>}
          <div className='text-secondary flex gap-4'>
            {allStats.map(([id, label, stat]) => (
              <Link
                className='hover-animation flex h-4 items-center gap-1 border-b border-b-transparent 
                            outline-none hover:border-b-light-primary focus-visible:border-b-light-primary
                            dark:hover:border-b-dark-primary dark:focus-visible:border-b-dark-primary'
                href={`${userLink}/${id}`} key={id}
              >
                <p className='font-bold'>{stat}</p>
                <p className='text-light-secondary dark:text-dark-secondary'>
                  {label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
