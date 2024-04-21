const express = require('express');
const router = express.Router();

// Importar los controladores
const usuarioController = require('../controllers/usuarioController');
const encuestaController = require('../controllers/encuestaController');
const preguntaController = require('../controllers/preguntaController');
const respuestaController = require('../controllers/respuestaController');
const encuestadoController = require('../controllers/encuestadoController');
const analisisController = require('../controllers/analisisController');

// Rutas para Usuarios
router.get('/users', usuarioController.listUsers);
//router.get('/users/:id', usuarioController.getUserById);
router.put('/users/:id', usuarioController.updateUser);
router.delete('/users/:id', usuarioController.deleteUser);

// Rutas para Encuestas
router.post('/surveys', encuestaController.createSurvey);
router.get('/surveys', encuestaController.listSurveys);
router.get('/surveys/:id', encuestaController.getSurveyById);
router.put('/surveys/:id', encuestaController.updateSurvey);
router.delete('/surveys/:id', encuestaController.deleteSurvey);
router.post('/surveys/:id/publish', encuestaController.publishSurvey);

// Rutas para Preguntas de Encuestas
router.post('/surveys/:id/questions', preguntaController.addQuestion);
router.get('/surveys/:id/questions', preguntaController.listQuestions);
router.put('/surveys/:id/questions/:questionId', preguntaController.updateQuestion);
router.delete('/surveys/:id/questions/:questionId', preguntaController.deleteQuestion);

// Rutas para Respuestas de Encuestas
//router.post('/surveys/:id/responses', respuestaController.addResponse);
//router.get('/surveys/:id/responses', respuestaController.listResponses);
router.post('/responses', respuestaController.addResponse); // Endpoint para agregar respuestas
//router.get('/responses', respuestaController.listAllResponses);  // Endpoint para obtener todas las respuestas

// Rutas para Encuestados
router.post('/respondents', encuestadoController.addRespondent);
router.get('/respondents', encuestadoController.listRespondents);
router.get('/respondents/:id', encuestadoController.getRespondentById);
router.put('/respondents/:id', encuestadoController.updateRespondent);
router.delete('/respondents/:id', encuestadoController.deleteRespondent);

// Rutas para Reportes y Análisis
router.get('/surveys/:id/analysis', analisisController.generateAnalysis);

module.exports = router;
