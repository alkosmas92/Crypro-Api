import "../styles/App.css";
import { useEffect, useState} from "react";
import {Link } from "react-router-dom";
import {paginate} from "../functions/paginate";
import "../styles/paginate.css"
import Paginatation from "./Paginatation";

var coinsPerPAge = 10
var Fp = [];
const Markets = () => {

    const [MarketCoins ,setMarketCoins ] = useState([])
    const [current ,setNextPage ] = useState(1)
    const [max ,setCountOfCoin ] = useState(0)
    const [findTheDivison ,setfindTheDivison ] = useState(0)


    useEffect(() => {
        GetMarketCoin()
    }, [current]);

    useEffect(() => {
        GetLength()

    }, []);


    async function GetLength() {
        const result = await fetch(`http://localhost:3000/coins/count`, {
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
        setfindTheDivison(result.count % coinsPerPAge);      // i want the division in order to calculate the last page of coins
       let myInt = Math.ceil(result.count/coinsPerPAge)
        console.log("myInt" , myInt)
        console.log("result" , result.count)
        setCountOfCoin(myInt-1); // i calculate the count of pages, base on the count of coins
    }




    async function GetMarketCoin() {
        if(current!==max) {
            const result = await fetch(`http://localhost:3000/coins/markets`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        count: coinsPerPAge,
                        current: current,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    return data;
                });
            setMarketCoins(result);
        }

        else if(current === max){

            const result = await fetch(`http://localhost:3000/coins/markets`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        count: findTheDivison,
                        current: current,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    return data;
                });
            setMarketCoins(result);
        }
        console.log("res",current ,max)

    }

    const handleClick = (num) => {
        console.log(num)
        if(typeof(num)=== "string" ){
            return
        }

            setNextPage(num);
        co
    };

    Fp = paginate({current,max})

return (
    <div className="sign-button">
      <form
        className="sign-form"
        onSubmit={(e) => {
          e.preventDefault();
          GetMarketCoin(),
            GetLength()
        }}
      >
          <div>
              { !MarketCoins.length   ? ( <h2 className="info">loading</h2>) : (
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


                    <div>

                        { Fp ==null ?( <>Loading</>) : (
                          <div className="pagination">
                              {console.log("Fp",Fp)}
                              {Fp.items.map((a) => (
                                  <div
                                      onClick={() => handleClick(a )}
                                      className={`pagination__page ${
                                          current === a  ? "active" : null
                                      }`}
                                  >
                                      {a}{" "}
                                  </div>
                              ))}
                          </div>
                        )}
                    </div>
                  </div>
                 )
              }

          </div>
      </form>
    </div>
  );
};

export default Markets;
