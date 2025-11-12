import Square from "./Square";
import { useDispatch, useSelector } from "react-redux";
import { updateCorrectWord } from "../services/wordsSlice";
import type { RootState } from '../store';
import { useEffect } from "react";
import { useState } from "react";

function GameBoard() {
    const currentWord = useSelector((state: RootState) => state.words.currentWord);
    const guesses = useSelector((state: RootState) => state.words.guesses);
    const correctWord = useSelector((state: RootState) => state.words.correctWord);
    const [correctChecker, setCorrectChecker] = useState([] as any);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateCorrectWord("FUNNY"));
    }, []);

    useEffect(() => {
        if (guesses && guesses.length > 0) {
            setCorrectChecker((prev: any) => [...prev , calculateResults(guesses[guesses.length - 1])]);
        }
    }, [guesses])

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
                <div className="row">
                    {Array.from({ length: 5 }).map((_, j) =>
                        <Square letter={getLetter(i, j)} correct={getCorrect(i, j)} />
                    )}
                </div>
            )}
        </div>
    )
}

export default GameBoard;