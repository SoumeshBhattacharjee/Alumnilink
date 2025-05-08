
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Mail, Key } from 'lucide-react'; // Using ShieldCheck for admin login
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in as admin (or generally authenticated)
  useEffect(() => {
    // This check assumes 'isAuthenticated' is also used for admin.
    // In a real app, admin status would be more robustly checked.
    if (localStorage.getItem('isAuthenticated') === 'true') {
      router.push('/admin'); 
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder for admin login logic
    console.log('Admin Login attempt:', { email, password });
    // Simulate API call for admin authentication
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    // Simulate successful admin login
    // For now, we use the same 'isAuthenticated' key for simplicity.
    // A real app would handle roles and permissions server-side.
    localStorage.setItem('isAuthenticated', 'true'); 
    // Dispatch a custom event so other components (like header or admin page) can react if needed
    window.dispatchEvent(new CustomEvent('authChange'));
    setIsLoading(false);
    router.push('/admin'); // Redirect to admin dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mx-auto mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your admin credentials to access the GCELT Alumnilink Admin Panel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center">
                  <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                  Password
                </Label>
                {/* Optionally add a "Forgot password?" link specific to admin */}
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="Your admin password"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login to Admin Panel'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Not an admin?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Member Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
