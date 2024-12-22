// controllers/Kategori/kategori.js
const Kategori = require('../../models/Kategori/kategori');

exports.getAllKategori = async (req, res) => {
  try {
    const data = await Kategori.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil kategori' });
  }
};

exports.createKategori = async (req, res) => {
  try {
    const { nama } = req.body;
    if (!nama) {
      return res.status(400).json({ error: 'Nama kategori wajib diisi.' });
    }
    const result = await Kategori.create({ nama });
    return res.status(201).json({ message: 'Kategori berhasil dibuat', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat kategori' });
  }
};

exports.updateKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;

    const kategori = await Kategori.findByPk(id);
    if (!kategori) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan' });
    }
    kategori.nama = nama || kategori.nama;
    await kategori.save();

    res.json({ message: 'Kategori berhasil diupdate', data: kategori });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate kategori' });
  }
};
