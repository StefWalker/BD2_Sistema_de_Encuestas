const express = require('express');
const routes = require('./routes/routes');

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Middleware para manejar las rutas
app.use('/api', routes);

// Iniciar servidor
app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
  
