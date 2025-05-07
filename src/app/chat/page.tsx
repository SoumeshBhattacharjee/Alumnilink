
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageSquare, Search, UserCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import ChatListItem from '@/components/chat/ChatListItem'; // New component for chat list items

interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  name: string;
  avatar: string;
  avatarFallback: string;
  text: string;
  timestamp: string;
}

interface ChatPartner {
  id: string;
  name: string;
  avatar: string;
  avatarFallback: string;
  online?: boolean;
  dataAiHint?: string;
}

interface Conversation {
  id: string;
  partner: ChatPartner;
  messages: ChatMessage[];
  lastMessagePreview: string;
  lastMessageTimestamp: string;
  unreadCount?: number;
}

// Mock current user (replace with actual auth data)
const currentUser = {
  id: 'currentUser',
  name: 'Alumni User',
  avatar: 'https://picsum.photos/id/433/50/50',
  avatarFallback: 'AU',
  dataAiHint: 'user current',
};

const mockInitialConversations: Conversation[] = [
  {
    id: 'conv1',
    partner: { id: 'priya', name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/priya/50/50', avatarFallback: 'PS', online: true, dataAiHint: "professional woman" },
    messages: [
      { id: 'msg1_1', sender: 'other', name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/priya/50/50', avatarFallback: 'PS', text: 'Hi there! How are you doing?', timestamp: '10:00 AM' },
      { id: 'msg1_2', sender: 'user', name: currentUser.name, avatar: currentUser.avatar, avatarFallback: currentUser.avatarFallback, text: 'Hey Priya! I\'m doing great, thanks for asking. Just exploring the new Alumnilink platform.', timestamp: '10:01 AM' },
      { id: 'msg1_3', sender: 'other', name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/priya/50/50', avatarFallback: 'PS', text: 'That\'s awesome! It looks really good, doesn\'t it?', timestamp: '10:02 AM' },
    ],
    lastMessagePreview: 'That\'s awesome! It looks really good...',
    lastMessageTimestamp: '10:02 AM',
    unreadCount: 1,
  },
  {
    id: 'conv2',
    partner: { id: 'rajesh', name: 'Rajesh Kumar', avatar: 'https://picsum.photos/seed/rajeshk/50/50', avatarFallback: 'RK', online: false, dataAiHint: "man glasses" },
    messages: [
      { id: 'msg2_1', sender: 'other', name: 'Rajesh Kumar', avatar: 'https://picsum.photos/seed/rajeshk/50/50', avatarFallback: 'RK', text: 'Hello! Did you see the latest job posting?', timestamp: 'Yesterday' },
      { id: 'msg2_2', sender: 'user', name: currentUser.name, avatar: currentUser.avatar, avatarFallback: currentUser.avatarFallback, text: 'Not yet, I\'ll check it out. Thanks for the heads up!', timestamp: 'Yesterday' },
    ],
    lastMessagePreview: 'Not yet, I\'ll check it out...',
    lastMessageTimestamp: 'Yesterday',
  },
  {
    id: 'conv3',
    partner: { id: 'ananya', name: 'Ananya Singh', avatar: 'https://picsum.photos/seed/ananya/50/50', avatarFallback: 'AS', online: true, dataAiHint: "woman developer" },
    messages: [
      { id: 'msg3_1', sender: 'user', name: currentUser.name, avatar: currentUser.avatar, avatarFallback: currentUser.avatarFallback, text: 'Hi Ananya, are you attending the alumni meet?', timestamp: 'Mon' },
    ],
    lastMessagePreview: 'Hi Ananya, are you attending the alumni meet?',
    lastMessageTimestamp: 'Mon',
    unreadCount: 0,
  },
   {
    id: 'conv4',
    partner: { id: 'vikram', name: 'Vikram Das', avatar: 'https://picsum.photos/seed/vikram/50/50', avatarFallback: 'VD', dataAiHint: "technology professional" },
    messages: [
        { id: 'msg4_1', sender: 'other', name: 'Vikram Das', avatar: 'https://picsum.photos/seed/vikram/50/50', avatarFallback: 'VD', text: 'Great presentation today!', timestamp: '11:30 AM' },
    ],
    lastMessagePreview: 'Great presentation today!',
    lastMessageTimestamp: '11:30 AM',
  },
];

export default function ChatPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      setTimeout(() => {
        setConversations(mockInitialConversations);
        setIsLoading(false);
      }, 1000);
    }
  }, [router]);

  const selectedConversation = useMemo(() => {
    return conversations.find(conv => conv.id === selectedConversationId);
  }, [conversations, selectedConversationId]);

  const filteredConversations = useMemo(() => {
    if (!searchTerm) return conversations;
    return conversations.filter(conv =>
      conv.partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [conversations, searchTerm]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    // Mark messages as read (optional)
    setConversations(prevConvs => prevConvs.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    ));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedConversation) return;

    const message: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      name: currentUser.name,
      avatar: currentUser.avatar,
      avatarFallback: currentUser.avatarFallback,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Simulate a reply after a short delay
    const replyText = selectedConversation.partner.name.includes("Priya") 
      ? "Sounds good! Let's catch up soon."
      : "Okay, noted.";

    const reply: ChatMessage = {
      id: String(Date.now() + 1),
      sender: 'other',
      name: selectedConversation.partner.name,
      avatar: selectedConversation.partner.avatar,
      avatarFallback: selectedConversation.partner.avatarFallback,
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setConversations(prevConvs =>
      prevConvs.map(conv => {
        if (conv.id === selectedConversationId) {
          const updatedMessages = [...conv.messages, message, reply];
          return {
            ...conv,
            messages: updatedMessages,
            lastMessagePreview: reply.text.substring(0, 30) + (reply.text.length > 30 ? '...' : ''),
            lastMessageTimestamp: reply.timestamp,
          };
        }
        return conv;
      })
    );
    setNewMessage('');
  };

  if (isLoading && localStorage.getItem('isAuthenticated') === 'true') {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
        <MessageSquare className="h-12 w-12 text-primary animate-pulse mb-4" />
        <p className="text-muted-foreground">Loading chats...</p>
      </div>
    );
  }
  
  if (localStorage.getItem('isAuthenticated') !== 'true') return null;

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] max-w-7xl mx-auto">
      <div className="flex items-center justify-center text-center mb-6">
        <MessageSquare className="h-10 w-10 text-primary mr-3" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alumni Messenger</h1>
          <p className="text-muted-foreground text-sm">
            Connect and chat with fellow alumni.
          </p>
        </div>
      </div>

      <div className="flex-grow flex border rounded-lg shadow-xl overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r flex flex-col bg-muted/30">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search chats..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-grow">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conv => (
                <ChatListItem
                  key={conv.id}
                  conversation={conv}
                  isSelected={selectedConversationId === conv.id}
                  onSelect={handleSelectConversation}
                />
              ))
            ) : (
              <p className="p-4 text-center text-sm text-muted-foreground">No chats found.</p>
            )}
          </ScrollArea>
        </div>

        {/* Chat View Area */}
        <div className="w-2/3 flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation.partner.avatar} alt={selectedConversation.partner.name} data-ai-hint={selectedConversation.partner.dataAiHint || "person portrait"} />
                    <AvatarFallback>{selectedConversation.partner.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedConversation.partner.name}</CardTitle>
                    <p className={`text-xs ${selectedConversation.partner.online ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {selectedConversation.partner.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="flex-grow p-4 space-y-4 bg-background">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end space-x-2 ${
                      msg.sender === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {msg.sender === 'other' && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={msg.avatar} alt={msg.name} data-ai-hint={selectedConversation.partner.dataAiHint || "person talking"} />
                        <AvatarFallback>{msg.avatarFallback}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md p-3 rounded-lg shadow ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-card text-card-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-right'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                    {msg.sender === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={msg.avatar} alt={msg.name} data-ai-hint={currentUser.dataAiHint || "person chat"} />
                        <AvatarFallback>{msg.avatarFallback}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </ScrollArea>

              <CardFooter className="p-4 border-t bg-muted/50">
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
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-background">
              <UserCircle className="h-20 w-20 text-muted-foreground/50 mb-4" />
              <h2 className="text-xl font-semibold text-muted-foreground">Select a chat to start messaging</h2>
              <p className="text-sm text-muted-foreground">Or search for alumni to begin a new conversation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

