import { useState } from "react";

function ResultModal() {
    const [showModal, useShowModal] = useState(false);

    return (
        <>
            {showModal &&
                <div className="modal-container">Test</div>
            }
        </>
    )
}

export default ResultModal;