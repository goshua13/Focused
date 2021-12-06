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
  console.log(tasks);
  return (
    <div className="list-group-container">
      <div className="d-flex justify-content-between mb-2">
        <button className="btn btn-sm" onClick={resetCallback}>
          CLEAR TASKS
        </button>
      </div>
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
            <span> {_.get(task, "label")}</span>
            <button
              className="no-style"
              onClick={() =>
                typeof index !== "undefined" && toggleTaskComplete(index)
              }
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
