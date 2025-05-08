
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Newspaper, MessageCircle, ThumbsUp, Share2, PlusCircle, Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
  likedByCurrentUser?: boolean;
  comments: number; 
}

const initialFeedItems: FeedItem[] = [
  {
    id: '1',
    userName: 'Alumni Connect Admin',
    userAvatar: 'https://picsum.photos/seed/admin-gcalum/50/50',
    userAvatarFallback: 'AD',
    timestamp: '2h ago',
    content: 'Welcome to the new GCELT Alumnilink platform! We are excited to launch this space for all our esteemed alumni to connect, network, and stay updated. Explore the features and let us know your feedback!',
    likes: 15,
    likedByCurrentUser: false,
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
    likedByCurrentUser: true,
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
    likedByCurrentUser: false,
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
    likedByCurrentUser: true,
    comments: 12,
  },
  {
    id: '5',
    userName: 'Vikram Aditya (Batch 2010, CSE)',
    userAvatar: 'https://picsum.photos/seed/vikram-cse/50/50',
    userAvatarFallback: 'VA',
    timestamp: '1 week ago',
    content: 'Our startup "CodeGenius" just secured Series A funding! 🎉 Looking to hire talented GCELT alumni for full-stack and data science roles. Check out our careers page: [link-to-careers]',
    imageUrl: 'https://picsum.photos/seed/startup-funding/600/300',
    imageAlt: 'Team celebrating funding round',
    imageAiHint: 'startup team',
    likes: 112,
    likedByCurrentUser: false,
    comments: 25,
  },
  {
    id: '6',
    userName: 'Sneha Reddy (Batch 2015, IT)',
    userAvatar: 'https://picsum.photos/seed/sneha-it/50/50',
    userAvatarFallback: 'SR',
    timestamp: '10 days ago',
    content: 'Organizing a virtual GCELT IT batch of 2015 reunion next month. DM me if you are interested in joining and haven\'t received the invite yet! Looking forward to catching up with everyone. 😊',
    likes: 33,
    likedByCurrentUser: true,
    comments: 7,
  },
  {
    id: '7',
    userName: 'Prof. Amitava Ghosh (Faculty, ME Dept.)',
    userAvatar: 'https://picsum.photos/seed/prof-ghosh/50/50',
    userAvatarFallback: 'AG',
    timestamp: '2 weeks ago',
    content: 'Congratulations to the GCELT Robotics team for winning the inter-college championship! Proud of your hard work and innovation. The Mechanical Engineering department continues to shine.',
    imageUrl: 'https://picsum.photos/seed/robotics-win/600/300',
    imageAlt: 'Robotics team with trophy',
    imageAiHint: 'students robotics',
    likes: 89,
    likedByCurrentUser: false,
    comments: 15,
  },
  {
    id: '8',
    userName: 'Rina Das (Batch 2005, LT)',
    userAvatar: 'https://picsum.photos/seed/rina-lt/50/50',
    userAvatarFallback: 'RD',
    timestamp: '3 weeks ago',
    content: 'Sharing some memories from our Leather Technology workshop back in 2004. Such incredible times and learning experiences at GCELT! Who remembers Prof. Sen\'s classes? #ThrowbackThursday #GCELTMemories',
    imageUrl: 'https://picsum.photos/seed/gctlt-workshop/600/300',
    imageAlt: 'Old workshop photo',
    imageAiHint: 'vintage workshop',
    likes: 67,
    likedByCurrentUser: false,
    comments: 11,
  }
];

// Placeholder for logged-in user details
const currentUserName = "Alumni User";
const currentUserAvatar = "https://picsum.photos/id/433/50/50";
const currentUserAvatarFallback = "AU";


