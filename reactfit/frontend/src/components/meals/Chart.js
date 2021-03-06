import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import AuthService from "../../services/AuthService";
import MealService from "../../services/MealService";

const Chart = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let meal = [];
    let calories = [];
    var currentUserId = AuthService.getCurrentUser()
      ? AuthService.getCurrentUser().id
      : null;
    MealService.getMeals(currentUserId)
      .then((res) => {
        for (const dataObj of res.data) {
          meal.push(dataObj.description);
          calories.push(parseInt(dataObj.calories));
        }
        setChartData({
          labels: meal,
          datasets: [
            {
              label: "Calories",
              data: calories,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="App">
      <h4>Food Analytics</h4>

      <h5
        style={{
          fontSize: "20",
          textAlign: "center",

          marginBottom: "1em",
        }}
      >
        Calorie Intake per Meal
      </h5>
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            title: {
              text: "Calorie Intake per Meal ",
              fontSize: 20,
              fontColor: "#212529",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    //display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
