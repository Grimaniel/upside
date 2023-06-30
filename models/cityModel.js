const mongoose = require('../config/db')

// Definir el esquema para la colección "city"
const citySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  coord: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  main: {
    temp: { type: Number, required: true },
    pressure: { type: Number, required: true },
    humidity: { type: Number, required: true },
    temp_min: { type: Number, required: true },
    temp_max: { type: Number, required: true }
  },
  dt: { type: Number, required: true },
  wind: {
    speed: { type: Number, required: true },
    deg: { type: Number, required: true }
  },
  clouds: {
    all: { type: Number, required: true }
  },
  weather: [{
    id: { type: Number, required: true },
    main: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
  }]
})

// Crear el modelo "City" basado en el esquema
const City = mongoose.model('City', citySchema, 'cities')

module.exports = City
