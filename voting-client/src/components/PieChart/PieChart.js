import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import "./PieChart.css"

// TODO: Change labels to candidate names

Chart.register(ArcElement,Tooltip, Legend);

export const PieChart = (props) => {

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green',],
    datasets: [
      {
        label: '# of Votes',
        data: props.votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return(
    <div className="chart-container">
      <Pie data={data} />
  </div>
  )

}



