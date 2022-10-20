const cryptoService = require("../services/cryptoService");

const getCountOfCoin =async (req, res) => {
    const CountOfCoin = await cryptoService.getCountOfCoin();

     res.send({count : CountOfCoin} );
};


const getAllCryptos = async (req, res) => {
    const allCryptos = await cryptoService.getAllCryptos(req.headers.count ,  req.headers.current);
    res.send(allCryptos.data );
};

const getCoin = async (req, res) => {

    console.log(req.params)
    console.log("req.params.coinId" , req.params.coinId)
    const Crypto = await cryptoService.getCoin(req.params.coinId);
    res.send(Crypto );

};

module.exports = {
    getAllCryptos,
    getCoin,
    getCountOfCoin,
}