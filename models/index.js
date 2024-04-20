'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const { defineUsuario, defineEncuesta, definePregunta, sequelize } = require('./models');

const db = {};

let models = {
  Usuario: defineUsuario(sequelize, Sequelize.DataTypes),
  Encuesta: defineEncuesta(sequelize, Sequelize.DataTypes),
  Pregunta: definePregunta(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.models = models;

module.exports = db;
