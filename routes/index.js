const admin = require('./admin/admin')
const barang = require('./barang/barang')
const server = {}

server.admin = admin
server.barang = barang

module.exports = server