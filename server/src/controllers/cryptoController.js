const cryptoService = require("../services/cryptoService");

const getAllCryptos = (req, res) => {
    const allCryptos = cryptoService.getAllCryptos();
    res.send({ status: "OK", data: allCryptos });
};


module.exports = {
    getAllCryptos,
}