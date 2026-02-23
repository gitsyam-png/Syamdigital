import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).send('Method Not Allowed');

  const { id } = req.query;
  const sql = neon(process.env.DATABASE_URL);

  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    return res.status(200).json({ message: 'User berhasil dihapus' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
