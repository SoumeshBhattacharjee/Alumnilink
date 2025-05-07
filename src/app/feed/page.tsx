import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

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

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The community feed is under construction. Check back soon for updates from your fellow alumni!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
