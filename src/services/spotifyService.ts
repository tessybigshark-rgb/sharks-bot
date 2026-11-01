export type SocialRequest = {
  artistName?: string;
  songTitle?: string;
  platform?: string;
  tone?: string;
  audience?: string;
};

export type SocialCampaign = {
  caption: string;
  hook: string;
  hashtags: string[];
  postingSchedule: string[];
  contentIdeas: string[];
  callToAction: string;
};

export function generateSocialCampaign(input: SocialRequest): SocialCampaign {
  const artistName = (input.artistName ?? 'Sharks').trim() || 'Sharks';
  const songTitle = (input.songTitle ?? 'New Release').trim() || 'New Release';
  const platform = (input.platform ?? 'Instagram').trim() || 'Instagram';
  const tone = (input.tone ?? 'confident').trim() || 'confident';
  const audience = (input.audience ?? 'music lovers').trim() || 'music lovers';

  const caption = `Fresh energy from ${artistName} with "${songTitle}". This one is built for ${audience}, designed to move the room and keep the vibe alive. Press play, share, and let the rhythm speak for itself on ${platform}.`;
  const hook = `This is the sound of ${artistName} showing up louder.`;

  const hashtags = [
    '#SharksBot',
    '#NewMusic',
    '#MusicLaunch',
    '#CreatorEconomy',
    '#ArtistOnTheRise',
    `#${artistName.replace(/\s+/g, '')}`,
  ];

  const postingSchedule = [
    'Day 1: teaser clip',
    'Day 2: lyrics or quote post',
    'Day 3: behind-the-scenes story',
    'Day 4: release-day caption and link',
    'Day 5: fan engagement repost',
  ];

  const contentIdeas = [
    'Create a 15-second teaser with a strong first beat drop',
    'Post a quote card from the song lyrics',
    'Share a studio clip with a short creator story',
    'Ask fans to comment with their favorite line',
    'Turn the release into a mini challenge or trend',
  ];

  const callToAction = `Stream "${songTitle}", save it, and tag someone who needs this feeling in their playlist.`;

  return {
    caption,
    hook,
    hashtags,
    postingSchedule,
    contentIdeas,
    callToAction,
  };
}
