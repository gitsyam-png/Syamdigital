import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    // Hanya izinkan metode DELETE
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Metode tidak diizinkan' });
    }

    const { id } = req.query;

    // Validasi jika ID tidak ada
    if (!id) {
        return res.status(400).json({ message: 'ID diperlukan' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL);
        
        // Eksekusi penghapusan berdasarkan ID
        await sql`DELETE FROM users WHERE id = ${id}`;

        return res.status(200).json({ message: 'User berhasil dihapus' });
    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({ error: 'Gagal menghapus data dari database' });
    }
}
