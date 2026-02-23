import { neon } from '@neondatabase/serverless';
export default async function handler(req, res) {
    try {
        const sql = neon(process.env.DATABASE_URL);
        const data = await sql`SELECT * FROM users ORDER BY id DESC`;
        res.status(200).json(data);
    } catch (e) { res.status(500).json({ error: e.message }); }
}
