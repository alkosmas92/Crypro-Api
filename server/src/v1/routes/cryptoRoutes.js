// In src/v1/routes/workoutRoutes.js
const express = require("express");
const cryptoController = require("../../controllers/cryptoController");

const router = express.Router();

router.get("/coins/markets", cryptoController.getAllCryptos);

module.exports =  router;