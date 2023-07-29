import cn from 'clsx'
import type { ReactNode } from 'react'

type MainContainerProps = {
    className?: string;
    children: ReactNode;
}

export function MainContainer({
    className,
    children
} : MainContainerProps) : JSX.Element
{
    return (
        <main
            className={cn(
                `hover-animation flex min-h-screen w-full flex-col border-x-0
                 border-light-border pb-96 dark:border-dark-border xs:border-x`,
                className ?? 'max-w-xl'
            )}
        >
            {children}
        </main>
    );
}