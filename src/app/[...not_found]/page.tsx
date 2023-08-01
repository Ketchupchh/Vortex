'use client'

import { Aside } from "@/components/aside/aside";
import { SEO } from "@/components/common/seo";
import { MainHeader } from "@/components/header/main-header";
import { MainContainer } from "@/components/layout/main-container";
import { MainLayout } from "@/components/layout/main-layout";
import { useRouter } from "next/navigation";

export default function NotFound() : JSX.Element
{

    const { replace } = useRouter();

    return (
        <MainLayout>
            <MainContainer>
                <SEO title="Page not found / Vortex" />
                <MainHeader tip="Home" useActionButton action={() =>replace('/')} />
                <div className="flex flex-col p-5">
                    <p className="text-dark-secondary">Hmm...this page doesn’t exist. Try searching for something else.</p>
                </div>
            </MainContainer>
            <Aside>
                
            </Aside>
        </MainLayout>
    );
}