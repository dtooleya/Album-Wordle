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
  const correctWord = useSelector((state: RootState) => state.words.correctWord);
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

  function isSymbol(letter: string) {
    return !/^[A-Z]$/.test(letter);
  }

  function handleClick() {
    if (letter === "Del") {
      let reduceCount = 1;
      if (currentWord.length > 1 && isSymbol(correctWord.charAt(currentWord.length - 1))) {
        reduceCount = 2;
      }
      dispatch(updateCurrentWord(currentWord.slice(0, currentWord.length - reduceCount)));
    } else if (letter === "Enter") {
      if (currentWord.length === correctWord.length) {
        dispatch(addGuess(currentWord));
        dispatch(updateCurrentWord(""));
      }
    } else if (currentWord.length < correctWord.length) {
      let letterTemp = letter;
            if (correctWord.length > currentWord.length && isSymbol(correctWord.charAt(currentWord.length + 1))) {
                letterTemp += correctWord.charAt(currentWord.length + 1);
            }
      dispatch(updateCurrentWord(currentWord + letterTemp));
    }
  }

  return (<div className={"key " + style} onClick={handleClick}>{letter}</div>)
}

export default Key;