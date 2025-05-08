
'use client';

import Link from 'next/link';
import { MainNav } from '@/components/layout/main-nav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, UserCircle, LogOut, UserPlus, Shield, Settings, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SiteHeader() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false); 
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initialAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(initialAuthStatus);
    setHasCheckedAuth(true); 

    const handleAuthUpdate = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };

    window.addEventListener('storage', handleAuthUpdate);
    window.addEventListener('authChange', handleAuthUpdate);

    return () => {
      window.removeEventListener('storage', handleAuthUpdate);
      window.removeEventListener('authChange', handleAuthUpdate);
    };
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.dispatchEvent(new CustomEvent('authChange')); 
    router.push('/login');
  };
  
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin');


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="ml-4 mr-6 flex items-center space-x-2">
          {/* Logo/Brand Name */}
          <span className="font-bold text-xl sm:inline-block">
            Alumnilink
          </span>
          {/* College Identifier */}
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline-block border-l border-border/60 pl-2 ml-1 py-1">
            GCELT
          </span>
        </Link>
        {hasCheckedAuth && isAuthenticated && !isAuthPage && !isAdminRoute && <MainNav />}
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <ThemeToggle />
          {hasCheckedAuth && ( 
            <nav className="flex items-center space-x-1 md:space-x-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage src="https://picsum.photos/id/433/200/200" alt="User Avatar" data-ai-hint="user avatar" />
                      <AvatarFallback>
                        <UserCircle className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    {/* Optionally, add other items like Settings here */}
                    {/* <DropdownMenuItem asChild>
                       <Link href="/settings" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
          )}
        </div>
      </div>
    </header>
  );
}
