import { useLocation, useNavigate } from "react-router-dom";

function Score() {
    const location = useLocation();
    const navigate = useNavigate();

    const score = location.state?.score ?? 0;

    const getMessage = () => {
        if (score <= 4) return "Pas génial là !";
        if (score <= 7) return "Ça commence à venir";
        return "Bravo !";
    };

    return (
        <div>
            <h1>Score Final</h1>
            <h2>{score} / 10</h2>
            <p>{getMessage()}</p>

            <button onClick={() => navigate("/")}>
                Rejouer
            </button>
        </div>
    );
}

export default Score;