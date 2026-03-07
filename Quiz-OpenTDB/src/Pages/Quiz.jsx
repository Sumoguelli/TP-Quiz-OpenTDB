import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import AnswerButton from "../components/AnswerButton";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";

function decodeHtmlEntities(str) {
    if (!str) return "";

    const entities = {
        "&amp;": "&",
        "&quot;": '"',
        "&#039;": "'",
        "&apos;": "'",
        "&lt;": "<",
        "&gt;": ">",
    };

    return str.replace(
        /&amp;|&quot;|&#039;|&apos;|&lt;|&gt;/g,
        (match) => entities[match] || match
    );
}

function Quiz() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [timerKey, setTimerKey] = useState(0);

    useEffect(() => {
        if (!category || !difficulty) {
            navigate("/");
            return;
        }

        fetch(
            `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.response_code !== 0 || !data.results || data.results.length === 0) {
                    setError("Impossible de charger les questions.");
                } else {
                    setQuestions(data.results);
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Erreur réseau.");
                setLoading(false);
            });
    }, [category, difficulty, navigate]);

    if (loading) {
        return (
            <Layout>
                <p>Chargement...</p>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <p>{error}</p>
            </Layout>
        );
    }

    if (!questions.length) {
        return (
            <Layout>
                <p>Aucune question trouvée.</p>
            </Layout>
        );
    }

    const currentQuestion = questions[currentIndex];

    const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5);

    const handleAnswer = (answer) => {
        const newScore =
            answer === currentQuestion.correct_answer ? score + 1 : score;

        if (currentIndex === questions.length - 1) {
            navigate("/score", { state: { score: newScore } });
        } else {
            setScore(newScore);
            setCurrentIndex((prev) => prev + 1);
            setTimerKey((prev) => prev + 1);
        }
    };

    return (
        <Layout>
            <ProgressBar current={currentIndex + 1} />

            <h2>Question {currentIndex + 1} / {questions.length}</h2>

            <Timer key={timerKey} onTimeUp={() => handleAnswer(null)} />

            <h3>{decodeHtmlEntities(currentQuestion.question)}</h3>

            {answers.map((answer, index) => (
                <AnswerButton
                    key={index}
                    text={decodeHtmlEntities(answer)}
                    onClick={() => handleAnswer(answer)}
                />
            ))}
        </Layout>
    );
}

export default Quiz;