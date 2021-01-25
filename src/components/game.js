import React, { useEffect, useState } from "react";
import utils from "../utils/utils";
import { PlayNumber, StarsDisplay, PlayAgain } from ".";

const Game = (props) => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  });

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) return "used";

    if (candidateNums.includes(number))
      return candidatesAreWrong ? "wrong" : "candidate";

    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus() !== 'active' || currentStatus === "used") return;

    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((num) => num !== number);
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvaliableNums = availableNums.filter(
        (num) => !newCandidateNums.includes(num)
      );
      setStars(utils.randomSumIn(newAvaliableNums, 9));
      setAvailableNums(newAvaliableNums);
      setCandidateNums([]);
    }
  };

  const gameStatus = () => {
    return availableNums.length === 0
      ? 'won'
      : secondsLeft === 0
      ? 'lost'
      : 'active';
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