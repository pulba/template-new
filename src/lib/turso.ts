import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.warn('TURSO_DATABASE_URL is not defined. Database operations will fail.');
}

export const turso = createClient({
  url: url || '',
  authToken: authToken || '',
});

export async function initDb() {
  if (!url) return;
  try {
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS spmb_registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL,
        email TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        jenjang TEXT NOT NULL,
        program TEXT NOT NULL,
        alamat TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}
