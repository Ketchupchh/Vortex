'use client'

import Link from "next/link";
import { CustomIcon, IconName } from "../ui/custom-icon";
import { SidebarLink } from "./sidebar-link";
import { SidebarProfile } from "./sidebar-profile";
import { useAuth } from "../lib/context/auth-context";
import { ArrowRightOnRectangleIcon, UserIcon, UserPlusIcon } from "@heroicons/react/24/solid";

export type NavLink = {
    href: string;
    linkName: string;
    iconName: IconName;
    disabled?: boolean;
    canBeHidden?: boolean;
};
  
const navLinks: Readonly<NavLink[]> = [
    {
      href: '/',
      linkName: 'Home',
      iconName: 'Home'
    },
    {
      href: '/explore',
      linkName: 'Explore',
      iconName: 'Hashtag',
      disabled: true,
      canBeHidden: true
    },
    {
      href: '/notifications',
      linkName: 'Notifications',
      iconName: 'Bell',
      disabled: true
    },
    {
      href: '/messages',
      linkName: 'Messages',
      iconName: 'MessageIcon',
      disabled: true
    },
    {
      href: '/bookmarks',
      linkName: 'Bookmarks',
      iconName: 'SaveIcon',
      canBeHidden: true
    }
];

export function Sidebar() : JSX.Element
{
    const { user, signInWithGoogle, signOut } = useAuth();
    return (
        <header
            id="sidebar"
            className="xs:w-20 xl:w-96 min-h-screen"
        >
            <div
                className="fixed bottom-0 bg-black z-10 border-t w-full py-2 flex flex-row justify-around
                            xs:top-0 xs:bg-transparent xs:border-0 xs:w-20 lg:w-24 xl:w-96 xs:flex-col
                            xs:justify-normal xs:pl-0 xl:pl-32 overflow-y-auto overflow-x-hidden"
            >
                <section className="flex flex-col justify-center gap-2 xs:items-center w-full xl:items-stretch">
                    <h1 className="hidden xs:flex">
                        <Link
                            className="hover-animation hover:bg-dark-primary/10 p-2 rounded-full
                                        flex items-center xs:p-0 xs:ml-2"
                            href="/"
                        >
                            <CustomIcon className="w-20 h-20" iconName='VortexLogo' />
                        </Link>
                    </h1>
                    <nav className="flex items-center justify-around xs:flex-col xs:justify-center xs:block">
                        {navLinks.map(({ ...linkData}) => (
                            <SidebarLink key={linkData.href} {...linkData} />
                        ))}
                        <SidebarLink
                            href={`/user/${user?.username}`}
                            username={user?.username}
                            linkName="Profile"
                            iconName="UserTagIcon"
                        />
                        {user ? (
                            <button className="block xs:hidden" onClick={signOut}>
                                <ArrowRightOnRectangleIcon className="w-7 h-7" />
                            </button>
                        ) : (
                            <button className="block xs:hidden" onClick={signInWithGoogle}>
                                <UserPlusIcon className="w-7 h-7" />
                            </button>
                        )}
                    </nav>
                </section>
                <div className="hidden xs:block mt-auto">
                    <SidebarProfile />
                </div>
            </div>
        </header>
    );
}