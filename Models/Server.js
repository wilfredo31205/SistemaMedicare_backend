const express = require("express");

const cors = require("cors");

const db = require("../config/db");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.middlewares();

    this.conectionDb();

    this.path = {
      med: "/api/Med",
      user: "/api/user/",
    };

    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
  } //los commentarios borra todo despues

  async conectionDb() {
    try {
      await db.authenticate();
      db.sync(); // creando la tabla de la bd

      console.log("La conexiòn a la base de se ha realizado correctamente");
    } catch (error) {
      console.log("No se puedo conectar a la BD", error);
    }
  }

  routes() {
    this.app.use(this.path.med, require("../routes/Med")); // ruta de autenticacion

    this.app.use(this.path.user, require("../routes/Usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corrtiendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
