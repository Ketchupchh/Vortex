import { UserDataLayout } from "@/components/layout/user/user-data-layout"

import { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
    { params, searchParams }: Props,
    parent?: ResolvingMetadata,
) : Promise<Metadata> {

    const id = params.id;
    
    return {
        title: `@${id} / Vortex`,
    }
}

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <UserDataLayout>
            {children}
        </UserDataLayout>
    )
}