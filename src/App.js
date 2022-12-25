import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <table>
        <Board nrows={3} ncols={3} />
      </table>
    </div>
  );
}

export default App;
