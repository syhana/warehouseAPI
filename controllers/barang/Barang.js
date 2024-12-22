const BarangMasuk = require('../../models/barang/BarangMasuk');
const BarangKeluar = require('../../models/barang/BarangKeluar');

// Post Barang Masuk
const postBarangMasuk = async (req, res) => {
    try {
        const { nama_barang, jumlah, tanggal_masuk } = req.body;

        // Validasi input
        if (!nama_barang || !jumlah) {
            return res.status(400).json({ success: false, message: 'Silahkan lengkapi inputan Anda' });
        }

        // Tambahkan barang masuk
        const barangMasuk = await BarangMasuk.create({
            nama_barang,
            jumlah,
            tanggal_masuk: tanggal_masuk || new Date()
        });

        if (!barangMasuk) {
            return res.status(400).json({ success: false, message: 'Barang masuk tidak berhasil ditambahkan' });
        }

        return res.status(200).json({ success: true, message: 'Barang masuk berhasil ditambahkan', data: barangMasuk });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }
};

// Post Barang Keluar
const postBarangKeluar = async (req, res) => {
    try {
        const { nama_barang, jumlah, tanggal_keluar } = req.body;

        // Validasi input
        if (!nama_barang || !jumlah) {
            return res.status(400).json({ success: false, message: 'Silahkan lengkapi inputan Anda' });
        }

        // Tambahkan barang keluar
        const barangKeluar = await BarangKeluar.create({
            nama_barang,
            jumlah,
            tanggal_keluar: tanggal_keluar || new Date()
        });

        if (!barangKeluar) {
            return res.status(400).json({ success: false, message: 'Barang keluar tidak berhasil ditambahkan' });
        }

        return res.status(200).json({ success: true, message: 'Barang keluar berhasil ditambahkan', data: barangKeluar });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }
};

// Lihat Barang Masuk
const lihatBarangMasuk = async (req, res) => {
    try {
        const barangMasuk = await BarangMasuk.findAll({
            order: [['tanggal_masuk', 'DESC']]
        });

        if (!barangMasuk || barangMasuk.length === 0) {
            return res.status(404).json({ success: false, message: 'Data barang masuk tidak ditemukan' });
        }

        return res.status(200).json({ success: true, data: barangMasuk });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }
};

// Lihat Barang Keluar
const lihatBarangKeluar = async (req, res) => {
    try {
        const barangKeluar = await BarangKeluar.findAll({
            order: [['tanggal_keluar', 'DESC']]
        });

        if (!barangKeluar || barangKeluar.length === 0) {
            return res.status(404).json({ success: false, message: 'Data barang keluar tidak ditemukan' });
        }

        return res.status(200).json({ success: true, data: barangKeluar });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }
};

module.exports = {
    postBarangMasuk,
    postBarangKeluar,
    lihatBarangMasuk,
    lihatBarangKeluar
};
