'use client'

import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { orderBy, query } from 'firebase/firestore';
import { useAuth } from '@/components/lib/context/auth-context';
import { useModal } from '@/components/lib/hooks/useModal';
import { useCollection } from '@/components/lib/hooks/useCollection';
import { useArrayDocument } from '@/components/lib/hooks/useArrayDocument';
import { clearAllBookmarks } from '@/components/lib/firebase/utils';
import { postsCollection, userBookmarksCollection } from '@/components/lib/firebase/collections';
import { MainLayout } from '@/components/layout/main-layout';
import { MainHeader } from '@/components/header/main-header';
import { MainContainer } from '@/components/layout/main-container';
import { Modal } from '@/components/modal/modal';
import { ActionModal } from '@/components/modal/action-modal';
import { Post } from '@/components/post/post';
import { StatsEmpty } from '@/components/post/stats-empty';
import { Button } from '@/components/ui/button';
import { ToolTip } from '@/components/ui/tooltip';
import { Loading } from '@/components/ui/loading';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid';
import { Aside } from '@/components/aside/aside';
import { AsideFooter } from '@/components/aside/aside-footer';
import { SEO } from '@/components/common/seo';

export default function Bookmarks(): JSX.Element {
  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const userId = user?.id as string;

  const { data: bookmarksRef, loading: bookmarksRefLoading } = useCollection(
    query(userBookmarksCollection(userId), orderBy('createdAt', 'desc')),
    { allowNull: true }
  );

  const postIds = useMemo(
    () => bookmarksRef?.map(({ id }) => id) ?? [],
    [bookmarksRef]
  );

  const { data: postData, loading: postLoading } = useArrayDocument(
    postIds,
    postsCollection,
  );

  const handleClear = async (): Promise<void> => {
    await clearAllBookmarks(userId);
    closeModal();
    toast.success('Successfully cleared all bookmarks');
  };

  return (
    <MainLayout>
      <MainContainer>
        <SEO title='Bookmarks / Vortex' />
        <Modal
          modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
          open={open}
          closeModal={closeModal}
        >
          <ActionModal
            title='Clear all Bookmarks?'
            description='This can’t be undone and you’ll remove all Tweets you’ve added to your Bookmarks.'
            mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab 
                              focus-visible:bg-accent-red/90'
            mainBtnLabel='Clear'
            action={handleClear}
            closeModal={closeModal}
          />
        </Modal>
        <MainHeader className='flex items-center justify-between'>
          <div className='-mb-1 flex flex-col'>
            <h2 className='-mt-1 text-xl font-bold'>Bookmarks</h2>
            <p className='text-xs text-light-secondary dark:text-dark-secondary'>
              @{user?.username}
            </p>
          </div>
          <Button
            className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                      active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                      dark:active:bg-dark-primary/20'
            onClick={openModal}
          >
            <ArchiveBoxXMarkIcon className='w-5 h-5' />
            <ToolTip
              className='!-translate-x-20 translate-y-3 md:-translate-x-1/2'
              tip='Clear bookmarks'
            />
          </Button>
        </MainHeader>
        <section className='mt-0.5'>
          {bookmarksRefLoading || postLoading ? (
            <Loading className='mt-5' />
          ) : !bookmarksRef ? (
            <StatsEmpty
              title='Save Posts for later'
              description='Don’t let the good ones fly away! Bookmark Posts to easily find them again in the future.'
              imageData={{ src: '/assets/no-bookmarks.png', alt: 'No bookmarks' }}
            />
          ) : (
            <AnimatePresence mode='popLayout'>
              {postData?.map((post) => (
                <Post {...post} key={post.id} />
              ))}
            </AnimatePresence>
          )}
        </section>
      </MainContainer>
      <Aside>
        <AsideFooter />
      </Aside>
    </MainLayout>
  );
}