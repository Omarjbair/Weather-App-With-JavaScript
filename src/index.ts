// variables
let search = <HTMLButtonElement> document.getElementById('search');
let text_input = <HTMLInputElement> document.getElementById('text_input');
let wind = <HTMLParagraphElement> document.getElementById('wind');
let cloud = <HTMLParagraphElement> document.getElementById('cloud');
let humidity = <HTMLParagraphElement> document.getElementById('humidity');
let city = <HTMLHeadingElement> document.getElementById('city');
let temp = <HTMLSpanElement> document.getElementById('temp');
let weather_status = <HTMLHeadingElement> document.getElementById('weather_status');
let weather_photo = <HTMLImageElement> document.getElementById('weather_photo');
let main_container = <HTMLBodyElement> document.getElementById('main_container');
let country = document.querySelectorAll('#country');
let country_array: string[] = ['Palestine','lebanon','Jordan','Syria'];

// get weather data on jordan when open website
get_info("jordan");

// search and get info 
search.addEventListener('click',() : void => { 
    let value :string = text_input.value;
    if(!(value === "" || value === " ")){
        get_info(value);
        set_country(value)
        text_input.value = "";
    }
});

// Api fetch and get information
function get_info(value :string): void{
    fetch(`http://api.weatherapi.com/v1/current.json?key=32a6b6eca54549f89fd105242232103&q=${value}&aqi=no`)
    .then((response) => response.json())
    .then((data) : void => {
        temp.textContent = data.current.temp_c;
        city.textContent = data.location.name;
        weather_status.textContent = data.current.condition.text;
        weather_photo.src = data.current.condition.icon;
        cloud.textContent = `${data.current.cloud}%`;
        humidity.textContent = `${data.current.humidity}%`;
        wind.textContent = `${data.current.wind_kph}km/h`;
        data.current.temp_c > 25?change_Background("sunny"):data.current.temp_c > 15?change_Background("storm"):change_Background("rain");
    })
};

// last country visit 
country.forEach((country_weather) : void => {
    country_weather.addEventListener('click',(): void => {
        get_info(country_weather.innerHTML);
    })
});

// change last country visit
function set_country(value: string): void {
    let i = 0;
    country_array.pop();
    country_array.unshift(value);
    country_array.forEach((val) => {
        country[i].innerHTML = val;
        i++;
    })
};

// change background image based on weather 
function change_Background(value: string): void{
    main_container.style.transition = "1s";
    main_container.style.background = `url('images/${value}.jpg')`;
    main_container.style.backgroundSize = "cover";
}
