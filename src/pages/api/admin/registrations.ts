import type { APIRoute } from 'astro';
import { createClient } from '@libsql/client';
import { isAuthenticated } from '../../../lib/auth';

const client = createClient({
  url: import.meta.env.TURSO_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
});

export const GET: APIRoute = async ({ cookies }) => {
  if (!isAuthenticated(cookies)) return new Response(null, { status: 401 });

  try {
    const result = await client.execute('SELECT * FROM registrations ORDER BY created_at DESC');
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    return new Response(null, { status: 500 });
  }
};

export const PATCH: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) return new Response(null, { status: 401 });

  try {
    const { id, status } = await request.json();
    await client.execute({
      sql: 'UPDATE registrations SET status = ? WHERE id = ?',
      args: [status, id]
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(null, { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) return new Response(null, { status: 401 });

  try {
    const { id } = await request.json();
    await client.execute({
      sql: 'DELETE FROM registrations WHERE id = ?',
      args: [id]
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(null, { status: 500 });
  }
};
