import { useDispatch, useSelector } from "react-redux";
import { addGuess, updateCurrentWord } from "../services/wordsSlice";
import type { RootState } from '../store';
import { useEffect, useState } from "react";

type KeyProps = {
  letter: string;
};

function Key({ letter }: KeyProps) {
  const currentWord = useSelector((state: RootState) => state.words.currentWord);
  const keyboardStyle = useSelector((state: RootState) => state.words.keyBoardStyle);
  const [style, setStyle] = useState("");

  useEffect(() => {
    const keyboardMap = JSON.parse(keyboardStyle);
    for (const keyboardLetter in keyboardMap) {
      if (keyboardLetter === letter) {
        setStyle(keyboardMap[keyboardLetter]);
      }
    }
  }, [keyboardStyle]);

  let dispatch = useDispatch();

  function handleClick() {
    if (letter === "Del") {
      dispatch(updateCurrentWord(currentWord.slice(0, currentWord.length - 1)));
    } else if (letter === "Enter") {
      if (currentWord.length === 5) {
        dispatch(addGuess(currentWord));
        dispatch(updateCurrentWord(""));
      }
    } else if (currentWord.length < 5) {
      dispatch(updateCurrentWord(currentWord + letter));
    }
  }

  return (<div className={"key " + style} onClick={handleClick}>{letter}</div>)
}

export default Key;