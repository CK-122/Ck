
'use client';
import React from 'react';
import { UserNav } from '@/components/layout/user-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const HeaderComponent = () => {
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      {isMobile && (
        <SidebarTrigger />
      )}
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Potentially add breadcrumbs or search here */}
      </div>
      <UserNav />
    </header>
  );
}

export const Header = React.memo(HeaderComponent);
