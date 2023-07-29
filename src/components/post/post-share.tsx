import Link from 'next/link';
import cn from 'clsx';
import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../lib/context/auth-context';
import { manageBookmark } from '../lib/firebase/utils';
import { preventBubbling } from '../lib/utils';
import { siteURL } from '../lib/env';
import { Button } from '../ui/button';
import { ToolTip } from '../ui/tooltip';
import { variants } from './post-actions';
import { ArrowUpTrayIcon, BookmarkSlashIcon, LinkIcon } from '@heroicons/react/24/solid';
import { CustomIcon } from '../ui/custom-icon';

type PostShareProps = {
  userId: string;
  postId: string;
  viewPost?: boolean;
};

export function PostShare({
  userId,
  postId,
  viewPost
}: PostShareProps): JSX.Element {
  const { userBookmarks } = useAuth();

  const handleBookmark =
    (closeMenu: () => void, ...args: Parameters<typeof manageBookmark>) =>
    async (): Promise<void> => {
      const [type] = args;

      closeMenu();
      await manageBookmark(...args);

      toast.success(
        type === 'bookmark'
          ? (): JSX.Element => (
              <span className='flex gap-2'>
                Post added to your Bookmarks
                <Link
                  className='custom-underline font-bold'
                  href='/bookmarks'
                >
                  View
                </Link>
              </span>
            )
          : 'Post removed from your bookmarks'
      );
    };

  const handleCopy = (closeMenu: () => void) => async (): Promise<void> => {
    closeMenu();
    await navigator.clipboard.writeText(`${siteURL}/post/${postId}`);
    toast.success('Copied to clipboard');
  };

  const postIsBookmarked = !!userBookmarks?.some(({ id }) => id === postId);

  return (
    <Popover className='relative'>
      {({ open, close }): JSX.Element => (
        <>
          <Popover.Button
            className={cn(
              `group relative flex items-center gap-1 p-0 outline-none 
               transition-none hover:text-accent-blue focus-visible:text-accent-blue`,
              open && 'text-accent-blue inner:bg-accent-blue/10'
            )}
          >
            <i
              className='relative rounded-full p-2 not-italic duration-200 group-hover:bg-accent-blue/10 
                         group-focus-visible:bg-accent-blue/10 group-focus-visible:ring-2 
                         group-focus-visible:ring-accent-blue/80 group-active:bg-accent-blue/20'
            >
              <ArrowUpTrayIcon className={viewPost ? 'h-6 w-6' : 'h-5 w-5'} />
              {!open && <ToolTip tip='Share' />}
            </i>
          </Popover.Button>
          <AnimatePresence>
            {open && (
              <Popover.Panel
                className='menu-container group absolute right-0 top-11 whitespace-nowrap text-light-primary dark:text-dark-primary'
                as={motion.div}
                {...variants}
                static
              >
                <Popover.Button
                  className='accent-tab flex w-full gap-3 rounded-md rounded-b-none p-4 hover:bg-main-sidebar-background'
                  as={Button}
                  onClick={preventBubbling(handleCopy(close))}
                >
                  <LinkIcon className='w-6 h-6' />
                  Copy link to Post
                </Popover.Button>
                {!postIsBookmarked ? (
                  <Popover.Button
                    className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                    as={Button}
                    onClick={preventBubbling(
                      handleBookmark(close, 'bookmark', userId, postId)
                    )}
                  >
                    <CustomIcon iconName='SaveIcon' />
                    Bookmark
                  </Popover.Button>
                ) : (
                  <Popover.Button
                    className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                    as={Button}
                    onClick={preventBubbling(
                      handleBookmark(close, 'unbookmark', userId, postId)
                    )}
                  >
                    <BookmarkSlashIcon className='w-6 h-6' />
                    Remove Post from Bookmarks
                  </Popover.Button>
                )}
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
