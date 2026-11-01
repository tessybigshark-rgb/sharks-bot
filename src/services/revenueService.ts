export type CheckoutQuote = {
  checkoutUrl: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
};

export function createCheckoutSession(plan: string): CheckoutQuote {
  const normalizedPlan = plan.toLowerCase();

  return {
    checkoutUrl: 'https://checkout.stripe.com/demo',
    amount: normalizedPlan === 'growth' ? 49 : 19,
    currency: 'USD',
    status: 'ready',
    provider: 'stripe',
  };
}
