const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/admin/statusBarang')
const middleware = require('../../middleware/authentication')

router.get('/statusBarang', middleware.verifyTokenAdmin, controllers.getAllStatusBarang)
router.post('/status-barang',middleware.verifyTokenAdmin, controllers.createStatusBarang)
router.put('/statusBarang/:id', middleware.verifyTokenAdmin, controllers.updateStatusBarang)

module.exports = router