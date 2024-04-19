const { Encuesta, Pregunta } = require('../models/models');

exports.createSurvey = async (req, res) => {
  // Implementa la lógica para crear una nueva encuesta aquí
  // Recuerda validar el token y los datos de entrada
};

exports.listSurveys = async (req, res) => {
  try {
    const encuestas = await Encuesta.findAll();
    res.json(encuestas);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar encuestas' });
  }
};

exports.getSurveyById = async (req, res) => {
  const { id } = req.params;
  try {
    const encuesta = await Encuesta.findByPk(id, { include: Pregunta });
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }
    res.json(encuesta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener encuesta' });
  }
};

exports.updateSurvey = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estado } = req.body;
  try {
    const encuesta = await Encuesta.findByPk(id);
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }
    await encuesta.update({ titulo, descripcion, estado });
    res.json(encuesta);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar encuesta' });
  }
};

exports.deleteSurvey = async (req, res) => {
  const { id } = req.params;
  try {
    const encuesta = await Encuesta.findByPk(id);
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }
    await encuesta.destroy();
    res.json({ message: 'Encuesta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar encuesta' });
  }
};

exports.publishSurvey = async (req, res) => {
  const { id } = req.params;
  try {
    const encuesta = await Encuesta.findByPk(id);
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }
    encuesta.estado = 'publicado';
    await encuesta.save();
    res.json({ message: 'Encuesta publicada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al publicar encuesta' });
  }
};


