const { MongoClient } = require('mongodb');

// Cadena de conexión a la base de datos
const dbURI = 'mongodb+srv://root:administrador@cluster0.jtdwhvi.mongodb.net/telematica?retryWrites=true&w=majority';

// Función para probar la conexión
async function testConnection() {
  try {
    // Conectarse al servidor de MongoDB
    const client = await MongoClient.connect(dbURI, { useUnifiedTopology: true });

    // Acceder a la base de datos
    const db = client.db();

    // Realizar una operación de prueba, como obtener la lista de colecciones
    const collections = await db.listCollections().toArray();

    // Mostrar la lista de colecciones
    console.log('Conexión exitosa. Colecciones disponibles:');
    collections.forEach(collection => console.log(collection.name));

    // Cerrar la conexión
    client.close();
  } catch (error) {
    console.error('Error al conectarse a la base de datos:', error);
  }
}

// Ejecutar la función de prueba de conexión
testConnection();
