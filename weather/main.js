const baseURL = 'https://api.openweathermap.org/data/2.5/weather?&appid=241406506201158754a38a808ed674fb&units=metric';

const searchBox = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");
const display = document.querySelector(".weather");
const para = document.querySelector(".para");

const checkWeather = async(city)=>{
    const response = await fetch(baseURL + `&q=${city}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        // display.style.display = "none";
    }
    else{
    let data = await response.json();
    document.querySelector(".city").innerText= data.name;
    document.querySelector(".temp").innerText= Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText= data.main.humidity + "%";
    document.querySelector(".wind").innerText=data.wind.speed + " Km/h";
   
    if(data.weather[0].main === "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main === "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main === "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main === "Snow"){
        weatherIcon.src = "images/snow.png";
    }
    else if(data.weather[0].main === "Wind"){
        weatherIcon.src = "images/wind.png";
    }
    else if(data.weather[0].main === "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else{
        weatherIcon.src = "images/mist.png"; 
    }
    document.querySelector(".error").style.display = "none";
    // display.style.display = "block";
 }
}
searchBox.addEventListener("click", () =>{
    para.style.fontSize = "0px";
})
searchBox.addEventListener("change", ()=>{
    checkWeather(searchBox.value);
})