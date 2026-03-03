import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const categories = [
        { name: "General Knowledge", id: 9 },
        { name: "Science & Nature", id: 17 },
        { name: "History", id: 23 },
        { name: "Sports", id: 21 },
        { name: "Animals", id: 27 },
    ];

    const difficulties = [
        { name: "Easy", value: "easy" },
        { name: "Medium", value: "medium" },
        { name: "Hard", value: "hard" },
    ];

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const isDisabled = !category || !difficulty;

    const handleStart = () => {
        navigate(`/quiz?category=${category}&difficulty=${difficulty}`);
    };

    return (
        <div>
            <h1>Quiz OpenTDB</h1>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choisir catégorie</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <br /><br />

            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">Choisir difficulté</option>
                {difficulties.map((diff) => (
                    <option key={diff.value} value={diff.value}>
                        {diff.name}
                    </option>
                ))}
            </select>

            <br /><br />

            <button disabled={isDisabled} onClick={handleStart}>
                Démarrer
            </button>
        </div>
    );
}

export default Home;