import React, { FormEvent, FormEventHandler } from "react";

interface Props {
  addNewTask: (taskLabel: string) => void;
}

const TaskInput: React.FC<Props> = ({ addNewTask }) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    const inputValue = event.target.taskInput.value;
    addNewTask(inputValue);
    // @ts-ignore
    event.target.taskInput.value= ''
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-container">
      <input
        type="text"
        name="taskInput"
        className="new-task-input"
        placeholder="+ Add new Task"
      />
    </form>
  );
};

export default TaskInput;
