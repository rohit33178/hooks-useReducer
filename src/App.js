import { useCallback, useReducer, useState } from "react";
import "./styles.css";

function taskReducer(tasks, action) {
  switch (action.type) {
    case "add_task": {
      return [
        ...tasks,
        {
          id: tasks.length + 1,
          task: action.data.task,
          done: false
        }
      ];
    }

    case "change_task_status": {
      let id = action.data.id;
      let updatedTask = tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      return updatedTask;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
const initialTasks = [
  { id: 1, task: "learn react Unit testing", done: false },
  { id: 2, task: "learn express API Unit testing", done: false }
];

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const addTasks = useCallback(
    (e) => {
      e.preventDefault();
      if (task === "") return false;
      let taskData = {
        task: task
      };
      dispatch({
        type: "add_task",
        data: taskData
      });
      setTask("");
    },
    [task]
  );

  const handleToggle = (id) => {
    // e.preventDefault();
    dispatch({
      type: "change_task_status",
      data: {
        id
      }
    });
  };

  return (
    <div className="App">
      <h1>useReducer </h1>
      <h2>
        <form>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask((prevTask) => (prevTask = e.target.value))}
          />
          <button onClick={addTasks}>Add</button>
        </form>
      </h2>
      <div
        style={{
          textAlign: "left",
          marginLeft: "3.5rem"
        }}
      >
        {tasks?.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={(e) => handleToggle(task.id)}
            />
            <label
              style={{
                color: task.done ? "red" : false
              }}
            >
              {task.id} - {task.task}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
