import React from "react";

const NewUserPrompt = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    const dob = new Date(event.target.dob.value);
    // @ts-ignore
    const fullName = event.target.fullName.value;
    localStorage.setItem("dob", JSON.stringify(dob.getTime()));
    localStorage.setItem("name", fullName);

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="jumbotron">
        <h1 className="age-title"> What is your birthdate?</h1>
      </div>
      <div className="justify-content-center d-grid">
        <input
          className="new-inputs"
          placeholder="Enter your full name"
          type="text"
          name="fullName"
          id="fullName"
        />
        <input className="new-inputs" type="date" name="dob" id="dob" />
        <button className="btn-regular" type="submit">
          Focus
        </button>
      </div>
    </form>
  );
};

export default NewUserPrompt;
