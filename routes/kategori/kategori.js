// routes/Kategori/kategori.js
const express = require("express");
const router = express.Router();
const kategoriController = require("../../controllers/kategori/kategori");

// Definisikan rute
router.get("/kategori", kategoriController.getAllKategori);
router.post("/tambahKategori", kategoriController.createKategori);
router.put("/:id", kategoriController.updateKategori);

module.exports = router; // Pastikan ini ada
