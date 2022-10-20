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
              { MarketCoins.length ? (
                  <div className="search">
                      <div> {MarketCoins.map((coin , index) =>
                      <Link to={`/markets/${coin.id}`}  state={{coin}} >
                          <div key={coin.id} className="main">
                              <img
                                  src={coin.image}
                                  alt="coin"
                              />
                              <div className="main-details">
                                  <h2 className="info"><strong>Name:</strong>{coin.name} </h2>
                                  <h2 className="info"><strong>Symbol:</strong>{coin.symbol} </h2>
                                  <h2 className="info"><strong>Current price:</strong>{coin.current_price} $ </h2>
                                  <h2 className="info"><strong>High 24h:</strong>{coin.high_24h} $ </h2>
                                  <h2 className="info"><strong>Low 24h:</strong>{coin.low_24h} $  </h2>
                              </div>
                          </div>
                      </Link>
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
              )  : ( <h2 className="info">loading</h2>)
              }

          </div>
      </form>
    </div>
  );
};

export default Markets;
