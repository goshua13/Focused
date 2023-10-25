import React, { useEffect } from "react";
import _ from "lodash";
import { List } from "react-movable";

import { TaskType, handleReorderType } from "../types";

interface Props {
  tasks: TaskType[];
  completedTasks: TaskType[];
  deleteTask: (id: number) => void;
  toggleTaskComplete: (id: number, task: TaskType) => void;
  resetCallback: () => void;
  handleReorder: ({ oldIndex, newIndex }: handleReorderType) => void;
  filterTasks: (completed: boolean) => void;
}

const TaskList: React.FC<Props> = ({
  tasks = [],
  completedTasks = [],
  deleteTask,
  resetCallback,
  toggleTaskComplete,
  handleReorder,
}) => {
  const [showActive, setShowActive] = React.useState(true);

  useEffect(() => {
    if (_.isEmpty(tasks)) {
      setShowActive(false);
    } else if (_.isEmpty(completedTasks)) {
      setShowActive(true);
    }
  }, [tasks]);
  if (_.isEmpty(tasks) && _.isEmpty(completedTasks)) {
    return null;
  }
  return (
    <div className="list-group-container">
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <button
            onClick={() => setShowActive(true)}
            className={`mx-0 me-2 btn btn-sm btn-outline${
              showActive ? " active" : ""
            }${_.isEmpty(tasks) ? " d-none" : ""}`}
          >
            Active
          </button>
          <button
            onClick={() => setShowActive(false)}
            className={`mx-0 btn btn-sm btn-outline${
              showActive ? "" : " active"
            } ${_.isEmpty(completedTasks) ? " d-none" : ""}`}
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
      {showActive ? (
        <List
          removableByMove
          values={tasks}
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
              className={`list-group-item${isDragged ? " dragged" : ""}${
                isOutOfBounds ? " out-of-bounds" : ""
              }`}
            >
              <div className="d-flex align-items-center">
                <button
                  className="circle"
                  onClick={() => toggleTaskComplete(task.id, task)}
                />
                <span> {_.get(task, "label")}</span>
              </div>
              <button
                className="no-style"
                onClick={() =>
                  typeof index !== "undefined" && deleteTask(index)
                }
              >
                x
              </button>
            </li>
          )}
        />
      ) : (
        <ul className="list-group list-group-flush">
          {completedTasks.map((task) => (
            <li className="list-group-item complete">
              <div className="d-flex align-items-center">
                {console.log({ task })}
                <button
                  className="circle"
                  onClick={() => toggleTaskComplete(task.id, task)}
                >
                  <strong>&#10003;</strong>
                </button>
                <span>{_.get(task, "label")}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
