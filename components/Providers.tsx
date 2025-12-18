'use client';

import { SessionProvider } from 'next-auth/react';
import { ParallaxProvider } from 'react-scroll-parallax';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <ParallaxProvider>{children}</ParallaxProvider>
        </SessionProvider>
    );
}
