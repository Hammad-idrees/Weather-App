// document.addEventListener("DOMContentLoaded", function () {
//   // Assume you want to call fetchWeatherForecast when the user searches for a city
//   document.getElementById("search-bar").addEventListener("keypress", function (event) {
//       if (event.key === "Enter") {
//           const city = event.target.value; // Get the city from the input
//           if (city) {
//               fetchWeatherForecast(city); // This will call the existing function in city.js
//           } else {
//               alert("Please enter a city name!");
//           }
//       }
//   });
// });

// // 1. Vertical Bar Chart (Temperature for next 5 days)
// function updateTempBarChart(forecastData) {
//   const ctx = document.getElementById("tempBarChart").getContext("2d");
//   const labels = forecastData.map(data => data.date);
//   const temperatures = forecastData.map(data => data.temp);

//   new Chart(ctx, {
//       type: "bar",
//       data: {
//           labels: labels,
//           datasets: [{
//               label: "Temperature (°C)",
//               data: temperatures,
//               backgroundColor: "rgba(75, 192, 192, 0.2)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 1,
//           }],
//       },
//       options: {
//           scales: {
//               y: {
//                   beginAtZero: true,
//               },
//           },
//       },
//   });
// }

// // 2. Doughnut Chart (Weather Conditions Percentage)
// function updateWeatherDoughnutChart(forecastData) {
//   const ctx = document.getElementById("weatherDoughnutChart").getContext("2d");
//   const weatherConditions = ["Sunny", "Cloudy", "Rainy"];
//   const weatherCount = { Sunny: 0, Cloudy: 0, Rainy: 0 };

//   // Count occurrences of each weather condition
//   forecastData.forEach(data => {
//       if (weatherCount[data.weather] !== undefined) {
//           weatherCount[data.weather]++;
//       }
//   });

//   new Chart(ctx, {
//       type: "doughnut",
//       data: {
//           labels: weatherConditions,
//           datasets: [{
//               data: Object.values(weatherCount),
//               backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
//               hoverBackgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
//           }],
//       },
//   });
// }

// // 3. Line Chart (Temperature Changes for next 5 days)
// function updateTempLineChart(forecastData) {
//   const ctx = document.getElementById("tempLineChart").getContext("2d");
//   const labels = forecastData.map(data => data.date);
//   const temperatures = forecastData.map(data => data.temp);

//   new Chart(ctx, {
//       type: "line",
//       data: {
//           labels: labels,
//           datasets: [{
//               label: "Temperature (°C)",
//               data: temperatures,
//               backgroundColor: "rgba(153, 102, 255, 0.2)",
//               borderColor: "rgba(153, 102, 255, 1)",
//               borderWidth: 1,
//           }],
//       },
//       options: {
//           scales: {
//               y: {
//                   beginAtZero: true,
//               },
//           },
//       },
//   });
// }

// // Modify the fetchWeatherForecast function in city.js to call chart update functions
// function fetchWeatherForecast(city) {
//   const apiKey = 'e38c80350d2648373f7c6d149d5cf926';
//   const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

//   fetch(forecastApiUrl)
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Forecast not available');
//           }
//           return response.json();
//       })
//       .then(forecastData => {
//           const formattedForecast = forecastData.list.slice(0, 40).map((forecast, index) => ({
//               date: new Date(forecast.dt * 1000).toLocaleDateString(),
//               temp: Math.round(forecast.main.temp),
//               weather: forecast.weather[0].main, // e.g., "Sunny", "Cloudy"
//           }));

//           // Call chart update functions with the formatted data
//           updateTempBarChart(formattedForecast);
//           updateWeatherDoughnutChart(formattedForecast);
//           updateTempLineChart(formattedForecast);
//       })
//       .catch(error => {
//           console.error("Error fetching forecast data:", error);
//       });
// }

// New Code here

document.addEventListener("DOMContentLoaded", function () {
  // Call fetchWeatherForecast when the user searches for a city
  document.getElementById("search-bar").addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
          const city = event.target.value; // Get the city from the input
          if (city) {
              fetchWeatherForecast(city); // Call to fetch the weather forecast
          } else {
              alert("Please enter a city name!");
          }
      }
  });
});

// 1. Vertical Bar Chart (Temperature for the next 8 days)
function updateTempBarChart(forecastData) {
  const ctx = document.getElementById("tempBarChart").getContext("2d");
  const labels = forecastData.map(data => data.date);
  const temperatures = forecastData.map(data => data.temp);

  new Chart(ctx, {
      type: "bar",
      data: {
          labels: labels,
          datasets: [{
              label: "Temperature (°C)",
              data: temperatures,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
          }],
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
              },
          },
      },
  });
}

// 2. Doughnut Chart (Weather Conditions Percentage)
function updateWeatherDoughnutChart(forecastData) {
  const ctx = document.getElementById("weatherDoughnutChart").getContext("2d");
  const weatherCount = {};

  // Count occurrences of each weather condition
  forecastData.forEach(data => {
      const condition = data.weather;
      weatherCount[condition] = (weatherCount[condition] || 0) + 1;
  });

  const labels = Object.keys(weatherCount);
  const data = Object.values(weatherCount);

  new Chart(ctx, {
      type: "doughnut",
      data: {
          labels: labels,
          datasets: [{
              data: data,
              backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0", "#FF9F40"],
              hoverBackgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0", "#FF9F40"],
          }],
      },
  });
}


// 3. Line Chart (Temperature Changes for the next 8 days)
function updateTempLineChart(forecastData) {
  const ctx = document.getElementById("tempLineChart").getContext("2d");
  const labels = forecastData.map(data => data.date);
  const temperatures = forecastData.map(data => data.temp);

  new Chart(ctx, {
      type: "line",
      data: {
          labels: labels,
          datasets: [{
              label: "Temperature (°C)",
              data: temperatures,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
          }],
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
              },
          },
      },
  });
}

// Modify the fetchWeatherForecast function in city.js to call chart update functions
function fetchWeatherForecast(city) {
  const apiKey = 'e38c80350d2648373f7c6d149d5cf926'; // Replace with your OpenWeather API Key
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(forecastApiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Forecast not available');
          }
          return response.json();
      })
      .then(forecastData => {
          const uniqueDays = new Set();
          const formattedForecast = [];

          // Process the forecast data for the next 8 days
          for (let i = 0; i < forecastData.list.length && uniqueDays.size < 8; i++) {
              const forecast = forecastData.list[i];
              const date = new Date(forecast.dt * 1000).toLocaleDateString();

              // Only get data for unique dates
              if (!uniqueDays.has(date)) {
                  uniqueDays.add(date);
                  formattedForecast.push({
                      date: date,
                      temp: Math.round(forecast.main.temp),
                      weather: forecast.weather[0].main, // e.g., "Sunny", "Cloudy", etc.
                  });
              }
          }

          // Call chart update functions with the formatted data
          updateTempBarChart(formattedForecast);
          updateWeatherDoughnutChart(formattedForecast);
          updateTempLineChart(formattedForecast);
      })
      .catch(error => {
          console.error("Error fetching forecast data:", error);
      });
}
