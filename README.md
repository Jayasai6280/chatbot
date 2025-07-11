
# AI Chatbot Assistant

A modern, responsive chatbot application built with React and TypeScript that can integrate with OpenAI's API for intelligent conversations on any topic.

## Features

- 🤖 **AI-Powered Conversations**: Integrates with OpenAI API for intelligent responses
- 💬 **Chat Session Management**: Create, view, and delete multiple chat sessions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 💾 **Local Storage**: Chat history is saved locally in your browser
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- ⚡ **Real-time Updates**: Live typing indicators and instant message delivery
- 🔒 **Secure**: API keys are stored locally and never transmitted to our servers

## Demo Mode

The application works in demo mode without an API key, providing simulated responses for testing and development purposes.

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- OpenAI API key (optional, for real AI responses)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd ai-chatbot-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to use the chatbot

### Obtaining and Configuring OpenAI API Key

1. **Create an OpenAI Account**
   - Visit [OpenAI's website](https://platform.openai.com/)
   - Sign up for an account or log in if you already have one

2. **Generate an API Key**
   - Go to the [API Keys section](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Copy the generated key (it starts with `sk-`)

3. **Configure the API Key**
   - When you first open the application, you'll see an API key setup screen
   - Paste your OpenAI API key in the input field
   - Click "Save API Key & Continue"
   - Alternatively, click "Continue with Demo Mode" to use simulated responses

4. **API Usage Notes**
   - API keys are stored locally in your browser
   - Each API call to OpenAI incurs a small cost based on their pricing
   - Monitor your usage in the OpenAI dashboard

## Usage Guide

### Starting a New Chat
- Click the "New Chat" button in the sidebar
- This creates a fresh conversation session

### Sending Messages
- Type your message in the input field at the bottom
- Press Enter or click the send button
- The AI will respond based on your input

### Managing Chat History
- All conversations are automatically saved
- View previous chats by clicking on them in the sidebar
- Delete unwanted chats using the trash icon that appears on hover
- Chat titles are automatically generated from the first message

### Features Overview

**Chat Interface:**
- Clean, modern design with message bubbles
- Timestamps for each message
- Typing indicators when AI is responding
- Auto-scroll to latest messages

**Session Management:**
- Multiple chat sessions support
- Persistent local storage
- Easy switching between conversations
- Automatic title generation

**Responsive Design:**
- Works on all screen sizes
- Touch-friendly mobile interface
- Optimized for both desktop and mobile use

## Technical Details

### Built With
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Vite** - Fast development and building

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ChatInterface.tsx
│   └── ApiKeySetup.tsx
├── pages/              # Main pages
│   └── Index.tsx
├── lib/                # Utilities
└── hooks/              # Custom React hooks
```

### Data Storage
- Chat sessions are stored in browser's localStorage
- No data is sent to external servers (except OpenAI API calls)
- All data persists between browser sessions

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization
The application is built with modularity in mind. You can easily:
- Modify the UI theme by editing Tailwind classes
- Add new features by creating new components
- Extend chat functionality with additional API integrations
- Customize the AI behavior by modifying prompt handling

## API Integration Notes

This application is designed to work with OpenAI's GPT models. To integrate with the actual OpenAI API:

1. Replace the `simulateAPIResponse` function in `ChatInterface.tsx` with actual API calls
2. Install the OpenAI SDK: `npm install openai`
3. Implement proper error handling and rate limiting
4. Consider using a backend service for production deployments

## Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build the project for production:
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure your OpenAI API key is valid and has sufficient credits
3. Try refreshing the page or clearing browser storage
4. Create an issue in the GitHub repository

## Future Enhancements

Potential features for future versions:
- File upload support
- Image generation capabilities
- Voice input/output
- Custom AI model selection
- Export chat history
- User authentication
- Cloud synchronization
