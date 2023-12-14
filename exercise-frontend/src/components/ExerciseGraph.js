
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {CategoryScale, Chart, LinearScale, PointElement, LineElement} from 'chart.js'; 

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

function ExerciseGraph({ totalVolumeData }) {
  


  // Check if totalVolumeData is undefined or empty
  if (!totalVolumeData || totalVolumeData.length === 0) {
    console.log(totalVolumeData);
    return <div>No data to display</div>;
  }

  //test

  // Extract timestamps and volumes from totalVolumeData
  const timestamps = totalVolumeData.map((data) => new Date(data.date).toISOString());
  const volumes = totalVolumeData.map((data) => data.volume);
  
  const data = {
    labels: timestamps.map((timestamp)=> new Date(timestamp)),
    datasets: [
      {
        label: 'Total Volume',
        data: volumes,
        fill: false,
        backgroundColor: 'rgba(74,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
  };

  return (
    <div>
      <h2>Exercise Graph</h2>
      <Line data={data} config = {config} />
    </div>
  );
}

export default ExerciseGraph;


