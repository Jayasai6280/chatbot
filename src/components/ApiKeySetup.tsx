import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, Key } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

const ApiKeySetup = ({ onApiKeySet }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      onApiKeySet(apiKey.trim());
      toast.success('API key saved successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Key className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Setup OpenAI API Key</CardTitle>
          <CardDescription>
            Enter your OpenAI API key to start using the chatbot with real AI responses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <h4 className="font-medium text-blue-900 mb-2">How to get your API key:</h4>
              <ol className="text-blue-800 space-y-1 list-decimal list-inside">
                <li>Visit the OpenAI API website</li>
                <li>Create an account or sign in</li>
                <li>Navigate to the API keys section</li>
                <li>Create a new API key</li>
                <li>Copy and paste it here</li>
              </ol>
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-2"
              >
                Open OpenAI API Keys <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={!apiKey.trim()}
            >
              Save API Key & Continue
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => onApiKeySet('')}
            >
              Continue with Demo Mode
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeySetup;
