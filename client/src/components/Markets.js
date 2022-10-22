import "../styles/App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { paginate } from "../functions/paginate";
import styled from "styled-components";

const Wrapper = styled.div`
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: medium;
  }

  .pagination__page {
    margin-top: 5px;
    border: 1px solid black;
    padding: 3px;
    cursor: pointer;
  }

  .main {
    width: 1100px;
    margin: 0 auto;
    padding: 15px;
    margin-bottom: 25px;
    border-radius: 6px;
    background: #faeff0;
    box-shadow: 0px 0px 12px #aaa, -0px -0px 12px #fff;
    display: flex;
    gap: 48%;
    flex-basis: 80%;
    color: black;
    cursor: pointer;
    text-decoration: none;
  }
  .main-details {
    gap: 5%;
    display: flex;
    flex-direction: column;
    width: 65%;
  }

  .info {
    float: left;
    display: flex;
    gap: 5px;
    white-space: nowrap;
    font-weight: normal;
    font-size: 20px;
    margin: 0;
    text-overflow: ellipsis;
  }
  .search {
    width: 100%;
    padding: 15px;
    border-radius: 9px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyleImg = styled.img`{
    clip-path: circle(50% at 50% 50%);
    width: 100px;
    height: 100px;
    float: left;
    margin: 0px 20px 0px 10px;
  `;

// Create a Wrapper component that'll render a <section> tag with some styles

var coinsPerPAge = 100; // var for control the count of coins for each page
var ArrayPagination = []; // Array for pagination
//

const Markets = () => {
  const [MarketCoins, setMarketCoins] = useState([]); //hook to save Array of Coins
  const [current, setNextPage] = useState(1); //hook to save Current page
  const [max, setCountOfCoin] = useState(0); // hook for save count of coins
  const [findTheRemainder, setfindTheRemainder] = useState(0); // hook save the remainder from division CountCoin(max)/coinsPerPAge

  useEffect(() => {
    GetMarketCoin();
  }, [current]);

  useEffect(() => {
    GetLength();
  }, []);

  async function GetLength() {
    // function: help me find the count of coins
    const result = await fetch(`http://localhost:3000/coins/count`, {
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
    setfindTheRemainder(result.count % coinsPerPAge); // i want the division in order to calculate the last page of coins
    let myInt = Math.ceil(result.count / coinsPerPAge); //i calculate the count of pages, base on the division between count of coins / count of coins
    setCountOfCoin(myInt);
  } // i take the count of coins

  async function GetMarketCoin() {
    // function: get info for each coin
    if (current !== max) {
      const result = await fetch(`http://localhost:3000/coins/markets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          count: coinsPerPAge, // count of coins which I need per page
          current: current,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
      setMarketCoins(result);
    } else if (current === max) {
      //if you are the last page, then change the count with remainder for correct results
      const result = await fetch(`http://localhost:3000/coins/markets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          count: findTheRemainder, //change count with remainder ---> findTheRemainder
          current: current,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
      setMarketCoins(result);
    }

  } // i tate info about the coins base on
  console.log("res", MarketCoins);
  const handleClick = (num) => {
    // change the current page, base on pagination click
    console.log(num);
    if (typeof num === "string") {
      return;
    }
    setNextPage(num);
  };

  ArrayPagination = paginate({ current, max }); // create paginate function to create array for pagination

  return (
    <Wrapper>
      <div className="sign-button">
        <form
          className="sign-form"
          onSubmit={(e) => {
            e.preventDefault();
            GetMarketCoin(), GetLength();
          }}
        >
          <div>
            {!MarketCoins.length ? (
              <h1 className="info">loading . . .</h1>
            ) : (
              <div className="search">
                <div>
                  {" "}
                  {MarketCoins.map((coin, index) => (
                    <Link
                      to={`/markets/${coin.id}`}
                      state={{ coin }}
                      key={coin.id}
                    >
                      <div className="main">
                        <StyleImg src={coin.image} alt="coin" />
                        <div className="main-details">
                          <h2 className="info">
                            <strong>Name:</strong>
                            {coin.name}{" "}
                          </h2>
                          <h2 className="info">
                            <strong>Symbol:</strong>
                            {coin.symbol}{" "}
                          </h2>
                          <h2 className="info">
                            <strong>Current price:</strong>
                            {coin.current_price} ${" "}
                          </h2>
                          <h2 className="info">
                            <strong>High 24h:</strong>
                            {coin.high_24h} ${" "}
                          </h2>
                          <h2 className="info">
                            <strong>Low 24h:</strong>
                            {coin.low_24h} ${" "}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div>
                  {ArrayPagination == null ? (
                    <>Loading</>
                  ) : (
                    <div className="pagination">
                      {ArrayPagination.items.map((numOfPage) => (
                        <div
                          onClick={() => handleClick(numOfPage)}
                          className={`pagination__page ${
                            current === numOfPage ? "active" : null
                          }`}
                          key={numOfPage}
                        >
                          {numOfPage}{" "}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Markets;
