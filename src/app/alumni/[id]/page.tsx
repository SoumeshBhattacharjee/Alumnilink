
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Briefcase, CalendarDays, BookOpen, Users, Linkedin, UserPlus, MessageSquare, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link'; 

// Mock alumni data - in a real app, this would be fetched
const mockAlumniData: { [key: string]: AlumniProfile } = {
  '1': { id: '1', name: 'Priya Sharma', email: 'priya.sharma@example.com', graduationYear: 2016, department: 'CSE', currentCompany: 'Innovate Corp', currentRole: 'Project Manager', location: 'Bengaluru, India', avatarUrl: 'https://picsum.photos/seed/priya/200/200', bio: 'Experienced Project Manager in the tech industry. Passionate about bringing innovative products to market. GCELT Batch of 2016.', skills: ['Project Management', 'Agile', 'Scrum', 'Product Development'], linkedin: 'https://linkedin.com/in/priyasharma' },
  '2': { id: '2', name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', graduationYear: 2014, department: 'IT', currentCompany: 'Tech Solutions LLC', currentRole: 'Lead IT Consultant', location: 'Mumbai, India', avatarUrl: 'https://picsum.photos/seed/rajeshk/200/200', bio: 'Dedicated IT consultant with expertise in system architecture. Always looking for new challenges. GCELT Class of 2014.', skills: ['System Architecture', 'Cloud Solutions', 'IT Strategy', 'Cybersecurity'], linkedin: 'https://linkedin.com/in/rajeshkumar' },
  '3': { id: '3', name: 'Ananya Singh', email: 'ananya.singh@example.com', graduationYear: 2018, department: 'LT', currentCompany: 'Creative Leather Goods', currentRole: 'Lead Designer', location: 'Delhi, India', avatarUrl: 'https://picsum.photos/seed/ananya/200/200', bio: 'Lead Designer focused on sustainable leather products. Proud GCELT alumna, Batch 2018.', skills: ['Leather Design', 'Product Development', 'Sustainable Materials', 'Fashion Tech'], linkedin: 'https://linkedin.com/in/ananyasingh' },
  '4': { id: '4', name: 'Amit Patel', email: 'amit.patel@example.com', graduationYear: 2015, department: 'CSE', currentCompany: 'Future Software Co.', currentRole: 'Senior Software Developer', location: 'Chennai, India', avatarUrl: 'https://picsum.photos/seed/amit/200/200', bio: 'Specializing in backend systems and API development. GCELT 2015 graduate.', skills: ['Java', 'Spring Boot', 'Microservices', 'Database Design'], linkedin: 'https://linkedin.com/in/amitpatel' },
  '5': { id: '5', name: 'Sunita Devi', email: 'sunita.devi@example.com', graduationYear: 2017, department: 'IT', currentCompany: 'HealthFirst Ltd.', currentRole: 'IT Manager', location: 'Hyderabad, India', avatarUrl: 'https://picsum.photos/seed/sunita/200/200', bio: 'IT Manager with a knack for solving complex problems. GCELT IT, Batch of 2017.', skills: ['Network Admin', 'Cybersecurity', 'Cloud Computing', 'IT Support'], linkedin: 'https://linkedin.com/in/sunitadevi' },
  '6': { id: '6', name: 'Vikram Das', email: 'vikram.das@example.com', graduationYear: 2013, department: 'LT', currentCompany: 'Global Leather Exports', currentRole: 'Lead Technologist', location: 'Pune, India', avatarUrl: 'https://picsum.photos/seed/vikram/200/200', bio: 'Expert in leather processing and sustainable practices in the leather industry. GCELT 2013.', skills: ['Leather Finishing', 'Tannery Operations', 'Quality Control', 'Sustainable Leather'], linkedin: 'https://linkedin.com/in/vikramdas' },
  '7': { id: '7', name: 'Deepika Iyer', email: 'deepika.iyer@example.com', graduationYear: 2019, department: 'CSE', currentCompany: 'Data Insights Inc.', currentRole: 'Data Scientist', location: 'Bengaluru, India', avatarUrl: 'https://picsum.photos/seed/deepika/200/200', bio: 'Passionate about leveraging data to solve real-world problems. GCELT CSE Batch of 2019.', skills: ['Machine Learning', 'Python', 'SQL', 'Data Visualization', 'Statistics'], linkedin: 'https://linkedin.com/in/deepikaiyer' },
  '8': { id: '8', name: 'Arjun Reddy', email: 'arjun.reddy@example.com', graduationYear: 2012, department: 'IT', currentCompany: 'SecureNet Solutions', currentRole: 'Network Architect', location: 'Noida, India', avatarUrl: 'https://picsum.photos/seed/arjunr/200/200', bio: 'Experienced Network Architect specializing in enterprise security. Always exploring new tech frontiers. GCELT IT 2012.', skills: ['Network Design', 'Cybersecurity', 'Firewalls', 'Cisco Networking', 'Cloud Security'], linkedin: 'https://linkedin.com/in/arjunreddy' },
  '9': { id: '9', name: 'Meera Menon', email: 'meera.menon@example.com', graduationYear: 2020, department: 'IT', currentCompany: 'CyberSafe Solutions', currentRole: 'Cybersecurity Analyst', location: 'Kochi, India', avatarUrl: 'https://picsum.photos/seed/meera/200/200', bio: 'Dedicated to protecting digital assets and ensuring online safety. Recent GCELT IT graduate, Batch 2020.', skills: ['Ethical Hacking', 'SIEM', 'Incident Response', 'Vulnerability Assessment'], linkedin: 'https://linkedin.com/in/meeramenon' },
  '10': { id: '10', name: 'Rohan Gupta', email: 'rohan.gupta@example.com', graduationYear: 2011, department: 'CSE', currentCompany: 'GameDev Studios', currentRole: 'Lead Game Developer', location: 'Gurgaon, India', avatarUrl: 'https://picsum.photos/seed/rohan/200/200', bio: 'Leading innovation in game development with a focus on mobile gaming. GCELT CSE, Class of 2011.', skills: ['Unity', 'C#', 'Game Design', 'Mobile Development'], linkedin: 'https://linkedin.com/in/rohan-gupta' },
};

interface AlumniProfile {
  id: string;
  name: string;
  email: string;
  graduationYear: number;
  department: 'CSE' | 'LT' | 'IT'; // Updated department type
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
            <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start"><MapPin className="mr-1 h-4 w-4" />{alumnus.location}</p>
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

