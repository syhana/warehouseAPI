const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/admin/stok')
const middleware = require('../../middleware/authentication')

router.get('/allStokBarang', controllers.allStokBarang)
router.get('/detailStokBarang/:id_barang', controllers.detailStokBarang)
router.post('/editStok/:id_barang', middleware.verifyTokenAdmin, controllers.editStok)


module.exports = router