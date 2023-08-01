'use client'

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { useAuth } from '../lib/context/auth-context';
import { useModal } from '../lib/hooks/useModal';
import { postsCollection } from '../lib/firebase/collections';
import {
  removePost,
  manageReply,
  manageFollow,
  managePinnedPost,
  manageTotalPosts,
  manageTotalPhotos,
  verifyUser,
  unverifyUser
} from '../lib/firebase/utils';
import { delayScroll, preventBubbling, sleep } from '../lib/utils';
import { Modal } from '@/components/modal/modal';
import { ActionModal } from '@/components/modal/action-modal';
import { Button } from '@/components/ui/button';
import { ToolTip } from '@/components/ui/tooltip';
import { CustomIcon } from '@/components/ui/custom-icon';
import type { Variants } from 'framer-motion';
import type { Post } from '../lib/types/post';
import type { User } from '../lib/types/user';
import { CheckBadgeIcon, TrashIcon, UserMinusIcon } from '@heroicons/react/24/solid';

export const variants: Variants = {
  initial: { opacity: 0, y: -25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: -25, transition: { duration: 0.2 } }
};

type PostActionsProps = Pick<Post, 'createdBy'> & {
  isOwner: boolean;
  ownerId: string;
  postId: string;
  username: string;
  parentId?: string;
  hasImages: boolean;
  viewPost?: boolean;
  verified: boolean;
};

type PinModalData = Record<'title' | 'description' | 'mainBtnLabel', string>;

const pinModalData: Readonly<PinModalData[]> = [
  {
    title: 'Pin post to from profile?',
    description:
      'This will appear at the top of your profile and replace any previously pinned post.',
    mainBtnLabel: 'Pin'
  },
  {
    title: 'Unpin Post from profile?',
    description:
      'This will no longer appear automatically at the top of your profile.',
    mainBtnLabel: 'Unpin'
  }
];

