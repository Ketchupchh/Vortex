'use client'

import { Aside } from "@/components/aside/aside";
import { AsideFooter } from "@/components/aside/aside-footer";
import { SearchBar } from "@/components/aside/search-bar";
import { Suggestions } from "@/components/aside/suggestions";
import { SEO } from "@/components/common/seo";
import { MainHeader } from "@/components/header/main-header";
import { MainContainer } from "@/components/layout/main-container";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/components/lib/context/auth-context";
import { usersCollection } from "@/components/lib/firebase/collections";
import { useCollection } from "@/components/lib/hooks/useCollection";
import { useInfiniteScroll } from "@/components/lib/hooks/useInfiniteScroll";
import { Error } from "@/components/ui/error";
import { Loading } from "@/components/ui/loading";
import { UserCard } from "@/components/user/user-card";
import { UserCards } from "@/components/user/user-cards";
import { where } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Connect() : JSX.Element
{
    const { user } = useAuth();

    const { data, loading } = useInfiniteScroll(
        usersCollection,
        [where('id', '!=', user?.id)],
        { allowNull: true, preserve: true },
        { marginBottom: 500 }
    );

    const { back } = useRouter();

    return (
        <MainLayout>
            <MainContainer>
                <SEO title={`Connect / Vortex`} />
                <MainHeader title="Connect" tip="back" useActionButton action={back}/>
                <section>
                    {loading ? (
                        <Loading />
                    ) : !data ? (
                        <Error />
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {data.map((u) => (
                                <UserCard key={u.id} {...u} />
                            ))}
                        </AnimatePresence>
                    )}
                </section>
            </MainContainer>
            <Aside>
                <SearchBar />
                <Suggestions />
                <AsideFooter />
            </Aside>
        </MainLayout>
    );
}