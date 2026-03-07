import { useEffect, useState } from "react";

function Timer({ onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(20);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    return <p>Temps restant : {timeLeft}s</p>;
}

export default Timer;