import { useState, useEffect } from "react";
import _ from "lodash";

import NewUserPrompt from "./components/NewUserPrompt";
import AgeCount from "./components/AgeCount";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { AddTaskType, HandleTaskLabel, TaskType } from "./types";
import { useLocalStorage } from "./hooks";
import Clock from "./components/Clock";

import "./App.css";
import { Fact } from "./components/Fact";

function App() {
  const [tasks, setTasks] = useLocalStorage<Array<TaskType>>("tasks", []);
  const [facts, setFacts] = useLocalStorage<Array<{}>>("fact", []);
  const [toggleType, setToggleType] = useLocalStorage<boolean>(
    "toggleType",
    false
  );

  const USER_AGE = localStorage.getItem("dob") || null;
  const USER_NAME = localStorage.getItem("name") || null;

  const fetchFact = async () => {
    const today = new Date();
   try {

    const res = await fetch(`https://byabbe.se/on-this-day/${today.getMonth()+1}/${today.getDate()}/events.json`);
    const data = await res.json();
    setFacts(data.events)
   } catch(err) {
     console.log(err)
   }
    // setfact(res.da)
  };

  useEffect(() => {
    fetchFact();
  }, []);
  const addNewTask: AddTaskType = (taskLabel) => {
    const newTask = {
      id: Math.random(),
      label: taskLabel,
      completed: false,
      date_due: new Date(),
    };
    setTasks((oldList) => [...oldList, newTask]);
  };

  const toggleTaskComplete = (id: number) =>
    setTasks((oldList) =>
      _.map(oldList, (task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );

  // const removeTask = (id: number) =>
  //   setTasks((oldList) => _.filter(oldList, (task) => task.id === id));

  const reset = () => {
    setTasks([]);
  };

  const handleTaskLabel: HandleTaskLabel = (event, id) =>
    setTasks((oldList) =>
      _.map(oldList, (task) =>
        task.id === id ? { ...task, label: event.target.value } : task
      )
    );

  if (USER_AGE && USER_NAME) {
    return (
      <div className="app-wrapper">
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
          tasks={_.sortBy(tasks, ["completed", "priority"])}
          toggleTaskComplete={toggleTaskComplete}
          resetCallback={reset}
          handleTaskLabel={handleTaskLabel}
        />
        <Fact facts={facts} />
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
