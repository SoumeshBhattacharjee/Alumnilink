
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Building, Users, BarChart2, Settings, Filter, FileText, CreditCard, UserCheck, LogOut, Edit } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


const AdminFeatureCard = ({ title, description, icon, link }: { title: string, description: string, icon: React.ReactNode, link?: string }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center space-x-3 pb-3">
      <span className="p-2 bg-primary/10 rounded-full text-primary">
        {icon}
      </span>
      <div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      {link && <Button variant="outline" size="sm" asChild><Link href={link}>Manage</Link></Button>}
    </CardContent>
  </Card>
);


export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    // In a real app, you'd also check for admin role here
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center mb-8">
          <Skeleton className="h-12 w-12 rounded-full mb-3" />
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="w-full space-y-1.5">
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-3" />
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center mb-8">
        <Shield className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground mt-2">
          Manage GCELT Alumnilink platform settings, users, and content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminFeatureCard 
          title="Organization Management" 
          description="Create & manage college portals, invite admins, set rules."
          icon={<Building className="h-6 w-6" />}
          link="/admin/organizations"
        />
        <AdminFeatureCard 
          title="User Approvals & Management" 
          description="Approve or reject new user registrations. View & manage existing users."
          icon={<UserCheck className="h-6 w-6" />}
          link="/admin/users"
        />
        <AdminFeatureCard 
          title="Content Moderation" 
          description="Review reported posts, manage users (ban/suspend), view activity logs."
          icon={<Filter className="h-6 w-6" />}
          link="/admin/moderation"
        />
        <AdminFeatureCard 
          title="Platform Analytics" 
          description="View user analytics by batch, company, country. Track engagement."
          icon={<BarChart2 className="h-6 w-6" />}
          link="/admin/analytics"
        />
         <AdminFeatureCard 
          title="Post as Admin" 
          description="Create announcements, job postings, or event highlights as an admin."
          icon={<Edit className="h-6 w-6" />}
          link="/admin/create-post"
        />
        <AdminFeatureCard 
          title="Invitation System" 
          description="Manage batch-wise onboarding, direct invite links, and verification toggles."
          icon={<Users className="h-6 w-6" />}
          link="/admin/invitations"
        />
        <AdminFeatureCard 
          title="Payment & Subscriptions" 
          description="Manage college-level billing, view history, and upgrade options."
          icon={<CreditCard className="h-6 w-6" />}
          link="/admin/billing"
        />
         <AdminFeatureCard 
          title="Export Data" 
          description="Export alumni data based on various criteria."
          icon={<FileText className="h-6 w-6" />}
          link="/admin/export"
        />
        <AdminFeatureCard 
          title="Platform Settings" 
          description="Configure general platform settings and features."
          icon={<Settings className="h-6 w-6" />}
          link="/admin/settings"
        />
      </div>
    </div>
  );
}
