const admin = require("./admin/admin");
const barang = require("./admin/barang");
const stok = require("./admin/stok");
const riwayat = require("./barang/barang");
const kategori = require("./kategori/kategori");

const server = {};

server.admin = admin;
server.barang = barang;
server.stok = stok;
server.riwayat = riwayat;
server.kategori = kategori;

module.exports = server;
