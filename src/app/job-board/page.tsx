
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, CalendarDays, MapPin, PlusCircle, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';

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
          <Card key={job.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <CardDescription className="text-sm">
                {job.company} - <span className="font-medium text-primary">{job.type}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 flex-grow">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 text-primary/80" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-2 h-4 w-4 text-primary/80" />
                Posted on: {job.postedDate}
              </div>
              <p className="text-sm text-muted-foreground pt-2 line-clamp-3">
                {job.description}
              </p>
              {job.postedBy && (
                 <div className="flex items-center text-xs text-muted-foreground pt-1">
                    <Users className="mr-1.5 h-3 w-3 text-primary/70" />
                    Posted by: {job.postedBy}
                </div>
              )}
              {job.referralInfo && (
                <p className="text-xs bg-primary/10 text-primary p-2 rounded-md mt-2">
                  <strong>Referral Note:</strong> {job.referralInfo}
                </p>
              )}
            </CardContent>
            <CardFooter className="pt-4 border-t">
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

