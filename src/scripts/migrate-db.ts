import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function migrate() {
  console.log('Migrating database...');
  try {
    // Add reg_number column
    await client.execute(`ALTER TABLE registrations ADD COLUMN reg_number TEXT`);
    // Add unique index
    await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_reg_number ON registrations(reg_number)`);
    console.log('Migration successful: reg_number column added.');
  } catch (err: any) {
    if (err.message.includes('duplicate column name')) {
       console.log('Column already exists, skipping migration.');
    } else {
       console.error('Migration failed:', err);
    }
  } finally {
    process.exit(0);
  }
}

migrate();
