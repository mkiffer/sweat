import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import TrackExercise from './components/TrackExercise';
import ExerciseList from './components/ExerciseList';
import ExerciseGraph from './components/ExerciseGraph';
import LoginForm from './components/LoginForm';

function AppRouter() {
  // Initialize exerciseData as an empty array
  const [exerciseData, setExerciseData] = useState([]);

  // Fetch exerciseData when the component mounts
  useEffect(() => {
    // Fetch exercise data from your API endpoint and update exerciseData
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/exercises/'); // Replace with your API endpoint
        const data = await response.json();
        setExerciseData(data);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once, when the component mounts

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/track-exercise" element={<TrackExercise />} />
        <Route path="/login" component={<LoginForm/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

