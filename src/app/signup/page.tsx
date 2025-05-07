
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Mail, Key, User as UserIcon, CalendarClock,Hash } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      router.push('/profile');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match!",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    console.log('Signup attempt (Send for Verification):', { fullName, email, password, batchYear, rollNumber });
    
    // Simulate API call for verification
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    // Simulate successful verification request
    setIsLoading(false);
    toast({
      title: "Registration Submitted",
      description: "Your registration has been sent for verification. You will be notified once it's approved.",
    });
    // For now, we will not automatically log in or redirect. User waits for approval.
    // Optionally, redirect to a "pending verification" page or back to login.
    // router.push('/login'); 
    
    // Clear form fields after submission might be a good UX
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setBatchYear('');
    setRollNumber('');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Join the GCELT Alumni Network. Your registration will be sent for verification.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center">
                <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Full Name
              </Label>
              <Input 
                id="fullName" 
                type="text" 
                placeholder="John Doe" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchYear" className="flex items-center">
                <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                Batch Year
              </Label>
              <Input 
                id="batchYear" 
                type="number" 
                placeholder="e.g. 2015" 
                required 
                value={batchYear}
                onChange={(e) => setBatchYear(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="flex items-center">
                <Hash className="mr-2 h-4 w-4 text-muted-foreground" />
                Roll Number
              </Label>
              <Input 
                id="rollNumber" 
                type="text" 
                placeholder="Your college roll number" 
                required 
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center">
                <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center">
                <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                Confirm Password
              </Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password"
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending for Verification...' : 'Send for Verification'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

