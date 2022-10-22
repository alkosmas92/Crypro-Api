const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const getLength =  async(count , current) => {
    let list = await CoinGeckoClient.coins.list({
        vs_currency: "usd",
    });
    return list.data.length;
};

const getAllCoins =  async(count , current) => {
    console.log("take",current)
    let dataCoins = await  CoinGeckoClient.coins.markets( {
        vs_currency: "usd",
        per_page:count,
        page:current,
        }
    );
    let ArrayCoins=[]
    for(let i =0 ; i < dataCoins.data.length ; i++) {
        ArrayCoins[i] = {
            id: dataCoins.data[i].id,
            name:dataCoins.data[i].name ,
            symbol:dataCoins.data[i].symbol,
            current_price: dataCoins.data[i].current_price,
            high_24h:dataCoins.data[i].high_24h,
            low_24h:dataCoins.data[i].low_24h,
            price_change_24h:dataCoins.data[i].price_change_24h,
            image:dataCoins.data[i].image,
        }
    }
    return ArrayCoins;
};

const  getCryptos = async(coinId) => {

    let daysArray = [1 , 7 , 14 , 30 , 60 , 200 ,365]
    let ArrayPrice =[];
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

const  getDescription = async(coinId) => {
        console.log("coinId",coinId)
        let data = await CoinGeckoClient.coins.fetch(coinId, {
            localization:"en",
        });

        return data.data.description.en

};



module.exports = {
    getAllCoins,
    getCryptos,
    getLength,
    getDescription,
};