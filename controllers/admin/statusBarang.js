const StatusBarang = require('../../models/statusBarang');

// Melihat semua status barang
const getAllStatusBarang = async (req, res) => {
    try {
        const statusBarangs = await StatusBarang.findAll();
        res.status(200).json(statusBarangs);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data status barang', error });
    }
};

// Menambahkan status barang
const createStatusBarang = async (req, res) => {
    const { nama, deskripsi } = req.body; // Mengambil data dari body request

    try {
        const statusBarang = await StatusBarang.create({ nama, deskripsi });
        res.status(201).json(statusBarang);
    } catch (error) {
        res.status(400).json({ message: 'Terjadi kesalahan saat menambahkan status barang', error });
    }
};

// Memperbarui status barang berdasarkan id
const updateStatusBarang = async (req, res) => {
    const { id } = req.params; // Mengambil id dari parameter URL
    const { nama, deskripsi } = req.body; // Mengambil data dari body request

    try {
        const statusBarang = await StatusBarang.findByPk(id);
        if (!statusBarang) {
            return res.status(404).json({ message: 'Status barang tidak ditemukan' });
        }

        // Memperbarui status barang
        statusBarang.nama = nama || statusBarang.nama; // Memperbarui nama jika ada
        statusBarang.deskripsi = deskripsi || statusBarang.deskripsi; // Memperbarui deskripsi jika ada
        await statusBarang.save();

        res.status(200).json(statusBarang);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui status barang', error });
    }
};

module.exports = {
    getAllStatusBarang,
    createStatusBarang,
    updateStatusBarang, 
};