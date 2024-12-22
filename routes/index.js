const admin = require('./admin/admin')
const barang = require('./admin/barang')
const barang1 = require('./barang/barang')
const server = {}

server.admin = admin
server.barang = barang
server.barang1 = barang1

module.exports = server