# Repo Match Chat

A deploy-ready web app that combines a GitHub search connector with an OpenAI-compatible or Ollama model to find repositories that best match a user's requirements.

## Features

- Chat-based user requirement input
- GitHub repository search connector
- OpenAI-compatible or Ollama-compatible AI ranking
- Results panel showing top matching repositories
- Environment-based configuration for deployment

## Tech stack

- Next.js
- React
- GitHub REST API
- OpenAI-compatible AI API or Ollama

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

3. Fill in values:
   ```bash
   GITHUB_TOKEN=your_github_token_optional
   OPENAI_API_KEY=your_key_if_using_openai
   OPENAI_BASE_URL=https://api.openai.com/v1
   OPENAI_MODEL=gpt-4o-mini
   OLLAMA_BASE_URL=http://localhost:11434/v1
   OLLAMA_MODEL=llama3.1
   ```

4. Start the app:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`

## Deployment

This app is ready for deployment on Vercel or any Node-compatible host.

- Set the same environment variables in your deployment platform.
- For Vercel: add the variables in Project Settings > Environment Variables.
- For Ollama: run Ollama locally and expose the OpenAI-compatible API at `/v1`.

## How it works

1. User enters a requirement such as "I need a React app with authentication and charts".
2. The app searches GitHub repositories using the GitHub Search API.
3. The AI model ranks the repositories based on relevance to the requirement.
4. The strongest matches are displayed in the UI with details and reasons.

## Notes

- GitHub API requests work without a token for public repositories, but a token improves rate limits.
- If no AI API key is provided, the app falls back to a best-effort heuristic ranking.
