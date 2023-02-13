import React, { useState } from "react";
import GuessInput from "../GuessInput/GuessInput";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import PreviousGuesses from "../PreviousGuesses/PreviousGuesses";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import WinBanner from "../WinBanner/WinBanner";
import LostBanner from "../LostBanner/LostBanner";

const answer = sample(WORDS);
console.info({ answer });

function Game() {
  const [inputValue, setInputValue] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [status, setStatus] = useState("running");

  function addGuessedValue(inputValue) {
    const nextArr = [...previousGuesses];
    nextArr.push(inputValue);
    setPreviousGuesses(nextArr);

    if (inputValue === answer) {
      setStatus("won");
    } else if (nextArr.length >= NUM_OF_GUESSES_ALLOWED) setStatus("lost");
  }

  if (inputValue === answer) {
    setStatus("won");
  }

  return (
    <>
      {status}
      <PreviousGuesses previousGuesses={previousGuesses} answer={answer} setStatus={setStatus} />
      <GuessInput inputValue={inputValue} setInputValue={setInputValue} addGuessedValue={addGuessedValue} status={status} />
      <br />
      {status === "won" && <WinBanner numOfGuesses={previousGuesses.length} />}
      {status === "lost" && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;