
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Newspaper, MessageCircle, ThumbsUp, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FeedItem {
  id: string;
  userName: string;
  userAvatar: string;
  userAvatarFallback: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  imageAiHint?: string;
  likes: number;
  comments: number;
}

const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    userName: 'Alumni Connect Admin',
    userAvatar: 'https://picsum.photos/seed/admin/50/50',
    userAvatarFallback: 'AD',
    timestamp: '2h ago',
    content: 'Welcome to the new GCELT Alumnilink platform! We are excited to launch this space for all our esteemed alumni to connect, network, and stay updated. Explore the features and let us know your feedback!',
    likes: 15,
    comments: 3,
  },
  {
    id: '2',
    userName: 'Priya Sharma (Batch 2012, ECE)',
    userAvatar: 'https://picsum.photos/seed/priya/50/50',
    userAvatarFallback: 'PS',
    timestamp: 'Yesterday',
    content: 'Just attended an amazing webinar on AI in Healthcare. Highly recommend it to fellow tech enthusiasts! It\'s great to see how far our field has progressed. #AI #Healthcare #GCELTAlumni',
    imageUrl: 'https://picsum.photos/seed/ai-webinar/600/300',
    imageAlt: 'AI in Healthcare Webinar Thumbnail',
    imageAiHint: 'technology webinar',
    likes: 42,
    comments: 8,
  },
  {
    id: '3',
    userName: 'Rajesh Kumar (Batch 2008, ME)',
    userAvatar: 'https://picsum.photos/seed/rajesh/50/50',
    userAvatarFallback: 'RK',
    timestamp: '3 days ago',
    content: 'Looking for collaborators on a new sustainable energy project. If you have experience in renewable tech or project management, please reach out. Let\'s innovate together! #Sustainability #Engineering #Collaboration',
    likes: 28,
    comments: 5,
  },
  {
    id: '4',
    userName: 'Ananya Singh (Batch 2019, LT)',
    userAvatar: 'https://picsum.photos/seed/ananya/50/50',
    userAvatarFallback: 'AS',
    timestamp: '5 days ago',
    content: 'Thrilled to share that my research paper on innovative leather tanning processes has been published! Thanks to all my mentors at GCELT for their guidance. You can read it here: [link to paper]',
    likes: 55,
    comments: 12,
  },
];

export default function FeedPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <Newspaper className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Alumni Feed</h1>
        <p className="text-muted-foreground mt-2">
          Stay updated with news, events, and discussions from the GCELT alumni community.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {mockFeedItems.map((item) => (
          <Card key={item.id} className="shadow-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center space-x-3 p-4">
              <Avatar>
                <AvatarImage src={item.userAvatar} alt={item.userName} data-ai-hint="person portrait" />
                <AvatarFallback>{item.userAvatarFallback}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{item.userName}</p>
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <p className="text-sm whitespace-pre-line">{item.content}</p>
              {item.imageUrl && (
                <div className="rounded-md overflow-hidden border">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || 'Feed image'}
                    data-ai-hint={item.imageAiHint || 'social media image'}
                    width={600}
                    height={300}
                    className="object-cover w-full"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 border-t bg-muted/50">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <ThumbsUp className="mr-2 h-4 w-4" /> {item.likes} Likes
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <MessageCircle className="mr-2 h-4 w-4" /> {item.comments} Comments
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </CardFooter>
          </Card>
        ))}
         <div className="text-center py-4">
            <Link href="/feed/all">
                <Button variant="outline">View More Posts</Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
