import { useEffect, useState } from "react";

interface Props {
  name: string;
  toggleTypeCallback: () => void;
}

const Clock: React.FC<Props> = ({ name, toggleTypeCallback }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const time = setInterval(tick, 60000);
    return () => {
      clearInterval(time);
    };
  }, []);

  // Makes time update
  const tick = () => setDate(new Date());

  const switchGreeting = (hour: number) => {
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afernoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <div className="clock-container">
      <h2 className="hour-minute" onClick={toggleTypeCallback}>
        {date.getHours() - (date.getHours() > 12 ? 12 : 0)}:
        {(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}
      </h2>
      <h3 className="text-white">
        {switchGreeting(date.getHours())}, {name}
      </h3>
    </div>
  );
};

export default Clock;
