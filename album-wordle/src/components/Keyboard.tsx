import Key from "./Key";

function Keyboard() {
    return (
        <div className="keyboard">
            <div className="key-row">
                <Key letter={"Q"} />
                <Key letter={"W"} />
                <Key letter={"E"} />
                <Key letter={"R"} />
                <Key letter={"T"} />
                <Key letter={"Y"} />
                <Key letter={"U"} />
                <Key letter={"I"} />
                <Key letter={"O"} />
                <Key letter={"P"} />
            </div>
            <div className="key-row row2">
                <Key letter={"A"} />
                <Key letter={"S"} />
                <Key letter={"D"} />
                <Key letter={"F"} />
                <Key letter={"G"} />
                <Key letter={"H"} />
                <Key letter={"J"} />
                <Key letter={"K"} />
                <Key letter={"L"} />
            </div>
            <div className="key-row row3">
                <Key letter={"Enter"} />
                <Key letter={"Z"} />
                <Key letter={"X"} />
                <Key letter={"C"} />
                <Key letter={"V"} />
                <Key letter={"B"} />
                <Key letter={"N"} />
                <Key letter={"M"} />
                <Key letter={"Del"} />
            </div>
        </div>);
}

export default Keyboard;