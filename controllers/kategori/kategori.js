// controllers/Kategori/kategori.js
const Kategori = require("../../models/Kategori/kategori");

exports.getAllKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findAll();
    res.json(kategori);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan." });
  }
};

exports.createKategori = async (req, res) => {
  try {
    const { nama } = req.body;
    const newKategori = await Kategori.create({ nama });
    res.status(201).json(newKategori);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan." });
  }
};

exports.updateKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;

    const kategori = await Kategori.findByPk(id);
    if (!kategori)
      return res.status(404).json({ error: "Kategori tidak ditemukan." });

    kategori.nama = nama || kategori.nama;
    await kategori.save();

    res.json(kategori);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan." });
  }
};
