import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowYourRights Cards',
  description: 'Your pocket guide to legal rights during police encounters.',
  keywords: ['legal rights', 'police encounters', 'civil rights', 'Base', 'miniapp'],
  authors: [{ name: 'KnowYourRights Cards' }],
  openGraph: {
    title: 'KnowYourRights Cards',
    description: 'Your pocket guide to legal rights during police encounters.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KnowYourRights Cards',
    description: 'Your pocket guide to legal rights during police encounters.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