export default function FeedPage() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>(initialFeedItems);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<FeedItem | null>(null);
  const [postContent, setPostContent] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  const { toast } = useToast();

  const openAddPostDialog = () => {
    setEditingPost(null);
    setPostContent('');
    setPostImageUrl('');
    setIsPostDialogOpen(true);
  };

  const openEditPostDialog = (post: FeedItem) => {
    setEditingPost(post);
    setPostContent(post.content);
    setPostImageUrl(post.imageUrl || '');
    setIsPostDialogOpen(true);
  };

  const handlePostSubmit = () => {
    if (!postContent.trim()) {
      toast({ title: "Error", description: "Post content cannot be empty.", variant: "destructive" });
      return;
    }

    if (editingPost) {
      // Edit existing post
      setFeedItems(feedItems.map(item =>
        item.id === editingPost.id
          ? { ...item, content: postContent, imageUrl: postImageUrl || undefined, timestamp: "Edited: Just now" }
          : item
      ));
      toast({ title: "Success", description: "Post updated successfully!" });
    } else {
      // Add new post
      const newPost: FeedItem = {
        id: String(Date.now()), // Simple unique ID
        userName: currentUserName,
        userAvatar: currentUserAvatar,
        userAvatarFallback: currentUserAvatarFallback,
        timestamp: 'Just now',
        content: postContent,
        imageUrl: postImageUrl || undefined,
        imageAlt: postImageUrl ? 'User uploaded image' : undefined,
        imageAiHint: postImageUrl ? 'user content' : undefined,
        likes: 0,
        likedByCurrentUser: false,
        comments: 0,
      };
      setFeedItems([newPost, ...feedItems]);
      toast({ title: "Success", description: "Post created successfully!" });
    }
    setIsPostDialogOpen(false);
    setPostContent('');
    setPostImageUrl('');
  };

  const handleDeletePost = (postId: string) => {
    // Confirm deletion
     const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
        setFeedItems(feedItems.filter(item => item.id !== postId));
        toast({ title: "Success", description: "Post deleted successfully." });
    }
  };
  
  const handleLikePost = (postId: string) => {
    setFeedItems(prevItems =>
      prevItems.map(item => {
        if (item.id === postId) {
          const alreadyLiked = !!item.likedByCurrentUser;
          return {
            ...item,
            likes: alreadyLiked ? item.likes - 1 : item.likes + 1,
            likedByCurrentUser: !alreadyLiked,
          };
        }
        return item;
      })
    );
  };

  const handleCommentPost = (postId: string) => { 
    setFeedItems(prevItems =>
      prevItems.map(item => {
        if (item.id === postId) {
          return {
            ...item,
            // For demo, just incrementing count. A real app would open a comment modal/input.
            comments: item.comments + 1, 
          };
        }
        return item;
      })
    );
    toast({ title: "Comment Action (Demo)", description: "Comment count incremented. Full commenting feature coming soon!" });
  };


  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <Newspaper className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Alumni Feed</h1>
        <p className="text-muted-foreground mt-2">
          Stay updated with news, events, and discussions from the GCELT alumni community.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Button onClick={openAddPostDialog} className="w-full mb-6">
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
        </Button>
      </div>
      
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-content" className="text-right">
                Content
              </Label>
              <Textarea
                id="post-content"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="col-span-3"
                placeholder="What's on your mind?"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-image-url" className="text-right">
                Image URL
              </Label>
              <Input
                id="post-image-url"
                value={postImageUrl}
                onChange={(e) => setPostImageUrl(e.target.value)}
                className="col-span-3"
                placeholder="(Optional) Enter image URL"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handlePostSubmit}>
              {editingPost ? 'Save Changes' : 'Create Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <div className="max-w-2xl mx-auto space-y-6">
        {feedItems.map((item) => (
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
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn("hover:text-primary", item.likedByCurrentUser ? "text-primary" : "text-muted-foreground")}
                  onClick={() => handleLikePost(item.id)}
                >
                  <ThumbsUp className={cn("mr-1.5 h-4 w-4", item.likedByCurrentUser ? "fill-primary" : "")} /> {item.likes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => handleCommentPost(item.id)}
                >
                  <MessageCircle className="mr-1.5 h-4 w-4" /> {item.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Share2 className="mr-1.5 h-4 w-4" /> Share
                </Button>
              </div>
              {/* Show Edit/Delete only for posts by current "logged-in" user or admin for simplicity */}
              {(item.userName === currentUserName || item.userName === 'Alumni Connect Admin') && (
                 <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600" onClick={() => openEditPostDialog(item)}>
                        <Edit2 className="mr-1.5 h-4 w-4" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => handleDeletePost(item.id)}>
                        <Trash2 className="mr-1.5 h-4 w-4" /> Delete
                    </Button>
                 </div>
              )}
            </CardFooter>
          </Card>
        ))}
         <div className="text-center py-4">
            {feedItems.length > initialFeedItems.length || feedItems.length === 0 ? (
                 <p className="text-muted-foreground text-sm">
                    {feedItems.length === 0 ? "No posts yet. Be the first to share!" : "You've reached the end of the feed."}
                 </p>
            ) : (
                <Link href="/feed/all">
                    <Button variant="outline">View More Posts</Button>
                </Link>
            )}
        </div>
      </div>
    </div>
  );
}

