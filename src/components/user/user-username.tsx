import Link from "next/link";
import cn from 'clsx'

type UserUsernameProps = {
    username: string;
    className?: string;
    disableLink?: boolean;
}

export function UserUsername({
    username,
    className,
    disableLink
} : UserUsernameProps) : JSX.Element
{
    return (
        <Link
            className={cn(
                'truncate text-dark-secondary',
                className,
                disableLink && 'pointer-events-none'
            )}
            href={`/user/${username}`}
            tabIndex={-1}
        >
            @{username}
        </Link>
    );
}