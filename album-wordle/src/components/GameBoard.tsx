import Square from "./Square";
import { useDispatch, useSelector } from "react-redux";
import { updateCorrectWord, updateCurrentWord, addGuess, updateKeyboardStyle } from "../services/wordsSlice";
import type { RootState } from '../store';
import { useEffect } from "react";
import { useState } from "react";
import { DatabaseService } from "../services/databaseService";
import ResultModal from "./ResultsModal";

function GameBoard() {
    const currentWord = useSelector((state: RootState) => state.words.currentWord);
    const guesses = useSelector((state: RootState) => state.words.guesses);
    const correctWord = useSelector((state: RootState) => state.words.correctWord);
    const keyboardStyle = useSelector((state: RootState) => state.words.keyBoardStyle);
    const [correctChecker, setCorrectChecker] = useState([] as any);
    let dispatch = useDispatch();

    useEffect(() => {
        async function handleFetch() {
            let results = await DatabaseService.fetchAllAlbumNames();
            results = results.filter((item) => item.length < 18);
            const result = results[Math.floor(Math.random() * results.length)];
            console.log(result);
            dispatch(updateCorrectWord(result.toUpperCase()));
        }
        handleFetch();
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [currentWord, correctWord]);

    useEffect(() => {
        if (guesses && guesses.length > 0) {
            const guess = guesses[guesses.length - 1];
            const results = calculateResults(guess);
            calculateKeyboardStyles(results, guess);
            setCorrectChecker((prev: any) => [...prev, results]);
        }
    }, [guesses]);

    function isSymbol(letter: string) {
        return !/^[A-Z]$/.test(letter);
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (correctWord.length === 0) {
            return;
        }
        if (currentWord.length < correctWord.length && event.key.length === 1) {
            let letter = event.key.toUpperCase();
            if (correctWord.length > currentWord.length && isSymbol(correctWord.charAt(currentWord.length + 1))) {
                letter += correctWord.charAt(currentWord.length + 1);
            }
            dispatch(updateCurrentWord(currentWord + letter));
        } else if (event.key === "Enter") {
            if (currentWord.length === correctWord.length) {
                dispatch(addGuess(currentWord));
                dispatch(updateCurrentWord(""));
            }
        } else if (event.key === "Backspace") {
            let reduceCount = 1;
            if (currentWord.length > 1 && isSymbol(correctWord.charAt(currentWord.length - 1))) {
                reduceCount = 2;
            }
            dispatch(updateCurrentWord(currentWord.slice(0, currentWord.length - reduceCount)));
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
            <ResultModal />
            {Array.from({ length: 6 }).map((_, i) =>
                <div className="row" key={"row" + i}>
                    {Array.from({ length: correctWord.length }).map((_, j) =>
                        <Square letter={getLetter(i, j)} correct={getCorrect(i, j)} delay={j * 300} key={i + ":" + j} correctLetter={correctWord.charAt(j)} />
                    )}
                </div>
            )}
        </div>
    )
}

export default GameBoard;