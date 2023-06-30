const City = require('../models/cityModel')
const Pais = require('../models/paisModel')
// Función para importar los datos del archivo JSON
const importMinData = async (req, res) => {
  console.log('recibiendo: ', req.files.jsonFile)
  // const file = req.file; // Acceder al archivo cargado desde el formulario

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No se ha seleccionado ningún archivo' })
  }

  const jsonFile = req.files.jsonFile

  // Validar si el archivo es JSON
  if (jsonFile.mimetype !== 'application/json') {
    return res.status(400).json({ error: 'El archivo seleccionado no es un archivo JSON válido' })
  }

  try {
    const jsonData = JSON.parse(jsonFile.data)
    console.log('jsonData: ', jsonData)
    await Pais.insertMany(jsonData)
    const count = await Pais.countDocuments()

    let totalPoblacion = 0

    jsonData.forEach(pais => {
      totalPoblacion += pais.poblacion
    })

    return res.render('resultsmin', { count, totalPoblacion })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al analizar el archivo JSON' })
  }
}

const importData = async (req, res) => {
  console.log('recibiendo: ', req.files.jsonFile)
  // const file = req.file; // Acceder al archivo cargado desde el formulario

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No se ha seleccionado ningún archivo' })
  }

  const jsonFile = req.files.jsonFile

  // Validar si el archivo es JSON
  if (jsonFile.mimetype !== 'application/json') {
    return res.status(400).json({ error: 'El archivo seleccionado no es un archivo JSON válido' })
  }

  try {
    const jsonData = JSON.parse(jsonFile.data)

    // Importar los datos al modelo de la ciudad
    await City.insertMany(jsonData.cities)

    // Obtener la cantidad de registros o ciudades importadas
    const count = await City.countDocuments()

    // Agrupar ciudades por clima
    const result = await City.aggregate([{ $group: { _id: '$weather.main', count: { $sum: 1 } } }])

    const climaCiudades = {}
    result.forEach((item) => {
      climaCiudades[item._id] = item
    })

    // Mostrar la vista de resultados con los datos de importación y agrupación
    return res.render('results', { count, climaCiudades, group: result.length })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al analizar el archivo JSON' })
  }
}

module.exports = {
  importData,
  importMinData
}
