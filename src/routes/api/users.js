const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/api/userControllers");

router.get("/api/users", usersController.lista);

router.get("/api/users/:id", usersController.detail);

module.exports = router;