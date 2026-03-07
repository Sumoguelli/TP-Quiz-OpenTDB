import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import HallOfFame from "../components/HallOfFame";

function Score() {
    const location = useLocation();
    const navigate = useNavigate();

    const score = location.state?.score ?? 0;

    const getMessage = () => {
        if (score <= 4) return "Pas génial là !";
        if (score <= 7) return "Ça commence à venir";
        return "Bravo !";
    };

    useEffect(() => {
        const bestScores = JSON.parse(localStorage.getItem("scores")) || [];

        bestScores.push(score);
        bestScores.sort((a, b) => b - a);

        localStorage.setItem("scores", JSON.stringify(bestScores.slice(0, 10)));
    }, []);

    return (
        <Layout>
            <h1>Score Final</h1>
            <h2>{score} / 10</h2>
            <p>{getMessage()}</p>

            <button onClick={() => navigate("/")}>
                Rejouer
            </button>

            <HallOfFame />
        </Layout>
    );
}

export default Score;