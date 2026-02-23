
<script>

import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    // Hanya izinkan metode GET
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Metode tidak diizinkan' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL);
        
        // Mengambil semua data dari tabel users
        const data = await sql`SELECT * FROM users ORDER BY id DESC`;

        // Kita rapikan datanya agar Frontend selalu menerima property 'nama' 
        // meskipun di database namanya 'name'
        const normalizedData = data.map(user => ({
            id: user.id || user.user_id,
            nama: user.nama || user.name || 'Tanpa Nama',
            email: user.email || 'Tanpa Email'
        }));

        return res.status(200).json(normalizedData);
    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({ error: 'Gagal memuat data: ' + error.message });
    }
}
</script>
<script>
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    try {
        const sql = neon(process.env.DATABASE_URL);
        
        // Ambil data
        const data = await sql`SELECT * FROM users ORDER BY id DESC`;
        
        console.log("Data dari Neon:", data); // Ini akan muncul di Logs Vercel

        return res.status(200).json(data);
    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
</script>