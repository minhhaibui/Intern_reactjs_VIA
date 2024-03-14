import React, { useState, useEffect } from "react";

const CountDown = () => {
  const [count, setCount] = useState(180);

  const updateCountdown = () => {
    setCount((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  return (
    <span>
      {count >= 0 ? (
        <span className="inline-block text-Tyellow text-[18px] font-normal leading-5">
          {`Thời gian còn lại: ${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")} phút`}
        </span>
      ) : (
        <p className="text-[18px] text-Tyellow font-normal leading-5">
          Hết thời gian
        </p>
      )}
    </span>
  );
};

export default CountDown;
