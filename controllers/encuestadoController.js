const { Encuestado } = require('../models');

exports.addRespondent = async (req, res) => {
  try {
    const respondent = await Encuestado.create(req.body);

    res.status(201).json(respondent);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar encuestado', error });
  }
};

exports.listRespondents = async (req, res) => {
  try {
    const respondents = await Encuestado.findAll();

    res.status(200).json(respondents);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener encuestados', error });
  }
};

exports.getRespondentById = async (req, res) => {
  try {
    const { id } = req.params;

    const respondent = await Encuestado.findByPk(id);

    if (!respondent) {
      return res.status(404).json({ message: 'Encuestado no encontrado' });
    }

    res.status(200).json(respondent);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener encuestado', error });
  }
};

exports.updateRespondent = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Encuestado.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedRespondent = await Encuestado.findByPk(id);
      return res.status(200).json(updatedRespondent);
    }

    throw new Error('Encuestado no encontrado');
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar encuestado', error });
  }
};

exports.deleteRespondent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Encuestado.destroy({
      where: { id: id },
    });

    if (deleted) {
      return res.status(204).send();
    }

    throw new Error('Encuestado no encontrado');
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar encuestado', error });
  }
};
