
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; // Changed from Geist_Sans, Geist_Mono
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import { cn } from '@/lib/utils';

const inter = Inter({ // Changed from GeistSans
  variable: '--font-inter', // Changed from --font-geist-sans
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({ // Changed from GeistMono
  variable: '--font-roboto-mono', // Changed from --font-geist-mono
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GCELT Alumnilink',
  description: 'College Alumni Portal for GCELT.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning // Added suppressHydrationWarning to body as well, as the error hints at potential body attribute mismatches
        className={cn(
          inter.variable, // Changed from geistSans.variable
          robotoMono.variable, // Changed from geistMono.variable
          'antialiased min-h-screen flex flex-col font-sans'
        )}
      >
        <SiteHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
