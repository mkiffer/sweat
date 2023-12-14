import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Fetch exercise data from your Django backend's API
    axios.get('http://localhost:8000/api/exercises/')  // Replace with your backend API URL
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error('Error fetching exercise data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Exercise List</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name} - Weight: {exercise.weight} lbs, Repetitions: {exercise.repetitions}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;
