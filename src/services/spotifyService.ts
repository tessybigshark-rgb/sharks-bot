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
  const artistName = input.artistName?.trim() || 'Sharks';
  const songTitle = input.songTitle?.trim() || 'New Release';
  const platform = input.platform?.trim() || 'Instagram';
  const tone = input.tone?.trim() || 'confident';
  const audience = input.audience?.trim() || 'music lovers';

  const caption = `Fresh energy from ${artistName} with "${songTitle}". This one is built for ${audience}, designed to move the room and keep the vibe alive. Press play, share, and let the rhythm carry you. ${platform} is where the journey begins.`;

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
    'Day 2: lyrics/quote post',
    'Day 3: behind-the-scenes story',
    'Day 4: release day caption + link',
    'Day 5: fan engagement repost',
  ];

  const contentIdeas = [
    'Create a 15-second teaser with a strong first beat drop',
    'Post a quote card from the song lyrics',
    'Share a studio clip with a short creator story',
    'Ask fans to comment with their favorite line',
    'Turn the release into a mini challenge or trend',
  ];

  const callToAction = `Stream "${songTitle}", save it, and tag someone who needs this feel in their playlist.`;

  return {
    caption,
    hook,
    hashtags,
    postingSchedule,
    contentIdeas,
    callToAction,
  };
}
