import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  const { nama, email } = req.body;
  const sql = neon(process.env.DATABASE_URL);

  try {
    await sql`INSERT INTO users (nama, email) VALUES (${nama}, ${email})`;
    return res.status(200).json({ message: 'User berhasil ditambah!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
