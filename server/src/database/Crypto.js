const DB = require("./db.json");
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const getAllCoins =  async() => {
    let data = await  CoinGeckoClient.coins.markets( {
        per_page:10}
    );
    return data;
};

const  getCryptos = async(coinId) => {

    let daysArray = [1 , 7 , 14 , 30 , 60 , 200 ,365]
    let ArrayPrice =[];
    let daily = 'daily'
    console.log(coinId)

    for(let i =0 ; i < daysArray.length ; i++) {
        let coinData = await CoinGeckoClient.coins.fetchMarketChart(coinId, {
            interval: 'daily',
            vs_currency: 'usd',
            days: daysArray[i],
        })

        ArrayPrice[i] = { daysAgo: daysArray[i] , price: await coinData.data.prices[0][1] }

    }
    return ArrayPrice

};

module.exports = {
    getAllCoins,
    getCryptos,
};