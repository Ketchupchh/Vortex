import cn from 'clsx'
import { Button } from '../ui/button';
import { CustomIcon, IconName } from '../ui/custom-icon';
import type { ReactNode } from 'react';
import { ToolTip } from '../ui/tooltip';

type MainHeaderProps = {
    tip?: string;
    title?: string;
    className?: string;
    children?: ReactNode;
    iconName?: IconName;
    disableSticky?: boolean;
    useActionButton?: boolean;
    action?: () => void;
}

export function MainHeader({
    tip,
    title,
    className,
    children,
    iconName,
    disableSticky,
    useActionButton,
    action
} : MainHeaderProps) : JSX.Element
{
    return (
        <header
            className={cn(
                'hover-animation sticky top-0 even z-10 bg-main-background/60 py-2 px-4 backdrop-blur-md',
                !disableSticky && 'sticky top-0',
                className ?? 'flex items-center gap-6'
            )}
        >
            {useActionButton && (
                <Button
                    className='dark-bg-tab group relative p-2 hover:bg-light-primary/10 active:bg-light-primary/20 
                    dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
                    onClick={action}
                >
                    <CustomIcon iconName={iconName ?? 'LeftArrowIcon'} />
                    <ToolTip tip={tip ?? 'Back'} />
                </Button>
            )}
            {title && (
                <div className='flex gap-8'>
                    <h2 key={title} className='text-xl font-bold'>
                        {title}
                    </h2>
                </div>
            )}
            {children}
        </header>
    );
}