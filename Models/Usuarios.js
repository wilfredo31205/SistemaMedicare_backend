const { DataTypes } = require("sequelize");

const db = require("../config/db");

const bcrypt = require("bcrypt");

const Usuario = db.define(
  "usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
    },

    apellido: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "el correo ya existe",
      },
    },
    password: {
      type: DataTypes.STRING,
    },

    // token: {
    //   type: DataTypes.STRING,
    // },
    // confirmado: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
  },
  {
    timestamps: true,
  },

  {
    hooks: {
      afterSave: (result) => {
        delete result.dataValues.password;
        return result;
      },
    },
  }
);

module.exports = Usuario;
