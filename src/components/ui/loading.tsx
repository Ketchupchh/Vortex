import cn from 'clsx'
import { CustomIcon } from "./custom-icon";

type LoadingProps = {
    className?: string;
    iconClassName?: string;
}

export function Loading({
    className,
    iconClassName
} : LoadingProps) : JSX.Element
{
    return (
        <i className={cn('flex justify-center', className ?? 'p-4')}>
            <CustomIcon className={cn('animate-spin', iconClassName ?? 'w-7 h-7')} iconName="LoadingIcon" />
        </i>
    );
}