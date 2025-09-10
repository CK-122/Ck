
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Home, Users, BookOpenCheck, FileText, Download, Settings, UserCheck as UserCheckIcon, Library, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/use-auth';
import { SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarFooter } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '../ui/button';

export function SidebarNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { setOpenMobile, isMobile } = useSidebar();

  const getNavLinks = () => {
    const baseLinks = [
      { href: '/dashboard', icon: Home, label: 'Dashboard' },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseLinks,
        { href: '/notices', icon: Bell, label: 'Notices' },
        { href: '/students', icon: Users, label: 'Students' },
        { href: '/user-management', icon: Users, label: 'User Management' },
        { href: '/assign-class', icon: UserCheckIcon, label: 'Assign Classes' },
        { href: '/marks', icon: BookOpenCheck, label: 'Marks Entry' },
        { href: '/documents', icon: FileText, label: 'Documents' },
        { href: '/export', icon: Download, label: 'Export Data' },
      ];
    }

    if (user?.role === 'teacher') {
      return [
        { href: '/dashboard', icon: Home, label: 'Dashboard' },
        { href: '/notices', icon: Bell, label: 'Notices' },
        { href: '/add-student', icon: UserPlus, label: 'Add Student' },
        { href: '/marks', icon: BookOpenCheck, label: 'Marks Entry' },
        { href: '/students', icon: Users, label: 'View Students List' },
      ];
    }
    
    // Student links or default
    return [
        ...baseLinks,
        { href: '/notices', icon: Bell, label: 'Notices' },
    ];
  };
  
  const navLinks = getNavLinks();
  
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
     <>
        <SidebarHeader>
            <Link
            href='/dashboard'
            onClick={handleLinkClick}
            className="flex items-center gap-2 font-semibold"
            >
            <Image src="/logo.png" alt="C.K. HIGH SCHOOL Logo" width={32} height={32} className="h-8 w-8 rounded-full border border-primary-foreground" />
            <span className="text-lg group-data-[state=collapsed]:hidden">C.K. HIGH SCHOOL</span>
            </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navLinks.map(({ href, icon: Icon, label }) => (
              <SidebarMenuItem key={href}>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={pathname.startsWith(href) ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href={href} onClick={handleLinkClick}>
                          <Icon className="h-5 w-5" />
                          <span className="group-data-[state=collapsed]:hidden ml-2">{label}</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-4">
                      {label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                   <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#">
                        <Settings className="h-5 w-5" />
                        <span className="group-data-[state=collapsed]:hidden ml-2">Settings</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
           </TooltipProvider>
        </SidebarFooter>
      </>
  )
}
