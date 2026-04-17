import type { APIRoute } from 'astro';
import { turso, initDb } from '../../lib/turso';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { nama, email, whatsapp, jenjang, program, alamat } = data;

    // Ensure table exists
    await initDb();

    // Insert data
    await turso.execute({
      sql: 'INSERT INTO spmb_registrations (nama, email, whatsapp, jenjang, program, alamat) VALUES (?, ?, ?, ?, ?, ?)',
      args: [nama, email, whatsapp, jenjang, program, alamat],
    });

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Turso Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
