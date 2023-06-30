const express = require('express')
const router = express.Router()
const exportController = require('../controllers/exportController')

// Ruta para exportar los datos del archivo JSON

router.post('/export', exportController.exportData)
router.get('/export', exportController.redirectMessage)
module.exports = router
