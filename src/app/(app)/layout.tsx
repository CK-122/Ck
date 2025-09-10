
'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/ui/sidebar';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { openMobile, setOpenMobile } = useSidebar();
  
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className={cn(
      "min-h-screen w-full bg-background text-foreground",
      "grid md:grid-cols-[auto,1fr]"
    )}>
      <Sidebar className="hidden md:flex md:flex-col md:border-r">
          <SidebarNav />
      </Sidebar>
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-auto p-4 sm:px-6 md:p-8">
            {children}
        </main>
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetContent side="left" className="p-0 w-72">
              <SheetHeader className="p-4 border-b">
                  <SheetTitle>C.K. HIGH SCHOOL Menu</SheetTitle>
              </SheetHeader>
              <SidebarNav />
            </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
