import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';

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

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Notice Board is under construction. Check back soon for official announcements and updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
