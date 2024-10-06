import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [task, setTask] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [activities, setActivities] = useState([]);

  // Fetch activities
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => setActivities(response.data))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = { task, start_time: startTime, end_time: endTime };
    axios.post('http://localhost:5000/api/activities', newActivity)
      .then(response => {
        setActivities([...activities, { ...newActivity, id: response.data.id }]);
        setTask('');
        setStartTime('');
        setEndTime('');
      })
      .catch(error => console.error("Error adding activity: ", error));
  };

  return (
    <div className="App">
      <h1>Time Activity Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Task" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          required 
        />
        <input 
          type="datetime-local" 
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
          required 
        />
        <input 
          type="datetime-local" 
          value={endTime} 
          onChange={(e) => setEndTime(e.target.value)} 
          required 
        />
        <button type="submit">Add Activity</button>
      </form>

      <h2>Activity Log</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.task} (Start: {new Date(activity.start_time).toLocaleString()}, End: {new Date(activity.end_time).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
