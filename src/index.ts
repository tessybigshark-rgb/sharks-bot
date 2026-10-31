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
import { addCampaign, addProject, addRevenuePlan, state } from './services/store';

const router = Router();

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
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
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

  const payload = req.body ?? {};
  const created = addProject({
    userId: user.id,
    title: String(payload.title ?? 'Untitled project'),
    genre: String(payload.genre ?? 'Afrobeats'),
    mood: String(payload.mood ?? 'uplifting'),
    bpm: Number(payload.bpm ?? 110),
    audience: String(payload.audience ?? 'music lovers'),
    usage: String(payload.usage ?? 'playlist opener'),
    prompt: String(payload.prompt ?? 'Creative music brief'),
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

  const payload = req.body ?? {};
  const created = addCampaign({
    userId: user.id,
    title: String(payload.title ?? 'Social campaign'),
    platform: String(payload.platform ?? 'Instagram'),
    tone: String(payload.tone ?? 'confident'),
    caption: String(payload.caption ?? 'Fresh energy is here.'),
    hashtags: Array.isArray(payload.hashtags) ? payload.hashtags : ['#SharksBot'],
    postingSchedule: Array.isArray(payload.postingSchedule) ? payload.postingSchedule : ['Day 1 teaser'],
  });

  return res.json({ success: true, data: created });
});

router.post('/music/generate', (req: Request, res: Response) => {
  const result = generateMusicBrief(req.body ?? {});
  res.json({ success: true, data: result });
});

router.post('/social/generate', (req: Request, res: Response) => {
  const result = generateSocialCampaign(req.body ?? {});
  res.json({ success: true, data: result });
});

router.post('/spotify/search', async (req: Request, res: Response) => {
  const payload = req.body ?? {};
  const tracks = await searchSpotifyTracks(
    Array.isArray(payload.seedGenres) ? payload.seedGenres : ['afrobeats', 'dancehall'],
    Number(payload.limit ?? 5),
  );
  res.json({ success: true, data: tracks });
});

router.post('/whatsapp/webhook', (req: Request, res: Response) => {
  const payload = req.body ?? {};
  const result = handleIncomingWhatsAppMessage({
    message: payload.message ?? '',
    senderName: payload.senderName ?? 'Fan',
  });
  res.json({ success: true, data: result });
});

router.get('/revenue/ideas', (_req: Request, res: Response) => {
  res.json({ success: true, data: getRevenueIdeas() });
});

router.post('/revenue/checkout', (req: Request, res: Response) => {
  const plan = String(req.body?.plan ?? 'growth');
  const checkout = createCheckoutSession(plan);
  res.json({ success: true, data: checkout });
});

router.post('/ai/insight', async (req: Request, res: Response) => {
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt : 'Create a growth strategy for my music brand.';
  const result = await generateAIInsight(prompt);
  res.json({ success: true, data: result });
});

router.post('/revenue/plans', (req: Request, res: Response) => {
  const user = resolveAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const payload = req.body ?? {};
  const plan = addRevenuePlan({
    userId: user.id,
    planName: String(payload.planName ?? 'Creator Growth Pack'),
    pricing: String(payload.pricing ?? '$49/month'),
    channels: Array.isArray(payload.channels) ? payload.channels : ['Subscriptions'],
  });

  return res.json({ success: true, data: plan });
});

export default router;
