'use client'

import { ReactNode } from "react";

type AsideProps = {
    children: ReactNode;
};

export function Aside({
    children
} : AsideProps) : JSX.Element | null
{
    return (
        <aside className="hidden lg:flex w-96 flex-col gap-4 px-4 py-3 pt-1">
            {children}
        </aside>
    );
}