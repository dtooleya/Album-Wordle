import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { reset, updateEndGame } from "../services/wordsSlice";

function ResultModal() {
    const [showModal, setShowModal] = useState(false);
    const currentWord = useSelector((state: RootState) => state.words.currentWord);
    const guesses = useSelector((state: RootState) => state.words.guesses);
    const correctWord = useSelector((state: RootState) => state.words.correctWord);
    const resetRef = useRef(null) as any;

    let dispatch = useDispatch();

    useEffect(() => {
        if (guesses[guesses.length - 1] === correctWord || guesses.length === 6) {
            setTimeout(() => {
                setShowModal(true);
                dispatch(updateEndGame(true));
            }, correctWord.length * 400);
        }
    }, [guesses]);

    function handleReset() {
        if (resetRef.current) {
            resetRef.current.blur();
        }
        setShowModal(false);
        dispatch(reset());
    }

    return (

        <div className={"modal-container " + (showModal ? "shown" : "")}>
            {guesses[guesses.length - 1] === correctWord ?
                <div>
                    <h1 className="correct">Congratulations</h1>
                    <div className="modal-body">You guessed the name of the album in {guesses.length} guesses</div>
                </div>
                :
                <div>
                    <h1 className="wrong">Nice Try</h1>
                    <div className="modal-body">The correct answer was: {correctWord}</div>
                </div>
            }
            <button className="reset-btn" onClick={() => handleReset()}  ref={resetRef}>Reset</button>
            <button className="reset-btn" onClick={() => setShowModal(false)}>See Results</button>
        </div>
    )
}

export default ResultModal;