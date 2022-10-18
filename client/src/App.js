import React from "react";
import ReactDOM, {render} from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import Markets from "./components/Markets";
import MarketsID from "./components/MarketsID";


const App = () =>(
  <StrictMode>
       <BrowserRouter>
        <header>
          <Link to="/markets/coins">Crypto Api</Link>
        </header>
        <Routes>
          <Route path="/markets/coins" element={<Markets />} />
          <Route path="/markets/:id" element={<MarketsID />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
);

render(<App />, document.getElementById("root"));
