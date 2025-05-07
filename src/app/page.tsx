import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserCircle as UserCircleIcon } from 'lucide-react'; // Removed Search, Briefcase, UsersIcon
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
                  Welcome to Alumnilink
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Connect with fellow alumni and stay engaged with your alma mater. Manage your profile and network within the Gcelt community after you register.
                </p>
              </div>
              {/* Removed hero buttons for Search Alumni and Job Board */}
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Alumni Hub</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Manage your profile and stay connected with the Gcelt alumni network.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-md items-start gap-8 mt-12">
            {/* Removed Alumni Directory FeatureCard */}
            {/* Removed Job Board FeatureCard */}
            <FeatureCard
              title="Profile Management"
              description="Keep your profile updated to stay connected and visible within the network."
              icon={<UserCircleIcon className="h-8 w-8 text-primary" />}
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
