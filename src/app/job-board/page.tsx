import type { JobPosting } from '@/services/job-board';
import { getJobPostings } from '@/services/job-board';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Building, MapPin, ArrowRight, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default async function JobBoardPage() {
  const jobPostings = await getJobPostings();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
        <Button>
            <Briefcase className="mr-2 h-4 w-4" /> Post a Job (Coming Soon)
        </Button>
      </div>
      
      {jobPostings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPostings.map((job) => (
            <JobPostingCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <Card className="col-span-full text-center py-10">
          <CardContent>
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold">No job postings available at the moment.</p>
            <p className="text-muted-foreground">Please check back later or consider posting a job if you have an opening.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function JobPostingCard({ job }: { job: JobPosting }) {
  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="flex items-center text-sm">
              <Building className="mr-2 h-4 w-4" />
              {job.company}
            </CardDescription>
          </div>
           <Image 
            src={`https://picsum.photos/seed/${job.company.replace(/\s+/g, '')}/40/40`}
            alt={`${job.company} logo`}
            data-ai-hint="company logo"
            width={40} height={40} 
            className="rounded-sm"
            />
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <p className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          {job.location}
        </p>
        <p className="text-sm text-foreground/80 line-clamp-3">{job.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary/90" asChild>
          {/* Link to a future job details page: /job-board/${job.id} */}
          <Link href="#"> 
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
