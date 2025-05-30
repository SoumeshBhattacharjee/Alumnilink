'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Newspaper, ClipboardList, Users, MessageSquare, Briefcase } from 'lucide-react'; 

const navItems = [
  { href: '/feed', label: 'Feed', icon: Newspaper },
  { href: '/notice-board', label: 'Notice Board', icon: ClipboardList },
  { href: '/connect-search', label: 'Connect & Search', icon: Users },
  { href: '/job-board', label: 'Job Board', icon: Briefcase },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-primary flex items-center', // Added flex and items-center
            pathname === item.href ? 'text-primary' : 'text-foreground/60'
          )}
        >
          <item.icon className="mr-1.5 h-4 w-4" /> {/* Adjusted margin */}
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
