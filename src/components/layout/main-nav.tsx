'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Newspaper, ClipboardList, Users, MessageSquare } from 'lucide-react'; 

const navItems = [
  { href: '/feed', label: 'Feed', icon: Newspaper },
  { href: '/notice-board', label: 'Notice Board', icon: ClipboardList },
  { href: '/connect-search', label: 'Connect & Search', icon: Users },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === item.href ? 'text-primary' : 'text-foreground/60'
          )}
        >
          <item.icon className="mr-2 inline-block h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
