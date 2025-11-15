import {useState, useEffect} from "react";

type SquareProps = {
    letter: string;
    correct: string;
    delay: number;
    correctLetter: string;
}

function Square({ letter, correct, delay, correctLetter }: SquareProps) {
    const [correctDelay, setCorrectDelay] = useState(correct);

    useEffect(() => {
        setTimeout(() => setCorrectDelay(correct), delay)
    }, [correct, delay]);

    function isSymbol() {
        return !/^[A-Z]$/.test(correctLetter);
    }

    if (isSymbol()) {
        return <div className="square symbol">{correctLetter}</div>
    }
    return (<div className={"square " + correctDelay}>{letter}</div>);
}

export default Square;