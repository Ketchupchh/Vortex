import Link from 'next/link';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@/components/lib/context/auth-context';
import { useModal } from '@/components/lib/hooks/useModal';
import { Modal } from '@/components/modal/modal';
import { PostReplyModal } from '@/components/modal/post-reply-modal';
import { ImagePreview } from '@/components/input/image-preview';
import { UserAvatar } from '@/components/user/user-avatar';
import { UserTooltip } from '@/components/user/user-tooltip';
import { UserName } from '@/components/user/user-name';
import { UserUsername } from '@/components/user/user-username';
import { variants } from '../post';
import { PostActions } from '../post-actions';
import { PostStats } from '../post-stats';
import { PostDate } from '../post-date';
import { Input } from '@/components/input/input';
import type { RefObject } from 'react';
import type { User } from '@/components/lib/types/user';
import type { Post } from '@/components/lib/types/post';
import { ParsedText } from '@/components/common/parsed-text';

type ViewPostProps = Post & {
  viewPostRef?: RefObject<HTMLElement>;
};

export function ViewPost(post: ViewPostProps): JSX.Element {
  const {
    id: postId,
    text,
    images,
    parent,
    userLikes,
    createdBy,
    createdAt,
    userReposts,
    userReplies,
    viewPostRef,
    user: postUserData
  } = post;

  const { userId: ownerId, name, username, verified, photoURL, isBusinessAccount, affliates } = postUserData;

  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const postLink = `/post/${postId}`;

  const userId = user?.id as string;

  const isOwner = userId === createdBy;

  const reply = !!parent;

  const { id: parentId, username: parentUsername = username } = parent ?? {};

  const isBlocked = user?.blockedUsers?.includes(ownerId) || postUserData.blockedUsers?.includes(user?.id as string);

  return (
    <motion.article
      className={cn(
        `accent-tab h- relative flex cursor-default flex-col gap-3 border-b
         border-light-border px-4 py-3 outline-none dark:border-dark-border`,
        reply && 'scroll-m-[3.25rem] pt-0'
      )}
      {...variants}
      animate={{ ...variants.animate, transition: { duration: 0.2 } }}
      exit={undefined}
      ref={viewPostRef}
    >
      {isBlocked ? (
        <>
          <div className='w-full h-full bg-neutral-800 rounded-md p-2'>
            <p>You are unable to view this Post because this account owner limits who can view their Posts.</p>
          </div>
          <Input reply parent={{ id: postId, username: username }} />
        </>
      ) : (
        <>
          <Modal
            className='flex items-start justify-center'
            modalClassName='bg-main-background rounded-2xl max-w-xl w-full mt-8 overflow-hidden'
            open={open}
            closeModal={closeModal}
          >
            <PostReplyModal post={post} closeModal={closeModal} />
          </Modal>
          <div className='flex flex-col gap-2'>
            {reply && (
              <div className='flex w-12 items-center justify-center'>
                <i className='hover-animation h-2 w-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
              </div>
            )}
            <div className='grid grid-cols-[auto,1fr] gap-3'>
              <UserTooltip avatar {...postUserData}>
                <UserAvatar src={photoURL} alt={name} username={username} isBusinessAccount={isBusinessAccount} />
              </UserTooltip>
              <div className='flex min-w-0 justify-between'>
                <div className='flex flex-col truncate xs:overflow-visible xs:whitespace-normal'>
                  <UserTooltip {...postUserData}>
                    <UserName
                      className='-mb-1'
                      name={name}
                      username={username}
                      verified={verified}
                      isBusinessAccount={isBusinessAccount}
                      affliates={affliates}
                    />
                  </UserTooltip>
                  <UserTooltip {...postUserData}>
                    <UserUsername username={username} />
                  </UserTooltip>
                </div>
                <div className='px-4'>
                  <PostActions
                    viewPost
                    isOwner={isOwner}
                    ownerId={ownerId}
                    postId={postId}
                    parentId={parentId}
                    username={username}
                    hasImages={!!images}
                    createdBy={createdBy}
                    verified={verified}
                  />
                </div>
              </div>
            </div>
          </div>
          {reply && (
            <p className='text-light-secondary dark:text-dark-secondary'>
              Replying to{' '}
              <Link
                className='custom-underline text-main-accent'
                href={`/user/${parentUsername}`}
              >
                @{parentUsername}
              </Link>
            </p>
          )}
          <div>
            {text && (
              <ParsedText className='whitespace-pre-line break-words text-2xl' text={text} />
            )}
            {images && (
              <ImagePreview
                viewPost
                imagesPreview={images}
                previewCount={images.length}
              />
            )}
            <div
              className='inner:hover-animation inner:border-b inner:border-light-border
                        dark:inner:border-dark-border'
            >
              <PostDate viewPost postLink={postLink} createdAt={createdAt} />
              <PostStats
                viewPost
                reply={reply}
                userId={userId}
                isOwner={isOwner}
                postId={postId}
                userLikes={userLikes}
                userReposts={userReposts}
                userReplies={userReplies}
                openModal={openModal}
              />
            </div>
            <Input reply parent={{ id: postId, username: username }} />
          </div>
        </>
      )}
    </motion.article>
  );
}
