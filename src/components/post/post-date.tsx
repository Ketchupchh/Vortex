import Link from 'next/link';
import cn from 'clsx';
import { formatDate } from '../lib/date';
import { ToolTip } from '@/components/ui/tooltip';
import type { Post } from '../lib/types/post';

type PostDateProps = Pick<Post, 'createdAt'> & {
  postLink: string;
  viewPost?: boolean;
};

export function PostDate({
  createdAt,
  postLink,
  viewPost
}: PostDateProps): JSX.Element {
  return (
    <div className={cn('flex gap-1', viewPost && 'py-4')}>
      {!viewPost && <i>·</i>}
      <div className='group relative'>
        <Link
          className={cn(
            'custom-underline peer whitespace-nowrap',
            viewPost && 'text-light-secondary dark:text-dark-secondary'
          )}
          href={postLink}
        >
          {formatDate(createdAt, viewPost ? 'full' : 'post')}
        </Link>
        <ToolTip
          className='translate-y-1 peer-focus:opacity-100 peer-focus-visible:visible
                     peer-focus-visible:delay-200'
          tip={formatDate(createdAt, 'full')}
        />
      </div>
    </div>
  );
}
