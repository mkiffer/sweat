import React from 'react';

function ExerciseTable({exerciseData}){
    return (
        <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>Exercise Name</th>
                <th>Reps</th>
                <th>Weight (kgs)</th>
                <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                {exerciseData.map((exercise)=> (
                    <tr key = {exercise.id}>
                        <td>{exercise.date}</td>
                        <td>{exercise.name}</td>
                        <td>{exercise.reps}</td>
                        <td>{exercise.weight}</td>
                        <td>{(exercise.weight)*(exercise.reps)}</td>

                    </tr>
                ))}
            </tbody>
      </table>

    
    );
}

export default ExerciseTable;