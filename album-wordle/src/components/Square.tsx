type SquareProps = {
    letter: string;
    correct: string;
}

function Square({ letter, correct }: SquareProps) {

    return (<div className={"square " + correct}>{letter}</div>);
}

export default Square;