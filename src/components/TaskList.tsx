import React from "react";
import _ from "lodash";
import { List, arrayMove } from "react-movable";

import { TaskType, handleReorderType } from "../types";
import { ReactComponent as DragSvg } from "../assets/six-dots.svg";

interface Props {
  tasks: TaskType[];
  toggleTaskComplete: (id: number) => void;
  resetCallback: () => void;
  handleReorder: ({ oldIndex, newIndex }: handleReorderType) => void;
}

const TaskList: React.FC<Props> = ({
  tasks = [],
  toggleTaskComplete,
  resetCallback,
  handleReorder,
}) => {
  if (_.isEmpty(tasks)) {
    return null;
  }
  return (
    <div className="list-group-container">
      <div className="d-flex justify-content-between mb-2">
        <button className="btn btn-sm" onClick={resetCallback}>
          CLEAR TASKS
        </button>
        <small className="fs-6 text text-white">
          double click to complete task
        </small>
      </div>
      <List
        values={tasks}
        onChange={handleReorder}
        renderList={({ children, props }) => (
          <ul className="list-group list-group-flush" {...props}>
            {children}
          </ul>
        )}
        renderItem={({ value: task, props, isDragged }) => (
          <li
            {...props}
            className={`list-group-item${isDragged ? " dragged" : ""}`}
            onDoubleClick={() => toggleTaskComplete(task.id)}
          >
            {task.label}
            <DragSvg />
          </li>
        )}
      />
      {/* <ul className="list-group list-group-flush">
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
      </ul> */}
    </div>
  );
};

export default TaskList;
