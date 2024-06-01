const { body } = require("express-validator");
const path = require("path");
const validation = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre no tiene que estar vacio")
    .bail()
    .isLength({ min: 5 })
    .withMessage("La longitud del nombre del producto es menor a la requerida"),
  body("descripcion")
    .isLength({ min: 20 })
    .withMessage("La longitud de la descripcion es menor a la requerida"),
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }
    return true;
  }),
];
module.exports = validation;
