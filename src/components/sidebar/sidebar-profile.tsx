'use client'

import cn from 'clsx'
import { Menu } from "@headlessui/react";
import { motion } from 'framer-motion'
import { CustomIcon } from '../ui/custom-icon';
import { AnimatePresence } from 'framer-motion';
import { ArrowRightOnRectangleIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/button';
import { useAuth } from '../lib/context/auth-context';
import { UserAvatar } from '../user/user-avatar';
import { UserUsername } from '../user/user-username';
import { UserName } from '../user/user-name';
import type { Variants } from 'framer-motion'

export const variants: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', duration: 0.4 }
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
};
  

export function SidebarProfile() : JSX.Element
{
    const { user, signInWithGoogle, signOut } = useAuth();

    return (
        <>

            <Menu className="hidden xs:block relative" as="section">
                {({ open }) : JSX.Element => (
                    <>
                        <Menu.Button
                            className={cn(
                                `flex w-16 ml-0 xs:ml-1 sm:ml-1 lg:ml-4 xl:ml-0 xl:w-full items-center justify-between hover:bg-neutral-500/20
                                active:bg-neutral-500/20 rounded-full p-2 xl:px-4`,
                                open && 'bg-neutral-500/20'
                            )}
                        >
                            {user ? (
                                <div className='flex gap-3 truncate'>
                                    <UserAvatar className='flex w-14 h-14' src={user.photoURL} alt={user.username} isBusinessAccount={user.isBusinessAccount} />
                                    <div className='hidden truncate text-start leading-xl xl:block text-dark-secondary'>
                                        <UserName
                                            className='text-white start-0'
                                            name={user.name}
                                            username={user.username}
                                            verified={user.verified}
                                            isBusinessAccount={user.isBusinessAccount}
                                            affliates={user.affliates}
                                        />
                                        <UserUsername username={user ? user.username : 'Guest'} disableLink />
                                    </div>
                                </div>
                            ) : (
                                <div className='flex gap-3 truncate items-center'>
                                    <div className='rounded-full w-14 h-14 bg-neutral-600' />
                                    <div className='hidden truncate text-start xl:block text-dark-secondary'>
                                        <p className='text-xl font-bold'>Sign in</p>
                                    </div>
                                </div>
                            )}

                            <CustomIcon className='hidden xl:flex' iconName='EllipsisIcon' />
                        </Menu.Button>
                        <AnimatePresence>
                            {open && (
                                <Menu.Items
                                    className="menu-container absolute left-0 right-0 -top-52 w-60 xl:w-full"
                                    as={motion.div}
                                    {...variants}
                                    static
                                >
                                    {user && (
                                        <Menu.Item
                                            className="flex items-center justify-between gap-4 border-b
                                                        border-light-border px-4 py-3"
                                            as="div"
                                            disabled
                                        >
                                            <div className='flex items-center gap-3 truncate'>
                                                <UserAvatar src={user.photoURL} alt={user.username} isBusinessAccount={user.isBusinessAccount} />
                                                <div className='truncate'>
                                                    <span>{user?.username}</span>
                                                </div>
                                                <i>
                                                    <CheckIcon className='w-5 h-5 text-main-accent' />
                                                </i>
                                            </div>
                                        </Menu.Item>
                                    )}
                                    <Menu.Item
                                        className="flex items-center justify-between gap-4 border-b hover:bg-neutral-500/20
                                                    border-light-border px-4 py-3 w-full"
                                        as="button"
                                        onClick={signInWithGoogle}
                                    >
                                        Switch accounts
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }): JSX.Element => (
                                            <Button
                                                className={cn(
                                                    'flex w-full gap-3 rounded-md rounded-t-none p-4 truncate',
                                                    active && 'bg-gray-900/50'
                                                )}
                                                onClick={signOut}
                                            >
                                                <ArrowRightOnRectangleIcon className='w-6 h-6' />
                                                <span className='w-[90%] text-ellipsis truncate'>Log out @${user?.username}</span>
                                            </Button>
                                        )}
                                    </Menu.Item>
                                    <i
                                        className='absolute -bottom-[10px] left-2 translate-x-1/2 rotate-180
                                                [filter:drop-shadow(#cfd9de_1px_-1px_1px)] 
                                                dark:[filter:drop-shadow(#333639_1px_-1px_1px)]
                                                xl:left-1/2 xl:-translate-x-1/2'
                                    >
                                        <CustomIcon
                                            className='h-4 w-6 fill-main-background'
                                            iconName='TriangleIcon'
                                        />
                                    </i>
                                </Menu.Items>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Menu>
        </>
    );
}