const admin = require('./admin/admin')
const barang = require('./admin/barang')
const stok = require('./admin/stok')
const riwayat = require('./barang/barang')
const kategori = require("./kategori/kategori");
const statusBarang = require('./admin/statusBarang')
const kapasitasGudang = require('./admin/kapasitasGudang')
const server = {}

server.admin = admin
server.barang = barang
server.stok = stok
server.riwayat = riwayat
server.kategori = kategori;
server.statusBarang = statusBarang
server.kapasitasGudang = kapasitasGudang
module.exports = server