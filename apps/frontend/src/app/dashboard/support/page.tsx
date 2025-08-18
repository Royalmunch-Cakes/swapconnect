'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAuthToken } from '@/hooks/useAuthToken';
import { io, type Socket } from 'socket.io-client';
import { Send, MessageCircle, User, Clock, CheckCheck } from 'lucide-react';
import { API_URL } from '@/lib/config';

interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  messageType: string;
  isRead: boolean;
  createdAt: string;
  Sender: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    role: string;
  };
}

interface Conversation {
  id: string;
  user: string;
  admin?: string;
  subject: string;
  status: string;
  lastMessageAt: string;
  User: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  Admin?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
}

function SupportPage() {
  const token = useAuthToken();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!token) return;

    console.log(
      '[v0] Initializing socket connection with token:',
      token ? 'present' : 'missing'
    );

    const newSocket = io(API_URL, {
    // const newSocket = io('http://localhost:3001', {
      auth: {
        token,
      },
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('[v0] Connected to support chat');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('[v0] Disconnected from support chat');
      setIsConnected(false);
    });

    newSocket.on('receiveMessage', (message: Message) => {
      console.log('[v0] Received message:', message);
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on(
      'conversationJoined',
      (data: { conversation: Conversation; messages: Message[] }) => {
        console.log('[v0] Conversation joined:', data);
        setConversation(data.conversation);
        setMessages(data.messages);
      }
    );

    newSocket.on('joinedRoom', (conversation: Conversation) => {
      console.log('[v0] Joined room:', conversation);
      setConversation(conversation);
    });

    newSocket.on('newMessage', (message: Message) => {
      console.log('[v0] New message:', message);
      setMessages((prev) => [...prev, message]);
      // Mark message as read if it's not from current user
      if (message.senderId !== token) {
        newSocket.emit('markAsRead', {
          conversationId: message.conversationId,
          messageIds: [message.id],
        });
      }
    });

    newSocket.on(
      'userTyping',
      (data: { userId: string; userName: string; isTyping: boolean }) => {
        if (data.isTyping) {
          setTypingUser(data.userName);
        } else {
          setTypingUser(null);
        }
      }
    );

    newSocket.on('error', (error: string | { message: string }) => {
      const errorMessage = typeof error === 'string' ? error : error.message;
      console.error('[v0] Socket error:', errorMessage);
    });

    newSocket.on('connect_error', (error) => {
      console.error('[v0] Connection error:', error);
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    console.log('[v0] Sending message:', input.trim());

    if (conversation) {
      socket.emit('sendMessage', input.trim(), conversation.id);
    } else {
      socket.emit('sendMessage', input.trim());
    }

    setInput('');

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (conversation) {
      socket.emit('typing', {
        conversationId: conversation.id,
        isTyping: false,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (!socket || !conversation) return;

    socket.emit('typing', { conversationId: conversation.id, isTyping: true });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing', {
        conversationId: conversation.id,
        isTyping: false,
      });
    }, 1000);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="pt-[110px] md:pl-[252px] pl-8 pr-8 pb-8 min-h-screen bg-[#F8F9FB]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle
                className="text-[#037F44]"
                size={24}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Support Chat
                </h1>
                <p className="text-sm text-gray-600">
                  Get help from our support team
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm flex flex-col h-[600px]">
          {/* Messages area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageCircle
                  size={48}
                  className="mb-4 opacity-50"
                />
                <p className="text-lg font-medium">Welcome to Support Chat</p>
                <p className="text-sm">
                  Send a message to start the conversation
                </p>
              </div>
            ) : (
              <>
                {messages.map((message, index) => {
                  const isCurrentUser = message.Sender.role === 'user';
                  const showDate =
                    index === 0 ||
                    formatDate(messages[index - 1].createdAt) !==
                      formatDate(message.createdAt);

                  return (
                    <div key={message.id}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                      )}

                      <div
                        className={`flex ${
                          isCurrentUser ? 'justify-end' : 'justify-start'
                        } mb-4`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            isCurrentUser
                              ? 'bg-[#037F44] text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {!isCurrentUser && (
                            <div className="flex items-center gap-2 mb-1">
                              <User size={14} />
                              <span className="text-xs font-medium">
                                {message.Sender.firstName}{' '}
                                {message.Sender.lastName}
                              </span>
                              <span className="text-xs opacity-75 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                Support
                              </span>
                            </div>
                          )}

                          <p className="text-sm">{message.content}</p>

                          <div
                            className={`flex items-center gap-1 mt-1 ${
                              isCurrentUser ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <Clock
                              size={12}
                              className="opacity-60"
                            />
                            <span className={`text-xs opacity-75`}>
                              {formatTime(message.createdAt)}
                            </span>
                            {isCurrentUser && message.isRead && (
                              <CheckCheck
                                size={12}
                                className="opacity-75"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {typingUser && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg max-w-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                        </div>
                        <span className="text-xs">
                          {typingUser} is typing...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <input
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#037F44] focus:border-transparent disabled:bg-gray-100"
                value={input}
                onChange={handleInputChange}
                placeholder={
                  isConnected ? 'Type your message...' : 'Connecting...'
                }
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                disabled={!isConnected}
              />
              <button
                className="bg-[#037F44] text-white px-6 py-2 rounded-lg hover:bg-[#025c32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={sendMessage}
                disabled={!input.trim() || !isConnected}
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
