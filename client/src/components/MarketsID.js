import "../styles/App.css";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styled from "styled-components";

const Wrapper = styled.div`
   {
    .selected-coin {
      display: flex;
      flex-direction: column;
    }

    .price-before {
      margin-left: 25px;
    }
    .moreInfo{
      margin-left: 25px;
    }

    .container-coin {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      margin-bottom: 25px;
      border-radius: 6px;
      background: #faeff0;
      box-shadow: 0px 0px 12px #aaa, -0px -0px 12px #fff;
      flex-basis: 100%;
      gap: 20%;
    }

    .details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: x-large;
      gap: 60%;
    }

    header {
      display: flex;
      align-content: center;
      justify-content: center;
      width: 1100px;
      margin: 0 auto;
      padding: 20px 0px 0px 0px;
    }
  }
`;

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
    <div>
      <Wrapper>
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
                  <strong>Price: </strong>{" "}
                <div className="price-before">
                  <strong>Current price:</strong> {coins.coin.current_price}${" "}
                </div>
                <div>
                  {" "}
                  <div className="price-before">
                    <strong>High 24h:</strong> {coins.coin.high_24h}${" "}
                  </div>
                  <div className="price-before">
                    <strong>Low 24h:</strong> {coins.coin.low_24h}$
                  </div>
                  {Prices.map((price, index) => (
                    <div key={price.daysAgo} className="price-before">
                      <div>
                        {price.daysAgo !== 365 ? (
                          <div>
                            {" "}
                            <strong> {price.daysAgo} Days  ago was:{" "}</strong>
                            {price.price}${" "}
                          </div>
                        ) : (
                          <div>
                            {" "}
                            <strong> 1 Year ago was: </strong> {price.price}${" "}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div><strong>Description:</strong></div>
                <div className="moreInfo">
                  <strong>Price change in 24h:</strong>  {coins.coin.price_change_24h}$
                </div>
                <div className="moreInfo">
                  <strong>Market cap:</strong> {coins.coin.market_cap}$
                </div>
                <div className="moreInfo">
                  <strong>Market cap rank:</strong> {coins.coin.market_cap_rank}$
                </div>
                <div className="moreInfo">
                  <strong>Max supply:</strong> {coins.coin.max_supply}$
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading . . .</h1>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default MarketsID;
