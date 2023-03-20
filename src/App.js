import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        | Developed by <b>Mohit saini</b> |
      </div>
    </>
  );
}

export default App;
