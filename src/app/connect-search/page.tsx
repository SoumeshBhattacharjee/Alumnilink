'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, CalendarDays, Search, UserPlus, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';


// Mock alumni data
const mockAlumni = [
  { id: '1', name: 'Jane Doe', avatarUrl: 'https://picsum.photos/seed/jane/200/200', graduationYear: 2016, department: 'Electronics & Comm. Engg.', currentCompany: 'Innovate Corp', dataAiHint: 'professional woman smiling' },
  { id: '2', name: 'John Smith', avatarUrl: 'https://picsum.photos/seed/john/200/200', graduationYear: 2014, department: 'Mechanical Engineering', currentCompany: 'Tech Solutions LLC', dataAiHint: 'professional man glasses' },
  { id: '3', name: 'Alice Brown', avatarUrl: 'https://picsum.photos/seed/alice/200/200', graduationYear: 2018, department: 'Civil Engineering', currentCompany: 'Creative Minds Agency', dataAiHint: 'woman software engineer' },
  { id: '4', name: 'Bob Green', avatarUrl: 'https://picsum.photos/seed/bob/200/200', graduationYear: 2015, department: 'Electrical Engineering', currentCompany: 'Future Builders Co.', dataAiHint: 'man construction architect' },
  { id: '5', name: 'Carol White', avatarUrl: 'https://picsum.photos/seed/carol/200/200', graduationYear: 2017, department: 'Information Technology', currentCompany: 'HealthFirst Ltd.', dataAiHint: 'doctor medical professional' },
  { id: '6', name: 'David Black', avatarUrl: 'https://picsum.photos/seed/david/200/200', graduationYear: 2013, department: 'Leather Technology', currentCompany: 'Global Web Services', dataAiHint: 'man technology laptop' },
];

interface Alumni {
  id: string;
  name: string;
  avatarUrl: string;
  graduationYear: number;
  department: string;
  currentCompany: string;
  dataAiHint: string;
}

function AlumniCard({ alumni }: { alumni: Alumni }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={alumni.avatarUrl} alt={alumni.name} data-ai-hint={alumni.dataAiHint} />
          <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{alumni.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">GCELT Alumni - {alumni.department}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4 text-primary" />
          Graduated: {alumni.graduationYear}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Briefcase className="mr-2 h-4 w-4 text-primary" />
          Works at: {alumni.currentCompany}
        </div>
        <div className="flex space-x-2 pt-2">
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
      <CardContent className="space-y-3 pt-2">
        <div className="flex items-center text-sm">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center text-sm">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex space-x-2 pt-2">
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
      alumni.department.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Search by name, company, department, or year..."
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
