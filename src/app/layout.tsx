
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Toaster } from '@/components/ui/toaster';


const metadata: Metadata = {
  title: 'C.K. HIGH SCHOOL',
  description: 'A modern academic management system for C.K. HIGH SCHOOL.',
};

function RootLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The redirection logic is now handled by the page components,
  // so we can just render the children here.
  return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <title>{String(metadata.title)}</title>
        <meta name="description" content={metadata.description ?? undefined} />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased")}>
        <AuthProvider>
          <RootLayoutContent>
            {children}
          </RootLayoutContent>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
