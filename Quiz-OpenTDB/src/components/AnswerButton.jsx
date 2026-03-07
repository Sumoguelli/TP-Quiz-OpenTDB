function AnswerButton({ text, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0",
                borderRadius: "6px",
                border: "none",
                background: "#4a90e2",
                color: "white",
                cursor: "pointer",
            }}
        >
            {text}
        </button>
    );
}

export default AnswerButton;