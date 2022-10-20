// In src/v1/routes/workoutRoutes.js
const express = require("express");
const cryptoController = require("../../controllers/cryptoController");

const router = express.Router();

router.get("/coins/markets", cryptoController.getAllCryptos);
router.get("/coins/count", cryptoController.getCountOfCoin);
router.get("/coins/:coinId", cryptoController.getCoin);

module.exports =  router;