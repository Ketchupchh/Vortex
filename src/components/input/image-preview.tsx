'use client'

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { useModal } from '../lib/hooks/useModal';
import { preventBubbling } from '../lib/utils';
import { ImageModal } from '@/components/modal/image-modal';
import { Modal } from '@/components/modal/modal';
import { NextImage } from '@/components/ui/next-image';
import { Button } from '@/components/ui/button';
import { ToolTip } from '@/components/ui/tooltip';
import type { MotionProps } from 'framer-motion';
import type { ImagesPreview, ImageData } from '../lib/types/file';
import { XMarkIcon } from '@heroicons/react/24/solid';

type ImagePreviewProps = {
  post?: boolean;
  viewPost?: boolean;
  previewCount: number;
  imagesPreview: ImagesPreview;
  removeImage?: (targetId: string) => () => void;
};

const variants: MotionProps = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, scale: 0.5 },
  transition: { type: 'spring', duration: 0.5 }
};

type PostImageBorderRadius = Record<number, string[]>;

const postImageBorderRadius: Readonly<PostImageBorderRadius> = {
  1: ['rounded-2xl'],
  2: ['rounded-tl-2xl rounded-bl-2xl', 'rounded-tr-2xl rounded-br-2xl'],
  3: ['rounded-tl-2xl rounded-bl-2xl', 'rounded-tr-2xl', 'rounded-br-2xl'],
  4: ['rounded-tl-2xl', 'rounded-tr-2xl', 'rounded-bl-2xl', 'rounded-br-2xl']
};

export function ImagePreview({
  post,
  viewPost,
  previewCount,
  imagesPreview,
  removeImage
}: ImagePreviewProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    const imageData = imagesPreview[selectedIndex];
    setSelectedImage(imageData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const handleSelectedImage = (index: number) => () => {
    setSelectedIndex(index);
    openModal();
  };

  const handleNextIndex = (type: 'prev' | 'next') => () => {
    const nextIndex =
      type === 'prev'
        ? selectedIndex === 0
          ? previewCount - 1
          : selectedIndex - 1
        : selectedIndex === previewCount - 1
        ? 0
        : selectedIndex + 1;

    setSelectedIndex(nextIndex);
  };

  const isPost = post ?? viewPost;

  return (
    <div
      className={cn(
        'grid grid-cols-2 grid-rows-2 rounded-2xl',
        viewPost
          ? 'h-[51vw] xs:h-[42vw] md:h-[305px] overflow-hidden'
          : 'h-[42vw] xs:h-[37vw] md:h-[271px] overflow-hidden',
          isPost ? 'mt-2 gap-0.5' : 'gap-3'
      )}
    >
      <Modal
        modalClassName={cn(
          'flex justify-center w-full items-center relative',
          isPost && 'h-full'
        )}
        open={open}
        closeModal={closeModal}
        closePanelOnClick
      >
        <ImageModal
          post={isPost}
          imageData={selectedImage as ImageData}
          previewCount={previewCount}
          selectedIndex={selectedIndex}
          handleNextIndex={handleNextIndex}
        />
      </Modal>
      <AnimatePresence mode='popLayout'>
        {imagesPreview.map(({ id, src, alt }, index) => (
          <motion.button
            type='button'
            className={cn(
              'accent-tab relative transition-shadow',
              isPost
                ? postImageBorderRadius[previewCount][index]
                : 'rounded-2xl',
              {
                'col-span-2 row-span-2': previewCount === 1,
                'row-span-2':
                  previewCount === 2 || (index === 0 && previewCount === 3)
              },
            )}
            {...variants}
            onClick={preventBubbling(handleSelectedImage(index))}
            layout={!isPost ? true : false}
            key={id}
          >
            <NextImage
              className='relative h-full w-full cursor-pointer transition 
                         hover:brightness-75 hover:duration-200'
              imgClassName={cn(
                isPost
                  ? postImageBorderRadius[previewCount][index]
                  : 'rounded-2xl'
              )}
              previewCount={previewCount}
              layout='fill'
              src={src}
              alt={alt}
              useSkeleton={isPost}
            />
            {removeImage && (
              <Button
                className='group absolute top-0 left-0 translate-x-1 translate-y-1
                           bg-light-primary/75 p-1 backdrop-blur-sm 
                           hover:bg-image-preview-hover/75'
                onClick={preventBubbling(removeImage(id))}
              >
                <XMarkIcon className='w-4 h-4 text-white' />
                <ToolTip className='translate-y-2' tip='Remove' />
              </Button>
            )}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
