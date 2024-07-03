// src/app/page.js

"use client";

import { useState } from 'react';
import { parseISO, differenceInDays, formatDistanceToNow, formatDistance, isPast } from 'date-fns';
import Layout from './components/Layout';
import { useTasks } from './context/TaskContext';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function Home() {
  const { tasks, toggleCompleteTask, deleteTask, addTask } = useTasks();
  const [currentView, setCurrentView] = useState('month');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState(new Date());
  const [newSummary, setNewSummary] = useState('');
  const [newMotivation, setNewMotivation] = useState('');

  const events = tasks.map((task, index) => ({
    id: index,
    title: task.name,
    start: parseISO(task.deadline),
    end: parseISO(task.deadline),
    allDay: false,
    resource: task,
  }));

  const getTaskStatusLabel = (deadline, completed) => {
    if (completed) {
      return <span className="px-3 py-1 text-xs text-blue-800 bg-blue-200 rounded-full">Completed</span>;
    }

    const deadlineDate = new Date(deadline);
    if (isPast(deadlineDate)) {
      return <span className="px-3 py-1 text-xs text-red-800 bg-red-200 rounded-full">Passed</span>;
    }
    if (differenceInDays(deadlineDate, new Date()) <= 1) {
      return <span className="px-3 py-1 text-xs text-yellow-800 bg-yellow-200 rounded-full">Urgent</span>;
    }
    return <span className="px-3 py-1 text-xs text-green-800 bg-green-200 rounded-full">Normal</span>;
  };
  
  const eventStyleGetter = (event) => {
    const now = new Date();
    const deadline = new Date(event.resource.deadline);
    let backgroundColor = '#3174ad'; // default color
    if (event.resource.completed) {
      backgroundColor = '#d1e7dd';
    } else if (deadline < now) {
      backgroundColor = '#f8d7da';
    } else if (differenceInDays(deadline, now) <= 1) {
      backgroundColor = '#fff3cd';
    } else {
      backgroundColor = '#cfe2ff';
    }
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <Layout>
      <div className='flex'>
        <div className='w-6/12'>
            <div className="p-6 w-fit">
        <h1 className="mb-4 text-2xl font-bold">Study Buddy</h1>
        <h2 className="mb-2 text-xl font-semibold">Dagelijks Overzicht</h2>
        <div className="flex justify-center align-middle">
          <ul className="p-4 bg-white rounded-lg shadow">
            {tasks.map((task, index) => (
              <li key={index} className={`flex items-center justify-between mb-2 ${task.completed ? 'line-through' : ''}`}>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleCompleteTask(index)}
                    className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded-xl dark:bg-gray-600 dark:border-gray-500"
                  />
                  <div>
                    <span className="font-semibold">{task.name}</span> - {formatDistanceToNow(new Date(task.deadline), { addSuffix: true })} om {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="flex items-center">
                  {getTaskStatusLabel(task.deadline, task.completed)}
                  <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => deleteTask(index)}>Verwijderen</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button 
          className="fixed bottom-4 right-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setModalIsOpen(true)}
        >
          Add Task
        </button>

      </div>
      </div>
      <div className="w-6/12 p-6">
        <h1 className="mb-4 text-2xl font-bold">Study Buddy</h1>
        <h2 className="mb-2 text-xl font-semibold">Dagelijks Overzicht</h2>
        <div className="flex justify-center mb-4 space-x-2">
          <button 
            onClick={() => setCurrentView('month')} 
            className={`px-3 py-1 rounded-md ${currentView === 'month' ? 'bg-blue-500 text-white' : 'bg-blue-700 text-white hover:bg-blue-600'}`}
          >
            Month
          </button>
          <button 
            onClick={() => setCurrentView('week')} 
            className={`px-3 py-1 rounded-md ${currentView === 'week' ? 'bg-blue-500 text-white' : 'bg-blue-700 text-white hover:bg-blue-600'}`}
          >
            Week
          </button>
          <button 
            onClick={() => setCurrentView('day')} 
            className={`px-3 py-1 rounded-md ${currentView === 'day' ? 'bg-blue-500 text-white' : 'bg-blue-700 text-white hover:bg-blue-600'}`}
          >
            Day
          </button>
        </div>
        <div className="mt-6 h-96">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            eventPropGetter={eventStyleGetter}
            view={currentView}
            onView={setCurrentView}
            step={60}
            showMultiDayTimes
            selectable
            toolbar={true}
            popup={true}
            components={{
              toolbar: (props) => (
                <div className="flex items-center justify-center p-2 text-white bg-blue-700 rounded-md">
                  <span className="text-lg">{props.label}</span>
                </div>
              ),
            }}
          />
        </div>
      </div>
      </div>
    </Layout>
  );
}
