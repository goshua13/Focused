import React from "react";
import _ from "lodash";
import { TaskType, HandleTaskLabel } from "../types";
import Task from "./Task";

interface Props {
  tasks: Array<TaskType> | null;
  toggleTaskComplete: (id: number) => void;
  resetCallback: () => void;
  handleTaskLabel: HandleTaskLabel
}

const TaskList: React.FC<Props> = ({
  tasks,
  toggleTaskComplete,
  resetCallback,
  handleTaskLabel
}) => {
  return (
    <div className="list-group-container">
      <div className="d-flex justify-content-between mb-2">
        <button className="btn btn-primary btn-sm" onClick={resetCallback}>
          CLEAR ALL TASKS
        </button>
        <small className="fs-6 text text-white">double click to complete task</small>
      </div>

      <ul className="list-group list-group-flush">
        {_.isEmpty(tasks) ? (
          <li className="list-group-item disabled">YOU HAVE NO TASKS...</li>
        ) : (
          _.map(tasks, (task: TaskType) => (
            <Task
              key={task.id}
              task={task}
              toggleTaskComplete={toggleTaskComplete}
              handleTaskLabel={handleTaskLabel}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
