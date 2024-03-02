import "./App.css";
import React, { useState } from "react";
import Categories from "./components/Categories/Categories";
import TaskTracker from "./components/TaskTracker/TaskTracker";
import TaskReports from "./components/TaskReports/TaskReports";

function App() {
  const [categories, setCategories] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);

  const addCategory = (categoryName) => {
    setCategories([...categories, categoryName]);
  };

  const addTimeEntry = (category, time) => {
    setTimeEntries((prevTimeEntries) => [
      ...prevTimeEntries,
      { category, time, date: new Date() },
    ]);
  };

  return (
    <>
      <h1 className="appTitle">• Work Time Tracker •</h1>
      <div className="appContent">
        <Categories categories={categories} addCategory={addCategory} />
        <TaskTracker categories={categories} addTimeEntry={addTimeEntry} />
      </div>
      <div className="reportContent">
        <TaskReports
          addTimeEntry={addTimeEntry}
          timeEntries={timeEntries}
          setTimeEntries={setTimeEntries}
        />
      </div>
    </>
  );
}

export default App;
