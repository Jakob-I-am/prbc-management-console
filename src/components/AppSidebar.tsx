'use client';

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Button } from '@/components/ui/button';

// Menu items.
const items = [
  {
    title: 'Inbox',
    url: '/dashboard',
    icon: Inbox,
  },
  {
    title: 'Nominations',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const user = useCurrentUser();
  const path = usePathname();

  if (!user) return null;

  const onClick = () => {
    signOut();
  };

  return (
    <Sidebar className='space-y-3 hidden md:block'>
      <SidebarHeader>
        <h2 className='text-center md:text-xl font-semibold'>
          Management Dashboard
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`${path == item.url ? 'font-semibold' : ''}`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Avatar>
          <AvatarFallback className='bg-primary text-secondary'>
            {user.name.split(' ').map((word, idx) => (
              <span key={idx}>{word.at(0)}</span>
            ))}
          </AvatarFallback>
        </Avatar>
        <Button onClick={onClick}>Sign Out</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
