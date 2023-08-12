import Link from 'next/link';
import { Metadata } from 'next';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Accueil</h1>
      <div>
        <div>
          <Link href='/generate'>Générer</Link>
        </div>
        <div>
          <Link href='/training'>S’entraîner</Link>
        </div>
        <div>
          <Link href='/stats'>Suivi et statistiques</Link>
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Workout AI v2 💪',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  twitter: {
    card: 'summary_large_image',
    creator: '@imamdev_',
    images: 'https://example.com/og.png',
  },
  applicationName: process.env.NEXT_PUBLIC_APP_NAME,
  appleWebApp: {
    capable: true,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  manifest: '/manifest.json',
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/apple-touch-icon.png' },
    { rel: 'shortcut icon', url: '/favicon.ico' },
  ],
  keywords: ['nextjs', 'pwa', 'next-pwa'],
};
