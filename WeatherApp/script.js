


async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=9796ea90a7f16a79e84289040dc82499";

(async () => {
    data = await fetchData(apiUrl);
    const temperature = document.querySelector('#temperature')
    const condition = document.querySelector('#condition');
    const windspeed = document.querySelector('#windspeed');
    const pressure = document.querySelector('#pressure');
    temperature.innerHTML = `${data.main.temp}°C`
    condition.innerHTML = `${data.weather[0].description}`
    windspeed.innerHTML = `Windspeed: ${data.wind.speed}`
    pressure.innerHTML = `Pressure: ${data.main.pressure}`
    console.log(data)
})();
