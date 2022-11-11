const { Router } = require("express");
const {
  authenticatingUser,
  registerUser,
  CreacionUsuario,
  verificacionToken,
} = require("../Controllers/usuarioController");

const { check } = require("express-validator");

const { validarJWT } = require("../middleware/validar-jwt");

const { Validationfield } = require("../middleware/validationField");

const router = Router();

router.get("/", []);

// registro usuario
router.post(
  "/",
  [
    //check("id", "El id es obligatorio").not().isEmpty(),
    //check("nombre", "El nombre no puede ir vacio").not().isEmpty(),
    check("email", "El email no puede ir vacio").not().isEmpty(),
    check(
      "password",
      "El Password es obligatorio y tiene que ser mas de 6 digitos "
    ).isLength({ min: 6 }),

    Validationfield,
  ],
  CreacionUsuario
);

// autenticacion usuario
router.post("/login", [], authenticatingUser);

router.get("/verificarToken", validarJWT, verificacionToken);

router.put("/:id", []);

router.delete("/:id", []);

module.exports = router;
