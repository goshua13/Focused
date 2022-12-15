import React from "react";
import _ from "lodash";
import { List } from "react-movable";

import { TaskType, handleReorderType } from "../types";

interface Props {
  tasks: TaskType[];
  deleteTask: (id: number) => void;
  toggleTaskComplete: (id: number) => void;
  resetCallback: () => void;
  handleReorder: ({ oldIndex, newIndex }: handleReorderType) => void;
  filterTasks: (completed: boolean) => void;
}

const TaskList: React.FC<Props> = ({
  tasks = [],
  deleteTask,
  resetCallback,
  toggleTaskComplete,
  handleReorder,
}) => {
  const [showActive, setShowActive] = React.useState(true);
  if (_.isEmpty(tasks)) {
    return null;
  }
  return (
    <div className="list-group-container">
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <button
            onClick={() => setShowActive(true)}
            className={`m-0 btn btn-sm btn-outline${
              showActive ? " active" : ""
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setShowActive(false)}
            className={`btn btn-sm btn-outline${showActive ? "" : " active"}`}
          >
            Completed
          </button>
        </div>
        {!showActive && (
          <button
            className="btn btn-sm btn-outline"
            onClick={() => {
              setShowActive(true);
              resetCallback();
            }}
          >
            Clear Completed
          </button>
        )}
      </div>
      <List
        removableByMove
        values={tasks.filter((task) => task.completed !== showActive)}
        onChange={handleReorder}
        renderList={({ children, props }) => (
          <ul className="list-group list-group-flush" {...props}>
            {children}
          </ul>
        )}
        renderItem={({
          value: task,
          props,
          isDragged,
          index,
          isOutOfBounds,
        }) => (
          <li
            {...props}
            className={`list-group-item${task.completed ? " complete" : ""}${
              isDragged ? " dragged" : ""
            }${isOutOfBounds ? " out-of-bounds" : ""}`}
          >
            <div className="d-flex align-items-center">
              <button
                className="circle"
                onClick={() => toggleTaskComplete(task.id)}
              >
                {task.completed ? <strong>&#10003;</strong> : ""}
              </button>
              <span> {_.get(task, "label")}</span>
            </div>
            <button
              className="no-style"
              onClick={() => typeof index !== "undefined" && deleteTask(index)}
            >
              x
            </button>
          </li>
        )}
      />
    </div>
  );
};

export default TaskList;
