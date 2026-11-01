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

export type RevenuePlan = {
  id: string;
  userId: string;
  planName: string;
  pricing: string;
  channels: string[];
  createdAt: string;
};

export type AppState = {
  users: AppUser[];
  projects: MusicProject[];
  campaigns: SocialCampaign[];
  revenuePlans: RevenuePlan[];
};

export const state: AppState = {
  users: [
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
  ],
  projects: [
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
  ],
  campaigns: [
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
  ],
  revenuePlans: [
    {
      id: 'revenue-1',
      userId: 'user-1',
      planName: 'Creator Growth Pack',
      pricing: '$49/month',
      channels: ['Subscriptions', 'Affiliate tools', 'Brand sponsorships'],
      createdAt: new Date().toISOString(),
    },
  ],
};

export function getUserByEmail(email: string): AppUser | null {
  return state.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function getUserById(id: string): AppUser | null {
  return state.users.find((user) => user.id === id) ?? null;
}

export function addProject(project: Omit<MusicProject, 'id' | 'createdAt'>) {
  const item: MusicProject = {
    ...project,
    id: `project-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  state.projects.unshift(item);
  return item;
}

export function addCampaign(campaign: Omit<SocialCampaign, 'id' | 'createdAt'>) {
  const item: SocialCampaign = {
    ...campaign,
    id: `campaign-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  state.campaigns.unshift(item);
  return item;
}

export function addRevenuePlan(plan: Omit<RevenuePlan, 'id' | 'createdAt'>) {
  const item: RevenuePlan = {
    ...plan,
    id: `revenue-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  state.revenuePlans.unshift(item);
  return item;
}

export function loginWithEmail(email: string): AppUser | null {
  const user = getUserByEmail(email);
  return user ? { ...user } : null;
}

export function resolveAuthenticatedUser(req: { headers: Record<string, string | string[] | undefined> }): AppUser | null {
  const rawUserId = req.headers['x-user-id'];
  const userId = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId ?? null;

  if (!userId) {
    const fallback = state.users[0] ?? null;
    return fallback ? { ...fallback } : null;
  }

  const user = getUserById(userId);
  return user ? { ...user } : null;
}

