
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, CalendarDays, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NoticeItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: 'Event' | 'Announcement' | 'Opportunity' | 'College News';
  link?: string;
}

const mockNotices: NoticeItem[] = [
  {
    id: '1',
    title: 'Annual Alumni Meetup 2024 - Save the Date!',
    date: 'Published on: July 15, 2024',
    summary: 'We are excited to announce that the Annual GCELT Alumni Meetup will be held on September 28th, 2024. More details regarding venue and registration will follow soon. Get ready for an evening of networking, nostalgia, and fun!',
    category: 'Event',
    link: '/notices/alumni-meetup-2024'
  },
  {
    id: '2',
    title: 'Call for Nominations: Distinguished Alumni Awards',
    date: 'Published on: July 10, 2024',
    summary: 'The GCELT Alumni Association is now accepting nominations for the Distinguished Alumni Awards. Recognize outstanding achievements of your fellow graduates. Deadline for submission is August 15th, 2024.',
    category: 'Announcement',
    link: '/notices/distinguished-alumni-awards'
  },
  {
    id: '3',
    title: 'Job Opportunity: Senior Developer at TechNova Inc.',
    date: 'Published on: July 08, 2024',
    summary: 'TechNova Inc. is looking for experienced Senior Developers. GCELT alumni are encouraged to apply. See the full job description and application details on the portal.',
    category: 'Opportunity',
  },
  {
    id: '4',
    title: 'GCELT Campus Renovation Update',
    date: 'Published on: July 05, 2024',
    summary: 'The first phase of the campus renovation project, including the new library wing, is nearing completion. We plan to host an open house for alumni once it\'s ready. Stay tuned for more updates.',
    category: 'College News',
  },
];


export default function NoticeBoardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <ClipboardList className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Notice Board</h1>
        <p className="text-muted-foreground mt-2">
          Important announcements and updates for GCELT alumni.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {mockNotices.map((notice) => (
          <Card key={notice.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl leading-tight">{notice.title}</CardTitle>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  notice.category === 'Event' ? 'bg-blue-100 text-blue-700' :
                  notice.category === 'Announcement' ? 'bg-green-100 text-green-700' :
                  notice.category === 'Opportunity' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {notice.category}
                </span>
              </div>
              <CardDescription className="flex items-center text-sm pt-1">
                <CalendarDays className="mr-1.5 h-4 w-4" /> {notice.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {notice.summary}
              </p>
            </CardContent>
            {notice.link && (
              <CardFooter className="pt-2 pb-4">
                <Link href={notice.link} passHref className="ml-auto">
                  <Button variant="link" size="sm" className="text-primary">
                    Read More <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            )}
          </Card>
        ))}
        <div className="text-center py-4">
            <Link href="/notice-board/archive">
                <Button variant="outline">View All Notices</Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
