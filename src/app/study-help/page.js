// src/app/study-help/page.js

"use client";

import Layout from '../components/Layout';
import { useTasks } from '../context/TaskContext';

export default function StudyHelp() {
  const { tasks } = useTasks();

  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Study Help</h1>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="p-4 mb-4 bg-white rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold">{task.name}</h2>
              <p>{task.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
