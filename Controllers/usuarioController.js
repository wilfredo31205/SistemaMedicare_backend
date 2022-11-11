const { request, response } = require("express");
const Usuario = require("../Models/Usuarios");
const bcrypt = require("bcrypt");
const { GenerarJWT } = require("../helpers/GenerarJWT");
const db = require("../config/db");

const CreacionUsuario = async (req = request, res = response) => {
  const { nombre, apellido,  email, password } = req.body;

  try {
 

    const isUser = await Usuario.findOne({
      where: {
        email
      },

      })

    const newPass = await bcrypt.hash(password, 10);
    const user = new Usuario({ nombre, apellido,  email, password: newPass,});
    const result = await user.save()
    const token = await GenerarJWT(result);


    console.log(user);


    res.json({
      msg: "Usuario creado correctamente",
      result,
      token,
      
    });
  } catch (error) {
    
    if (error) {
      return res.status(400).json({
        msg: `Este correo está registrado , favor verificar`,
      });

    }

   
  }
};

const authenticatingUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findAll({where: {email}}); 
   
    if (usuario.length == 0) {
      const error = new Error("Email no registrado");
      return res.status(400).json({ msg: error.message });
    }


    const isPassword = await bcrypt.compare(password, usuario[0].dataValues.password);
    if (!isPassword) {
      const error = new Error("Password incorrecto");
      return res.status(400).json({ msg: error.message });
    } else {
      const token = await GenerarJWT(usuario[0].dataValues);
      //console.log(usuario) 
      return res.status(200).json({token });
      // return res.status(200).json({ usuario: usuario[0].dataValues, token });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({  error });
  }
};



const verificacionToken = (req, res) =>{

 // console.log(req.headers.authorization);

  res.json({ 

    usuario : req.usuario


  })

 


}




const getUser = () => {};

const updateUser = () => {};

const deleteUser = () => {};

module.exports = {
  CreacionUsuario,
  authenticatingUser,
  getUser,
  updateUser,
  deleteUser,
  verificacionToken
};
