const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/middlewareMulterUsers");
let validacion = require("../middleware/validatorUsers");
const guestMiddleware = require("../middleware/guestMiddleware");

//Formulario de Login
router.get("/login", guestMiddleware, userController.login);

//Procesar el Login
router.post("/login", userController.loginproceso);

//Formulario de Registro
router.get("/register", guestMiddleware, userController.register);

//Procesar el Registro
router.post(
  "/register",
  upload.single("image"),
  validacion,
  userController.processRegister
);
//procesar profile de usuario
router.get("/profile", userController.userProfile);
//procesar edicion usuario
router.get("/edit/:id", userController.editUser);
//update cambios del perfil
router.put("/edit/:id",upload.single('image'), userController.processEdit);
router.get("/logout", userController.logout);

module.exports = router;
