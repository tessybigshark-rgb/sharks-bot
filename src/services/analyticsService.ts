import { randomUUID } from 'node:crypto';

import OpenAI from 'openai';

import { envConfig } from '../config/env';

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'fan';
  createdAt: string;
};

export type MusicProject = {
  id: string;
  userId: string;
  title: string;
  genre: string;
  mood: string;
  bpm: number;
  audience: string;
  usage: string;
  prompt: string;
  status: 'draft' | 'ready' | 'published';
  createdAt: string;
};

export type SocialCampaign = {
  id: string;
  userId: string;
  title: string;
  platform: string;
  tone: string;
  caption: string;
  hashtags: string[];
  postingSchedule: string[];
  createdAt: string;
};

export type PlaylistIdea = {
  id: string;
  userId: string;
  name: string;
  tracks: string[];
  createdAt: string;
};

export type RevenuePlan = {
  id: string;
  userId: string;
  planName: string;
  pricing: string;
  channels: string[];
  createdAt: string;
};

export type AIResponse = {
  summary: string;
  recommendations: string[];
  model: string;
};

export const demoUsers: AppUser[] = [
  {
    id: 'user-1',
    name: 'Tessy Shark',
    email: 'tessy@sharksbot.ai',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-2',
    name: 'Kofi Creator',
    email: 'kofi@creator.com',
    role: 'creator',
    createdAt: new Date().toISOString(),
  },
];

export const demoProjects: MusicProject[] = [
  {
    id: 'project-1',
    userId: 'user-1',
    title: 'Night Signal',
    genre: 'Afrobeats',
    mood: 'confident',
    bpm: 112,
    audience: 'young creators',
    usage: 'opening track',
    prompt: 'Create a warm Afrobeats opening track with moody synths and a confident hook.',
    status: 'ready',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'project-2',
    userId: 'user-2',
    title: 'Midnight Mood',
    genre: 'House',
    mood: 'deep',
    bpm: 118,
    audience: 'night listeners',
    usage: 'club intro',
    prompt: 'Craft a rich house intro with subtle percussion and immersive atmosphere.',
    status: 'draft',
    createdAt: new Date().toISOString(),
  },
];

export const demoCampaigns: SocialCampaign[] = [
  {
    id: 'campaign-1',
    userId: 'user-1',
    title: 'Launch campaign',
    platform: 'Instagram',
    tone: 'confident',
    caption: 'Fresh energy is in the room. This is your signal to press play and share the moment.',
    hashtags: ['#SharksBot', '#NewMusic', '#CreatorEconomy'],
    postingSchedule: ['Day 1 teaser', 'Day 2 quote graphic', 'Day 4 release day'],
    createdAt: new Date().toISOString(),
  },
];

export const demoPlaylists: PlaylistIdea[] = [
  {
    id: 'playlist-1',
    userId: 'user-1',
    name: 'Late Night Signal',
    tracks: ['Night Signal', 'Afterglow', 'Road to the Studio', 'Midnight Echo'],
    createdAt: new Date().toISOString(),
  },
];

export const demoRevenuePlans: RevenuePlan[] = [
  {
    id: 'revenue-1',
    userId: 'user-1',
    planName: 'Creator Growth Pack',
    pricing: '$49/month',
    channels: ['Subscriptions', 'Affiliate tools', 'Brand sponsorships'],
    createdAt: new Date().toISOString(),
  },
];

export function createId(prefix: string): string {
  return `${prefix}-${randomUUID()}`;
}

export async function generateAIInsight(prompt: string): Promise<AIResponse> {
  if (!envConfig.OPENAI_API_KEY) {
    return {
      summary: `AI insight for: ${prompt}`,
      recommendations: [
        'Build a stronger hook for the first 10 seconds',
        'Use a consistent visual identity across music and social posts',
        'Offer a premium fan plan to convert engagement into revenue',
      ],
      model: 'demo-mode',
    };
  }

  try {
    const client = new OpenAI({ apiKey: envConfig.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are Sharks Bot, a creative strategist for music, social media, and creator growth.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const content = completion.choices[0]?.message?.content ?? 'AI insight unavailable';
    return {
      summary: content,
      recommendations: [
        'Refine the message hook',
        'Create a consistent release schedule',
        'Monetize attention through premium offers',
      ],
      model: 'gpt-4o-mini',
    };
  } catch (error) {
    console.error('OpenAI generation failed:', error);
    return {
      summary: `Fallback AI insight for: ${prompt}`,
      recommendations: ['Test an audience-specific caption', 'Use a short-form content cadence', 'Offer one premium bundle'],
      model: 'demo-mode',
    };
  }
}

