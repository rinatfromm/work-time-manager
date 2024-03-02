export const handleEdit = (index, timeEntries, setEditedIndex, setEditedTime) => {
    setEditedIndex(index);
    setEditedTime(timeEntries[index].time);
};

export const handleDelete = (index, timeEntries, setTimeEntries) => {
    const newTimeEntries = [...timeEntries];
    newTimeEntries.splice(index, 1);
    setTimeEntries(newTimeEntries);
};

export const handleSaveEdit = (editedIndex, timeEntries, setTimeEntries, setEditedIndex, setEditedTime, editedTime) => {
    if (editedIndex !== null) {
        const newTimeEntries = [...timeEntries];
        newTimeEntries[editedIndex].time = editedTime;
        setTimeEntries(newTimeEntries);
        setEditedIndex(null);
        setEditedTime('');
    }
};
export const calculateTotalHours = (entries) => {
    return entries.reduce((total, entry) => {
        if (entry.time.trim() !== '') {
            total += parseInt(entry.time);
        }
        return total;
    }, 0);
};