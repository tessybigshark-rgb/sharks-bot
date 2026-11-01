import { Router, type Request, type Response } from 'express';

import { generateAIInsight } from './services/aiService';
import { resolveAuthenticatedUser, loginWithEmail } from './services/authService';
import { getDashboardSummary } from './services/analyticsService';
import { generateMusicBrief } from './services/musicService';
import { generateSocialCampaign } from './services/socialMediaService';
import { createCheckoutSession } from './services/paymentService';
import { getRevenueIdeas } from './services/revenueService';
import { searchSpotifyTracks } from './services/spotifyService';
import { handleIncomingWhatsAppMessage } from './services/whatsappService';
import { getAutomationStatus, triggerAutoOperations } from './services/automationService';
import {
  addCampaign,
  addProject,
  addRevenuePlan,
  registerFeature,
  state,
  toggleFeature,
} from './services/store';

const router = Router();

function asString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
  return '';
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  return [];
}

router.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true, status: 'healthy', app: 'Sharks Bot' });
});

router.get('/dashboard/summary', (req: Request, res: Response) => {
  const user = resolveAuthenticatedUser(req);
  res.json({
    success: true,
    user,
    data: getDashboardSummary(),
  });
});

router.post('/auth/login', (req: Request, res: Response) => {
  const email = asString(req.body?.email).trim();
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const user = loginWithEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'No account found for that email' });
  }

  return res.json({ success: true, data: user });
});

router.get('/auth/me', (req: Request, res: Response) => {
  const user = resolveAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  return res.json({ success: true, data: user });
});

router.get('/projects', (req: Request, res: Response) => {
  const user = resolveAuthenticatedUser(req);
  const projects = user ? state.projects.filter((project) => project.userId === user.id) : state.projects;
  res.json({ success: true, data: projects });
});

router.post('/projects', (req: Request, res: Response) => {
  const user = resolveAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const payload = (req.body ?? {}) as Record<string, unknown>;
  const created = addProject({
    userId: user.id,
    title: asString(payload.title) || 'Untitled project',
    genre: asString(payload.genre) || 'Afrobeats',
    mood: asString(payload.mood) || 'uplifting',
    bpm: Number(asString(payload.bpm)) || 110,
    audience: asString(payload.audience) || 'music lovers',
    usage: asString(payload.usage) || 'playlist opener',
    prompt: asString(payload.prompt) || 'Creative music brief',
    status: 'draft',
  });

  return res.json({ success: true, data: created });
});

router.get('/campaigns', (req: Request, res: Response) => {
  const user = resolveAuthenticatedUser(req);
  const campaigns = user ? state.campaigns.filter((item) => item.userId === user.id) : state.campaigns;
  res.json({ success: true, data: campaigns });
});

router.post('/campaigns', (req: Request, res: Response) => {
  const user = resolveAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const payload = (req.body ?? {}) as Record<string, unknown>;
  const created = addCampaign({
    userId: user.id,
    title: asString(payload.title) || 'Social campaign',
    platform: asString(payload.platform) || 'Instagram',
    tone: asString(payload.tone) || 'confident',
    caption: asString(payload.caption) || 'Fresh energy is here.',
    hashtags: asStringArray(payload.hashtags).length ? asStringArray(payload.hashtags) : ['#SharksBot'],
    postingSchedule: asStringArray(payload.postingSchedule).length ? asStringArray(payload.postingSchedule) : ['Day 1 teaser'],
  });

  return res.json({ success: true, data: created });
});

router.post('/music/generate', (req: Request, res: Response) => {
  const result = generateMusicBrief((req.body ?? {}) as Record<string, unknown>);
  res.json({ success: true, data: result });
});

router.post('/social/generate', (req: Request, res: Response) => {
  const result = generateSocialCampaign((req.body ?? {}) as Record<string, unknown>);
  res.json({ success: true, data: result });
});

router.post('/spotify/search', async (req: Request, res: Response) => {
  const payload = (req.body ?? {}) as Record<string, unknown>;
  const seedGenres = Array.isArray(payload.seedGenres)
    ? payload.seedGenres.filter((item): item is string => typeof item === 'string')
    : ['afrobeats', 'dancehall'];

  const tracks = await searchSpotifyTracks(seedGenres.length ? seedGenres : ['afrobeats', 'dancehall'], Number(payload.limit ?? 5));
  res.json({ success: true, data: tracks });
});

router.post('/whatsapp/webhook', (req: Request, res: Response) => {
  const payload = (req.body ?? {}) as Record<string, unknown>;
  const result = handleIncomingWhatsAppMessage({
    message: asString(payload.message),
    senderName: asString(payload.senderName) || 'Fan',
  });
  res.json({ success: true, data: result });
});

router.get('/revenue/ideas', (_req: Request, res: Response) => {
  res.json({ success: true, data: getRevenueIdeas() });
});

router.post('/revenue/checkout', (req: Request, res: Response) => {
  const plan = asString(req.body?.plan) || 'growth';
  const checkout = createCheckoutSession(plan);
  res.json({ success: true, data: checkout });
});

router.post('/ai/insight', async (req: Request, res: Response) => {
  const prompt = asString(req.body?.prompt) || 'Create a growth strategy for my music brand.';
  const result = await generateAIInsight(prompt);
  res.json({ success: true, data: result });
});

router.post('/revenue/plans', (req: Request, res: Response) => {
  const user = resolveAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const payload = (req.body ?? {}) as Record<string, unknown>;
  const plan = addRevenuePlan({
    userId: user.id,
    planName: asString(payload.planName) || 'Creator Growth Pack',
    pricing: asString(payload.pricing) || '$49/month',
    channels: asStringArray(payload.channels).length ? asStringArray(payload.channels) : ['Subscriptions'],
  });

  return res.json({ success: true, data: plan });
});

router.get('/features', (_req: Request, res: Response) => {
  res.json({ success: true, data: state.features });
});

router.post('/features', (req: Request, res: Response) => {
  const payload = (req.body ?? {}) as Record<string, unknown>;
  const feature = registerFeature({
    id: asString(payload.id) || `feature-${Date.now()}`,
    name: asString(payload.name) || 'New feature',
    description: asString(payload.description) || 'Custom bot feature',
    category: (asString(payload.category) || 'automation') as 'music' | 'marketing' | 'automation' | 'analytics' | 'revenue' | 'system',
    enabled: payload.enabled !== false,
  });

  return res.json({ success: true, data: feature });
});

router.patch('/features/:id/toggle', (req: Request, res: Response) => {
  const payload = (req.body ?? {}) as Record<string, unknown>;
  const feature = toggleFeature(req.params.id, typeof payload.enabled === 'boolean' ? payload.enabled : undefined);

  if (!feature) {
    return res.status(404).json({ success: false, message: 'Feature not found' });
  }

  return res.json({ success: true, data: feature });
});

router.get('/automation/status', (_req: Request, res: Response) => {
  res.json({ success: true, data: getAutomationStatus() });
});

router.post('/automation/run', (_req: Request, res: Response) => {
  res.json({ success: true, data: triggerAutoOperations() });
});

export default router;

