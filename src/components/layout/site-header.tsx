import Link from 'next/link';
import { MainNav } from '@/components/layout/main-nav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, UserCircle } from 'lucide-react';

export default function SiteHeader() {
  // Placeholder for authentication status
  const isAuthenticated = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl sm:inline-block">
            gcelt alumnilink
          </span>
        </Link>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {isAuthenticated ? (
              <Link href="/profile">
                <Avatar>
                  <AvatarImage src="https://picsum.photos/id/237/200/200" alt="User Avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>
                    <UserCircle className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link href="/login" passHref>
                <Button variant="ghost">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
             {!isAuthenticated && (
               <Link href="/signup" passHref>
                <Button>Sign Up</Button>
              </Link>
             )}
          </nav>
        </div>
      </div>
    </header>
  );
}
