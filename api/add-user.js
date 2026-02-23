<script>
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    // Hanya izinkan metode POST untuk tambah data
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Metode tidak diizinkan' });
    }

    const { nama, email } = req.body;

    // Validasi input kosong
    if (!nama || !email) {
        return res.status(400).json({ message: 'Nama dan Email wajib diisi' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL);
        
        // Query SQL untuk memasukkan data ke tabel 'users'
        // Pastikan nama kolom di database sesuai (nama & email)
        await sql`INSERT INTO users (nama, email) VALUES (${nama}, ${email})`;

        return res.status(200).json({ message: 'User berhasil ditambahkan!' });
    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({ error: 'Gagal simpan ke Neon: ' + error.message });
    }
}
</script>
<script>
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { nama, email } = req.body;
    const sql = neon(process.env.DATABASE_URL);

    try {
        // Pastikan 'nama' di sini sama dengan di tabel Neon
        await sql`INSERT INTO users (nama, email) VALUES (${nama}, ${email})`;
        return res.status(200).json({ message: 'Berhasil!' });
    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
</script>