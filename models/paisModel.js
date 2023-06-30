const mongoose = require('../config/db')

// Definir el esquema para la colección "city"
const paisSchema = new mongoose.Schema({
  pais: { type: String, required: true },
  continente: { type: String, required: true },
  poblacion: { type: Number, required: true },
  sexoH: { type: Number, reequired: true }
})

// Crear el modelo "City" basado en el esquema
const Pais = mongoose.model('Pais', paisSchema, 'paises')

module.exports = Pais
