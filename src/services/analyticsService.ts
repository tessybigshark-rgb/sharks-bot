import OpenAI from 'openai';

import { envConfig } from '../config/env';

export type AIResponse = {
  summary: string;
  recommendations: string[];
  model: string;
};

export async function generateAIInsight(prompt: string): Promise<AIResponse> {
  if (!envConfig.OPENAI_API_KEY) {
    return {
      summary: `AI insight for: ${prompt}`,
      recommendations: [
        'Build a stronger hook for the first 10 seconds',
        'Use a consistent visual identity across music and social posts',
        'Offer a premium fan plan to convert engagement into revenue',
      ],
      model: 'demo-mode',
    };
  }

  try {
    const client = new OpenAI({ apiKey: envConfig.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are Sharks Bot, a creative strategist for music, social media, and creator growth.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const content = completion.choices[0]?.message?.content ?? 'AI insight unavailable';
    return {
      summary: content,
      recommendations: [
        'Refine the message hook',
        'Create a consistent release schedule',
        'Monetize attention through premium offers',
      ],
      model: 'gpt-4o-mini',
    };
  } catch (error) {
    console.error('OpenAI generation failed:', error);
    return {
      summary: `Fallback AI insight for: ${prompt}`,
      recommendations: ['Test an audience-specific caption', 'Use a short-form content cadence', 'Offer one premium bundle'],
      model: 'demo-mode',
    };
  }
}
