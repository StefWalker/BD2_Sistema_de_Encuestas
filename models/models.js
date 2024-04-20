const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://myuser:mypassword@postgresql:5432/mydatabase');

// Definición del modelo Usuario
function defineUsuario(sequelize, DataTypes) {
  class Usuario extends Model {}
  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize, modelName: 'Usuario' });

  return Usuario;
}

// Definición del modelo Encuesta
function defineEncuesta(sequelize, DataTypes) {
  class Encuesta extends Model {}
  Encuesta.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    estado: {
      type: DataTypes.ENUM('borrador', 'publicado'),
      defaultValue: 'borrador'
    }
  }, { sequelize, modelName: 'Encuesta' });

  return Encuesta;
}

// Definición del modelo Pregunta
function definePregunta(sequelize, DataTypes) {
  class Pregunta extends Model {}
  Pregunta.init({
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('texto', 'opcionMultiple', 'opcionSimple'),
      allowNull: false
    }
  }, { sequelize, modelName: 'Pregunta' });

  return Pregunta;
}

module.exports = {
  defineUsuario,
  defineEncuesta,
  definePregunta,
  sequelize
};
