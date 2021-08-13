import React, { useState, useEffect } from "react";

interface Props {
  dob: Date;
  toggleTypeCallback: () => void;
}

const NewUserPrompt: React.FC<Props> = ({ dob, toggleTypeCallback }) => {
  const [age, setAge] = useState<{
    years: null | string;
    milliseconds: null | string;
  }>({ years: null, milliseconds: null });

  const renderAge = () => {
    const now = new Date();
    // @ts-ignore
    const duration = now - dob;
    const years = duration / 31556900000;

    const yearsToMill = years.toFixed(9).toString().split(".");
    setAge({ years: yearsToMill[0], milliseconds: yearsToMill[1] });
  };

  useEffect(() => {
    setInterval(renderAge, 100);
  });

  return (
    <div className="age-container">
      <div className="text-left" style={{cursor: 'pointer'}} onClick={toggleTypeCallback}>
        <h3 className="text-muted mb-0">AGE</h3>
        <div className="d-flex fw-bold text-white">
          <h2>{age.years}</h2>
          <sup>.{age.milliseconds}</sup>
        </div>
      </div>
    </div>
  );
};

export default NewUserPrompt;
