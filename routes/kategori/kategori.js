// routes/Kategori/kategori.js
const express = require('express');
const router = express.Router();
const kategoriController = require('../../controllers/kategori/kategori');

// Contoh endpoint
router.get('/', kategoriController.getAllKategori);
router.post('/', kategoriController.createKategori);
router.put('/:id', kategoriController.updateKategori);

module.exports = router; // Ini harus ada!
