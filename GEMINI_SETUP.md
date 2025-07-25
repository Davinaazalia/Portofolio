# Gemini AI Chatbot Setup

## Setting up Google Gemini API

To enable the AI chatbot functionality, you need to get a Google Gemini API key:

### Steps:

1. **Get API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated API key

2. **Configure Environment:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` file and replace `your_actual_gemini_api_key_here` with your actual API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Security:**
   - Never commit `.env` file with real API keys to version control
   - Make sure `.env` is in your `.gitignore` file

### Fallback Mode:

If no API key is provided, the chatbot will use pre-programmed responses about Davina's portfolio. The chatbot will automatically detect if an API key is available and switch between modes.

### Testing:

After setting up the API key, restart your development server:
```bash
npm run dev
```

The chatbot will now use Google Gemini AI for more intelligent responses!
