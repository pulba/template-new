import type { APIRoute } from 'astro';
import { createClient } from '@libsql/client';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    const client = createClient({
      url: import.meta.env.TURSO_URL,
      authToken: import.meta.env.TURSO_AUTH_TOKEN,
    });

    // Generate Registration Number: SPMB-YYYY-XXXX
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000); // 4 digits
    const regNumber = `SPMB-${year}-${random}`;

    await client.execute({
      sql: 'INSERT INTO registrations (name, email, whatsapp, data, reg_number) VALUES (?, ?, ?, ?, ?)',
      args: [
        data.nama || 'Tanpa Nama',
        data.email || '',
        data.waSiswa || '',
        JSON.stringify(data),
        regNumber
      ]
    });

    return new Response(JSON.stringify({ 
      message: 'Success', 
      regNumber: regNumber 
    }), { status: 200 });
  } catch (err) {
    console.error('Registration Error:', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};
