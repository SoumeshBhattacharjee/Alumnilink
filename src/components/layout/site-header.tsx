
'use client';

import Link from 'next/link';
import { MainNav } from '@/components/layout/main-nav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, UserCircle, LogOut, UserPlus } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SiteHeader() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Function to update authentication status
    const updateAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      if (authStatus !== isAuthenticated) {
        setIsAuthenticated(authStatus);
      }
    };

    // Call on mount and when pathname changes (e.g., after navigation)
    updateAuthStatus();

    // Listen for storage events to sync across tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isAuthenticated') {
        updateAuthStatus();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom 'authChange' events if dispatched by login/logout logic elsewhere
    const handleCustomAuthChange = () => {
      updateAuthStatus();
    };
    window.addEventListener('authChange', handleCustomAuthChange);


    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleCustomAuthChange);
    };
  }, [pathname, isAuthenticated]); // Re-run effect if pathname or isAuthenticated changes

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    // Dispatch a custom event so other components (like this header) can react immediately
    window.dispatchEvent(new CustomEvent('authChange')); 
    router.push('/login');
    // router.refresh(); // Not always necessary if state updates trigger re-render
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl sm:inline-block">
            Alumnilink
          </span>
        </Link>
        {isAuthenticated && <MainNav />}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {isAuthenticated ? (
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
                  <Button variant="ghost">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button>
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

