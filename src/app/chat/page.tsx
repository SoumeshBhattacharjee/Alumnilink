
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  name: string;
  avatar: string;
  avatarFallback: string;
  text: string;
  timestamp: string;
}

// Mock current user (replace with actual auth data)
const currentUser = {
  name: 'Alumni User',
  avatar: 'https://picsum.photos/id/433/50/50',
  avatarFallback: 'AU',
};

const mockChatPartner = {
  name: 'Priya Sharma',
  avatar: 'https://picsum.photos/seed/priya/50/50',
  avatarFallback: 'PS',
};

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      // Simulate loading initial messages
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            sender: 'other',
            name: mockChatPartner.name,
            avatar: mockChatPartner.avatar,
            avatarFallback: mockChatPartner.avatarFallback,
            text: 'Hi there! How are you doing?',
            timestamp: '10:00 AM',
          },
          {
            id: '2',
            sender: 'user',
            name: currentUser.name,
            avatar: currentUser.avatar,
            avatarFallback: currentUser.avatarFallback,
            text: 'Hey Priya! I\'m doing great, thanks for asking. Just exploring the new Alumnilink platform.',
            timestamp: '10:01 AM',
          },
          {
            id: '3',
            sender: 'other',
            name: mockChatPartner.name,
            avatar: mockChatPartner.avatar,
            avatarFallback: mockChatPartner.avatarFallback,
            text: 'That\'s awesome! It looks really good, doesn\'t it?',
            timestamp: '10:02 AM',
          },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [router]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      name: currentUser.name,
      avatar: currentUser.avatar,
      avatarFallback: currentUser.avatarFallback,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate a reply after a short delay
    setTimeout(() => {
      const reply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'other',
        name: mockChatPartner.name,
        avatar: mockChatPartner.avatar,
        avatarFallback: mockChatPartner.avatarFallback,
        text: 'Got it! Thanks for sharing.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, reply]);
    }, 1500);
  };

  if (isLoading && localStorage.getItem('isAuthenticated') === 'true') {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
        <MessageSquare className="h-12 w-12 text-primary animate-pulse mb-4" />
        <p className="text-muted-foreground">Loading chat...</p>
      </div>
    );
  }
  
  if (localStorage.getItem('isAuthenticated') !== 'true') {
    // This case should ideally be handled by the useEffect redirect,
    // but it's a fallback or for when component renders before useEffect runs.
    return null; 
  }


  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] max-w-3xl mx-auto">
       <div className="flex flex-col items-center text-center mb-6">
        <MessageSquare className="h-10 w-10 text-primary mb-3" />
        <h1 className="text-2xl font-bold tracking-tight">Alumni Chat</h1>
        <p className="text-muted-foreground text-sm">
          Connect with {mockChatPartner.name} (Demo Chat)
        </p>
      </div>

      <Card className="flex-grow flex flex-col shadow-xl">
        <CardHeader className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={mockChatPartner.avatar} alt={mockChatPartner.name} data-ai-hint="person portrait" />
              <AvatarFallback>{mockChatPartner.avatarFallback}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{mockChatPartner.name}</CardTitle>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-grow p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end space-x-2 ${
                msg.sender === 'user' ? 'justify-end' : ''
              }`}
            >
              {msg.sender === 'other' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatar} alt={msg.name} data-ai-hint="person talking"/>
                  <AvatarFallback>{msg.avatarFallback}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70'}`}>
                  {msg.timestamp}
                </p>
              </div>
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatar} alt={msg.name} data-ai-hint="person chat" />
                  <AvatarFallback>{msg.avatarFallback}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>

        <CardFooter className="p-4 border-t">
          <div className="flex w-full space-x-2 items-center">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
