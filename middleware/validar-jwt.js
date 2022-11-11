const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../Models/Usuarios");

// validando el token
const validarJWT = async (req = request, res = response, next) => {
 

  let token;

  //console.log(req.headers.authorization)

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')  // si esta la autorizacion y esta autorizacion viene por Bearer significa que le estamos enviando el token por el bearer
  

  ){

      try {


          token = req.headers.authorization.split(" ")[1];

          console.log("token sin bearer", token);

          const usuario = jwt.verify(token, process.env.secretOrPrivateKey)

          res.json({usuario})

          req.usuario = usuario;



          //console.log(decoded);
          
          // req.usuario = await Usuario.findById(decoded.id).select('-Password  -confirmado -token  -createdAt -updatedAt -__v ') // buscando el usuario por su id que viene de decoded

          //select('-Password') elimina el password de la respuesta y ya no lo asigna a la req.usuarios
       
       //   req.usuario si el usuario esta autenticado correctamente, se almacena en la req.usuario 


          //console.log(req.usuario)

          //return next();
          
      } catch (error) {

        console.log(error)

          
         /// return res.status(404).json({msg: 'Hubo un error '})
          
      }
  }


  if(!token){


      const error = new Error('Token no valido ')

      return res.status(404).json({msg: error.message})


  }


  // next();

};

module.exports = {
  validarJWT,
};



 // const token = req.header("x-token");
  // console.log( token);
  // if (!token) {
  //   return res.status(401).json({
  //     msg: "no estas autenticado para realizar esta acción",
  //   });
  // }

  // try {
  //   const payload = jwt.verify(token, process.env.secretOrPrivateKey);
  //   const { id } = payload;
  //   console.log(id);
  //   const usuario = await Usuario.findByPk(id);
  //   if (!usuario) {
  //     return res.status(401).json({
  //       msg: " Usuario no existe en la base de datos ",
  //     });
  //   }

  //   req.usuario = usuario;

  //   next();
  // } catch (error) {
  //   res.status(401).json({
  //     msg: "Token no valido",
  //   });
  // }