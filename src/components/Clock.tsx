import { useEffect, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const time = setInterval(tick, 60000);
    return () => {
        clearInterval(time)
    };
  }, []);

  // Makes time update
  const tick = () => setDate(new Date());

  return (
    <div className="d-flex clock-container">
      <h2 className="hour-minute">
        {date.getHours() - 12}:{(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}
      </h2>
    </div>
  );
};

export default Clock;
