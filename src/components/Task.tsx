import React from "react";
import { TaskType } from "../types";

interface Props {
  task: TaskType;
  toggleTaskComplete: (id: number) => void;
}

const Task: React.FC<Props> = ({ task, toggleTaskComplete }) => {
  const date = new Date(task.date_due);
  return (
    <li
      className={`list-group-item${task.completed ? " completed" : ""}`}
      onClick={() => toggleTaskComplete(task.id)}
    >
      {task.label}
      <span className="badge bg-primary rounded-pill">
        {date.getUTCMonth()}/{date.getUTCDate()}
      </span>
    </li>
  );
};

export default Task;
