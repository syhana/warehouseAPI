// routes/barang.js
const express = require('express');
const router = express.Router();
const {
    postBarangMasuk,
    postBarangKeluar,
    lihatBarangMasuk,
    lihatBarangKeluar
} = require('../../controllers/barang/Barang');
const middleware = require('../../middleware/authentication')

// Routes
router.post('/barang-masuk', middleware.verifyTokenAdmin, postBarangMasuk);
router.post('/barang-keluar', middleware.verifyTokenAdmin, postBarangKeluar);
router.get('/barang-masuk', middleware.verifyTokenAdmin, lihatBarangMasuk);
router.get('/barang-keluar', middleware.verifyTokenAdmin, lihatBarangKeluar);

module.exports = router; 
 