const mongoose = require('mongoose')

// URL de conexión a la base de datos MongoDB
const dbURI = 'mongodb+srv://root:administrador@cluster0.jtdwhvi.mongodb.net/telematica?retryWrites=true&w=majority'

// Opciones de configuración de Mongoose
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Conexión a la base de datos
mongoose.connect(dbURI, mongooseOptions)
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err))

module.exports = mongoose
