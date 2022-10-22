const cryptoService = require("../services/cryptoService");

const getCountOfCoin =async (req, res) => {
    try {
        const CountOfCoin = await cryptoService.getCountOfCoin();
        res.send({status:"ok" , count: CountOfCoin});
    } catch (err) {
        res.status(404).json({ err });
    }
};


const getAllCryptos = async (req, res) => {
    try {
        const allCryptos = await cryptoService.getAllCryptos(req.headers.count, req.headers.current);
        res.send({status: "ok", data: allCryptos});
    }
    catch (err) {
        res.status(404).json({ err });
    }
};

const getCoin = async (req, res) => {
    try {
        const Crypto = await cryptoService.getCoin(req.params.coinId);
        res.status(200).json(Crypto);
    }catch (err) {
        res.status(404).json({ err });
    }
};

const getDescription = async (req, res) => {
    try {
        const Desc = await cryptoService.getDescription(req.params.coinId);
        res.status(200).json(Desc);
    }catch (err) {
        res.status(404).json({ err });
    }
};

module.exports = {
    getAllCryptos,
    getCoin,
    getCountOfCoin,
    getDescription,
}