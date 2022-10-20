const DB = require("./db.json");
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const getLength =  async(count , current) => {
    let list = await CoinGeckoClient.coins.list();

    return list.data.length;
};

const getAllCoins =  async(count , current) => {
    console.log("take",current)
    let data = await  CoinGeckoClient.coins.markets( {
        vs_currency: "usd",
        per_page:count,
        page:current,
        }
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
    getLength,
};