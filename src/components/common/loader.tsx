'use client'

import NextTopLoader from 'nextjs-toploader';

export function Loader() : JSX.Element
{
    return (
        <NextTopLoader
            color='#F01D1D'
            showSpinner={false}
        />
    );
}