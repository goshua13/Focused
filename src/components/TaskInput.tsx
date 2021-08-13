import React, { FormEvent, FormEventHandler } from "react";
import { AddTaskType } from "../types";

interface Props {
  addNewTask: AddTaskType;
}

const TaskInput: React.FC<Props> = ({ addNewTask }) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    const inputValue = event.target.taskInput.value;
    addNewTask(inputValue);
    // @ts-ignore
    event.target.taskInput.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-container">
      <input
        type="text"
        name="taskInput"
        className="new-task-input"
        placeholder="+ Add New Task"
      />
    </form>
  );
};

export default TaskInput;
