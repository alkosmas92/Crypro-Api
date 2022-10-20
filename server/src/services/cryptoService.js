// In src/services/workoutServices.js
const Crypto = require("../database/Crypto");

const getCountOfCoin = async( ) => {
    const CountOfCoin= await Crypto.getLength( );
    return CountOfCoin;
};

const getAllCryptos = async(count, current) => {
    const allCryptos = await Crypto.getAllCoins(count , current);
    return allCryptos;
};

const getCoin = async (coinId) => {
    const coin = await Crypto.getCryptos(coinId);
    return coin;
}


module.exports = {
    getAllCryptos,
    getCoin,
    getCountOfCoin,
};