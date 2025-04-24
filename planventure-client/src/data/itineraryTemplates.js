export const defaultTemplate = {
  activity: [
    { time: '09:00', activity: 'Breakfast', type: 'food' },
    { time: '10:00', activity: 'Morning Activity', type: 'activity' },
    { time: '12:30', activity: 'Lunch', type: 'food' },
    { time: '14:00', activity: 'Afternoon Activity', type: 'activity' },
    { time: '16:00', activity: 'Free Time / Rest', type: 'activity' },
    { time: '19:00', activity: 'Dinner', type: 'food' }
  ]
};

export const generateTemplateForDate = (date) => {
  return defaultTemplate.activity.map(item => ({
    ...item,
    id: `${date}-${Date.now()}-${Math.random()}`,
    location: ''
  }));
};
