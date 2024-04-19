const { Respuesta, Encuesta } = require('../models');

exports.generateAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener la encuesta específica
    const encuesta = await Encuesta.findByPk(id, {
      include: [{ model: Respuesta, as: 'respuestas' }],
    });

    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }

    // Generar análisis básico de respuestas
    const analysis = generateBasicAnalysis(encuesta.respuestas);

    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Error al generar análisis', error });
  }
};

// Función para generar un análisis básico de las respuestas
const generateBasicAnalysis = (responses) => {
  let analysis = {};

  responses.forEach((response) => {
    const { preguntaId, respuesta } = response;

    if (!analysis[preguntaId]) {
      analysis[preguntaId] = {};
    }

    if (!analysis[preguntaId][respuesta]) {
      analysis[preguntaId][respuesta] = 0;
    }

    analysis[preguntaId][respuesta]++;
  });

  return analysis;
};
