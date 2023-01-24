import React, { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    const hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return (
        <p>
            {hours}:{minutes}:{seconds}
        </p>
    );
};
export { Clock };