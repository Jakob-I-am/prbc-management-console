import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';

import { auth } from '@/auth';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <main
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary w-full md:flex md:items-center md:justify-center`}
        >
          <div className='md:hidden h-10 shadow-sm mb-2 flex items-center pl-2'>
            <SidebarTrigger className='md:hidden' />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
