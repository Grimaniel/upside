const express = require('express')
const router = express.Router()
const importController = require('../controllers/importController')

// Ruta para importar los datos del archivo JSON
router.post('/import', importController.importMinData)

module.exports = router
