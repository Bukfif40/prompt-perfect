# Prompt Perfect

Prompt Perfect is a modern web app that helps you instantly rewrite and improve any prompt for use with AI models like ChatGPT. It uses OpenAI's GPT-3.5 model to make your prompts clearer, more specific, and more effective—without ever answering them.

## Features

- User-friendly React + Tailwind CSS frontend
- FastAPI backend with OpenAI integration
- Copy-to-clipboard for enhanced prompts
- Prompt history and reset button
- Secure API key handling (never exposed to frontend)
- Error handling and loading states

## Who is it for?

- Anyone who wants to write better prompts for AI models
- Teachers, students, developers, content creators, and business professionals

## How does it work?

1. Enter your prompt in the web app
2. Click **Enhance Prompt**
3. Instantly get a rewritten, improved prompt
4. Copy, reset, or view your prompt history

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** FastAPI (Python), Uvicorn, OpenAI, python-dotenv

## Local Development

1. Clone the repo
2. Set your OpenAI API key in `backend/.env` as `OPENAI_API_KEY=sk-...`
3. Start the backend:

   ```bash
   cd backend
   uvicorn main:app --reload
   ```

4. Start the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Deployment

- Deploy the frontend to Vercel or Netlify
- Deploy the backend to Render or Heroku
- Update the frontend API URL to point to your backend

## License

MIT
