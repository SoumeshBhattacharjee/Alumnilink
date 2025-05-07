import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <MessageSquare className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Alumni Chat</h1>
        <p className="text-muted-foreground mt-2">
          Connect and chat with fellow GCELT graduates in real-time.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Chat feature is under development. Soon you'll be able to connect with alumni directly!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
