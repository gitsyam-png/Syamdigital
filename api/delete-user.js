import { neon } from '@neondatabase/serverless';
export default async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();
    const { id } = req.query;
    try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`DELETE FROM users WHERE id = ${id}`;
        res.status(200).json({ m: 'Deleted' });
    } catch (e) { res.status(500).json({ error: e.message }); }
}
