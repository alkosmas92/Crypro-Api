import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WrapperMarketID from "../styles/marketid";



const MarketsID = () => {
  const location = useLocation();
  const coins = location.state;
  const [Prices, usePrices] = useState({});
  const [desc, useDesc] = useState({});
  const { id } = useParams();

  useEffect(() => {
    GetMarketCoin();
    GetMarketDesc();
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
    usePrices(result.data);
  }
  async function GetMarketDesc() {
    const result = await fetch(`http://localhost:3000/coins/${id}/desc`, {
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
    useDesc(result);
  }
  console.log("desc ", desc);

  return (
    <div>
      <WrapperMarketID>
        <div className="selected-coin">
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
                <div><strong>Description:</strong></div>
                <div className="moreInfo">
                  <div dangerouslySetInnerHTML={{ __html: desc.desc }}></div>
                </div>
                  <strong>Prices: </strong>{" "}
                <div className="price-before">
                  <strong>Current price:</strong> {coins.coin.current_price}${" "}
                </div>
                <div>
                  {" "}
                  <div className="price-before">
                    <strong>High 24h price:</strong> {coins.coin.high_24h}${" "}
                  </div>
                  <div className="price-before">
                    <strong>Low 24h price:</strong> {coins.coin.low_24h}$
                  </div>
                  {Prices.map((price, index) => (
                    <div key={price.daysAgo} className="price-before">
                      <div>
                        {price.daysAgo !== 365 ? (
                          <div>
                            {" "}
                            <strong> {price.daysAgo} Days ago price was:{" "}</strong>
                            {price.price}${" "}
                          </div>
                        ) : (
                          <div>
                            {" "}
                            <strong> 1 Year ago price was: </strong> {price.price}${" "}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ) : (
            <h1>Loading . . .</h1>
          )}
        </div>
      </WrapperMarketID>
    </div>
  );
};

export default MarketsID;
