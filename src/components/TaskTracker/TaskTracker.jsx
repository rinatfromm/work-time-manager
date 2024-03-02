import { useEffect, useState } from 'react';
import styles from './TaskTracker.module.css'

const TaskTracker = ({ categories, addTimeEntry }) => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [time, setTime] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        addTimeEntry(selectedCategory, time);
        setSelectedCategory('');
        setTime('');
    };

    return <div>
        <h2>Add Time Entry</h2>
        <form onSubmit={handleSubmit} className={styles.trackerForm}>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={styles.select}>
                <option value="">Select category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter time"
                className={styles.input}
            />
            <button type="submit" className={styles.addBtn}>Add Time</button>
        </form>
    </div>;
}

export default TaskTracker;