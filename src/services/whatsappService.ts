import SpotifyWebApi from 'spotify-web-api-node';

import { envConfig } from '../config/env';

export type SpotifyRecommendation = {
  id: string;
  name: string;
  artist: string;
  url: string;
  genre: string;
};

export async function searchSpotifyTracks(seedGenres: string[], limit = 5): Promise<SpotifyRecommendation[]> {
  if (!envConfig.SPOTIFY_CLIENT_ID || !envConfig.SPOTIFY_CLIENT_SECRET) {
    return [
      { id: '1', name: 'Night Drive', artist: 'Sharks', url: 'https://open.spotify.com', genre: 'lounge' },
      { id: '2', name: 'Afterglow', artist: 'Nova Beam', url: 'https://open.spotify.com', genre: 'afrobeats' },
      { id: '3', name: 'Signal', artist: 'Echo Mode', url: 'https://open.spotify.com', genre: 'house' },
    ];
  }

  try {
    const spotifyApi = new SpotifyWebApi({
      clientId: envConfig.SPOTIFY_CLIENT_ID,
      clientSecret: envConfig.SPOTIFY_CLIENT_SECRET,
      redirectUri: envConfig.SPOTIFY_REDIRECT_URI,
    });

    const token = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(token.body.access_token);

    const recommendation = await spotifyApi.getRecommendations({
      seed_genres: seedGenres.length ? seedGenres : ['afrobeat', 'dancehall'],
      limit,
    });

    return (recommendation.body.tracks ?? []).map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists?.[0]?.name ?? 'Unknown artist',
      url: track.external_urls?.spotify ?? 'https://open.spotify.com',
      genre: seedGenres[0] ?? 'mixed',
    }));
  } catch (error) {
    console.error('Spotify integration failed. Using mock data instead.', error);
    return [
      { id: 'fallback-1', name: 'Night Drive', artist: 'Sharks', url: 'https://open.spotify.com', genre: 'lounge' },
      { id: 'fallback-2', name: 'Afterglow', artist: 'Nova Beam', url: 'https://open.spotify.com', genre: 'afrobeats' },
    ];
  }
}
