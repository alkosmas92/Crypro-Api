const express = require("express");
const bodyParser = require("body-parser");
const v1CryptoRoutes = require("./routes/cryptoRoutes");
const cors =  require("cors");



const app = express();

app.use(cors());
const PORT = 3000;
app.use(bodyParser.json());
app.use("/", v1CryptoRoutes);

app.listen(3000, () => {
    console.log(`API is listening on port ${PORT}`);
});
