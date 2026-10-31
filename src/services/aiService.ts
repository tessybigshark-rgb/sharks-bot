import { randomUUID } from 'node:crypto';

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
