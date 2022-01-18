import { useState, useEffect } from "react";
import _ from "lodash";

import NewUserPrompt from "./components/NewUserPrompt";
import AgeCount from "./components/AgeCount";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { AddTaskType, handleReorderType, TaskType } from "./types";
import { useLocalStorage } from "./hooks";
import Clock from "./components/Clock";

import "./App.css";
import { Fact } from "./components/Fact";
import { arrayMove, arrayRemove } from "react-movable";

function App() {
  const [tasks, setTasks] = useLocalStorage<Array<TaskType>>("tasks", []);
  const [facts, setFacts] = useLocalStorage<Array<{}>>("fact", []);
  const [toggleType, setToggleType] = useLocalStorage<boolean>(
    "toggleType",
    false
  );

  const USER_AGE = localStorage.getItem("dob") || null;
  const USER_NAME = localStorage.getItem("name") || null;
  const today = new Date();

  const fetchFact = async () => {
    try {
      const res = await fetch(
        `https://byabbe.se/on-this-day/${
          today.getMonth() + 1
        }/${today.getDate()}/events.json`
      );
      const data = await res.json();
      setFacts(data);
    } catch (err) {
      console.log(err);
    }
    // setfact(res.da)
  };

  useEffect(() => {
    try {
      const day = _.get(facts, "date").split(" ");
      if (today.getDate() != day[1]) {
        fetchFact();
      }
    } catch {
      fetchFact();
    }
  }, []);

  const handleTaskListReorder = ({ oldIndex, newIndex }: handleReorderType) =>
    setTasks((oldList) =>
      newIndex === -1
        ? _.filter(oldList, (item, i) => i !== oldIndex)
        : arrayMove(oldList, oldIndex, newIndex)
    );

  const addNewTask: AddTaskType = (taskLabel) => {
    const newTask = {
      id: Math.random(),
      label: taskLabel,
      date_created: new Date(),
    };
    setTasks((oldList) => [...oldList, newTask]);
  };

  const toggleTaskComplete = (id: number) =>
    setTasks((oldList) => arrayRemove(oldList, id));

  const reset = () => {
    setTasks([]);
  };

  const switchImage = (hour: number) => {
    if (hour < 12) {
      return 863332;
    } else if (hour < 18) {
      return 99958844;
    } else {
      return 4932946;
    }
  };

  // `https://api.trello.com/1/members/me/boards?key={980d0b509c7499750233ed64052546ef}&token={78fdb2c17481cf946b769146e315ed15ac75de00f1fc96a62278d40241d0e64c}`

  if (USER_AGE && USER_NAME) {
    return (
      <div
        className="app-wrapper"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" +
            `https://source.unsplash.com/collection/${switchImage(
              today.getHours()
            )}/` +
            ")",
        }}
      >
        {toggleType ? (
          <AgeCount
            dob={new Date(parseInt(USER_AGE, 10))}
            toggleTypeCallback={() => setToggleType((oldState) => !oldState)}
          />
        ) : (
          <Clock
            name={USER_NAME}
            toggleTypeCallback={() => setToggleType((oldState) => !oldState)}
          />
        )}
        <TaskInput addNewTask={addNewTask} />
        {/* 
        //@ts-ignore */}
        <TaskList
          tasks={tasks}
          toggleTaskComplete={toggleTaskComplete}
          resetCallback={reset}
          handleReorder={handleTaskListReorder}
        />
        <Fact facts={_.get(facts, "events", [])} />
      </div>
    );
  }
  return (
    <div className="App">
      <NewUserPrompt />
    </div>
  );
}

export default App;
