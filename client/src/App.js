import React from "react";
import ReactDOM, { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Markets from "./components/Markets";
import MarketsID from "./components/MarketsID";

const Title = styled.header`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0px 0px 0px;
  text-decoration: none;
  h1 {
    color: black;
    cursor: pointer;
    text-decoration: none;
  }
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  &:hover,
  &:focus {
    color: blue;
  }
  &:active {
    color: red;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <Title>
        <header>
          <NavbarLink to="/markets/coins">
            <h1>Crypto Api</h1>
          </NavbarLink>
        </header>
      </Title>
      <Routes>
        <Route path="/markets/coins" element={<Markets />} />
        <Route path="/markets/:id" element={<MarketsID />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

render(<App />, document.getElementById("root"));
