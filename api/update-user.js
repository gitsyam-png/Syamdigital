<script>
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'PUT') return res.status(405).end();
    
    const { id, nama, email } = req.body;
    
    try {
        const sql = neon(process.env.DATABASE_URL);
        // Update data berdasarkan ID
        await sql`UPDATE users SET nama = ${nama}, email = ${email} WHERE id = ${id}`;
        
        return res.status(200).json({ m: 'Updated' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
</script>