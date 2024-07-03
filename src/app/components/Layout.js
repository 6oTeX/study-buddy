// src/app/components/Layout.js

"use client";

import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTasks } from '../context/TaskContext';

export default function Layout({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState(new Date());
  const [newSummary, setNewSummary] = useState('');
  const [newMotivation, setNewMotivation] = useState('');
  const { addTask } = useTasks();

  const handleAddTask = () => {
    const newDeadline = new Date(newDate);
    newDeadline.setHours(newTime.getHours());
    newDeadline.setMinutes(newTime.getMinutes());
    addTask({ 
      name: newTask, 
      deadline: newDeadline.toISOString(), 
      summary: newSummary, 
      motivation: newMotivation,
      completed: false 
    });
    setNewTask('');
    setNewDate(new Date());
    setNewTime(new Date());
    setNewSummary('');
    setNewMotivation('');
    setModalIsOpen(false);
  };

  return (
    <div>
      <nav className="p-4 bg-blue-700">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" legacyBehavior>
              <a className="text-white">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/study-help" legacyBehavior>
              <a className="text-white">Study Help</a>
            </Link>
          </li>
          <li>
            <Link href="/relax" legacyBehavior>
              <a className="text-white">Relax</a>
            </Link>
          </li>
          <li>
            <Link href="/motivation" legacyBehavior>
              <a className="text-white">Motivation</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="p-4">
        {children}
        <button 
          className="fixed bottom-4 right-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setModalIsOpen(true)}
        >
          Add Task
        </button>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Task"
        className="z-50 max-w-lg p-4 mx-auto mt-20 bg-white rounded-lg shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <h2 className="mb-2 text-lg font-semibold">Nieuwe Taak Toevoegen</h2>
        <input
          type="text"
          placeholder="Taaknaam"
          className="w-full p-2 m-1 border-2 border-gray-500 rounded-md"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className="m-1">
          <DatePicker
            selected={newDate}
            onChange={(date) => setNewDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 border-2 border-gray-500 rounded-md"
            placeholderText="Selecteer Deadline Datum"
          />
        </div>
        <div className="m-1">
          <DatePicker
            selected={newTime}
            onChange={(time) => setNewTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            className="w-full p-2 border-2 border-gray-500 rounded-md"
            placeholderText="Selecteer Deadline Tijd"
          />
        </div>
        <textarea
          placeholder="Samenvatting"
          className="w-full p-2 m-1 border-2 border-gray-500 rounded-md"
          value={newSummary}
          onChange={(e) => setNewSummary(e.target.value)}
        />
        <textarea
          placeholder="Motivatie"
          className="w-full p-2 m-1 border-2 border-gray-500 rounded-md"
          value={newMotivation}
          onChange={(e) => setNewMotivation(e.target.value)}
        />
        <button
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleAddTask}
        >
          Toevoegen
        </button>
      </Modal>
    </div>
  );
}
