'use client'; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Briefcase, CalendarDays, Edit3, BookOpen, Users, Linkedin } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';


export default function ProfilePage() {
  const router = useRouter();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  
  // This is a placeholder user. In a real app, user data would come from an auth provider/backend.
  const user = {
    name: 'Alumni User',
    email: 'alumni.user@example.com',
    graduationYear: 2015,
    department: 'Computer Science & Engineering',
    currentCompany: 'Tech Solutions Inc.',
    currentRole: 'Senior Software Engineer',
    location: 'Kolkata, India',
    avatarUrl: 'https://picsum.photos/id/433/200/200',
    bio: 'Passionate software engineer with a focus on web development and cloud technologies. Always eager to learn and connect with fellow GCELT alumni.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Next.js'],
    linkedin: 'https://linkedin.com/in/alumniuser',
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      setIsLoadingUser(false);
    }
  }, [router]);

  if (isLoadingUser) {
    return <ProfilePageSkeleton />;
  }


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <Button variant="outline">
          <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6">
          <Avatar className="h-28 w-28 border-2 border-primary">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="professional portrait"/>
            <AvatarFallback className="text-4xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle className="text-3xl">{user.name}</CardTitle>
            <p className="text-lg text-muted-foreground mt-1">{user.currentRole} at {user.currentCompany}</p>
            <p className="text-sm text-muted-foreground">{user.location}</p>
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-primary hover:underline mt-2">
                <Linkedin className="mr-1 h-4 w-4" /> LinkedIn Profile
              </a>
            )}
          </div>
        </CardHeader>
        
        <Separator />

        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center"><User className="mr-2 h-5 w-5 text-primary" />About</h3>
            <p className="text-muted-foreground whitespace-pre-line">{user.bio}</p>
          </div>

          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InfoField icon={<Mail className="h-5 w-5 text-primary" />} label="Email" value={user.email} />
            <InfoField icon={<CalendarDays className="h-5 w-5 text-primary" />} label="Graduation Year" value={user.graduationYear.toString()} />
            <InfoField icon={<BookOpen className="h-5 w-5 text-primary" />} label="Department" value={user.department} />
            <InfoField icon={<Briefcase className="h-5 w-5 text-primary" />} label="Current Company" value={user.currentCompany} />
          </div>

          {user.skills && user.skills.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center"><Users className="mr-2 h-5 w-5 text-primary" />Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
          
          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-3">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Change Password</Label>
                <Input id="currentPassword" type="password" placeholder="Current Password" className="mt-1" />
                <Input className="mt-2" type="password" placeholder="New Password" />
                <Input className="mt-2" type="password" placeholder="Confirm New Password" />
                <Button className="mt-3" variant="secondary">Update Password</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoField({ icon, label, value }: InfoFieldProps) {
  return (
    <div className="flex items-start space-x-3">
      <span className="mt-1 text-primary">{icon}</span>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </div>
  );
}

function ProfilePageSkeleton() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6">
          <Skeleton className="h-28 w-28 rounded-full" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40 mt-2" />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-6 space-y-6">
          <div>
            <Skeleton className="h-6 w-32 mb-3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <Skeleton className="h-6 w-6 rounded-full mt-1" />
                <div className="w-full space-y-1.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>
            ))}
          </div>
          <>
            <Separator />
            <div>
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-7 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </>
          <Separator />
          <div>
            <Skeleton className="h-6 w-48 mb-3" />
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full mt-2" />
                <Skeleton className="h-10 w-full mt-2" />
                <Skeleton className="h-10 w-36 mt-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
