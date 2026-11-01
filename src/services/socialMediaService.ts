export type RevenueIdeaSet = {
  primaryIdeas: string[];
  supportIdeas: string[];
  pricingNotes: string[];
};

export function getRevenueIdeas(): RevenueIdeaSet {
  return {
    primaryIdeas: [
      'Offer a premium monthly fan club with early access and exclusive demos',
      'Package brand sponsorships around release campaigns and creator storytelling',
      'Turn live sessions into ticketed digital experiences',
    ],
    supportIdeas: [
      'Use affiliate product links for creator tools and studio gear',
      'Sell bundle drops for mixtapes, visualizer packs, and merchandise',
      'Create a limited membership for behind-the-scenes content',
    ],
    pricingNotes: [
      'Test a $19 starter plan for access and community perks',
      'Use a $49 growth plan for premium content and direct support',
      'Offer a founder bundle for high-engagement superfans',
    ],
  };
}

