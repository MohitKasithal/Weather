import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        | Developed by <b>Mohit saini</b> |
      </div>
    </div>
  );
}

export default App;
