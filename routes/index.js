const admin = require('./admin/admin')
const barang = require('./admin/barang')
const stok = require('./admin/stok')
const riwayat = require('./barang/barang')
const server = {}

server.admin = admin
server.barang = barang
server.stok = stok
server.riwayat = riwayat

module.exports = server