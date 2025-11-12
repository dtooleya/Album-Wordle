import { useDispatch, useSelector } from "react-redux";
import { addGuess, updateCurrentWord } from "../services/wordsSlice";
import type { RootState } from '../store';

type KeyProps = {
  letter: string;
};

function Key({ letter }: KeyProps) {
  const currentWord = useSelector((state: RootState) => state.words.currentWord);
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

  return (<div className="key" onClick={handleClick}>{letter}</div>)
}

export default Key;