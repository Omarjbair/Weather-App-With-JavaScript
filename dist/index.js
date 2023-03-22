"use strict";
// variables
let search = document.getElementById('search');
let text_input = document.getElementById('text_input');
let wind = document.getElementById('wind');
let cloud = document.getElementById('cloud');
let humidity = document.getElementById('humidity');
let city = document.getElementById('city');
let temp = document.getElementById('temp');
let time = document.getElementById('time');
let month_name = document.getElementById('month_name');
let month_num = document.getElementById('month_num');
let day_num = document.getElementById('day_num');
let day_name = document.getElementById('day_name');
let weather_status = document.getElementById('weather_status');
let weather_photo = document.getElementById('weather_photo');
let main_container = document.getElementById('main_container');
let country = document.querySelectorAll('#country');
let country_array = ['Palestine', 'lebanon', 'Jordan', 'Syria'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// get weather data on jordan when open website
get_info("jordan");
// search and get info 
search.addEventListener('click', () => {
    let value = text_input.value;
    if (!(value === "" || value === " ")) {
        get_info(value);
        set_country(value);
        text_input.value = "";
    }
});
// Api fetch and get information
function get_info(value) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=32a6b6eca54549f89fd105242232103&q=${value}&aqi=no`)
        .then((response) => response.json())
        .then((data) => {
        temp.textContent = data.current.temp_c;
        city.textContent = data.location.name;
        let times = data.location.localtime.split(" ");
        time.textContent = times[1];
        const d = new Date(times[0]);
        let date = times[0].split("-");
        month_name.textContent = months[d.getMonth()];
        month_num.textContent = (d.getMonth() + 1).toString();
        day_num.textContent = date[2];
        day_name.textContent = days[d.getDay()];
        weather_status.textContent = data.current.condition.text;
        weather_photo.src = data.current.condition.icon;
        cloud.textContent = `${data.current.cloud}%`;
        humidity.textContent = `${data.current.humidity}%`;
        wind.textContent = `${data.current.wind_kph}km/h`;
        data.current.temp_c > 25 ? change_Background("sunny") : data.current.temp_c > 15 ? change_Background("storm") : change_Background("rain");
    });
}
;
// last country visit 
country.forEach((country_weather) => {
    country_weather.addEventListener('click', () => {
        get_info(country_weather.innerHTML);
    });
});
// change last country visit
function set_country(value) {
    let i = 0;
    country_array.pop();
    country_array.unshift(value);
    country_array.forEach((val) => {
        country[i].innerHTML = val;
        i++;
    });
}
;
// change background image based on weather 
function change_Background(value) {
    main_container.style.transition = "1s";
    main_container.style.background = `url('images/${value}.jpg')`;
    main_container.style.backgroundSize = "cover";
}
