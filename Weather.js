const apiKey="3c20e42f6d5af0aae4928868b64ced1b";
const weatherForm=document.querySelector(`.weatherForm`);
const cityInput=document.querySelector(`.cityInput`);
const card=document.querySelector(`.conteinar`);


weatherForm.addEventListener("submit", async event=>{
    const city=cityInput.value;
    event.preventDefault();

    if(city){
        try{
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){

        }
    }
})
async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    const response=await fetch(apiUrl);
    
    const data= await response.json();

    return data;
    
    


}
function displayWeatherInfo(data){
    const name=data.name;
    const temp=data.main.temp;
    const humidity=data.main.humidity;
    const description=data.weather[0].description;
    const id=data.weather[0].id;
    

    card.textContent=" ";

    const nameDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humditiyDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    nameDisplay.textContent=name;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)} °C `;
    humditiyDisplay.textContent=`Humidity:${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);

    nameDisplay.classList.add("cityName");
    tempDisplay.classList.add("tempDisplay");
    humditiyDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
   

    card.appendChild(nameDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humditiyDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    
}
function getWeatherEmoji(id){
    switch(true){
        case(id>=200 && id<300):
            return "⛈️";
        case (id>=300 && id<400):
            return "🌧️";
        case (id>=500 && id<600):
            return "🌧️";
        case (id>=600 && id<700):
            return "❄️";
        case (id>=700 && id<800):
            return "🌫️";
        case (id===800):
            return "☀️";
        case (id>=801 && id<810):
            return "☁️";

    }
}


