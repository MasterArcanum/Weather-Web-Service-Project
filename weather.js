document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=79d1ca96933b0328e1c7e3e7a26cb347`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            data.name = capitalizeFirstLetter(data.name);
            displayWeather(data);
        } else {
            console.error('Ошибка при получении погоды:', data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function capitalizeFirstLetter(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getCityNameWithCorrectEnding(city) {
    let cityName = city.trim();
    const exceptions = {
        'москва': 'Москве',
        'санкт-петербург': 'Санкт-Петербурге',
    };
    cityName = cityName.toLowerCase();
    if (exceptions[cityName]) {
        return exceptions[cityName];
    }
    if (/.*(ш|ж|ч|щ|а|о|и|у|э|ы|е|ё|ю|я)$/.test(cityName)) {
        return city + 'е';
    }
    if (cityName.endsWith('к')) {
        return city.slice(0, -1) + 'ке';
    }
    return city + 'е';
}

function getWeatherIcon(weatherId) {
    
    switch (weatherId) {
        case 'Clouds': return 'pic/cloud.png';
        case 'Clear': return 'pic/sun.png';
        case 'Snow': return 'pic/snow.png';
        case 'Rain': return 'pic/rain.png';
        case 'Drizzle': return 'pic/drizzle.png';
        case 'Thunderstorm': return 'pic/Thunderstorm.png';
        default: return 'pic/cloud.png';
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weather');
    const cityNameWithEnding = getCityNameWithCorrectEnding(data.name);
    const iconUrl = getWeatherIcon(data.weather[0].main);

    weatherContainer.innerHTML = `
        <h2>Погода в ${cityNameWithEnding}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <p>Температура: ${data.main.temp}°C</p>
        
    `;
}
