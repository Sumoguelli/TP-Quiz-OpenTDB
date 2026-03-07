function ProgressBar({ current }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <div
                style={{
                    height: "10px",
                    background: "#ddd",
                    borderRadius: "5px",
                }}
            >
                <div
                    style={{
                        height: "10px",
                        width: `${(current / 10) * 100}%`,
                        background: "#4caf50",
                        borderRadius: "5px",
                    }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;