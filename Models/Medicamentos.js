const Sequelize = require("sequelize");

const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Medicamento = db.define("medicamentos", {
  // asignandole el nombre a la tabla en la bd

  // db.define definiendo un nuevo modelo ..

  Codigo: {
    type: DataTypes.INTEGER,

    // primaryKey: true
    // autoIncrement: true,
  },

  Nombre: {
    type: DataTypes.STRING,
    allowNull: true,
    //unique
  },

  Precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  Descuento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  Itbis: DataTypes.INTEGER,
});

module.exports = Medicamento;
