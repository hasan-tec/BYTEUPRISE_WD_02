const cityInput = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const weatherImage = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apiKey = '801be865d00c48b4829204723242303'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === 404) {
            locationNotFound.style.display = 'flex';
            weatherBody.style.display = 'none';
            console.log('Error: Location not found');
            return;
        }

        locationNotFound.style.display = 'none';
        weatherBody.style.display = 'flex';
        temperature.textContent = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        description.textContent = weatherData.weather[0].description;
        humidity.textContent = `${weatherData.main.humidity}%`;
        windSpeed.textContent = `${weatherData.wind.speed} Km/h`;

        // Update weather image based on weather conditions
        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImage.src = 'assets/cloud.png';
                break;
            case 'Clear':
                weatherImage.src = 'assets/clear.png';
                break;
            case 'Rain':
                weatherImage.src = 'assets/rain.png';
                break;
            case 'Mist':
                weatherImage.src = 'assets/mist.png';
                break;
            case 'Snow':
                weatherImage.src = 'assets/snow.png';
                break;
            default:
                weatherImage.src = 'assets/unknown.png'; // Default image for unknown weather
                break;
        }

        console.log(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(cityInput.value);
});
