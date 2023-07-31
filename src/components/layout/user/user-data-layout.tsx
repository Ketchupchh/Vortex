'use client'

import { UserContextProvider } from "@/components/lib/context/user-context";
import { usersCollection } from "@/components/lib/firebase/collections";
import { useCollection } from "@/components/lib/hooks/useCollection";
import { limit, query, where } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { MainContainer } from "../main-container";
import { MainHeader } from "@/components/header/main-header";
import { UserHeader } from "@/components/user/user-header";
import { MainLayout } from "../main-layout";
import { Aside } from "@/components/aside/aside";
import { AsideFooter } from "@/components/aside/aside-footer";
import type { ReactNode } from "react";
import { Suggestions } from "@/components/aside/suggestions";
import { SearchBar } from "@/components/aside/search-bar";

type UserDataLayoutProps = {
    children: ReactNode;
}

export function UserDataLayout({
    children
} : UserDataLayoutProps) : JSX.Element
{
    const { id } = useParams();
    const { back} = useRouter();

    const { data, loading } = useCollection(
        query(usersCollection, where('username', '==', id), limit(1)),
        { allowNull: true }
    );

    const user = data ? data[0] : null;

    return (
        <UserContextProvider value={{ user, loading}}>
            <MainLayout>
                <MainContainer>
                    <MainHeader useActionButton action={back}>
                        <UserHeader />
                    </MainHeader>
                    {children}
                </MainContainer>
                <Aside>
                    <SearchBar />
                    <Suggestions />
                    <AsideFooter />
                </Aside>
            </MainLayout>
        </UserContextProvider>
    );
}