const jwt = require("jsonwebtoken");

const GenerarJWT = (user) => {
  return new Promise((resolve, reject) => {
    console.log("valor super especial : ", user);

    jwt.sign(
      {
        id: user.id,
        token: user.token,
        nombre: user.nombre,
        correo: user.email,
      },

      process.env.secretOrPrivateKey,
      {
        expiresIn: "2h",
      },

      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo  generar el token");
        } else {
          return resolve(token); //aca retorno el token para que el front lo manipule
        }
      }
    ); //funciona
  });
};

module.exports = {
  GenerarJWT,
};
