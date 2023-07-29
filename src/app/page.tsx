'use client'

import { Aside } from "@/components/aside/aside";
import { AsideFooter } from "@/components/aside/aside-footer";
import { MainHeader } from "@/components/header/main-header";
import { Input } from "@/components/input/input";
import { MainContainer } from "@/components/layout/main-container";
import { MainLayout } from "@/components/layout/main-layout";
import { AuthContextProvider, useAuth } from "@/components/lib/context/auth-context";
import { postsCollection } from "@/components/lib/firebase/collections";
import { useInfiniteScroll } from "@/components/lib/hooks/useInfiniteScroll";
import { Post } from "@/components/post/post";
import { Error } from "@/components/ui/error";
import { Loading } from "@/components/ui/loading";
import { UpdateUsername } from "@/components/user/update-username";
import { orderBy, where } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";

export default function Home() {

  const { user } = useAuth();

  const { data, loading, LoadMore } = useInfiniteScroll(
    postsCollection,
    [where('parent', '==', null), orderBy('createdAt', 'desc')],
    { allowNull: true, preserve: true }
  );

  return (
    <MainLayout>
      <MainContainer>
        <MainHeader title="Home">
          <UpdateUsername />
        </MainHeader>

        {user && (
          <Input />
        )}

        <section className='mt-0.5 xs:mt-0'>
          {loading ? (
            <Loading className='mt-5' />
          ) : !data ? (
            <Error message='Something went wrong' />
          ) : (
            <>
              <AnimatePresence mode='popLayout'>
                {data.map((post) => (
                  <Post {...post} key={post.id} />
                ))}
              </AnimatePresence>
              <LoadMore />
            </>
          )}
        </section>

      </MainContainer>
      <Aside>
        <AsideFooter />
      </Aside>
    </MainLayout>
  )
}