export function PostActions({
  isOwner,
  ownerId,
  postId,
  parentId,
  username,
  hasImages,
  viewPost,
  verified,
  createdBy
}: PostActionsProps): JSX.Element {
  const { user } = useAuth();
  const router = useRouter();

  const {
    open: removeOpen,
    openModal: removeOpenModal,
    closeModal: removeCloseModal
  } = useModal();

  const {
    open: pinOpen,
    openModal: pinOpenModal,
    closeModal: pinCloseModal
  } = useModal();

  const isAdmin = user?.isAdmin;
  const userId = user?.id;
  const following = user ? user.following : [];
  const pinnedPost = user?.pinnedPost;

  const isInAdminControl = isAdmin && !isOwner;
  const postIsPinned = pinnedPost === postId;

  const handleRemove = async (): Promise<void> => {
    if (viewPost)
      if (parentId) {
        const parentSnapshot = await getDoc(doc(postsCollection, parentId));
        if (parentSnapshot.exists()) {
          await router.push(`/post/${parentId}`, undefined);
          delayScroll(200)();
          await sleep(50);
        } else await router.push('/');
      } else await router.push('/');

    await Promise.all([
      removePost(postId),
      manageTotalPosts('decrement', ownerId),
      hasImages && manageTotalPhotos('decrement', createdBy),
      parentId && manageReply('decrement', parentId)
    ]);

    toast.success(
      `${isInAdminControl ? `@${username}'s` : 'Your'} post was deleted`
    );

    removeCloseModal();
  };

  const handlePin = async (): Promise<void> => {
    await managePinnedPost(postIsPinned ? 'unpin' : 'pin', userId as string, postId);
    toast.success(
      `Your post was ${postIsPinned ? 'unpinned' : 'pinned'} to your profile`
    );
    pinCloseModal();
  };

  const handleFollow =
    (closeMenu: () => void, ...args: Parameters<typeof manageFollow>) =>
    async (): Promise<void> => {
      const [type] = args;

      closeMenu();
      await manageFollow(...args);

      toast.success(
        `You ${type === 'follow' ? 'followed' : 'unfollowed'} @${username}`
      );
    };

  const handleVerify =
    (closeMenu: () => void, id: string, ) =>
    async (): Promise<void> => {

      closeMenu();

      console.log(verified)

      await Promise.all([
        verified ? unverifyUser(id) : verifyUser(id)
      ])
      //if(verified) await verifyUser(id);
      //await unverifyUser(id);

      toast.success(
        `You ${verified === false ? 'verified' : 'unverified'} @${username}`
      );
    };

  const userIsFollowed = following.includes(createdBy);

  const currentPinModalData = useMemo(
    () => pinModalData[+postIsPinned],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pinOpen]
  );

  return (
    <>
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={removeOpen}
        closeModal={removeCloseModal}
      >
        <ActionModal
          title='Delete Post?'
          description={`This can’t be undone and it will be removed from ${
            isInAdminControl ? `@${username}'s` : 'your'
          } profile, the timeline of any accounts that follow ${
            isInAdminControl ? `@${username}` : 'you'
          }, and from Vortex search results.`}
          mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab
                            focus-visible:bg-accent-red/90'
          mainBtnLabel='Delete'
          focusOnMainBtn
          action={handleRemove}
          closeModal={removeCloseModal}
        />
      </Modal>
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={pinOpen}
        closeModal={pinCloseModal}
      >
        <ActionModal
          {...currentPinModalData}
          mainBtnClassName='bg-light-primary hover:bg-light-primary/90 active:bg-light-primary/80 dark:text-light-primary
                            dark:bg-light-border dark:hover:bg-light-border/90 dark:active:bg-light-border/75'
          focusOnMainBtn
          action={handlePin}
          closeModal={pinCloseModal}
        />
      </Modal>
      <Popover>
        {({ open, close }): JSX.Element => (
          <>
            <Popover.Button
              as={Button}
              className={cn(
                `main-tab group group absolute top-2 right-2 p-2 
                 hover:bg-accent-blue/10 focus-visible:bg-accent-blue/10
                 focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20`,
                open && 'bg-accent-blue/10 [&>div>svg]:text-accent-blue'
              )}
            >
              <div className='group relative'>
                <CustomIcon
                  className='h-5 w-5 text-light-secondary group-hover:text-accent-blue
                              group-focus-visible:text-accent-blue dark:text-dark-secondary/80'
                  iconName='EllipsisIcon'
                />
                {!open && <ToolTip tip='More' />}
              </div>
            </Popover.Button>
            <AnimatePresence>
              {open && (
                <Popover.Panel
                  className='menu-container group absolute top-[50px] right-2 whitespace-nowrap text-light-primary 
                             dark:text-dark-primary'
                  as={motion.div}
                  {...variants}
                  static
                >
                  {(isAdmin || isOwner) && (
                    <>
                      <Popover.Button
                        className='accent-tab flex w-full gap-3 rounded-md rounded-b-none p-4 text-accent-red
                                  hover:bg-main-sidebar-background'
                        as={Button}
                        onClick={preventBubbling(removeOpenModal)}
                      >
                        <TrashIcon className='w-5 h-5' />
                        Delete
                      </Popover.Button>

                      {!isOwner && (
                        <Popover.Button
                          className='accent-tab flex w-full gap-3 rounded-md rounded-b-none p-4 text-accent-blue
                                    hover:bg-main-sidebar-background'
                          as={Button}
                          onClick={preventBubbling(verified ? handleVerify(close, ownerId) : handleVerify(close, ownerId))}
                        >
                          <CheckBadgeIcon className='w-5 h-5' />
                          {verified ? "Unverify" : "Verify"}
                        </Popover.Button>
                      )}
                    </>
                  )}
                  {isOwner ? (
                    <Popover.Button
                      className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(pinOpenModal)}
                    >
                      {postIsPinned ? (
                        <>
                          <CustomIcon iconName='PinOffIcon' />
                          Unpin from profile
                        </>
                      ) : (
                        <>
                          <CustomIcon iconName='PinIcon' />
                          Pin to your profile
                        </>
                      )}
                    </Popover.Button>
                  ) : userIsFollowed ? (
                    <Popover.Button
                      className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(
                        handleFollow(close, 'unfollow', userId as string, createdBy)
                      )}
                    >
                      <UserMinusIcon className='w-5 h-5' />
                      Unfollow @{username}
                    </Popover.Button>
                  ) : (
                    <Popover.Button
                      className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                      as={Button}
                      onClick={preventBubbling(
                        handleFollow(close, 'follow', userId as string, createdBy)
                      )}
                    >
                      <CustomIcon iconName='UserPlusIcon' />
                      Follow @{username}
                    </Popover.Button>
                  )}
                </Popover.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    </>
  );
}
