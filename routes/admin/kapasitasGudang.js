const express = require('express')
const router = express.Router()
const GudangController = require('../../controllers/admin/kapasitasGudang')
const middleware = require('../../middleware/authentication')

router.post('/add-item', middleware.verifyTokenAdmin, GudangController.tambahkanBarang)
router.post('/remove-item',middleware.verifyTokenAdmin, GudangController.hapusBarang)
router.get('/inventory', middleware.verifyTokenAdmin, GudangController.getInventory)
router.get('/item-in-history', middleware.verifyTokenAdmin, GudangController.getBarangMasukHistory)
router.get('/item-out-history', middleware.verifyTokenAdmin, GudangController.getBarangKeluarHistory)



module.exports = router