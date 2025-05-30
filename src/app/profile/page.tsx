
'use client'; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Briefcase, CalendarDays, Edit3, BookOpen, Users, Linkedin, MapPin } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface UserProfile {
  name: string;
  email: string;
  graduationYear: number;
  department: 'CSE' | 'LT' | 'IT'; // Department type
  currentCompany: string;
  currentRole: string;
  location: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  linkedin?: string;
}

const initialUserProfile: UserProfile = {
  name: 'Alumni User',
  email: 'alumni.user@example.com',
  graduationYear: 2015,
  department: 'CSE', // Defaulted to CSE
  currentCompany: 'Tech Solutions Inc.',
  currentRole: 'Senior Software Engineer',
  location: 'Kolkata, India',
  avatarUrl: 'https://picsum.photos/id/433/200/200',
  bio: 'Passionate software engineer with a focus on web development and cloud technologies. Always eager to learn and connect with fellow GCELT alumni.',
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Next.js'],
  linkedin: 'https://linkedin.com/in/alumniuser',
};


export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Ensure formData also respects the UserProfile department type
  const [formData, setFormData] = useState<Omit<UserProfile, 'skills'> & { skills: string }>({
    ...initialUserProfile,
    skills: initialUserProfile.skills.join(', '),
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      // In a real app, fetch user data here
      setUser(initialUserProfile);
      setFormData({
        ...initialUserProfile,
        skills: initialUserProfile.skills.join(', '),
      });
      setIsLoadingUser(false);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'graduationYear' ? (value === '' ? '' : Number(value)) : value }));
  };
  
  const handleDepartmentChange = (value: 'CSE' | 'LT' | 'IT') => {
    setFormData(prev => ({ ...prev, department: value }));
  };


  const handleSaveChanges = () => {
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
    const updatedUser = { ...formData, skills: skillsArray, graduationYear: Number(formData.graduationYear) };
    setUser(updatedUser);
    setIsEditDialogOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const openEditDialog = () => {
    setFormData({
        ...user,
        skills: user.skills.join(', '),
    });
    setIsEditDialogOpen(true);
  }


  if (isLoadingUser) {
    return <ProfilePageSkeleton />;
  }


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={openEditDialog}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="avatarUrl" className="text-right">Avatar URL</Label>
                        <Input id="avatarUrl" name="avatarUrl" value={formData.avatarUrl} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="graduationYear" className="text-right">Grad. Year</Label>
                        <Input id="graduationYear" name="graduationYear" type="number" value={formData.graduationYear} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="department" className="text-right">Department</Label>
                         <Select value={formData.department} onValueChange={handleDepartmentChange}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CSE">CSE</SelectItem>
                                <SelectItem value="IT">IT</SelectItem>
                                <SelectItem value="LT">LT</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="currentCompany" className="text-right">Company</Label>
                        <Input id="currentCompany" name="currentCompany" value={formData.currentCompany} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="currentRole" className="text-right">Role</Label>
                        <Input id="currentRole" name="currentRole" value={formData.currentRole} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">Location</Label>
                        <Input id="location" name="location" value={formData.location} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="bio" className="text-right pt-2">Bio</Label>
                        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} className="col-span-3" rows={3} />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="skills" className="text-right pt-2">Skills</Label>
                        <Textarea id="skills" name="skills" value={formData.skills} onChange={handleInputChange} className="col-span-3" placeholder="Comma-separated skills" rows={2}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="linkedin" className="text-right">LinkedIn</Label>
                        <Input id="linkedin" name="linkedin" value={formData.linkedin || ''} onChange={handleInputChange} className="col-span-3" placeholder="https://linkedin.com/in/yourprofile"/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSaveChanges}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
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
             <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start"><MapPin className="mr-1 h-4 w-4" />{user.location}</p>
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

