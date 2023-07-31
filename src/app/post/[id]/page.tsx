'use client'

import { postsCollection } from "@/components/lib/firebase/collections";
import { useCollection } from "@/components/lib/hooks/useCollection";
import { useDocument } from "@/components/lib/hooks/useDocument";
import { doc, orderBy, query, where } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { isPlural } from "@/components/lib/utils";
import { MainLayout } from "@/components/layout/main-layout";
import { MainContainer } from "@/components/layout/main-container";
import { MainHeader } from "@/components/header/main-header";
import { Loading } from "@/components/ui/loading";
import { Error } from "@/components/ui/error";
import { ViewParentPost } from "@/components/post/view/view-parent-post";
import { ViewPost } from "@/components/post/view/view-post";
import { AnimatePresence } from "framer-motion";
import { Post } from "@/components/post/post";
import { Aside } from "@/components/aside/aside";
import { AsideFooter } from "@/components/aside/aside-footer";
import { SEO } from "@/components/common/seo";
import { siteURL } from "@/components/lib/env";

export default function UserPost()
{

    const { id } = useParams();
    const { back } = useRouter();

    const { data: postData, loading: postLoading } = useDocument(
        doc(postsCollection, id as string ?? 'null'),
        { allowNull: true }
    );
    
    const viewPostRef = useRef<HTMLElement>(null);
    
    const { data: repliesData, loading: repliesLoading } = useCollection(
        query(
            postsCollection,
            where('parent.id', '==', id ?? 'null'),
            orderBy('createdAt', 'desc')
        ),
        { allowNull: true }
    );

    const { text, images } = postData ?? {};
    
    const imagesLength = images?.length ?? 0;
    const parentId = postData?.parent?.id;
    
    const pageTitle = postData
    ? `${postData.user.name} on Vortex: "${text ?? ''}${
        images ? ` (${imagesLength} image${isPlural(imagesLength)})` : ''
      }" / Vortex`
    : null;

    return (
        <MainLayout>
            <MainContainer>
                <SEO title={`${postData?.user.name} on Vortex: "${postData?.text}. ${siteURL}/post/${postData?.id} / Vortex`} />
                <MainHeader
                    title={parentId ? 'Thread' : 'Post'}
                    useActionButton
                    action={back}
                />
                <section>
                    {postLoading ? (
                        <Loading />
                    ) : !postData ? (
                        <Error message="Post not found" />
                    ) : (
                        <>
                            {parentId && (
                                <ViewParentPost
                                    parentId={parentId}
                                    viewPostRef={viewPostRef}
                                />
                            )}
                            <ViewPost viewPostRef={viewPostRef}  {...postData} />
                            {postData && 
                                (repliesLoading ? (
                                    <Loading />
                                ) : (
                                    <AnimatePresence mode="popLayout">
                                        {repliesData?.map((post) => (
                                            <Post key={post.id} {...post} />
                                        ))}
                                    </AnimatePresence>
                                ))}
                        </>
                    )}
                </section>
            </MainContainer>
            <Aside>
                <AsideFooter />
            </Aside>
        </MainLayout>
    );
}