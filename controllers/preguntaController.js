const { Pregunta, Encuesta } = require('../models/models');

exports.addQuestion = async (req, res) => {
  const { id } = req.params;
  const { contenido, tipo } = req.body;
  try {
    const encuesta = await Encuesta.findByPk(id);
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }
    const pregunta = await Pregunta.create({ contenido, tipo, EncuestaId: id });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir pregunta' });
  }
};

exports.listQuestions = async (req, res) => {
  const { id } = req.params;
  try {
    const encuesta = await Encuesta.findByPk(id, { include: Pregunta });
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }
    res.json(encuesta.preguntas);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar preguntas' });
  }
};

exports.updateQuestion = async (req, res) => {
  const { id, questionId } = req.params;
  const { contenido, tipo } = req.body;
  try {
    const pregunta = await Pregunta.findByPk(questionId);
    if (!pregunta || pregunta.EncuestaId !== id) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    await pregunta.update({ contenido, tipo });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar pregunta' });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { id, questionId } = req.params;
  try {
    const pregunta = await Pregunta.findByPk(questionId);
    if (!pregunta || pregunta.EncuestaId !== id) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    await pregunta.destroy();
    res.json({ message: 'Pregunta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar pregunta' });
  }
};
