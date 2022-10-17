const cryptoService = require("../services/cryptoService");

const getAllCryptos = async (req, res) => {
    const allCryptos = await cryptoService.getAllCryptos();
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
}