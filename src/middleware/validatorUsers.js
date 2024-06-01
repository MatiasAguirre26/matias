const { body } = require("express-validator")
const path = require("path")
const validacion = [
    body('name').notEmpty().withMessage("Usamos tu nombre para identificar tus pedidos.").bail()
    .isLength({min: 4}).withMessage('Debes escribir un nombre de usuario con más de 4 caracteres'),
	body('lastName').notEmpty().withMessage("Usamos tu Apellido para identificarte mas rapido.").bail()
    .isLength({min: 4}).withMessage('Debes escribir un nombre de usuario con más de 2 caracteres'),
    body('email').notEmpty().withMessage("Tienes que escribir tu correo."),
    body('password').notEmpty().withMessage('Debes escribir una contraseña con más de 8 caracteres').bail()
	.isLength({min: 8}),
		body('passwordConfirm')
		.trim()
		.notEmpty().withMessage('Debe confirmar su contraseña').bail()
		.custom(async (passwordConfirm, {req}) => {
			let password = req.body.password;
			if(password !== passwordConfirm) {
				throw new Error("Las contraseñas deben coincidir");
			};
		}),

    body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.JPG', '.jpg', '.png', '.gif', '.jpeg', '.JPEG', '.PNG', '.GIF'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})
]
module.exports = validacion