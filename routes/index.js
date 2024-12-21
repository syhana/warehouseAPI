const admin = require('./admin/admin')
const statusBarang = require('./admin/statusBarang')
const kapasitasGudang = require('./admin/kapasitasGudang')
const server = {}

server.admin = admin
server.statusBarang = statusBarang
server.kapasitasGudang = kapasitasGudang
module.exports = server