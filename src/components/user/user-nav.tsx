import { motion } from 'framer-motion';
import cn from 'clsx';
import { variants } from './user-header';
import { UserNavLink } from './user-nav-link';

type UserNavProps = {
  follow?: boolean;
  isBusinessAccount?: boolean;
};

const allNavs = [
  [
    { name: 'Posts', path: '' },
    { name: 'Affliates', path: 'affliates'},
    { name: 'Posts & replies', path: 'with_replies' },
    { name: 'Media', path: 'media' },
    { name: 'Likes', path: 'likes' }
  ],
  [
    { name: 'Following', path: 'following' },
    { name: 'Followers', path: 'followers' }
  ]
] as const;

export function UserNav({ follow, isBusinessAccount }: UserNavProps): JSX.Element {
  const userNav = allNavs[+!!follow];

  return (
    <motion.nav
      className={cn(
        `hover-animation flex justify-between overflow-y-auto
         border-b border-light-border dark:border-dark-border`,
        follow && 'mt-1 mb-0.5'
      )}
      {...variants}
      exit={undefined}
    >
      {userNav.map(({ name, path }) => (
        <>
          {!isBusinessAccount && name !== "Affliates" ? (
            <UserNavLink name={name} path={path} key={name} />
          ) : isBusinessAccount && (
            <UserNavLink name={name} path={path} key={name} />
          )}
        </>
      ))}
    </motion.nav>
  );
}
