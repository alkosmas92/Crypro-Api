import "../styles/App.css";
import { useEffect, useState} from "react";
import {Link } from "react-router-dom";

const Markets = () => {

    const [MarketCoins ,setMarketCoins ] = useState([])

    useEffect(() => {
        GetMarketCoin()
    }, []);

    async function GetMarketCoin() {
        const result = await fetch(`http://localhost:3000/coins/markets`, {
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

        setMarketCoins(result);
    }
    console.log("result", MarketCoins)


return (
    <div className="sign-button">
      <form
        className="sign-form"
        onSubmit={(e) => {
          e.preventDefault();
            // GetMarketCoin()
        }}
      >
          <div>
              { MarketCoins.length !== 0 ? (
                  <div>
                      <div> {MarketCoins.map((coin , index) =>
                          <div key={coin.id} className="infoadmin">
                              <div>Name:{coin.name} </div>
                              <div>Symbol:{coin.symbol} </div>
                              <div>Current price:{coin.current_price} </div>
                              <div>High 24h:{coin.high_24h} </div>
                              <div>Low 24h:{coin.low_24h} </div>
                              <Link to={`/markets/${coin.id}`}  state={{coin}} >
                                  <button type="submit"> Details </button>
                              </Link>

                          </div>
                      )}
                      </div>
                  </div>
              )  : ( <h2>loading</h2>)
              }

          </div>
      </form>
    </div>
  );
};

export default Markets;
