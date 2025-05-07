import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 text-left">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Welcome to Gcelt StudentAlumniLink
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Connect with fellow alumni, explore career opportunities, and stay engaged with your alma mater.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/alumni-search" passHref>
                  <Button size="lg">
                    <Search className="mr-2 h-5 w-5" />
                    Search Alumni
                  </Button>
                </Link>
                <Link href="/job-board" passHref>
                  <Button variant="secondary" size="lg">
                    <Briefcase className="mr-2 h-5 w-5" />
                    View Job Board
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="https://picsum.photos/seed/alumni-portal/600/400"
              alt="Alumni Network"
              data-ai-hint="diverse students graduation"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the tools and resources available to you as a member of the Gcelt alumni network.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <FeatureCard
              title="Alumni Directory"
              description="Find and connect with alumni based on graduation year, batch, or company."
              icon={<Users className="h-8 w-8 text-primary" />}
              link="/alumni-search"
              linkLabel="Explore Directory"
            />
            <FeatureCard
              title="Job Board"
              description="Access exclusive job postings from fellow alumni and partner companies."
              icon={<Briefcase className="h-8 w-8 text-primary" />}
              link="/job-board"
              linkLabel="Find Opportunities"
            />
            <FeatureCard
              title="Profile Management"
              description="Keep your profile updated to stay connected and visible within the network."
              icon={<UserCircle className="h-8 w-8 text-primary" />}
              link="/profile"
              linkLabel="Update Your Profile"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
}

function FeatureCard({ icon, title, description, link, linkLabel }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md bg-card">
      <div className="mb-4 rounded-full bg-primary/10 p-3 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link href={link} passHref>
        <Button variant="link" className="text-primary">
          {linkLabel} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

// Placeholder icons - replace with actual icons from lucide-react or other library
const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const UserCircle = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
);
