const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://myuser:mypassword@postgresql:5432/mydatabase');

// Definición del modelo Usuario
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

// Definición del modelo Encuesta
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

// Definición del modelo Pregunta
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

// Relaciones entre modelos
Usuario.hasMany(Encuesta);
Encuesta.belongsTo(Usuario);

Encuesta.hasMany(Pregunta);
Pregunta.belongsTo(Encuesta);

module.exports = {
  Usuario,
  Encuesta,
  Pregunta,
  sequelize
};
