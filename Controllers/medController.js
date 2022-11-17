// CONTROLADOR DE MEDIUCAMENTOS

const { response, request } = require("express");

const Medicamento = require("../Models/Medicamentos");

const Addmedicament = async (req = request, res = response) => {
  const { body } = req;

  try {
    const existMedicament = await Medicamento.findOne({
      where: {
        Nombre: body.Nombre,
        //  Codigo: body.Codigo,
      },
    });

    if (existMedicament) {
      return res.status(400).json({
        msg: `Ya existe un medicamento con el nombre ${body.Nombre}`,
      });
    }

    const medicament = new Medicamento(body);

    await medicament.save();
    res.status(200).json({
      msg: "Medicamento agregado correctamente",
      medicament,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      error,
    });
  }
};

const getMedicament = async (req = request, res = response) => {
  try {
    const medicaments = await Medicamento.findAll(); //este funciona? vamos a hacer la prueba
    //console.log(medicaments); // si funciona ...
    res.json({
      msg: "Consulta realizada correctamente",
      medicaments,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un error ,  favor de contactar al administrador",
      error
    );
  }
};

const putMedicament = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  //console.log(body);

  try {
    const medicamentPut = await Medicamento.findByPk(id);
    if (!medicamentPut) {
      return res.status(404).json({
        msg: `No existe el medicamento para actualizar con el codigo ${id}`,
      });
    }
    await medicamentPut.update(body);
    res.status(200).json({
      msg: "Medicamento actualizado correctamente",
      medicamentPut,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const deleteMedicament = async (req = request, res = response) => {
  const { id } = req.params;
  const medicamentDelete = await Medicamento.findByPk(id);
  if (!medicamentDelete) {
    return res.status(404).json({
      msg: `No existe un medicamento con el codigo ${id} para eliminar`,
    });
  }

  await medicamentDelete.destroy();
  res.json({
    msg: "Medicamento eliminado correctamente",
    medicamentDelete,
  });
};

module.exports = {
  Addmedicament,
  getMedicament,
  putMedicament,
  deleteMedicament,
};
