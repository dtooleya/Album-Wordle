import {useState, useEffect} from "react";

type SquareProps = {
    letter: string;
    correct: string;
    delay: number;
}

function Square({ letter, correct, delay }: SquareProps) {
    const [correctDelay, setCorrectDelay] = useState(correct);

    useEffect(() => {
        setTimeout(() => setCorrectDelay(correct), delay)
    }, [correct, delay])

    return (<div className={"square " + correctDelay}>{letter}</div>);
}

export default Square;