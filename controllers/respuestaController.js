const { MongoClient } = require('mongodb');

const uri = `mongodb://${process.env.DBM_USER}:${process.env.DBM_PASSWORD}@${process.env.DBM_HOST}:${process.env.DBM_PORT}/${process.env.DBM_NAME}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function ensureConnection() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

async function addResponse(req, res) {
  try {
    console.log("Intentando agregar respuesta");
    console.log("Datos recibidos:", req.body);

    await ensureConnection(); // Asegúrate de que la conexión esté abierta
    console.log("Conexión asegurada");

    const collection = client.db().collection('responses');
    const newResponse = {
      respondentId: req.body.respondentId,
      responses: req.body.responses,
      surveyId: req.body.surveyId || null,
      timestamp: new Date(),
    };

    const result = await collection.insertOne(newResponse);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("Error al agregar respuesta:", error);
    res.status(500).json({ message: 'Error adding response' });
  }
}

module.exports = {
  addResponse
};
