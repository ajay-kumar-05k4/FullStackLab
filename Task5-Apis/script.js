const key = 'bd956ae4112de1cc559c18bfebe31dd1';
const cityname = document.getElementById('city');
const ctx = document.getElementById('weatherChart').getContext('2d');
let weatherChart;
let currentChartType = 'bar'; // Default to bar chart
let currentView = 'forecast'; // Default to forecast view

async function fetchWeather() {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname.value}&appid=${key}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        displayWeatherChart(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function fetchCurrentWeather() {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname.value}&appid=${key}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching current weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    const temp = (data.main.temp - 273.15).toFixed(1);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    currentWeatherDiv.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
}

function displayWeatherChart(data) {
    const labels = [];
    const temperatures = [];
    for (let i = 0; i < 5; i++) {
        const item = data.list[i * 8];
        labels.push(new Date(item.dt * 1000).toLocaleDateString());
        temperatures.push(item.main.temp - 273.15); // Convert Kelvin to Celsius
    }

    if (weatherChart) {
        weatherChart.destroy();
    }

    weatherChart = new Chart(ctx, {
        type: currentChartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Add event listener to the form to handle submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (currentView === 'forecast') {
        fetchWeather();
    } else {
        fetchCurrentWeather();
    }
});

// Add event listeners for chart type buttons
document.getElementById('barChartBtn').addEventListener('click', function() {
    currentChartType = 'bar';
    if (weatherChart) {
        weatherChart.destroy();
        // Re-fetch data to redraw chart
        fetchWeather();
    }
});

document.getElementById('lineChartBtn').addEventListener('click', function() {
    currentChartType = 'line';
    if (weatherChart) {
        weatherChart.destroy();
        // Re-fetch data to redraw chart
        fetchWeather();
    }
});

// Add event listeners for view buttons
document.getElementById('currentWeatherBtn').addEventListener('click', function() {
    currentView = 'current';
    document.getElementById('weatherChart').style.display = 'none';
    document.getElementById('currentWeather').style.display = 'block';
    document.getElementById('chartButtons').style.display = 'none';
    if (cityname.value) {
        fetchCurrentWeather();
    }
});

document.getElementById('forecastBtn').addEventListener('click', function() {
    currentView = 'forecast';
    document.getElementById('weatherChart').style.display = 'block';
    document.getElementById('currentWeather').style.display = 'none';
    document.getElementById('chartButtons').style.display = 'block';
    if (cityname.value) {
        fetchWeather();
    }
});
