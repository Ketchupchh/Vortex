import cn from 'clsx';
import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { preventBubbling } from '../lib/utils';
import { siteURL } from '../lib/env';
import { Button } from '../ui/button';
import { ToolTip } from '../ui/tooltip';
import { variants } from '../post/post-actions';
import { CustomIcon } from '../ui/custom-icon';
import { LinkIcon } from '@heroicons/react/24/solid';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { usersCollection } from '../lib/firebase/collections';

type UserShareProps = {
  id: string;
  currUserId: string;
  username: string;
  isOwner: boolean;
  isBlocked: boolean
};

export function UserShare({
  id,
  currUserId,
  username,
  isOwner,
  isBlocked
} : UserShareProps): JSX.Element {
  const handleCopy = (closeMenu: () => void) => async (): Promise<void> => {
    closeMenu();
    await navigator.clipboard.writeText(`${siteURL}/user/${username}`);
    toast.success('Copied to clipboard');
  };

  const handleBlock = (closeMenu: () => void) => async (): Promise<void> => {
    closeMenu();

    const currUserRef = doc(usersCollection, currUserId);
    const userRef = doc(usersCollection, id);

    await Promise.all([
      updateDoc(currUserRef, {
        blockedUsers: isBlocked ? arrayRemove(id) : arrayUnion(id),
        followers: arrayRemove(id),
        following: arrayRemove(id)
      }),
      updateDoc(userRef, {
        followers: arrayRemove(currUserId),
        following: arrayRemove(currUserId)
      })
    ]);
    toast.success(`You ${isBlocked ? "Unblocked" : "Blocked"} @${username}`);
  };

  return (
    <Popover className='relative'>
      {({ open, close }): JSX.Element => (
        <>
          <Popover.Button
            as={Button}
            className={cn(
              `dark-bg-tab group relative border border-light-line-reply p-2
               hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary
               dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20`,
              open && 'bg-light-primary/10 dark:bg-dark-primary/10'
            )}
          >
            <CustomIcon className='w-5 h-5' iconName='EllipsisIcon' />
            {!open && <ToolTip tip='More' />}
          </Popover.Button>
          <AnimatePresence>
            {open && (
              <>
                <Popover.Panel
                  className='menu-container group absolute right-0 top-11 whitespace-nowrap
                            text-light-primary dark:text-dark-primary'
                  as={motion.div}
                  {...variants}
                  static
                >
                  {!isOwner && (
                    <Popover.Button
                      className='flex w-full gap-3 rounded-md rounded-b-none p-4 hover:bg-main-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(handleBlock(close))}
                    >
                      <CustomIcon iconName='BanIcon' />
                      {isBlocked ? "Unblock " : "Block "} @{username}
                    </Popover.Button>
                  )}
                  <Popover.Button
                    className='flex w-full gap-3 rounded-md rounded-b-none p-4 hover:bg-main-sidebar-background'
                    as={Button}
                    onClick={preventBubbling(handleCopy(close))}
                  >
                    <LinkIcon className='w-6 h-6' />
                    Copy link to Profile
                  </Popover.Button>
                </Popover.Panel>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
