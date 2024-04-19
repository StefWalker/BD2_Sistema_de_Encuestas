const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const encuestaController = require('../controllers/encuestaController');
const preguntaController = require('../controllers/preguntaController');

// Rutas de Usuarios
router.get('/users', usuarioController.listUsers);
router.get('/users/:id', usuarioController.getUserById);
router.put('/users/:id', usuarioController.updateUser);
router.delete('/users/:id', usuarioController.deleteUser);

// Rutas de Encuestas
router.post('/surveys', encuestaController.createSurvey);
router.get('/surveys', encuestaController.listSurveys);
router.get('/surveys/:id', encuestaController.getSurveyById);
router.put('/surveys/:id', encuestaController.updateSurvey);
router.delete('/surveys/:id', encuestaController.deleteSurvey);
router.post('/surveys/:id/publish', encuestaController.publishSurvey);

// Rutas de Preguntas de Encuestas
router.post('/surveys/:id/questions', preguntaController.addQuestion);
router.get('/surveys/:id/questions', preguntaController.listQuestions);
router.put('/surveys/:id/questions/:questionId', preguntaController.updateQuestion);
router.delete('/surveys/:id/questions/:questionId', preguntaController.deleteQuestion);

module.exports = router;
