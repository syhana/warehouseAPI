const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/admin/barang')
const middleware = require('../../middleware/authentication')

router.post('/tambahBarang', middleware.verifyTokenAdmin, controllers.tambahBarang)
router.get('/allDataBarang', middleware.verifyTokenAdmin, controllers.allDataBarang)
router.get('/detailBarang/:id_barang', middleware.verifyTokenAdmin, controllers.detailBarang)

module.exports = router