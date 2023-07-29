'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { query, limit } from 'firebase/firestore';
import { getCollectionCount } from '../firebase/utils';
import { Loading } from '@/components/ui/loading';
import { useCollection } from './useCollection';
import type { UseCollectionOptions } from './useCollection';
import type { Query, QueryConstraint } from 'firebase/firestore';
import type { User } from '../types/user';

type InfiniteScroll<T> = {
  data: T[] | null;
  loading: boolean;
  LoadMore: () => JSX.Element;
};

type InfiniteScrollWithUser<T> = {
  data: (T & { user: User })[] | null;
  loading: boolean;
  LoadMore: () => JSX.Element;
};

export function useInfiniteScroll<T>(
  collection: Query<T>,
  constraints: QueryConstraint[],
  fetchOptions: UseCollectionOptions & { includeUser: true },
  options?: { initialSize?: number; stepSize?: number; marginBottom?: number }
): InfiniteScrollWithUser<T>;

export function useInfiniteScroll<T>(
  collection: Query<T>,
  constraints: QueryConstraint[],
  fetchOptions?: UseCollectionOptions,
  options?: { initialSize?: number; stepSize?: number; marginBottom?: number }
): InfiniteScroll<T>;

export function useInfiniteScroll<T>(
  collection: Query<T>,
  queryConstraints?: QueryConstraint[],
  fetchOptions?: UseCollectionOptions,
  options?: { initialSize?: number; stepSize?: number; marginBottom?: number }
): InfiniteScroll<T> | InfiniteScrollWithUser<T> {
  const { initialSize, stepSize, marginBottom } = options ?? {};

  const [postsLimit, setPostsLimit] = useState(initialSize ?? 20);
  const [postsSize, setPostsSize] = useState<number | null>(null);
  const [reachedLimit, setReachedLimit] = useState(false);
  const [loadMoreInView, setLoadMoreInView] = useState(false);

  const { data, loading } = useCollection(
    query(
      collection,
      ...[
        ...(queryConstraints ?? []),
        ...(!reachedLimit ? [limit(postsLimit)] : [])
      ]
    ),
    fetchOptions
  );

  useEffect(() => {
    const checkLimit = postsSize ? postsLimit >= postsSize : false;
    setReachedLimit(checkLimit);
  }, [postsSize, postsLimit]);

  useEffect(() => {
    if (reachedLimit) return;

    const setPostsLength = async (): Promise<void> => {
      const currentPostsSize = await getCollectionCount(
        query(collection, ...(queryConstraints ?? []))
      );
      setPostsSize(currentPostsSize);
    };

    void setPostsLength();
  }, [data?.length]);

  useEffect(() => {
    if (reachedLimit) return;
    if (loadMoreInView) setPostsLimit(postsLimit + (stepSize ?? 20));
  }, [loadMoreInView]);

  const makeItInView = (): void => setLoadMoreInView(true);
  const makeItNotInView = (): void => setLoadMoreInView(false);

  const isLoadMoreHidden =
    reachedLimit && (data?.length ?? 0) >= (postsSize ?? 0);

  const LoadMore = useCallback(
    (): JSX.Element => (
      <motion.div
        className={isLoadMoreHidden ? 'hidden' : 'block'}
        viewport={{ margin: `0px 0px ${marginBottom ?? 1000}px` }}
        onViewportEnter={makeItInView}
        onViewportLeave={makeItNotInView}
      >
        <Loading className='mt-5' />
      </motion.div>
    ),
    [isLoadMoreHidden]
  );

  return { data, loading, LoadMore };
}
