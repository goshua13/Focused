import React, { useState } from "react";
import { TaskType, HandleTaskLabel } from "../types";

interface Props {
  task: TaskType;
  toggleTaskComplete: (id: number) => void;
  handleTaskLabel: HandleTaskLabel;
}

const Task: React.FC<Props> = ({
  task,
  toggleTaskComplete,
  handleTaskLabel,
}) => {
  const [edit, setEdit] = useState(false);
  // const date = new Date(task.date_due);
  return (
    <li
      className={`list-group-item${task.completed ? " completed" : ""}`}
      onDoubleClick={() => toggleTaskComplete(task.id)}
      onClick={() => setEdit(true)}
    >
      <input
        value={task.label}
        readOnly={task.completed || !edit}
        onBlur={() => setEdit(false)}
        onChange={(event) => handleTaskLabel(event, task.id)}
      />
      <span>
        {task.priority}
      </span>
    </li>
  );
};

export default Task;
