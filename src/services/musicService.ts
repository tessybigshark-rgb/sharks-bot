import { state } from './store';

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'fan';
  createdAt: string;
};

export { state } from './store';

export function getUserByEmail(email: string): AppUser | null {
  const user = state.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  return user ? { ...user } : null;
}

export function getUserById(id: string): AppUser | null {
  const user = state.users.find((item) => item.id === id);
  return user ? { ...user } : null;
}

export function loginWithEmail(email: string): AppUser | null {
  const user = getUserByEmail(email);
  return user ? { ...user } : null;
}

export function resolveAuthenticatedUser(req: { headers: Record<string, string | string[] | undefined> }): AppUser | null {
  const rawUserId = req.headers['x-user-id'];
  const userId = Array.isArray(rawUserId) ? rawUserId[0] : typeof rawUserId === 'string' ? rawUserId : null;

  if (!userId) {
    const fallback = state.users[0] ?? null;
    return fallback ? { ...fallback } : null;
  }

  const user = getUserById(userId);
  return user ? { ...user } : null;
}
