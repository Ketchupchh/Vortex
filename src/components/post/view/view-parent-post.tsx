'use client'

import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { useDocument } from '@/components/lib/hooks/useDocument';
import { postsCollection } from '@/components/lib/firebase/collections';
import { Post } from '../post';
import type { RefObject } from 'react';

type ViewParentPostProps = {
  parentId: string;
  viewPostRef: RefObject<HTMLElement>;
};

export function ViewParentPost({
  parentId,
  viewPostRef
}: ViewParentPostProps): JSX.Element | null {
  const { data, loading } = useDocument(
    doc(postsCollection, parentId),
    { allowNull: true }
  );

  useEffect(() => {
    if (!loading) viewPostRef.current?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id, loading]);

  if (loading) return null;
  if (!data)
    return (
      <div className='px-4 pt-3 pb-2'>
        <p
          className='rounded-2xl bg-main-sidebar-background py-3 px-1 pl-4 
                     text-light-secondary dark:text-dark-secondary'
        >
          This Post was deleted by the Post author.{' '}
          <a
            className='custom-underline text-main-accent'
            href='https://help.twitter.com/rules-and-policies/notices-on-twitter'
            target='_blank'
            rel='noreferrer'
          >
            Learn more
          </a>
        </p>
      </div>
    );

  return <Post parentPost {...data} />;
}
