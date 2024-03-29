apiKey = "9796ea90a7f16a79e84289040dc82499";

function updateElementContent(elementId, content) {
    const element = document.querySelector(`#${elementId}`);
    if (element) {
        element.innerHTML = content;
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            throw new Error('Data received from API is null or empty.');
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null if there's an error
    }
}

async function getWeatherData(selectedCity){
    if(!navigator.onLine){
        const storedData = JSON.parse(localStorage.getItem(selectedCity));
        return storedData;
    }
    const newApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${apiKey}`;
    const locationData = await fetchData(newApiUrl);

    if (!locationData || locationData.length === 0) {
        throw new Error('Location data not found');
    }

    const { lat, lon } = locationData[0];
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const data = await fetchData(apiUrl);
    localStorage.setItem(selectedCity, JSON.stringify(data))
    return data;
}

function displayCurrentDate() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const hour = now.getHours();
    const minute = now.getMinutes();

    const currentDate = `${dayOfWeek}, ${date} ${month} ${hour}:${minute}`;
    return currentDate

}

// Copy the commented one pupa


// function displayData(data) {
//     if (!data){
//         console.error('No data available');
//         return
//     }
//     currentDate = displayCurrentDate();
//     document.getElementById('weather_icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//     updateElementContent('temperature', `${data.main.temp}°C`);
//     updateElementContent('condition', `${data.weather[0].description}`);
//     updateElementContent('date', `${currentDate}`);
//     updateElementContent('location', `${data.name}`);
//     updateElementContent('windspeed', `Windspeed: ${data.wind.speed}m/s${'\nDegree:'+data.wind.deg}°`);
//     updateElementContent('pressure', `Pressure: ${data.main.pressure}hPa`);
//     updateElementContent('humidity', `Humidity is ${data.main.humidity}%`);
//     updateElementContent('visibility', `Visibility is ${data.visibility}km`);

//     console.log(data);
// }

function displayData(data) {
    if (!data) {
        console.error('No data available');
        showErrorBox(); // Show error box when data is not available
        return;
    }

    hideErrorBox(); // Hide error box if data is available

    currentDate = displayCurrentDate();
    updateElementContent('temperature', `${data.main.temp}°C`);
    updateElementContent('date', `${currentDate}`);
    updateElementContent('location', `${data.name}`);
    updateElementContent('windspeed', `<i class="fas fa-wind"></i> Windspeed: ${data.wind.speed}m/s${'\nDegree:'+data.wind.deg}°`);
    updateElementContent('pressure', `<i class="fas fa-tachometer-alt"></i> Pressure: ${data.main.pressure}hPa`);
    updateElementContent('humidity', `<i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%`);
    updateElementContent('visibility', `<i class="fas fa-eye"></i> Visbility: ${data.visibility}km`);

    // Display weather icon and description
    const weatherIconElement = document.getElementById('weatherIcon');
    const weatherDescElement = document.getElementById('weatherDesc');

    if (weatherIconElement && weatherDescElement && data.weather && data.weather[0]) {
        const weatherIcon = data.weather[0].icon;
        const weatherDesc = data.weather[0].description;

        weatherIconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon" class="weather-icon-small">`;
        weatherDescElement.textContent = weatherDesc;
    }

    console.log(data);
}

document.getElementById('search').addEventListener('keydown', async (e)=>{
    console.log(e)
    if (e.key === "Enter"){
        refreshData();
    }
})

async function refreshData() {
    let selectedCity = document.getElementById('search').value;
    if (!selectedCity){
        selectedCity = "Kathmandu";
    }
    try {
        const data = await getWeatherData(selectedCity);
        displayData(data);
        hideErrorBox();
    } catch (error) {
        showErrorBox();
        console.log('Error loading data', error)
    }
}

// Refresh data every 20 seconds
// setInterval(refreshData, 20000);

// Initial load
refreshData();

function showErrorBox() {
    const errorBox = document.getElementById('error-box');
    errorBox.classList.add('visible');
    setTimeout(() => {
        hideErrorBox();
    }, 3000);
}

function hideErrorBox() {
    const errorBox = document.getElementById('error-box');
    errorBox.classList.remove('visible');
}