import type { Metadata, Viewport } from 'next';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
    title: 'Open House Rumah Jaki Wrapped',
    description: 'Discover your personality di Open House Rumah Jaki! Quiz seru dengan hasil SIPALING yang lucu dan shareable.',
    keywords: ['wrapped', 'rumah jaki', 'quiz', 'personality', 'open house'],
    authors: [{ name: 'Rumah Jaki' }],
    openGraph: {
        title: 'Open House Rumah Jaki Wrapped',
        description: 'Discover your personality di Open House Rumah Jaki!',
        type: 'website',
        locale: 'id_ID',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Open House Rumah Jaki Wrapped',
        description: 'Discover your personality di Open House Rumah Jaki!',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#030308',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" className="scroll-smooth">
            <head>
                <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏠</text></svg>" />
            </head>
            <body className="bg-dark-950 text-white antialiased selection:bg-primary-500/30 selection:text-white">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
