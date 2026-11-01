import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  PORT: Number(process.env.PORT ?? 4000),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  APP_NAME: process.env.APP_NAME ?? 'Sharks Bot',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID ?? '',
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET ?? '',
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI ?? 'http://localhost:4000/callback',
  WHATSAPP_TOKEN: process.env.WHATSAPP_TOKEN ?? '',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ?? '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ?? '',
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER ?? '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? '',
};

export const isProduction = envConfig.NODE_ENV === 'production';
