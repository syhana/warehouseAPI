const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/admin/kapasitasGudang')
const middleware = require('../../middleware/authentication')

router.post('/kapasitas', middleware.verifyTokenAdmin, controllers.addKapasitasGudang)
router.post('/kapasitas/incoming',middleware.verifyTokenAdmin, controllers.addIncomingGoods)
router.put('/kapasitas/outgoing', middleware.verifyTokenAdmin, controllers.removeOutgoingGoods)
router.get('/kapasitas', middleware.verifyTokenAdmin, controllers.getKapasitasGudang)

module.exports = router