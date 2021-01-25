import React from "react";
import utils from "../utils/utils";
import { PlayNumber, StarsDisplay, PlayAgain } from ".";
import useGameState from "../hooks/useGameState";

const Game = (props) => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) return "used";

    if (candidateNums.includes(number))
      return candidatesAreWrong ? "wrong" : "candidate";

    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus() !== "active" || currentStatus === "used") return;

    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((num) => num !== number);
    
    setGameState(newCandidateNums);
  };

  const gameStatus = () => {
    return availableNums.length === 0
      ? "won"
      : secondsLeft === 0
      ? "lost"
      : "active";
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus() !== "active" ? (
            <PlayAgain gameStatus={gameStatus()} onClick={props.startNewGame} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;
