// In src/services/workoutServices.js
const Crypto = require("../database/Crypto");

const getAllCryptos = async() => {
    const allCryptos = await Crypto.getAllCoins();
    return allCryptos;
};

const getCoin = async (coinId) => {
    const coin = await Crypto.getCryptos(coinId);
    return coin;
}


module.exports = {
    getAllCryptos,
    getCoin,
};