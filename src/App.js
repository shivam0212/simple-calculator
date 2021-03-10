import React from "react";

import { Calculator } from "./Components";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Simple Calculator</header>
      <main>
        <Calculator />
      </main>
    </div>
  );
};

export default App;
