# Sharks Bot

Sharks Bot is a full-stack AI music, WhatsApp, Spotify, and social media automation platform for creators, artists, and digital brands. It helps manage music generation, playlist recommendation, campaign content, communication flows, and monetization ideas in one place.

## Features
- AI music brief generation
- WhatsApp message automation
- Spotify recommendation search layer
- Social media content generation
- Revenue and subscription planning
- Dashboard UI for testing the app

## Tech stack
- Node.js
- TypeScript
- Express
- Static front-end dashboard
- Spotify API-ready service layer
- Twilio-ready WhatsApp workflow

## Quick start

1. Install dependencies:
   npm install

2. Set environment variables:
   cp .env.example .env

3. Start the app in development mode:
   npm run dev

4. Open the dashboard:
   http://localhost:4000

## Available API routes

- GET /health
- GET /api/dashboard/summary
- POST /api/music/generate
- POST /api/social/generate
- POST /api/spotify/search
- POST /api/whatsapp/webhook
- GET /api/revenue/ideas

## Example requests

Generate a music brief:

```bash
curl -X POST http://localhost:4000/api/music/generate \
  -H "Content-Type: application/json" \
  -d '{
    "genre": "Afrobeats",
    "mood": "happy",
    "bpm": 110,
    "audience": "young creators",
    "usage": "opening track"
  }'
```

Generate social content:

```bash
curl -X POST http://localhost:4000/api/social/generate \
  -H "Content-Type: application/json" \
  -d '{
    "artistName": "Sharks",
    "songTitle": "Night Signal",
    "platform": "Instagram",
    "tone": "confident"
  }'
```

Search Spotify recommendations:

```bash
curl -X POST http://localhost:4000/api/spotify/search \
  -H "Content-Type: application/json" \
  -d '{
    "seedGenres": ["afrobeats", "dancehall"],
    "limit": 3
  }'
```

Process a WhatsApp message:

```bash
curl -X POST http://localhost:4000/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Create a playlist for a late-night drive",
    "senderName": "Kofi"
  }'
```

## Notes
This repository is a strong starter foundation for a real business product. The service layer is structured to allow easy integration with real AI, Spotify, WhatsApp, and Stripe APIs when you are ready.
