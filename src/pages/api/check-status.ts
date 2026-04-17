import type { APIRoute } from 'astro';
import { createClient } from '@libsql/client';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const regNumber = url.searchParams.get('id');

    if (!regNumber) {
      return new Response(JSON.stringify({ message: 'Nomor Pendaftaran diperlukan' }), { status: 400 });
    }
    
    const client = createClient({
      url: import.meta.env.TURSO_URL,
      authToken: import.meta.env.TURSO_AUTH_TOKEN,
    });

    const result = await client.execute({
      sql: 'SELECT name, status, created_at FROM registrations WHERE reg_number = ?',
      args: [regNumber.toUpperCase().trim()]
    });

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: 'Data tidak ditemukan' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (err) {
    console.error('Check Status Error:', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};
