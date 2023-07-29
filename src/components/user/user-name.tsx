import Link from "next/link";
import cn from 'clsx'
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { NextImage } from "../ui/next-image";
import type { UserAffliate } from "../lib/types/affliate";

type UserNameProps = {
    tag?: keyof JSX.IntrinsicElements;
    name: string;
    verified: boolean;
    username?: string;
    className?: string;
    iconClassName?: string;
    isBusinessAccount?: boolean;
    affliates: UserAffliate;
};

export function UserName({
    tag,
    name,
    verified,
    username,
    className,
    iconClassName,
    isBusinessAccount,
    affliates
} : UserNameProps) : JSX.Element
{
    const CustomTag = tag ? tag : 'p';

    return (
        <Link
            href={`/user/${username}`}
            className={cn(
                'flex items-center gap-1 truncate font-bold',
                username ? 'custom-underline' : 'pointer-events-none',
                className
            )}
            tabIndex={username ? 0 : -1}
        >
            <CustomTag className="truncate">{name}</CustomTag>
            {verified && (
                <i>
                    <CheckBadgeIcon className={cn('fill-[#1D9BF0]', iconClassName ?? 'w-5 h-5')} />
                </i>
            )}
            {isBusinessAccount && (
                <i>
                    <CheckBadgeIcon className={cn('fill-[#f0591d]', iconClassName ?? 'w-5 h-5')} />
                </i>
            )}
            {affliates !== undefined && (
                <>
                    {affliates.map((affliate) => (
                        <i
                            className="group relative w-6 h-6 border-2 border-neutral-500/20 rounded-sm"
                            key={affliate.logo}
                        >
                            <NextImage
                                imgClassName="rounded-sm"
                                src={affliate.logo}
                                alt={affliate.name}
                                layout="fill"
                                useSkeleton
                            />
                        </i>
                    ))}
                </>
            )}
        </Link>
    );
}