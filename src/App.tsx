import "./App.css";
import NewUserPrompt from "./components/NewUserPrompt";
import AgeCount from "./components/AgeCount";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { HandleTaskLabel, TaskType } from "./types";
import { useLocalStorage } from "./hooks";
import _ from "lodash";
import Clock from "./components/Clock";

function App() {
  const [tasks, setTasks] = useLocalStorage<Array<TaskType>>("tasks", []);
  const USER_AGE = localStorage.getItem("dob") || null;
  const USER_NAME = localStorage.getItem("name") || null;

  const addNewTask = (taskLabel: string, priority: number) => {
    const newTask = {
      id: Math.random(),
      label: taskLabel,
      completed: false,
      date_due: new Date(),
      priority,
    };
    setTasks((oldList) => [...oldList, newTask]);
  };

  const toggleTaskComplete = (id: number) =>
    setTasks((oldList) =>
      _.map(oldList, (task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );

  const removeTask = (id: number) =>
    setTasks((oldList) => _.filter(oldList, (task) => task.id === id));

  const reset = () => {
    setTasks([]);
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
        {/* <AgeCount dob={new Date(parseInt(USER_AGE, 10))} /> */}
        <Clock name={USER_NAME} />
        <TaskInput addNewTask={addNewTask} />
        {/* 
        //@ts-ignore */}
        <TaskList
          tasks={_.sortBy(tasks, ["completed", "priority"])}
          toggleTaskComplete={toggleTaskComplete}
          resetCallback={reset}
          handleTaskLabel={handleTaskLabel}
        />
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
