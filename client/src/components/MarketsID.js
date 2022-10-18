import "../styles/App.css";
import {Link, useLocation ,useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const MarketsID = () => {
    const location = useLocation();
    const coins = location.state;
    const [Prices, usePrices] = useState({})
    const { id } = useParams();
    console.log("coinid" , id)


    useEffect(() => {
        GetMarketCoin()
    }, []);

    async function GetMarketCoin() {
        const result = await fetch(`http://localhost:3000/coins/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                return data;
            });

        console.log("result" , result)
        usePrices(result)
    }
    console.log("Prices " , Prices.length )

return (
    <div className="sign-button">
      <form
        className="sign-form"
        onSubmit={(e) => {
          e.preventDefault();

        }}
      >

          <div>
              { Prices.length != undefined ? (
                  <div>
                      <div>Name:{coins.coin.name} </div>
                      <div>Symbol:{coins.coin.symbol} </div>
                      <div>Current price:{coins.coin.current_price} </div>
                      <div>High 24h:{coins.coin.high_24h} </div>
                      <div>Low 24h:{coins.coin.low_24h} </div>
                      <div> {Prices.map((price , index) =>
                          <div key={price.daysAgo} className="infoadmin">
                              <div>
                                Price before {price.daysAgo} days was {price.price} usd
                              </div>
                          </div>
                      )}
                      </div>

                  </div>
              )  : ( <>Loading</>)
              }

          </div>


      </form>
    </div>
  );
};

export default MarketsID;
