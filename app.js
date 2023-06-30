const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const path = require('path')
const routesImport = require('./routes/importRoutes')
const routesExport = require('./routes/exportRoutes')
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(routesImport)
app.use(routesExport)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'import.html'))
})
// Configuración del puerto de escucha
const port = 3000
app.listen(port, () => {
  console.log(`Servidor escuchando_________ en el puerto ${port}`)
})
