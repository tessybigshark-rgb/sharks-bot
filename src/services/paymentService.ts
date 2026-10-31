import type { Request } from 'express';

import { getUserByEmail, getUserById, state } from './store';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'fan';
};

export function loginWithEmail(email: string): AuthUser | null {
  const user = getUserByEmail(email);
  return user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null;
}

export function resolveAuthenticatedUser(req: Request): AuthUser | null {
  const userId = typeof req.headers['x-user-id'] === 'string' ? req.headers['x-user-id'] : null;
  if (!userId) {
    const fallback = state.users[0];
    return fallback ? { id: fallback.id, name: fallback.name, email: fallback.email, role: fallback.role } : null;
  }

  const user = getUserById(userId);
  return user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null;
}
