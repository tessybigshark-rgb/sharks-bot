export type MusicBriefRequest = {
  genre: string;
  mood: string;
  bpm?: number;
  audience?: string;
  usage?: string;
  artistName?: string;
};

export type MusicBrief = {
  title: string;
  mood: string;
  genre: string;
  bpm: number;
  audience: string;
  usage: string;
  description: string;
  prompt: string;
  productionNotes: string[];
  playlistName: string;
  keywords: string[];
};

export function generateMusicBrief(input: MusicBriefRequest): MusicBrief {
  const genre = input.genre?.trim() || 'Afrobeats';
  const mood = input.mood?.trim() || 'uplifting';
  const bpm = input.bpm ?? 100;
  const audience = input.audience?.trim() || 'music lovers';
  const usage = input.usage?.trim() || 'playlist opener';
  const artistName = input.artistName?.trim() || 'Sharks';

  const title = `${artistName} ${mood.charAt(0).toUpperCase() + mood.slice(1)} ${genre}`;

  const prompt = `Create a ${genre.toLowerCase()} track with a ${mood} vibe, ${bpm} BPM, built for ${audience}. Use a ${usage} flow with catchy rhythm, layered percussion, warm synth textures, and a modern polished mix.`;

  const productionNotes = [
    `Tempo locked at ${bpm} BPM`,
    `Add subtle vocal chops and a memorable hook`,
    `Mix for streaming platforms with strong low-end and clear vocals`,
    `Keep energy balanced for ${usage}`,
  ];

  const playlistName = `${artistName} ${mood} ${genre} Mix`;
  const keywords = [genre, mood, 'streaming', 'playlist', 'hook', 'energy', audience];

  return {
    title,
    mood,
    genre,
    bpm,
    audience,
    usage,
    description: `A ${genre} record designed to feel ${mood}, built for ${audience}, and optimized for ${usage}.`,
    prompt,
    productionNotes,
    playlistName,
    keywords,
  };
}
