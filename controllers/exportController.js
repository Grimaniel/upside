const fs = require('fs')
const path = require('path')
const City = require('../models/cityModel')

const redirectMessage = (req, res) => {
  res.render('export', { error: null })
}

const exportData = async (req, res) => {
  console.log('climaCiudades: ')
  const { climaCiudades } = req.body
  if (!climaCiudades) {
    return res.status(400).json({ error: 'No se encontraron datos para exportar' })
  }
  const filePath = path.join(__dirname, '../downloads/report.json')
  const agrupadaFilePath = path.join(__dirname, '../downloads/output.json')
  // Obtén la ruta de la carpeta
  const folderPath = path.dirname(filePath)

  // Verifica si la carpeta existe
  if (!fs.existsSync(folderPath)) {
    // La carpeta no existe, crea la carpeta
    fs.mkdirSync(folderPath, { recursive: true })
  }

  // const resultadoAgrupacion = {};

  try {
    const cities = await City.find()

    const resultadoAgrupacion = []
    cities.forEach((city) => {
      const clima = city.weather[0]

      // Verificar si ya existe un grupo con el mismo clima
      const grupoExistente = resultadoAgrupacion.find((grupo) => grupo.weather.main === clima.main)

      if (grupoExistente) {
        grupoExistente.cities.push(city)
      } else {
        resultadoAgrupacion.push({
          weather: clima,
          cities: [city]
        })
      }
    })

    const jsonData = JSON.parse(climaCiudades)

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error al exportar los datos' })
      }
      console.log('Archivo JSON exportado correctamente')
      // return res.status(200).json({ message: 'Datos exportados exitosamente' });
    })
    // ----------------------
    const resultadoAgrupacionJSON = JSON.stringify(resultadoAgrupacion, null, 2)
    fs.writeFile(agrupadaFilePath, resultadoAgrupacionJSON, (err) => {
      if (err) {
        console.error('Error al escribir el archivo dataAgrupada.json:', err)
        return res.status(500).json({ error: 'Error al exportar los datos' })
      }
      console.log('Archivo dataAgrupada.json generado exitosamente')
      res.render('export', { message: 'Datos exportados exitosamente' })
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al analizar los datos para exportar' })
  }
}
module.exports = {
  exportData,
  redirectMessage
}
