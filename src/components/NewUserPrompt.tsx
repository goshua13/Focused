import React from "react";

const NewUserPrompt = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    const dob = new Date(event.target.dob.value);
    localStorage.setItem("dob", JSON.stringify(dob.getTime()));
    window.location.reload()
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="jumbotron">
        <h1 className="age-title"> What is your birthdate?</h1>
      </div>
      <div className="d-flex justify-content-center">
        <input type="date" name="dob" id="dob" />
        <button className="btn-regular" type="submit">
          Focus
        </button>
      </div>
    </form>
  );
};

export default NewUserPrompt;
