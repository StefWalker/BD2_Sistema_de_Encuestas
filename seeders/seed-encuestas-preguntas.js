const { Encuesta, Pregunta } = require('../models/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuarios = await Usuario.findAll();

    const encuestas = await Encuesta.bulkCreate([
      { titulo: 'Encuesta 1', descripcion: 'Descripción de la encuesta 1', estado: 'publicado', UsuarioId: usuarios[0].id },
      { titulo: 'Encuesta 2', descripcion: 'Descripción de la encuesta 2', estado: 'borrador', UsuarioId: usuarios[1].id },
    ]);

    const preguntas = await Pregunta.bulkCreate([
      { contenido: '¿Cómo te sientes hoy?', tipo: 'texto', EncuestaId: encuestas[0].id },
      { contenido: '¿Qué deporte prefieres?', tipo: 'opcionMultiple', EncuestaId: encuestas[0].id },
      { contenido: '¿Qué color te gusta más?', tipo: 'opcionSimple', EncuestaId: encuestas[1].id },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Pregunta.destroy({ where: {} });
    await Encuesta.destroy({ where: {} });
  }
};
