export type DashboardSummary = {
  metrics: {
    musicCampaigns: number;
    activePlaylists: number;
    socialPosts: number;
    revenueStreams: number;
    conversions: number;
  };
  trend: string;
  growth: string;
};

export function getDashboardSummary(): DashboardSummary {
  return {
    metrics: {
      musicCampaigns: 18,
      activePlaylists: 12,
      socialPosts: 63,
      revenueStreams: 5,
      conversions: 7,
    },
    trend: 'Audience engagement is trending upward across social and WhatsApp touchpoints.',
    growth: '+28% this month',
  };
}
