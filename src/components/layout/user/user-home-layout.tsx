'use client'

import { useAuth } from "@/components/lib/context/auth-context";
import { useUser } from "@/components/lib/context/user-context";
import { Loading } from "@/components/ui/loading";
import { motion } from "framer-motion";
import { UserDetails } from "@/components/user/user-details";
import { UserEditProfile } from "@/components/user/user-edit-profile";
import { UserHomeAvatar } from "@/components/user/user-home-avatar";
import { UserHomeCover } from "@/components/user/user-home-cover";
import { UserShare } from "@/components/user/user-share";
import { useParams } from "next/navigation";
import { variants } from "@/components/user/user-header";
import { UserNav } from "@/components/user/user-nav";
import type { ReactNode } from "react";

type UserHomeLayoutProps = {
    children: ReactNode;
}

export function UserHomeLayout({
    children
} : UserHomeLayoutProps) : JSX.Element
{
    const { user } = useAuth();
    const { user: userData, loading } = useUser();

    const { id } = useParams();

    const isOwner = user?.id === userData?.id;

    const coverData = userData?.coverPhotoURL
        ? { src: userData.coverPhotoURL, alt: userData.name }
        : null;

    const profileData = userData
        ? { src: userData.photoURL, alt: userData.name }
        : null;

        
    return (
        <>
            <motion.section {...variants} exit={undefined}>
                {loading ? (
                    <Loading />
                ) : !userData ? (
                    <>
                        <UserHomeCover />
                        <div className="flex flex-col gap-3 px-5 py-3">
                            <div className="flex justify-between mb-5">
                                <UserHomeAvatar />
                                <p className='text-xl font-bold mt-16'>@{id}</p>
                            </div>
                            <div className="p-8 text-center">
                                <p className="text-3xl font-bold">This account doesn’t exist</p>
                                <p className='text-dark-secondary'>
                                    Try searching for another.
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <UserHomeCover coverData={coverData} />
                        <div className="relative flex flex-col gap-3 px-5 py-3">
                            <div className="flex justify-between xs:mb-5">
                                <UserHomeAvatar avatarData={profileData} isBusinessAccount={userData.isBusinessAccount} />
                                
                                <div />
                                {isOwner ? (
                                    <UserEditProfile />
                                ) : (
                                    <div className="flex gap-2 self-start ml-auto">
                                        <UserShare username={userData?.username} />
                                    </div>
                                )}
                            </div>
                            <UserDetails {...userData} />
                        </div>
                    </>
                )}
            </motion.section>
            {userData && (
                <>
                    <UserNav isBusinessAccount={userData.isBusinessAccount} />
                    {children}
                </>
            )}
        </>
    );
}