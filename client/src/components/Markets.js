import "../styles/App.css";
import { useEffect, useState} from "react";
import {Link } from "react-router-dom";
import {paginate} from "../functions/paginate";
import "../styles/paginate.css"
var max=10

const Markets = () => {

    const [MarketCoins ,setMarketCoins ] = useState([])
    const [currentPage ,setNextPage ] = useState(1)


    useEffect(() => {
        GetMarketCoin()
    }, [currentPage]);

    async function GetMarketCoin() {

        const result = await fetch(`http://localhost:3000/coins/markets`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    count: max,
                    current: currentPage,
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
    // let pagination = paginate({current, max})
    const handleClick = (num) => {
        setNextPage(num);

    };
    console.log(currentPage)


return (
    <div className="sign-button">
      <form
        className="sign-form"
        onSubmit={(e) => {
          e.preventDefault();
          GetMarketCoin()
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

                      <div className="pagination">
                          {[...Array(parseInt(250/max)).keys()].map((a) => (
                              <div
                                  onClick={() => handleClick(a + 1)}
                                  className={`pagination__page ${
                                      currentPage === a + 1 ? "active" : null
                                  }`}
                              >
                                  {a + 1}{" "}
                              </div>
                          ))}
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
