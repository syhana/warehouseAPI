const admin = require("./admin/admin");
const barang = require("./barang/barang");
const kategori = require("./kategori/kategori");
const server = {};

server.admin = admin;
server.barang = barang;
server.kategori = kategori;

module.exports = server;
