import cn from 'clsx'
import Link from "next/link";
import { NextImage } from '../ui/next-image';

type UserAvatarProps = {
    src: string;
    alt: string;
    username?: string;
    className?: string;
    imgWrapClassName?: string;
    isBusinessAccount?: boolean;
}

export function UserAvatar({
    src,
    alt,
    username,
    className,
    imgWrapClassName,
    isBusinessAccount
} : UserAvatarProps) : JSX.Element
{
    return (
        <Link
            className={cn(
                'blur-picture relative flex self-start',
                !username && 'pointer-events-none',
                className
            )}
            href={ username ? `/user/${username}` : '#'}
            tabIndex={username ? 0 : -1}
        >
            <div
                className={cn(
                    'relative overflow-hidden',
                    imgWrapClassName ?? 'w-14 h-14',
                    isBusinessAccount ? 'rounded-lg' : 'rounded-full'
                )}
            >
                <NextImage
                    key={src}
                    useSkeleton
                    blurClassName='rounded-full animate-pulse bg-light-secondary dark:bg-dark-secondary'
                    src={src}
                    alt={alt}
                    layout='fill'
                />
            </div>
        </Link>
    );
}