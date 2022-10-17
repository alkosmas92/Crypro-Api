// In src/services/workoutServices.js
const Crypto = require("../database/Crypto");

const getAllCryptos = () => {
    const allCryptos = Crypto.getAllWorkouts();
    return allCryptos;
};


module.exports = {
    getAllCryptos,
};