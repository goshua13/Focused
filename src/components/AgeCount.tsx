import React, { useState, useEffect } from "react";

interface Props {
  dob: Date;
}

const NewUserPrompt: React.FC<Props> = ({ dob }) => {
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
    //@ts-ignore
    setInterval(renderAge, 100);
  });

  return (
    <div className="age-container">
      <div className='text-left'>
        <h4 className="text-muted mb-0">AGE</h4>
        <div className="display-1 fw-bold text-white">
          {age.years}
          <sup>.{age.milliseconds}</sup>
        </div>
      </div>
    </div>
  );
};

export default NewUserPrompt;
