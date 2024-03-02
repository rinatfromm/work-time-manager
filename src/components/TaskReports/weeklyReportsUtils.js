export const getWeekStart = (date) => {
    if (!(date instanceof Date)) {
      throw new Error('Invalid date object');
    }
  
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    return weekStart.toISOString().split("T")[0];
  };

export const generateWeeklyReports = (entries) => {
  const weeklyReports = [];
  const weeks = {};

  entries.forEach((entry) => {
    const weekStart = getWeekStart(entry.date);
    if (!weeks[weekStart]) {
      weeks[weekStart] = [];
    }
    weeks[weekStart].push(entry);
  });

  for (const weekStart in weeks) {
    const weekEntries = weeks[weekStart];
    const totalHours = weekEntries.reduce(
      (total, entry) => total + parseInt(entry.time),
      0
    );
    weeklyReports.push({
      start: weekStart,
      end: getWeekEnd(weekStart),
      entries: weekEntries,
      totalHours,
    });
  }

  return weeklyReports;
};

export const getWeekEnd = (weekStart) => {
  const endDate = new Date(weekStart);
  endDate.setDate(endDate.getDate() + 6);
  return endDate.toISOString().split("T")[0];
};

export const goToPreviousWeek = (currentWeekIndex, setCurrentWeekIndex) => {
  setCurrentWeekIndex(currentWeekIndex - 1);
};

export const goToNextWeek = (currentWeekIndex, setCurrentWeekIndex) => {
  setCurrentWeekIndex(currentWeekIndex + 1);
};
