
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, CalendarDays, Search, UserPlus, MessageSquare, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';


// Mock alumni data
const mockAlumni: Alumni[] = [
  { id: '1', name: 'Priya Sharma', avatarUrl: 'https://picsum.photos/seed/priya/200/200', graduationYear: 2016, department: 'CSE', currentCompany: 'Innovate Corp', location: 'Bengaluru, India', dataAiHint: 'professional woman smiling' },
  { id: '2', name: 'Rajesh Kumar', avatarUrl: 'https://picsum.photos/seed/rajeshk/200/200', graduationYear: 2014, department: 'IT', currentCompany: 'Tech Solutions LLC', location: 'Mumbai, India', dataAiHint: 'professional man glasses' },
  { id: '3', name: 'Ananya Singh', avatarUrl: 'https://picsum.photos/seed/ananya/200/200', graduationYear: 2018, department: 'LT', currentCompany: 'Creative Leather Goods', location: 'Delhi, India', dataAiHint: 'woman software engineer' },
  { id: '4', name: 'Amit Patel', avatarUrl: 'https://picsum.photos/seed/amit/200/200', graduationYear: 2015, department: 'CSE', currentCompany: 'Future Software Co.', location: 'Chennai, India', dataAiHint: 'man construction architect' },
  { id: '5', name: 'Sunita Devi', avatarUrl: 'https://picsum.photos/seed/sunita/200/200', graduationYear: 2017, department: 'IT', currentCompany: 'HealthFirst Ltd.', location: 'Hyderabad, India', dataAiHint: 'doctor medical professional' },
  { id: '6', name: 'Vikram Das', avatarUrl: 'https://picsum.photos/seed/vikram/200/200', graduationYear: 2013, department: 'LT', currentCompany: 'Global Leather Exports', location: 'Pune, India', dataAiHint: 'man technology laptop' },
  { id: '7', name: 'Deepika Iyer', avatarUrl: 'https://picsum.photos/seed/deepika/200/200', graduationYear: 2019, department: 'CSE', currentCompany: 'Data Insights Inc.', location: 'Bengaluru, India', dataAiHint: 'woman data scientist' },
  { id: '8', name: 'Arjun Reddy', avatarUrl: 'https://picsum.photos/seed/arjunr/200/200', graduationYear: 2012, department: 'IT', currentCompany: 'SecureNet Solutions', location: 'Noida, India', dataAiHint: 'man telecom engineer' },
  { id: '9', name: 'Meera Menon', avatarUrl: 'https://picsum.photos/seed/meera/200/200', graduationYear: 2020, department: 'IT', currentCompany: 'CyberSafe Solutions', location: 'Kochi, India', dataAiHint: 'woman cybersecurity' },
  { id: '10', name: 'Rohan Gupta', avatarUrl: 'https://picsum.photos/seed/rohan/200/200', graduationYear: 2011, department: 'CSE', currentCompany: 'GameDev Studios', location: 'Gurgaon, India', dataAiHint: 'man automotive design' },
];

interface Alumni {
  id: string;
  name: string;
  avatarUrl: string;
  graduationYear: number;
  department: 'CSE' | 'LT' | 'IT'; // Updated department type
  currentCompany: string;
  location: string;
  dataAiHint: string;
}

function AlumniCard({ alumni }: { alumni: Alumni }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={alumni.avatarUrl} alt={alumni.name} data-ai-hint={alumni.dataAiHint} />
          <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{alumni.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{alumni.department}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-2 flex-grow">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4 text-primary" />
          Graduated: {alumni.graduationYear}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Briefcase className="mr-2 h-4 w-4 text-primary" />
          Works at: {alumni.currentCompany}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4 text-primary" />
          {alumni.location}
        </div>
      </CardContent>
      <CardContent className="pt-3 pb-4 border-t mt-auto">
        <div className="flex space-x-2">
           <Link href={`/alumni/${alumni.id}`} passHref className="flex-1">
            <Button variant="outline" className="w-full">View Profile</Button>
          </Link>
          <Button variant="outline" size="icon" aria-label="Connect">
            <UserPlus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Message">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AlumniCardSkeleton() {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-2 flex-grow">
        <div className="flex items-center text-sm">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center text-sm">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex items-center text-sm">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
      <CardContent className="pt-3 pb-4 border-t mt-auto">
        <div className="flex space-x-2">
           <Skeleton className="h-10 flex-1" />
           <Skeleton className="h-10 w-10" />
           <Skeleton className="h-10 w-10" />
        </div>
      </CardContent>
    </Card>
  )
}


export default function ConnectSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      // Simulate data fetching delay
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [router]);

  const filteredAlumni = useMemo(() => {
    if (!searchTerm) {
      return mockAlumni;
    }
    return mockAlumni.filter(alumni =>
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.graduationYear.toString().includes(searchTerm) ||
      alumni.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  if (isLoading) {
     return (
      <div className="space-y-8">
        <div className="flex flex-col items-center text-center">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="relative max-w-xl mx-auto">
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <AlumniCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight">Connect & Search Alumni</h1>
        <p className="text-muted-foreground mt-2">Find, connect, and network with fellow GCELT graduates.</p>
      </div>

      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, company, department, year, or location..."
          className="pl-10 pr-4 py-2 text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredAlumni.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map(alumni => (
            <AlumniCard key={alumni.id} alumni={alumni} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No alumni found matching your search criteria.</p>
      )}
    </div>
  );
}

