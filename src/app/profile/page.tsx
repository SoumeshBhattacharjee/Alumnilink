import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Briefcase, CalendarDays, Edit3 } from 'lucide-react';

// This is a placeholder page. In a real app, user data would come from an auth provider/backend.
export default function ProfilePage() {
  const user = {
    name: 'Alumni User',
    email: 'alumni.user@example.com',
    graduationYear: 2015,
    currentCompany: 'Tech Solutions Inc.',
    avatarUrl: 'https://picsum.photos/id/433/200/200',
    bio: 'Passionate software engineer with a focus on web development and cloud technologies. Always eager to learn and connect with fellow GCELT alumni.',
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <Button variant="outline">
          <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="professional portrait"/>
            <AvatarFallback className="text-3xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription className="mt-1">{user.bio}</CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField icon={<Mail className="h-5 w-5 text-primary" />} label="Email" value={user.email} />
            <InfoField icon={<CalendarDays className="h-5 w-5 text-primary" />} label="Graduation Year" value={user.graduationYear.toString()} />
            <InfoField icon={<Briefcase className="h-5 w-5 text-primary" />} label="Current Company" value={user.currentCompany} />
          </div>
          
          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Change Password</Label>
                <Input id="currentPassword" type="password" placeholder="Current Password" />
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
      <span className="mt-1">{icon}</span>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </div>
  );
}
