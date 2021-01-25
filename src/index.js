import ReactDOM from "react-dom";
import React, { useState } from "react";
import "./styles.css";
import { Game } from "./components";

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);

  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

ReactDOM.render(<StarMatch />, document.getElementById("root"));
