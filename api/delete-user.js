import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    // 1. Validasi Metode (Hanya boleh DELETE)
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Metode Tidak Diizinkan' });
    }

    const { id } = req.query;

    // 2. Cek apakah ID ada
    if (!id) {
        return res.status(400).json({ message: 'ID diperlukan untuk menghapus data' });
    }

    try {
        // 3. Koneksi ke Neon menggunakan Environment Variable yang ada di Vercel
        const sql = neon(process.env.DATABASE_URL);
        
        // 4. Eksekusi Query Delete
        await sql`DELETE FROM users WHERE id = ${id}`;

        return res.status(200).json({ message: 'Data berhasil dihapus dari database' });
    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({ error: 'Gagal menghapus: ' + error.message });
    }
}
