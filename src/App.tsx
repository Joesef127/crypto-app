//import browser router, route and router from 'react-router-dom'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LineChart from "./pages/LineChart";
import PortfolioCalc from "./pages/PortfolioCalc";
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/line-chart" element={<LineChart />} />
        <Route path="/portfolio" element={<PortfolioCalc />} />
      </Routes>
    </Router>
      
    </>
  );
}

export default App;
