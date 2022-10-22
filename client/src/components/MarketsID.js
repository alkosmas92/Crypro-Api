import "../styles/App.css";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/coin-details.css";

const MarketsID = () => {
  const location = useLocation();
  const coins = location.state;
  const [Prices, usePrices] = useState({});
  const { id } = useParams();

  useEffect(() => {
    GetMarketCoin();
  }, []);

  async function GetMarketCoin() {
    const result = await fetch(`http://localhost:3000/coins/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    console.log("result", result);
    usePrices(result);
  }
  console.log("Prices ", Prices.length);

  return (
    <div className="selected-coin">
      <div>
        {Prices.length != undefined ? (
          <div className="container-coin">
            <img src={coins.coin.image} alt="coin" />
            <div className="details">
              <div>
                <strong>Name:</strong> {coins.coin.name}{" "}
              </div>
              <div>
                <strong>Symbol:</strong> {coins.coin.symbol}{" "}
              </div>
              <div>
                <strong>Current price:</strong> {coins.coin.current_price}${" "}
              </div>
              <div>
                {" "}
                {Prices.map((price, index) => (
                  <div key={price.daysAgo} className="infoadmin">
                    <div>
                      <strong>Price before {price.daysAgo} days was: </strong>{" "}
                      {price.price}$
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <strong>High 24h:</strong> {coins.coin.high_24h}${" "}
              </div>
              <div>
                <strong>Low 24h:</strong> {coins.coin.low_24h}$
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading . . .</h1>
        )}
      </div>
    </div>
  );
};

export default MarketsID;
