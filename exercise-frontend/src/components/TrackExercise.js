import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseGraph from './ExerciseGraph'; // Import your ExerciseGraph component
import ExerciseTable from './ExerciseTable';

function TrackExercise() {
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseReps, setExerciseReps] = useState(0);
  const [exerciseWeight, setExerciseWeight] = useState(0);
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExerciseData, setFilteredExerciseData] = useState([]);
  const [totalVolumeData, setTotalVolumeData] = useState([]);
  // Fetch exercise data when the component mounts
  
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
      //retrieve all exercise data
        const response = await axios.get('http://localhost:8000/exercises/');
        const initialExerciseData = response.data;
        setExerciseData(initialExerciseData);
        //create a list of unique names to be used for the dropdown menu
        const uniqueExerciseNames = Array.from(
          new Set(initialExerciseData.map((exercise) => exercise.name))
        );
        //add names to the list
        setAllExercises(uniqueExerciseNames);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchExerciseData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  
  const handleTrackExercise = async () => {
    // Perform exercise tracking and update the backend
    const newExercise = {
      name: exerciseName,
      reps: exerciseReps,
      weight: exerciseWeight,
      date: new Date().toISOString(),
    };
    // Send the new exercise data to the backend (you'll need to implement this part)
    try {
      await axios.post('http://localhost:8000/exercises/', newExercise);
      
      // After successfully adding the exercise, you can fetch updated exercise data
      const response = await axios.get('http://localhost:8000/exercises/');
      const updatedExerciseData = response.data;
        // Update the dropdown with unique exercise names
      const uniqueExerciseNames = Array.from(
      new Set(updatedExerciseData.map((exercise) => exercise.name))
      );
      setAllExercises(uniqueExerciseNames);
      
      // Update the state with the updated exercise data
      setExerciseData(updatedExerciseData);
      
      // Update the filtered exercise data based on the selected exercise name
      setFilteredExerciseData(updatedExerciseData.filter((exercise) => exercise.name === exerciseName));
    
    } catch (error) {
      console.error('Error tracking exercise:', error);
    }

  };



  //useEffect for name change

  useEffect(()=>{
    
    // Update the filtered exercise data based on the selected exercise name
    setFilteredExerciseData((prevFilteredData) => {
      const updatedFilteredData = exerciseData.filter((exercise) => exercise.name === exerciseName);    
      // Calculate and update time series data for the selected exercise
      const timeSeriesData = updatedFilteredData.map((exercise) => ({
        date: exercise.date,
        volume: exercise.reps * exercise.weight,
      }));
      setTotalVolumeData(timeSeriesData);
      return updatedFilteredData;
    });

  },[exerciseName,exerciseData]);

  const handleExerciseNameChange = (e) => {
    const selectedExerciseName = e.target.value;
    setExerciseName(selectedExerciseName);

  };

  return (
    <div>
      <h2>Track Exercise</h2>
      <form>
        <div>
          <label htmlFor="exerciseName">Exercise Name:</label>
          <input
            type="text"
            id="exerciseName"
            value={exerciseName}
            onChange={handleExerciseNameChange}
          />
        </div>
        <div>
          <label htmlFor="exerciseReps">Reps:</label>
          <input
            type="number"
            id="exerciseReps"
            value={exerciseReps}
            onChange={(e) => setExerciseReps(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="exerciseWeight">Weight (kgs):</label>
          <input
            type="number"
            id="exerciseWeight"
            value={exerciseWeight}
            onChange={(e) => setExerciseWeight(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleTrackExercise}>
          Track Exercise
        </button>
        <label htmlFor="exerciseName">Exercise Name:</label>
        <select
           id="exerciseName"
            value={exerciseName}
            onChange={handleExerciseNameChange}
            >
        <option value="">Select an exercise</option>
            {allExercises.map((exercise, index) => (
        <option key={index} value={exercise}>
              {exercise}
        </option>
        ))}
      </select>
      </form>



      {/* Pass updated exerciseData to the ExerciseGraph component */}
      {console.log(totalVolumeData)}
      <ExerciseGraph totalVolumeData={totalVolumeData} /> 
      <ExerciseTable exerciseData={filteredExerciseData }/>
    </div>
  );
}

export default TrackExercise;


