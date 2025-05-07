
'use client';

import Link from 'next/link';
import { MainNav } from '@/components/layout/main-nav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, UserCircle, LogOut, UserPlus } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/layout/theme-toggle';

export default function SiteHeader() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const updateAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      if (authStatus !== isAuthenticated) {
        setIsAuthenticated(authStatus);
      }
    };

    updateAuthStatus();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isAuthenticated') {
        updateAuthStatus();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    const handleCustomAuthChange = () => {
      updateAuthStatus();
    };
    window.addEventListener('authChange', handleCustomAuthChange);


    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleCustomAuthChange);
    };
  }, [pathname, isAuthenticated]); 

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    window.dispatchEvent(new CustomEvent('authChange')); 
    router.push('/login');
  };
  
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="ml-4 mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl sm:inline-block">
            Alumnilink
          </span>
        </Link>
        {isAuthenticated && !isAuthPage && <MainNav />}
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <ThemeToggle />
          <nav className="flex items-center space-x-1 md:space-x-2">
            {isAuthenticated && !isAuthPage ? (
              <>
                <Link href="/profile">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="https://picsum.photos/id/237/200/200" alt="User Avatar" data-ai-hint="user avatar" />
                    <AvatarFallback>
                      <UserCircle className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="ghost" size="sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
