import { envConfig } from './config/env';

export type CheckoutQuote = {
  checkoutUrl: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
};

export function createCheckoutSession(plan: string): CheckoutQuote {
  const normalizedPlan = plan.toLowerCase();

  if (!envConfig.STRIPE_SECRET_KEY) {
    return {
      checkoutUrl: 'https://example.com/demo-checkout',
      amount: normalizedPlan === 'growth' ? 49 : 19,
      currency: 'USD',
      status: 'demo-mode',
      provider: 'mock-stripe',
    };
  }

  return {
    checkoutUrl: 'https://checkout.stripe.com/demo',
    amount: normalizedPlan === 'growth' ? 49 : 19,
    currency: 'USD',
    status: 'ready',
    provider: 'stripe',
  };
}
