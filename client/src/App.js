import React from "react";
import ReactDOM, { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Markets from "./components/Markets";
import MarketsID from "./components/MarketsID";


const Title = styled.h1`
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 0px 0px 0px;
  color: black;
  cursor: pointer;
  text-decoration: none;
`;



const App = () => (
  <StrictMode>
    <BrowserRouter>
        <header>
          <Link to="/markets/coins">
            <Title>
              <h1>Crypto Api</h1>
            </Title>
          </Link>
        </header>
      <Routes>
        <Route path="/markets/coins" element={<Markets /> }  />
        <Route path="/markets/:id" element={<MarketsID />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

render(<App />, document.getElementById("root"));
