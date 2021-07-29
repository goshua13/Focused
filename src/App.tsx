import "./App.css";
import NewUserPrompt from "./components/NewUserPrompt";
import AgeCount from "./components/AgeCount";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { TaskType } from "./types";
import { useLocalStorage } from "./hooks";
import _ from "lodash";

function App() {
  const [tasks, setTasks] = useLocalStorage<Array<TaskType>>("tasks", []);
  const USER_AGE = localStorage.getItem("dob") || null;

  const addNewTask = (taskLabel: string) => {
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

  const removeTask = (id: number) =>
    setTasks((oldList) => _.filter(oldList, (task) => task.id === id));

  const reset = () => setTasks([]);

  if (USER_AGE) {
    return (
      <div className="app-wrapper">
        <AgeCount dob={new Date(parseInt(USER_AGE, 10))} />
        {/* 
        //@ts-ignore */}
        <TaskList
          tasks={_.sortBy(tasks, "completed")}
          toggleTaskComplete={toggleTaskComplete}
          resetCallback={reset}
        />
        <TaskInput addNewTask={addNewTask} />
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
