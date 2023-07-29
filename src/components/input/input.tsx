'use client'

import cn from 'clsx'
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useState, useRef, useEffect, useId } from 'react'
import { useAuth } from '../lib/context/auth-context';
import { AnimatePresence, motion } from 'framer-motion'
import { getImagesData } from '../lib/validation';
import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { manageReply, manageTotalPhotos, manageTotalPosts, uploadImages } from '../lib/firebase/utils';
import { postsCollection } from '../lib/firebase/collections';
import { sleep } from '../lib/utils';
import { InputForm, fromTop } from './input-form';
import { UserAvatar } from '../user/user-avatar';
import { ImagePreview } from './image-preview';
import { InputOptions } from './input-options';
import type { Variants } from 'framer-motion'
import type { FilesWithId, ImageData, ImagesPreview } from '../lib/types/file';
import type { ChangeEvent, FormEvent, ClipboardEvent, ReactNode } from 'react'
import type { Post } from '../lib/types/post';
import type { WithFieldValue } from 'firebase/firestore'

type InputProps = {
  modal?: boolean;
  reply?: boolean;
  replyModal?: boolean;
  parent?: { id: string; username: string };
  disabled?: boolean;
  children?: ReactNode;
  closeModal?: () => void;
}

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export function Input({
  modal,
  reply,
  replyModal,
  parent,
  disabled,
  children,
  closeModal
} : InputProps) : JSX.Element
{
  const [selectedImages, setSelectedImages] = useState<FilesWithId>([]);
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [visited, setVisited] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useAuth();

  const previewCount = imagesPreview.length;
  const isUploadingImages = !!previewCount;

  useEffect(
    () => {
      if (modal) inputRef.current?.focus();
      return cleanImage;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sendPost = async (): Promise<void> => {

    if(!user) return;

    inputRef.current?.blur();
  
    setLoading(true);
  
    const isReplying = reply ?? replyModal;
  
    const userId = user.id as string;
  
    const postData: WithFieldValue<Omit<Post, 'id'>> = {
      text: inputValue.trim() || null,
      parent: isReplying && parent ? parent : null,
      images: await uploadImages(userId, selectedImages),
      userLikes: [],
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: null,
      userReplies: 0,
      userReposts: [],
      user: {
        id: userId,
        userId: userId,
        bio: user.bio,
        name: user.name,
        website: user.website,
        location: user.location,
        username: user.username,
        photoURL: user.photoURL,
        verified: user.verified,
        following: user.following,
        followers: user.followers,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        totalPosts: user.totalPosts,
        totalPhotos: user.totalPhotos,
        pinnedPost: user.pinnedPost,
        coverPhotoURL: user.coverPhotoURL,
        isAdmin: user.isAdmin,
        isPrivate: user.isPrivate,
        isBusinessAccount: user.isBusinessAccount,
        affliates: user.affliates ?? []
      }
    };
  
    await sleep(500);
  
    const [postRef] = await Promise.all([
      addDoc(postsCollection, postData),
      manageTotalPosts('increment', userId),
      postData.images && manageTotalPhotos('increment', userId),
      isReplying && manageReply('increment', parent?.id as string)
    ]);
  
    const { id: postId } = await getDoc(postRef);
  
    if (!modal && !replyModal) {
      discardPost();
      setLoading(false);
    }
  
    if (closeModal) closeModal();
  
    toast.success(
      () => (
        <span className='flex gap-2'>
          Your Post was sent
          <Link
            className='custom-underline font-bold'
            href={`/post/${postId}`}
          >
            View
          </Link>
        </span>
      ),
      { duration: 6000 }
    );
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ) : void => {
    const isClipboardEvent = 'clipboardData' in e;
  
    if (isClipboardEvent) {
      const isPastingText = e.clipboardData.getData('text');
      if (isPastingText) return;
    }
  
    const files = isClipboardEvent ? e.clipboardData.files : e.target.files;
  
    const imagesData = getImagesData(files, previewCount);
  
    if (!imagesData) {
      toast.error('Please choose a GIF or photo up to 4');
      return;
    }
  
    const { imagesPreviewData, selectedImagesData } = imagesData;
  
    setImagesPreview([...imagesPreview, ...imagesPreviewData]);
    setSelectedImages([...selectedImages, ...selectedImagesData]);
  
    inputRef.current?.focus();
  };

  const removeImage = (targetId: string) => (): void => {
    setSelectedImages(selectedImages.filter(({ id }) => id !== targetId));
    setImagesPreview(imagesPreview.filter(({ id }) => id !== targetId));
  
    const { src } = imagesPreview.find(
      ({ id }) => id === targetId
    ) as ImageData;
  
    URL.revokeObjectURL(src);
  };

  const cleanImage = (): void => {
    imagesPreview.forEach(({ src }) => URL.revokeObjectURL(src));
  
    setSelectedImages([]);
    setImagesPreview([]);
  };

  const discardPost = (): void => {
    setInputValue('');
    setVisited(false);
    cleanImage();
  
    inputRef.current?.blur();
  };

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>): void => setInputValue(value);
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void sendPost();
  };

  const handleFocus = (): void => setVisited(!loading);

  const formId = useId();

  const inputLimit = user?.isAdmin ? 560 : 280;

  const inputLength = inputValue.length;
  const isValidInput = !!inputValue.trim().length;
  const isCharLimitExceeded = inputLength > inputLimit;

  const isValidPost =
    !isCharLimitExceeded && (isValidInput || isUploadingImages);

  return (
    <form
      className={cn(
        'flex flex-col', {
          '-mx-4' : reply,
          'gap-2': replyModal
        }
      )}
      onSubmit={handleSubmit}
    >
      {loading && (
        <motion.i className='h-1 animate-pulse ' />
      )}
      {children}
      {reply && visited && (
        <motion.p
          className='ml-[75px] -mb-2 mt-2 text-dark-secondary'
          {...fromTop}
        >
          Replying to{' '}
          <Link
            href={`/user/${parent?.username as string}`}
            className='custom-underline text-main-accent'
          >
            {parent?.username as string}
          </Link>
        </motion.p>
      )}
      <label
        className={cn(
          'hover-animation grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3',
          reply
            ? 'pt-3 pb-1'
            : replyModal
            ? 'pt-0'
            : 'border-b-2 border-light-border dark:border-dark-border',
          (disabled || loading) && 'pointer-events-none opacity-50'
        )}
        htmlFor={formId}
      >
        {user && <UserAvatar src={user.photoURL} alt={user.name} username={user.username} isBusinessAccount={user.isBusinessAccount} />}
        <div className='flex w-full flex-col gap-4'>
          <InputForm
            modal={modal}
            reply={reply}
            formId={formId}
            visited={visited}
            loading={loading}
            inputRef={inputRef}
            replyModal={replyModal}
            inputValue={inputValue}
            isValidPost={isValidPost}
            isUploadingImages={isUploadingImages}
            sendPost={sendPost}
            handleFocus={handleFocus}
            discardPost={discardPost}
            handleChange={handleChange}
            handleImageUpload={handleImageUpload}
          >
            {isUploadingImages && (
              <ImagePreview
                imagesPreview={imagesPreview}
                previewCount={previewCount}
                removeImage={!loading ? removeImage : undefined}
              />
            )}
          </InputForm>
          <AnimatePresence initial={false}>
            {(reply ? reply && visited && !loading : !loading) && (
              <InputOptions
                reply={reply}
                modal={modal}
                inputLimit={inputLimit}
                inputLength={inputLength}
                isValidPost={isValidPost}
                isCharLimitExceeded={isCharLimitExceeded}
                handleImageUpload={handleImageUpload}
              />
            )}
          </AnimatePresence>
        </div>
      </label>
    </form>
  );
}