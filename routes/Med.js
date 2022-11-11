const { Router } = require("express");

const { check } = require("express-validator");

const { Validationfield } = require("../middleware/validationField");

const {
  Addmedicament,
  getMedicament,
  putMedicament,
  deleteMedicament,
} = require("../Controllers/medController");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.post(
  "/",
  [
    check("Nombre", "El nombre del medicamento es obligatorio").not().isEmpty(),

    Validationfield, // Lllamando al middleware
  ],
  Addmedicament
);

router.get("/", getMedicament);

router.put(
  "/:id",
  [
    //check("Nombre", "El nombre del medicamento es obligatorio").not().isEmpty(),
    // check("Codigo", "El Codigo del medicamento es obligatorio").not().isEmpty(),
    // check("Precio", "El precio es obligatorio").not().isEmpty(),
    /// Validationfield,
  ],
  putMedicament
);

router.delete("/:id", deleteMedicament);

module.exports = router;
