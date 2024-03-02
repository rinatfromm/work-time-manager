import React, { useState, useEffect } from 'react';
import styles from './TaskReports.module.css';
import { handleEdit, handleDelete, handleSaveEdit, calculateTotalHours } from './config';
import { generateWeeklyReports, goToPreviousWeek, goToNextWeek } from './weeklyReportsUtils';
import report from '../../assets/images/1486486320-archive-docs-folder-clipboard-document-file-list-report_81219.svg';

const TaskReports = ({ timeEntries, setTimeEntries }) => {
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedTime, setEditedTime] = useState('');
    const [weeklyReports, setWeeklyReports] = useState([]);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);



    useEffect(() => {
        const weeklyReports = generateWeeklyReports(timeEntries);
        setWeeklyReports(weeklyReports);
        localStorage.setItem('reports', JSON.stringify(weeklyReports));
    }, [timeEntries]);



    return (
        <div className={styles.report}>
            <h2 className={styles.title}>Reports</h2>
            <img src={report} alt='Report' className={styles.reportImg} />
            <div>
                <div className={styles.navigation} >
                    <button onClick={() => goToPreviousWeek(currentWeekIndex, setCurrentWeekIndex)} disabled={currentWeekIndex === 0}>Previous Week</button>
                    <button onClick={() => goToNextWeek(currentWeekIndex, setCurrentWeekIndex)} disabled={currentWeekIndex === weeklyReports.length - 1}>Next Week</button>
                </div>
                <p className={styles.hours}>Hours per week: {weeklyReports[currentWeekIndex] && calculateTotalHours(weeklyReports[currentWeekIndex].entries)}</p>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Time</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeklyReports.length > 0 && weeklyReports[currentWeekIndex] && weeklyReports[currentWeekIndex].entries.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.date.toISOString().split("T")[0]}</td>
                                <td>{entry.category}</td>
                                <td>{editedIndex === index ? <input type="number" value={editedTime} onChange={(e) => setEditedTime(e.target.value)} /> : entry.time}</td>
                                <td className={styles.btnBox}>
                                    {editedIndex === index ? <button onClick={() => handleSaveEdit(editedIndex, timeEntries, setTimeEntries, setEditedIndex, setEditedTime, editedTime)} className={styles.saveBtn}>Save</button> : <button onClick={() => handleEdit(index, timeEntries, setEditedIndex, setEditedTime)} className={styles.editBtn}>Edit</button>}
                                </td>
                                <td className={styles.btnBox}>
                                    <button onClick={() => handleDelete(index, timeEntries, setTimeEntries)} className={styles.deleteBtn}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskReports;