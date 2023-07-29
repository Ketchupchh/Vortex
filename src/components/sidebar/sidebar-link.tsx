'use client'

import cn from 'clsx'
import Link from "next/link";
import { NavLink } from "./sidebar";
import { usePathname } from "next/navigation";
import { preventBubbling } from '../lib/utils';
import { CustomIcon } from '../ui/custom-icon';

type SidebarLinkProps = NavLink & {
    username?: string;
}

export function SidebarLink({
    href,
    linkName,
    iconName,
    disabled,
    canBeHidden,
    username
} : SidebarLinkProps) : JSX.Element
{
    const path = usePathname();
    const isActive = username ? path.includes(username) :  path === href;

    return (
        <Link
            className={cn(
                'group py-1 outline-none',
                canBeHidden ? 'hidden xs:flex' : 'flex',
                disabled && 'cursor-not-allowed'
            )}
            href={href}
            onClick={disabled ? preventBubbling() : undefined}
        >
            <div
                className={cn(
                    `hover-animation flex items-center justify-center gap-4 self-start p-2 text-xl rounded-full
                    group-hover:bg-neutral-500/20 group-focus-visible:ring-2 group-focus-visible:ring-[#878a8c]
                    xs:p-3 xl:pr-5`,
                    isActive && 'font-bold'
                )}
            >
                <CustomIcon
                    className={cn(
                        'w-7 h-7',
                        isActive && 
                            ['Explore', 'Lists'].includes(linkName) &&
                            'stroke-white'
                    )}
                    iconName={iconName}
                    solid={isActive}
                />
                <p className='hidden xl:block'>{linkName}</p>
            </div>
        </Link>
    );
}