import { neon } from '@neondatabase/serverless';
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { nama, email } = req.body;
    try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`INSERT INTO users (nama, email) VALUES (${nama}, ${email})`;
        res.status(200).json({ m: 'Success' });
    } catch (e) { res.status(500).json({ error: e.message }); }
}
