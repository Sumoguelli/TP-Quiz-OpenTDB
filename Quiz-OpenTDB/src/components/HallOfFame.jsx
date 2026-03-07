function HallOfFame() {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];

    if (!scores.length) return null;

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>🏆 Top 10</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {scores.map((s, index) => (
                    <li key={index}>
                        #{index + 1} — {s} / 10
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HallOfFame;