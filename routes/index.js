const admin = require('./admin/admin')
const barang = require('./admin/barang')
const server = {}

server.admin = admin
server.barang = barang

module.exports = server