
// All Weathers
document.getElementById("search-bar").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {  // Trigger the search when 'Enter' is pressed
    const city = document.getElementById("search-bar").value;
    getWeatherData(city);
  }
});

function getWeatherData(city) {
  const apiKey = '9e410940a54fee1f372b32bcdd35ba23'; // Replace with your OpenWeather API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      updateWeatherWidget(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function updateWeatherWidget(data) {
  const temp = data.main.temp;
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const city = data.name;

  // Update HTML content
  document.getElementById("temperature").textContent = `Temperature: ${temp}°C`;
  document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} m/s`;
  document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
  document.getElementById("description").textContent = `Description: ${description}`;
  document.getElementById("city").textContent = `City: ${city}`;

  // Change background based on weather condition
  const weatherMain = data.weather[0].main.toLowerCase();
  const weatherSection = document.querySelector(".weather-section");

  // Remove the moving background class if it exists
  weatherSection.classList.remove("moving-background");

  if (weatherMain.includes('clear')) {
    weatherSection.style.backgroundImage = "url('images/sunny.jpg')";
  } else if (weatherMain.includes('clouds')) {
    weatherSection.style.backgroundImage = "url('images/cloudy.jpg')";
  } else if (weatherMain.includes('rain')) {
    weatherSection.style.backgroundImage = "url('images/rain.jpg')";
  } else if (weatherMain.includes('snow')) {
    weatherSection.style.backgroundImage = "url('images/snow.jpg')";
  } else if (weatherMain.includes('thunderstorm')) {
    weatherSection.style.backgroundImage = "url('images/thunderstorm.jpg')";
  } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
    weatherSection.style.backgroundImage = "url('images/foggy.jpg')";
  } else if (weatherMain.includes('drizzle')) {
    weatherSection.style.backgroundImage = "url('images/drizzle.jpg')";
  } else if (weatherMain.includes('hail') || weatherMain.includes('sleet')) {
    weatherSection.style.backgroundImage = "url('images/haily.jpg')";
  } else if (weatherMain.includes('tornado')) {
    weatherSection.style.backgroundImage = "url('images/tornado.jpg')";
  } else if (weatherMain.includes('sand') || weatherMain.includes('dust') || weatherMain.includes('ash')) {
    weatherSection.style.backgroundImage = "url('images/sandstorm.jpg')";
  } else if (weatherMain.includes('haze') || weatherMain.includes('smoke')) {
    weatherSection.style.backgroundImage = "url('images/haily.jpg')";
  } else {
    weatherSection.style.backgroundImage = "url('images/sunny.jpg')";  // Fallback image
  }

  // Add the moving background class
  weatherSection.classList.add("moving-background");

  // Make sure the background covers the whole section
  weatherSection.style.backgroundSize = "cover";
  weatherSection.style.backgroundPosition = "center";
}

