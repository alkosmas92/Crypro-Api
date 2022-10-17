const DB = require("./db.json");
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const getAllWorkouts =  async() => {
    let data = await  CoinGeckoClient.coins.markets();
    console.log("geaiiii" , data)
    return data;
};

module.exports = {
    getAllWorkouts,
};