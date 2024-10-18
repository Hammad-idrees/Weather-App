document.addEventListener("DOMContentLoaded", function() {
    // Listen for the Enter key in the search bar
    document.getElementById("search-bar").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const city = event.target.value; // Get the city from the input
            if (city) {
                fetchWeatherData(city);
            } else {
                alert("Please enter a city name!"); // Alert if the input is empty
            }
        }
    });
});

function showLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'block'; // Show spinner
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none'; // Hide spinner
}

function fetchWeatherData(city) {
    const apiKey = '9e410940a54fee1f372b32bcdd35ba23';  // Replace with your OpenWeather API Key
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    showLoadingSpinner(); // Show spinner when starting to fetch weather data

    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found'); // Throw an error if the city is not found
            }
            return response.json();
        })
        .then(data => {
            updateWeatherWidget(data);
            fetchWeatherForecast(city); // Call to fetch the 5-day forecast
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            resetWeatherData(); // Reset UI on error
            alert(error.message); // Alert the user of the error
        })
        .finally(() => {
            hideLoadingSpinner(); // Hide spinner after fetch completes
        });
}

function updateWeatherWidget(data) {
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById("description").textContent = `Description: ${data.weather[0].description}`;
    document.getElementById("city").textContent = `City: ${data.name}`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`; // Assuming you have this element
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`; // Assuming you have this element
}

function fetchWeatherForecast(city) {
    const apiKey = 'e38c80350d2648373f7c6d149d5cf926'; // Your OpenWeather API Key
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    showLoadingSpinner(); // Show spinner when starting to fetch forecast data

    fetch(forecastApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Forecast not available'); // Throw an error if the forecast is not available
            }
            return response.json();
        })
        .then(forecastData => {
            updateForecastTable(forecastData);
        })
        .catch(error => {
            console.error("Error fetching forecast data:", error);
            resetForecastTable(); // Clear forecast table on error
            alert(error.message); // Alert the user of the error
        })
        .finally(() => {
            hideLoadingSpinner(); // Hide spinner after fetch completes
        });
}

function updateForecastTable(forecastData) {
    const tableBody = document.querySelector("#forecastTable tbody");
    tableBody.innerHTML = ''; // Clear the table before adding new data

    // Only get forecasts for the next 5 days (every 8th entry corresponds to a day)
    for (let i = 0; i < forecastData.list.length; i += 8) {
        const forecast = forecastData.list[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(forecast.dt * 1000).toLocaleDateString()}</td>
            <td>${Math.round(forecast.main.temp)} °C</td>
            <td>${forecast.weather[0].description}</td>
            <td><img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description} icon" /></td>
        `;
        tableBody.appendChild(row);
    }
}

function resetWeatherData() {
    document.getElementById("city").textContent = 'City: --';
    document.getElementById("temperature").textContent = 'Temperature: --';
    document.getElementById("humidity").textContent = 'Humidity: --';
    document.getElementById("wind-speed").textContent = 'Wind Speed: --';
    document.getElementById("description").textContent = 'Description: --';
}

function resetForecastTable() {
    const tableBody = document.querySelector("#forecastTable tbody");
    tableBody.innerHTML = ''; // Clear the forecast table on error
}
