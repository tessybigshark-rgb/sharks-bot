import { envConfig } from '../config/env';
import { generateMusicBrief } from './musicService';
import { generateSocialCampaign } from './socialMediaService';

export type OfflineActionType = 'music' | 'social' | 'revenue' | 'dashboard' | 'system';

export type OfflineAction = {
  id: string;
  type: OfflineActionType;
  payload: Record<string, unknown>;
  status: 'queued' | 'running' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
};

export type OfflineModeStatus = {
  mode: 'offline';
  online: false;
  canUseNetwork: false;
  ready: boolean;
  reason: string;
  queuedActions: number;
  lastSyncAt: string | null;
  availableFeatures: string[];
};

export const offlineQueue: OfflineAction[] = [];

export function shouldUseOfflineMode(): boolean {
  const noApiKeys = !envConfig.OPENAI_API_KEY && !envConfig.SPOTIFY_CLIENT_ID && !envConfig.TWILIO_ACCOUNT_SID;
  const noExternalServices = !envConfig.WHATSAPP_TOKEN && !envConfig.STRIPE_SECRET_KEY && !envConfig.SPOTIFY_CLIENT_SECRET;

  return noApiKeys || noExternalServices;
}

export function getOfflineStatus(): OfflineModeStatus {
  const availableFeatures = [
    'local music generation',
    'local social content generation',
    'offline campaign planning',
    'demo revenue strategy',
    'queued bot actions',
  ];

  return {
    mode: 'offline',
    online: false,
    canUseNetwork: false,
    ready: true,
    reason: 'No live internet or API credentials detected. Bot is running in offline-safe mode.',
    queuedActions: offlineQueue.length,
    lastSyncAt: null,
    availableFeatures,
  };
}

export function queueOfflineAction(type: OfflineActionType, payload: Record<string, unknown> = {}) {
  const action: OfflineAction = {
    id: `offline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    payload,
    status: 'queued',
    createdAt: new Date().toISOString(),
  };

  offlineQueue.unshift(action);
  return action;
}

export function runOfflineWorkflow(type: OfflineActionType = 'system', payload: Record<string, unknown> = {}) {
  const queued = queueOfflineAction(type, payload);
  queued.status = 'running';

  const result = (() => {
    switch (type) {
      case 'music': {
        const brief = generateMusicBrief({
          genre: String(payload.genre ?? 'Afrobeats'),
          mood: String(payload.mood ?? 'uplifting'),
          bpm: Number(payload.bpm ?? 110),
          audience: String(payload.audience ?? 'music lovers'),
          usage: String(payload.usage ?? 'playlist opener'),
          artistName: String(payload.artistName ?? 'Sharks'),
        });
        return { kind: 'music', brief };
      }
      case 'social': {
        const brief = generateSocialCampaign({
          artistName: String(payload.artistName ?? 'Sharks'),
          songTitle: String(payload.songTitle ?? 'New Release'),
          platform: String(payload.platform ?? 'Instagram'),
          tone: String(payload.tone ?? 'confident'),
          audience: String(payload.audience ?? 'music lovers'),
        });
        return { kind: 'social', brief };
      }
      case 'dashboard':
        return { kind: 'dashboard', summary: { status: 'offline-demo', timestamp: new Date().toISOString() } };
      case 'revenue':
        return { kind: 'revenue', plan: 'Offline creator pack', price: '$0', note: 'Revenue workflows are simulated locally.' };
      case 'system':
      default:
        return {
          kind: 'system',
          message: 'Offline bot executed local-safe fallback logic successfully.',
          timestamp: new Date().toISOString(),
        };
    }
  })();

  queued.status = 'completed';
  queued.completedAt = new Date().toISOString();

  return {
    success: true,
    status: getOfflineStatus(),
    queuedAction: queued,
    result,
  };
}

export function getOfflineQueue() {
  return offlineQueue;
}
