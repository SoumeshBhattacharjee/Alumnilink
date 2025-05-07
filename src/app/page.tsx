
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserCircle as UserCircleIcon, Users, Newspaper, ClipboardList, Briefcase, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    if (authStatus) {
      router.push('/feed');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading && !isAuthenticated) { // Show loading only if not authenticated yet and loading
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading Alumnilink...</p>
      </div>
    );
  }
  
  // If authenticated, router.push will handle redirection, so this content won't show.
  // If not authenticated and no longer loading, show the landing page.
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="flex flex-col items-center text-center">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-left">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Welcome to GCELT Alumnilink
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Your exclusive social network for GCELT alumni. Connect, network, search for fellow graduates, and stay updated with the community.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-2">
                  <Link href="/signup">
                    <Button size="lg">Join Now</Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline">
                      Member Login
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/alumni-social/600/400"
                alt="Alumni Network"
                data-ai-hint="diverse people networking"
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Alumni Hub</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover features designed to help you connect and grow within the GCELT alumni network.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
               <FeatureCard
                title="Community Feed"
                description="Stay updated with news, events, and discussions from the alumni community."
                icon={<Newspaper className="h-8 w-8 text-primary" />}
                link="/feed"
                linkLabel="View Feed"
              />
              <FeatureCard
                title="Connect & Search"
                description="Find and connect with fellow GCELT graduates. Expand your professional network."
                icon={<Users className="h-8 w-8 text-primary" />}
                link="/connect-search"
                linkLabel="Connect & Search"
              />
               <FeatureCard
                title="Notice Board"
                description="Check out important announcements and updates from the alumni association and college."
                icon={<ClipboardList className="h-8 w-8 text-primary" />}
                link="/notice-board"
                linkLabel="View Notices"
              />
               <FeatureCard
                title="Job Opportunities"
                description="Explore job openings shared by alumni and post opportunities from your company."
                icon={<Briefcase className="h-8 w-8 text-primary" />}
                link="/job-board" 
                linkLabel="Visit Job Board"
              />
               <FeatureCard
                title="Your Profile"
                description="Keep your profile updated to stay connected and visible within the network."
                icon={<UserCircleIcon className="h-8 w-8 text-primary" />}
                link="/profile" 
                linkLabel="Manage Your Profile"
              />
               <FeatureCard
                  title="Alumni Messenger"
                  description="Privately chat with your fellow alumni and build stronger connections."
                  icon={<MessageSquare className="h-8 w-8 text-primary" />}
                  link="/chat"
                  linkLabel="Open Messenger"
                />
            </div>
          </div>
        </section>
      </div>
    );
  }

  // If authenticated and redirecting, or if loading and authenticated, return null or a loader
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Loading Alumnilink...</p>
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
    <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md bg-card h-full">
      <div className="mb-4 rounded-full bg-primary/10 p-3 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
      <Link href={link} passHref>
        <Button variant="link" className="text-primary mt-auto">
          {linkLabel} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
