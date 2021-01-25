const PlayAgain = (props) => {
  const isGameLost = props.gameStatus === "lost";

  return (
    <div className="game-done">
      <div className="message" style={{ color: isGameLost ? "red" : "green" }}>
        {isGameLost ? "Game Over" : "Nice"}
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  );
};

export default PlayAgain;
