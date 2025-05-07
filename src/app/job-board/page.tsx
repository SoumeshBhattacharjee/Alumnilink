
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, CalendarDays, MapPin, PlusCircle, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  description: string;
  postedBy?: string; // Alumni who posted
  referralInfo?: string;
  applyLink?: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
}

const mockJobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'Innovate Solutions Ltd.',
    location: 'Bengaluru, India',
    postedDate: 'July 20, 2024',
    description: 'Join our dynamic team to build next-generation web applications using React and TypeScript. 5+ years of experience required. Strong understanding of modern frontend frameworks and best practices.',
    postedBy: 'Jane Doe (ECE, 2016)',
    referralInfo: 'Referred by Jane. Mention her name in your application.',
    applyLink: '#',
    type: 'Full-time',
  },
  {
    id: '2',
    title: 'Product Manager - AI Products',
    company: 'TechGenius Corp.',
    location: 'Remote',
    postedDate: 'July 18, 2024',
    description: 'Exciting opportunity for an experienced Product Manager to lead our AI product division. Define product strategy, roadmap, and drive execution. GCELT alumni preferred.',
    postedBy: 'Alumni Connect Admin',
    applyLink: '#',
    type: 'Full-time',
  },
  {
    id: '3',
    title: 'Mechanical Design Intern',
    company: 'Precision Engineering Co.',
    location: 'Kolkata, India',
    postedDate: 'July 15, 2024',
    description: 'Gain hands-on experience in mechanical design, CAD modeling, and prototyping. Ideal for recent GCELT graduates or final year students in Mechanical Engineering.',
    postedBy: 'John Smith (ME, 2014)',
    referralInfo: 'Reach out to John Smith on Alumnilink for a referral.',
    type: 'Internship',
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'GrowthPro Agency',
    location: 'Mumbai, India (Hybrid)',
    postedDate: 'July 22, 2024',
    description: 'Looking for a creative Marketing Specialist to develop and execute marketing campaigns. Experience in digital marketing and content creation is a plus.',
    applyLink: '#',
    type: 'Part-time',
  },
];

interface InfoItemProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

function InfoItem({ icon, text, className }: InfoItemProps) {
  return (
    <div className={cn("flex items-center text-sm text-muted-foreground", className)}>
      {icon}
      <span className="ml-2">{text}</span>
    </div>
  );
}

function JobPostingCard({ job }: { job: JobPosting }) {
  let typeColorClasses = 'bg-muted text-muted-foreground';
  if (job.type === 'Full-time') typeColorClasses = 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
  else if (job.type === 'Part-time') typeColorClasses = 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
  else if (job.type === 'Internship') typeColorClasses = 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
  else if (job.type === 'Contract') typeColorClasses = 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';


  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <span className={cn("px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap", typeColorClasses)}>
            {job.type}
          </span>
        </div>
        <CardDescription className="text-base">{job.company}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5 flex-grow">
        <InfoItem icon={<MapPin className="h-4 w-4 text-primary/80" />} text={job.location} />
        <InfoItem icon={<CalendarDays className="h-4 w-4 text-primary/80" />} text={`Posted: ${job.postedDate}`} />
        
        <p className="text-sm text-foreground/80 pt-2 line-clamp-3">
          {job.description}
        </p>
        
        {job.postedBy && (
          <InfoItem 
            icon={<Users className="h-3.5 w-3.5 text-primary/70" />} 
            text={`${job.postedBy}`} 
            className="text-xs pt-1" 
          />
        )}
        
        {job.referralInfo && (
          <div className="pt-1.5">
            <p className="text-xs bg-accent/40 dark:bg-accent/20 text-accent-foreground dark:text-foreground/80 p-2.5 rounded-md">
              <strong>Referral:</strong> {job.referralInfo}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t mt-auto">
        {job.applyLink ? (
          <Link href={job.applyLink} passHref className="w-full">
            <Button className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" /> Apply Now
            </Button>
          </Link>
        ) : (
           <Button className="w-full" variant="outline" disabled>
              Contact Poster
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function JobBoardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" /> Job Board
          </h1>
          <p className="text-muted-foreground mt-2">
            Find career opportunities posted by fellow GCELT alumni or share openings at your company.
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" /> Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobPostings.map((job) => (
          <JobPostingCard key={job.id} job={job} />
        ))}
      </div>
       <div className="text-center py-4">
          <Link href="/job-board/all">
              <Button variant="outline">View All Job Postings</Button>
          </Link>
      </div>
    </div>
  );
}

