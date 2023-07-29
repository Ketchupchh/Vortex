import { motion } from 'framer-motion';
import { CustomIcon } from '@/components/ui/custom-icon';
import { fromTop } from '@/components/input/input-form';
import type { ReactNode } from 'react';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';

type PostStatusProps = {
  type: 'pin' | 'post';
  children: ReactNode;
};

export function PostStatus({ type, children }: PostStatusProps): JSX.Element {
  return (
    <motion.div
      className='col-span-2 grid grid-cols-[48px,1fr] gap-3 text-light-secondary dark:text-dark-secondary'
      {...fromTop}
    >
      <i className='justify-self-end'>
        {type === 'pin' ? (
          <CustomIcon
            className='h-5 w-5 -rotate-45 fill-light-secondary dark:fill-dark-secondary'
            iconName='PinIcon'
          />
        ) : (
          <ArrowPathRoundedSquareIcon className='h-5 w-5' />
        )}
      </i>
      {children}
    </motion.div>
  );
}
