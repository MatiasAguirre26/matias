const {body} = require('express-validator');
const path = require('path');
const validation = [
    body('nombre').notEmpty().withMessage('El nombre no tiene que estar vacio').bail()
	.isLength({min:5}).withMessage('La longitud del nombre del producto es menor a la requerida'),
    body('descripcion').isLength({min:20}).withMessage('La longitud de la descripcion es menor a la requerida'),
    body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg','.jpeg','.png','.gif'];
		
		if (!file) {
			//esa linea de codigo es para cuando no se sube ninguna imagen y necesite hacerlo, en el caso de editar no se hace
			// ya que al no agregar una se entiende que uno quiere conservar la imagen que ya se agrego cuando se creo el producto
			
			//throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})

]
module.exports = validation;