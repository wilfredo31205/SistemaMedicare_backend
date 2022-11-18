const Sequelize = require("sequelize");

const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

// configuracion bd

const db = new Sequelize(
  process.env.Name_BD,
  process.env.BD_USER,
  process.env.PASSWORD ?? "",
  {
    host: process.env.BD_Host,
    dialect: "mysql",
    //port: "3306",
    port: process.env.PORT_DB,
    define: {
      timestamps: false,
    },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = db;
