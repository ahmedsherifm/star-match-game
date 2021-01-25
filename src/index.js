import React, { useState } from "react";
import ReactDOM from "react-dom";
import utils from "./utils/utils";
import "./styles.css";
import { PlayNumber, StarsDisplay, PlayAgain } from "./components";

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameIsDone = availableNums.length === 0;

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setCandidateNums([]);
  };

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) return "used";

    if (candidateNums.includes(number))
      return candidatesAreWrong ? "wrong" : "candidate";

    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === "used") return;

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

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameIsDone ? (
            <PlayAgain onClick={resetGame} />
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
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

ReactDOM.render(<StarMatch />, document.getElementById("root"));
