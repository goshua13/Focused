import React, { useState } from "react";
import _ from "lodash";
import { TaskType } from "../types";
import Task from "./Task";

interface Props {
  tasks: Array<TaskType> | null;
  toggleTaskComplete: (id: number) => void;
  resetCallback: () => void;
}

const TaskList: React.FC<Props> = ({
  tasks,
  toggleTaskComplete,
  resetCallback,
}) => {
  console.log(tasks);
  return (
    <div className="list-group-container">
      <div className="d-flex justify-content-between mb-2">
        <button className="btn btn-primary btn-sm" onClick={resetCallback}>
          CLEAR ALL TASKS
        </button>
        <small className="fs-6 text text-white">click to complete task</small>
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
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
