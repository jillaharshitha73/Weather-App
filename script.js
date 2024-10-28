const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'e8d3f1f44870eaacf8cf520123fd6907';//enter your API_KEY

$(document).ready(function () {
    weatherFn('Vijayawada');
});
async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
//for you need temperature in Fahrenheit
    //const tempCelsius = data.main.temp;
    //const tempFahrenheit = ((tempCelsius * 9/5) + 32).toFixed(2);
    //$('#temperature').html(`${tempCelsius}°C / ${tempFahrenheit}°F`);

    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);

    const windSpeedMs = (data.wind.speed * 3.6).toFixed(2); 
    $('#wind-speed').html(`Wind Speed: ${windSpeedMs} km/h`);

    const iconCode = data.weather[0].icon; 
    $('#weather_icon').attr('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);

    $('#weather-info').fadeIn();
}
