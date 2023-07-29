import { Toaster } from 'react-hot-toast';
import type { DefaultToastOptions } from 'react-hot-toast';
import type { ReactNode } from 'react';
import { WindowContextProvider } from '../lib/context/window-context';
import { Sidebar } from '../sidebar/sidebar';

type MainLayoutProps = {
    children: ReactNode;
}

const toastOptions: DefaultToastOptions = {
    style: {
      color: 'white',
      borderRadius: '4px',
      backgroundColor: 'rgb(var(--main-accent))'
    },
    success: { duration: 4000 }
};

export function MainLayout({
    children
} : MainLayoutProps) : JSX.Element
{
    return (
        <div className='flex w-full justify-center gap-0 lg:gap-4'>
            <WindowContextProvider>
                <Sidebar />
                {children}
            </WindowContextProvider>
            <Toaster
                position='bottom-center'
                toastOptions={toastOptions}
                containerClassName='mb-12 xs:mb-0'
            />
        </div>  
    );
}