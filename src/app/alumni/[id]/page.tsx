'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Briefcase, CalendarDays, BookOpen, Users, Linkedin, UserPlus, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link'; // Added Link import

// Mock alumni data - in a real app, this would be fetched
const mockAlumniData: { [key: string]: AlumniProfile } = {
  '1': { id: '1', name: 'Jane Doe', email: 'jane.doe@example.com', graduationYear: 2016, department: 'Electronics & Comm. Engg.', currentCompany: 'Innovate Corp', currentRole: 'Project Manager', location: 'Bengaluru, India', avatarUrl: 'https://picsum.photos/seed/jane/200/200', bio: 'Experienced Project Manager in the tech industry. Passionate about bringing innovative products to market. GCELT Batch of 2016.', skills: ['Project Management', 'Agile', 'Scrum', 'Product Development'], linkedin: 'https://linkedin.com/in/janedoe' },
  '2': { id: '2', name: 'John Smith', email: 'john.smith@example.com', graduationYear: 2014, department: 'Mechanical Engineering', currentCompany: 'Tech Solutions LLC', currentRole: 'Lead Mechanical Engineer', location: 'Mumbai, India', avatarUrl: 'https://picsum.photos/seed/john/200/200', bio: 'Dedicated mechanical engineer with expertise in CAD and product design. Always looking for new challenges. GCELT Class of 2014.', skills: ['CAD', 'SolidWorks', 'Product Design', 'Finite Element Analysis'], linkedin: 'https://linkedin.com/in/johnsmith' },
  '3': { id: '3', name: 'Alice Brown', email: 'alice.brown@example.com', graduationYear: 2018, department: 'Civil Engineering', currentCompany: 'Creative Minds Agency', currentRole: 'Structural Engineer', location: 'Delhi, India', avatarUrl: 'https://picsum.photos/seed/alice/200/200', bio: 'Structural engineer focused on sustainable building practices. Proud GCELT alumna, Batch 2018.', skills: ['Structural Analysis', 'AutoCAD', 'Sustainable Design', 'STAAD Pro'], linkedin: 'https://linkedin.com/in/alicebrown' },
  '4': { id: '4', name: 'Bob Green', email: 'bob.green@example.com', graduationYear: 2015, department: 'Electrical Engineering', currentCompany: 'Future Builders Co.', currentRole: 'Senior Electrical Designer', location: 'Chennai, India', avatarUrl: 'https://picsum.photos/seed/bob/200/200', bio: 'Specializing in power systems and renewable energy. GCELT 2015 graduate.', skills: ['Power Systems', 'Renewable Energy', 'Circuit Design', 'MATLAB'], linkedin: 'https://linkedin.com/in/bobgreen' },
  '5': { id: '5', name: 'Carol White', email: 'carol.white@example.com', graduationYear: 2017, department: 'Information Technology', currentCompany: 'HealthFirst Ltd.', currentRole: 'IT Manager', location: 'Hyderabad, India', avatarUrl: 'https://picsum.photos/seed/carol/200/200', bio: 'IT Manager with a knack for solving complex problems. GCELT IT, Batch of 2017.', skills: ['Network Admin', 'Cybersecurity', 'Cloud Computing', 'IT Support'], linkedin: 'https://linkedin.com/in/carolwhite' },
  '6': { id: '6', name: 'David Black', email: 'david.black@example.com', graduationYear: 2013, department: 'Leather Technology', currentCompany: 'Global Web Services', currentRole: 'Lead Technologist', location: 'Pune, India', avatarUrl: 'https://picsum.photos/seed/david/200/200', bio: 'Expert in leather processing and sustainable practices in the leather industry. GCELT 2013.', skills: ['Leather Finishing', 'Tannery Operations', 'Quality Control', 'Sustainable Leather'], linkedin: 'https://linkedin.com/in/davidblack' },
};

interface AlumniProfile {
  id: string;
  name: string;
  email: string;
  graduationYear: number;
  department: string;
  currentCompany: string;
  currentRole: string;
  location: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  linkedin?: string;
}

export default function AlumniProfilePage() {
  const params = useParams();
  const alumniId = params.id as string;
  const [alumnus, setAlumnus] = useState<AlumniProfile | null | undefined>(undefined); // undefined for loading, null for not found

  useEffect(() => {
    if (alumniId) {
      // Simulate API call
      setTimeout(() => {
        const data = mockAlumniData[alumniId];
        setAlumnus(data || null);
      }, 500);
    }
  }, [alumniId]);

  if (alumnus === undefined) {
    return <ProfileSkeleton />;
  }

  if (alumnus === null) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-20rem)]">
        <h1 className="text-2xl font-semibold">Alumni Not Found</h1>
        <p className="text-muted-foreground">The profile you are looking for does not exist.</p>
        <Link href="/connect-search" className="mt-4">
          <Button variant="outline">Back to Search</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6">
          <Avatar className="h-28 w-28 border-2 border-primary">
            <AvatarImage src={alumnus.avatarUrl} alt={alumnus.name} data-ai-hint="professional portrait"/>
            <AvatarFallback className="text-4xl">
              {alumnus.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle className="text-3xl">{alumnus.name}</CardTitle>
            <p className="text-lg text-muted-foreground mt-1">{alumnus.currentRole} at {alumnus.currentCompany}</p>
            <p className="text-sm text-muted-foreground">{alumnus.location}</p>
            {alumnus.linkedin && (
              <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-primary hover:underline mt-2">
                <Linkedin className="mr-1 h-4 w-4" /> LinkedIn Profile
              </a>
            )}
             <div className="mt-4 flex space-x-2 justify-center sm:justify-start">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Connect
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <Separator />

        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center"><User className="mr-2 h-5 w-5 text-primary" />About</h3>
            <p className="text-muted-foreground whitespace-pre-line">{alumnus.bio}</p>
          </div>

          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InfoField icon={<Mail className="h-5 w-5 text-primary" />} label="Email" value={alumnus.email} />
            <InfoField icon={<CalendarDays className="h-5 w-5 text-primary" />} label="Graduation Year" value={alumnus.graduationYear.toString()} />
            <InfoField icon={<BookOpen className="h-5 w-5 text-primary" />} label="Department" value={alumnus.department} />
            <InfoField icon={<Briefcase className="h-5 w-5 text-primary" />} label="Current Company" value={alumnus.currentCompany} />
          </div>

          {alumnus.skills && alumnus.skills.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center"><Users className="mr-2 h-5 w-5 text-primary" />Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {alumnus.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
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

function ProfileSkeleton() {
  return (
     <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6">
          <Skeleton className="h-28 w-28 rounded-full" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40 mt-2" />
             <div className="mt-4 flex space-x-2 justify-center sm:justify-start">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
            </div>
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
        </CardContent>
      </Card>
    </div>
  )
}
