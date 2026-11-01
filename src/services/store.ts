import { generateMusicBrief } from './musicService';
import { getRevenueIdeas } from './revenueService';
import { generateSocialCampaign } from './socialMediaService';

export type WhatsappMessageInput = {
  message: string;
  senderName?: string;
};

export function handleIncomingWhatsAppMessage(input: WhatsappMessageInput) {
  const rawMessage = (input.message ?? '').trim();
  const senderName = input.senderName ?? 'Creator';

  if (!rawMessage) {
    return {
      senderName,
      intent: 'help',
      reply: 'Hi! I can help with music prompts, playlist ideas, content strategy, or monetization. Try: “create a playlist for a night drive” or “make a promo post”.',
    };
  }

  const lower = rawMessage.toLowerCase();

  if (lower.includes('playlist') || lower.includes('song') || lower.includes('music')) {
    const musicBrief = generateMusicBrief({
      genre: lower.includes('afrobeats') ? 'Afrobeats' : lower.includes('house') ? 'House' : 'Afrobeats',
      mood: lower.includes('late') || lower.includes('night') ? 'moody' : 'uplifting',
      bpm: lower.includes('slow') ? 88 : 112,
      audience: 'music lovers',
      usage: 'playlist opener',
      artistName: senderName,
    });

    return {
      senderName,
      intent: 'music',
      reply: `Here is a music brief for ${senderName}: ${musicBrief.prompt} Playlist name: ${musicBrief.playlistName}.`,
      data: musicBrief,
    };
  }

  if (lower.includes('post') || lower.includes('caption') || lower.includes('promo') || lower.includes('social')) {
    const campaign = generateSocialCampaign({
      artistName: senderName,
      songTitle: 'New Release',
      platform: 'Instagram',
      tone: 'confident',
    });

    return {
      senderName,
      intent: 'social',
      reply: `Social plan ready: ${campaign.caption}`,
      data: campaign,
    };
  }

  if (lower.includes('money') || lower.includes('revenue') || lower.includes('monetize') || lower.includes('income')) {
    const ideas = getRevenueIdeas();
    return {
      senderName,
      intent: 'revenue',
      reply: `Monetization ideas: ${ideas.primaryIdeas[0]} and ${ideas.primaryIdeas[1]}.`,
      data: ideas,
    };
  }

  return {
    senderName,
    intent: 'general',
    reply: `Hey ${senderName}! I can help you generate music, playlists, social posts, or monetization ideas. Tell me what you want to build.`,
  };
}

