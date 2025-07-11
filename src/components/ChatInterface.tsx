import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Plus, Send, Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions).map((session: ChatSession) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        messages: session.messages.map((message: Message) => ({
          ...message,
          timestamp: new Date(message.timestamp)
        }))
      }));
      setChatSessions(sessions);
      if (sessions.length > 0) {
        setCurrentSessionId(sessions[0].id);
        setMessages(sessions[0].messages);
      }
    } else {
      startNewChat();
    }
  }, []);

  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    }
  }, [chatSessions]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const generateSessionTitle = (firstMessage: string) => {
    return firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage;
  };

  const startNewChat = () => {
    const newSessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    
    setChatSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
    setMessages([]);
    toast.success('New chat started!');
  };

  const updateCurrentSession = (newMessages: Message[]) => {
    setChatSessions(prev => 
      prev.map(session => 
        session.id === currentSessionId 
          ? { 
              ...session, 
              messages: newMessages,
              title: newMessages.length > 0 && session.title === 'New Chat' 
                ? generateSessionTitle(newMessages[0].content)
                : session.title
            }
          : session
      )
    );
  };

  const simulateAPIResponse = async (userMessage: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    const lower = userMessage.toLowerCase();

    if (/(hi|hello|hey|hai)/.test(lower)) {
      return "Hi there! 👋 I'm your AI assistant. How can I help you today?";
    }

    if (/how are you/.test(lower)) {
      return "I'm functioning perfectly! Thanks for asking 😊 What can I assist you with today?";
    }

    if (/(help|support|assist|can you)/.test(lower)) {
      return "Of course! Just ask your question and I’ll do my best to help.";
    }

    if (/who are you|what can you do/.test(lower)) {
      return "I'm a smart AI assistant created to help with questions, coding, learning, and more! 🚀";
    }

    if (/(code|programming|bug|error|logic|syntax)/.test(lower)) {
      return "Let's solve it together! What programming language or issue are you working on?";
    }

    if (/(weather|temperature|climate)/.test(lower)) {
      return "I don't have live weather data, but you can check weather.com or a weather app for real-time updates. 🌤️";
    }

    if (/(recipe|cooking|food)/.test(lower)) {
      return "Yum! 😋 Let me know what kind of dish you want and I’ll suggest a recipe.";
    }

    if (/(what|why|how|when|where|can|do you know)/.test(lower)) {
      const responses = [
        "That's a great question! 🤔 Here's my take on it...",
        "Interesting! Let me explain what I know.",
        "Let's dive into that. Here's how I see it...",
        "Based on my knowledge, here's something to consider...",
        "Good one! Here's a helpful answer..."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    return "Hmm... that's interesting. Could you rephrase or add more details? I'm here to help! 🤖";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    updateCurrentSession(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await simulateAPIResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      updateCurrentSession(finalMessages);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const loadChatSession = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
    }
  };

  const deleteChatSession = (sessionId: string) => {
    setChatSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (sessionId === currentSessionId) {
        if (filtered.length > 0) {
          setCurrentSessionId(filtered[0].id);
          setMessages(filtered[0].messages);
        } else {
          startNewChat();
        }
      }
      return filtered;
    });
    toast.success('Chat deleted successfully');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <Button 
            onClick={startNewChat}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {chatSessions.map((session) => (
              <Card 
                key={session.id}
                className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md group ${
                  currentSessionId === session.id 
                    ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-300' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => loadChatSession(session.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <MessageCircle className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session.title}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {session.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChatSession(session.id);
                    }}
                  >
                    <Trash className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Chatbot Assistant
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Ask me anything! I'm here to help with any topic you'd like to discuss.
          </p>
        </div>

        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Start a conversation
                </h3>
                <p className="text-gray-600">
                  Type a message below to begin chatting with your AI assistant
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  disabled={isLoading}
                  className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • This is a demo version with simulated responses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
