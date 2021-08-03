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
    // @ts-ignore
    const priorityValue = event.target.priority.value;
    addNewTask(inputValue, priorityValue);
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

      <input
        className="new-task-dropdown"
        name="priority"
        placeholder="Priority"
        type="number"
        min="1"
        max="5"
        defaultValue={1}
      />

      <button className="d-none" type="submit" />
    </form>
  );
};

export default TaskInput;
