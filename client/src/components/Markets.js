import "../styles/App.css";
import { useEffect, useState} from "react";
import {Link } from "react-router-dom";
import {paginate} from "../functions/paginate";
import "../styles/paginate.css"


var coinsPerPAge = 100  // var for control the count of coins for each page
var ArrayPagination = [];  // Array for pagination
const Markets = () => {

    const [MarketCoins ,setMarketCoins ] = useState([])    //hook to save Array of Coins
    const [current ,setNextPage ] = useState(1)         //hook to save Current page
    const [max ,setCountOfCoin ] = useState(0)            // hook for save count of coins
    const [findTheRemainder ,setfindTheRemainder ] = useState(0)  // hook save the remainder from division CountCoin(max)/coinsPerPAge


    useEffect(() => {
        GetMarketCoin()
    }, [current]);

    useEffect(() => {
        GetLength()
    }, []);


    async function GetLength() {     // function: help me fine the count of coins
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
        setfindTheRemainder(result.count % coinsPerPAge);      // i want the division in order to calculate the last page of coins
       let myInt = Math.ceil(result.count/coinsPerPAge)      //i calculate the count of pages, base on the division between count of coins / count of coins
        setCountOfCoin(myInt);
    }




    async function GetMarketCoin() {   // function: get info for each coin
        if(current!==max) {
            const result = await fetch(`http://localhost:3000/coins/markets`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        count: coinsPerPAge,  // count of coins which I need per page
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

        else if(current === max){               //if you are the last page, then change the count with remainder for correct results
            const result = await fetch(`http://localhost:3000/coins/markets`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        count: findTheRemainder,   //change count with remainder ---> findTheRemainder
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
        console.log("res",MarketCoins)
    }

    const handleClick = (num) => {    // change the current page, base on pagination click
        console.log(num)
        if(typeof(num)=== "string" ){
            return
        }
        setNextPage(num);
    };

    ArrayPagination = paginate({current,max})  // create paginate function to create array for pagination

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
                                  <h2 className="info"><strong>Name:</strong>{coin.name}  </h2>
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

                        { ArrayPagination ==null ?( <>Loading</>) : (
                          <div className="pagination">
                              {ArrayPagination.items.map((a) => (
                                  <div
                                      onClick={() => handleClick(a )}
                                      className={`pagination__page ${
                                          current === a  ? "active" : null
                                      }`}
                                  >
                                      {" "}{a}{" "}
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
