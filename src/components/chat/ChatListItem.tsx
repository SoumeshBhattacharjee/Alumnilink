
'use client';

import type { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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

interface ChatListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (conversationId: string) => void;
}

const ChatListItem: FC<ChatListItemProps> = ({ conversation, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(conversation.id)}
      className={cn(
        "flex items-center p-3 space-x-3 cursor-pointer hover:bg-muted/80 border-b border-border/50",
        isSelected && "bg-primary/10 hover:bg-primary/20"
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(conversation.id)}
      aria-pressed={isSelected}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={conversation.partner.avatar} alt={conversation.partner.name} data-ai-hint={conversation.partner.dataAiHint || "person profile"} />
        <AvatarFallback>{conversation.partner.avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className={cn("font-semibold truncate", isSelected ? "text-primary" : "text-foreground")}>
            {conversation.partner.name}
          </p>
          <p className={cn("text-xs", isSelected ? "text-primary/80" : "text-muted-foreground")}>
            {conversation.lastMessageTimestamp}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className={cn("text-sm truncate", isSelected ? "text-foreground/90" : "text-muted-foreground")}>
            {conversation.lastMessagePreview}
          </p>
          {conversation.unreadCount && conversation.unreadCount > 0 && (
            <span className="ml-2 flex items-center justify-center h-5 w-5 text-xs rounded-full bg-primary text-primary-foreground">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
