const { Usuario } = require('../models/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Usuario.bulkCreate([
      { nombre: 'Juan', email: 'juan@example.com', password: 'password123' },
      { nombre: 'Maria', email: 'maria@example.com', password: 'password456' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Usuario.destroy({ where: {} });
  }
};
