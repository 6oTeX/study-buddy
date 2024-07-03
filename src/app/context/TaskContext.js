// src/app/context/TaskContext.js

"use client";

import { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

const initialTasks = [
  { name: "Wiskunde huiswerk", deadline: "2024-07-01T16:00:00", summary: "Maak hoofdstuk 5 af.", motivation: "Dit zal helpen om de basis te versterken.", completed: false },
  { name: "Biologie hoofdstuk 3 lezen", deadline: "2024-07-02T10:00:00", summary: "Lees hoofdstuk 3 en maak notities.", motivation: "Belangrijk voor het begrijpen van de stof.", completed: false },
  { name: "Scheikunde project", deadline: "2024-07-03T14:00:00", summary: "Werk aan het groepsproject.", motivation: "Dit project telt mee voor 30% van je cijfer.", completed: false },
  { name: "Engels essay schrijven", deadline: "2024-07-04T12:00:00", summary: "Schrijf een essay over klimaatverandering.", motivation: "Goed schrijven helpt bij de examens.", completed: false },
  { name: "Geschiedenis presentatie voorbereiden", deadline: "2024-07-05T09:00:00", summary: "Bereid de presentatie voor over de Eerste Wereldoorlog.", motivation: "Dit zal helpen bij de mondelinge presentaties.", completed: false },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const toggleCompleteTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleCompleteTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
