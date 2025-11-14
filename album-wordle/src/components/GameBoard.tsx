import Square from "./Square";
import { useDispatch, useSelector } from "react-redux";
import { updateCorrectWord, updateCurrentWord, addGuess, updateKeyboardStyle } from "../services/wordsSlice";
import type { RootState } from '../store';
import { useEffect } from "react";
import { useState } from "react";

function GameBoard() {
    const currentWord = useSelector((state: RootState) => state.words.currentWord);
    const guesses = useSelector((state: RootState) => state.words.guesses);
    const correctWord = useSelector((state: RootState) => state.words.correctWord);
    const keyboardStyle = useSelector((state: RootState) => state.words.keyBoardStyle);
    const [correctChecker, setCorrectChecker] = useState([] as any);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateCorrectWord("FUNNY"));
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [currentWord]);

    useEffect(() => {
        if (guesses && guesses.length > 0) {
            const guess = guesses[guesses.length - 1];
            const results = calculateResults(guess);
            calculateKeyboardStyles(results, guess);
            setCorrectChecker((prev: any) => [...prev, results]);
        }
    }, [guesses]);

    function handleKeyPress(event: KeyboardEvent) {
        if (currentWord.length < 5 && event.key.length === 1) {
            dispatch(updateCurrentWord(currentWord + event.key.toUpperCase()));
        } else if (event.key === "Enter") {
            if (currentWord.length === 5) {
                dispatch(addGuess(currentWord));
                dispatch(updateCurrentWord(""));
            }
        } else if (event.key === "Backspace") {
            dispatch(updateCurrentWord(currentWord.slice(0, currentWord.length - 1)));
        }
    }

    function calculateKeyboardStyles(result: string[], guess: string) {
        let keyboardStyleMap = JSON.parse(keyboardStyle);
        const letters = guess.split("");
        for (let i = 0; i < result.length; i++) {
            const letter = letters[i];
            const style = result[i];
            if (validateKeyboardStyle(keyboardStyleMap[letter], style)) {
                keyboardStyleMap[letter] = style;
            }
        }
        dispatch(updateKeyboardStyle(JSON.stringify(keyboardStyleMap)));
    }


    function calculateResults(guess: string) {
        const result = Array(guess.length).fill("wrong");
        const targetLetters = correctWord.split("");
        const guessLetters = guess.split("");

        for (let i = 0; i < guessLetters.length; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                result[i] = "correct";
                targetLetters[i] = "";
                guessLetters[i] = ""
            }
        }

        for (let i = 0; i < guessLetters.length; i++) {
            if (guessLetters[i] && targetLetters.includes(guessLetters[i])) {
                result[i] = "partial";
                targetLetters[targetLetters.indexOf(guessLetters[i])] = "";
            }
        }

        return result;
    }

    function validateKeyboardStyle(previousStyle: string, currentStyle: string) {
        if (!previousStyle) {
            return true;
        } else if (previousStyle === "wrong") {
            return true;
        } else if (currentStyle === "wrong" && previousStyle !== "wrong") {
            return false;
        } else if (previousStyle === "correct" && currentStyle === "partial") {
            return false;
        }
        return true;
    }

    function getCorrect(row: number, column: number) {
        if (row < correctChecker.length) {
            return correctChecker[row][column];
        }
        return "";
    }

    function getLetter(row: number, column: number) {
        if (row === guesses.length) {
            if (currentWord.length > column) {
                return currentWord.charAt(column);
            }
        } else if (row < guesses.length) {
            return guesses[row].charAt(column);
        }
        return "";
    }

    return (
        <div className="game-board">
            {Array.from({ length: 6 }).map((_, i) =>
                <div className="row" key={"row" + i}>
                    {Array.from({ length: 5 }).map((_, j) =>
                        <Square letter={getLetter(i, j)} correct={getCorrect(i, j)} delay={j * 300} key={i + ":" + j} />
                    )}
                </div>
            )}
        </div>
    )
}

export default GameBoard;