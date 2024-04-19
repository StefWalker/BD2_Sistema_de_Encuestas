const { Respuesta } = require('../models');

exports.addResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const response = await Respuesta.create({ ...body, encuestaId: id });

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir respuesta', error });
  }
};

exports.listResponses = async (req, res) => {
  try {
    const { id } = req.params;

    const responses = await Respuesta.findAll({ where: { encuestaId: id } });

    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener respuestas', error });
  }
};
