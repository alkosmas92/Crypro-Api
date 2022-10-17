import "../styles/App.css";
import { useEffect, useState} from "react";

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

        console.log("result")
        setMarketCoins(result);


    }

    console.log(MarketCoins)
    console.log("MarketCoins == undefined " , MarketCoins.length !== 0 )

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
                      <div> {MarketCoins.map((obj , index) =>
                          <div key={obj.id} className="infoadmin">
                              <div>Name:{obj.id} </div>
                              <Link to={`/markets/${obj.id}`}>
                                  <button type="submit"> Singin </button>
                              </Link>

                          </div>
                      )}
                      </div>
                  </div>
              )  : ( <>You do not have active product</>)
              }

          </div>


      </form>
    </div>
  );
};

export default Markets;
