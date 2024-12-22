const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/admin/barang')
const middleware = require('../../middleware/authentication')

router.post('/tambahBarang', middleware.verifyTokenAdmin, controllers.tambahBarang)
router.get('/allDataBarang', controllers.allDataBarang)
router.get('/detailBarang/:id_barang', controllers.detailBarang)
router.post('/editBarang/:id_barang', middleware.verifyTokenAdmin, controllers.editBarang)
router.delete('/hapusBarang/:id_barang', middleware.verifyTokenAdmin, controllers.hapusBarang)

module.exports = router