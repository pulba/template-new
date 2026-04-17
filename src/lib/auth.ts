import type { AstroCookies } from 'astro';

const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD || 'admin123';
const SESSION_COOKIE = 'sb_admin_session';

export function isAuthenticated(cookies: AstroCookies) {
  const session = cookies.get(SESSION_COOKIE);
  return session?.value === ADMIN_PASSWORD;
}

export function login(cookies: AstroCookies, password: string) {
  if (password === ADMIN_PASSWORD) {
    cookies.set(SESSION_COOKIE, ADMIN_PASSWORD, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return true;
  }
  return false;
}

export function logout(cookies: AstroCookies) {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}
