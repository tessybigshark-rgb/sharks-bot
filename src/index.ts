export type RevenuePlan = {
  primaryIdeas: string[];
  pricingOptions: string[];
  revenueChannels: string[];
  actionPlan: string[];
};

export function getRevenueIdeas(): RevenuePlan {
  return {
    primaryIdeas: [
      'Sell premium playlists and music curation memberships',
      'Offer AI-powered social content packages for creators',
      'Launch affiliate revenue from music tools and creator SaaS',
    ],
    pricingOptions: [
      '$19/month Digital Fan Club',
      '$49/month Creator Growth Pack',
      '$99/month Premium Music Brand Bundle',
    ],
    revenueChannels: [
      'Subscriptions',
      'Affiliate links',
      'Brand sponsorships',
      'Digital products',
      'Music licensing',
    ],
    actionPlan: [
      'Validate the offer with 20 early users',
      'Package the service into a simple premium plan',
      'Use WhatsApp and social content to keep leads warm',
      'Turn the best-performing segments into repeatable offers',
    ],
  };
}
