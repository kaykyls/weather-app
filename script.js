const cityInput = document.querySelector("#city")
const search = document.querySelector(".search")
const welcomeMessage = document.querySelector(".welcome")
const container = document.querySelector(".container")
const body = document.querySelector("body")
const loader = document.querySelector(".loader")

search.onclick = async e => {
    e.preventDefault()

    const city = cityInput.value
    cityInput.value = ""
    
    if(city !== ""){
        const data = await getWeatherData(city)
        viewWeatherData(data)
    }
}

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f3b6fa75211be57c1a5871e8ae9eecc5&lang=en`

    toggleLoader()
    const res = await fetch(url)
    const data = await res.json()
    toggleLoader()  

    return data
}

async function viewWeatherData(data) {
    if(data.cod === "404") {
        alert("Insira uma cidade válida")
        return
    }

    updateContainer()

    const weatherResultDiv = createDiv()
    weatherResultDiv.classList.add("weather-result")

    weatherResultDiv.querySelector(".city-name").innerText = `${data.name}`
    weatherResultDiv.querySelector(".weather-degrees").innerText = `${Number(data.main.temp).toFixed(1)}° C`
    weatherResultDiv.querySelector(".weather-condition-text").innerText = `${(data.weather[0].description).charAt(0).toUpperCase() + (data.weather[0].description).slice(1)}`
    weatherResultDiv.querySelector(".city img").src = `https://countryflagsapi.com/png/${data.sys.country}`
    weatherResultDiv.querySelector(".humidity").innerText = `${data.main.humidity}%`
    weatherResultDiv.querySelector(".wind").innerText = `${(data.wind.speed).toFixed(1)}km/h`
    weatherResultDiv.querySelector(".weather-icon").src = `./icons/${data.weather[0].icon}.svg`

    container.append(weatherResultDiv)    
}

function createDiv() {
    const div = document.createElement("div")

    div.innerHTML =
    `
        <div class="city">
            <i class="fa-solid fa-location-dot"></i><span class="city-name"></span><img id="contry-flag" src="" alt="Country Flag">
        </div>
        <div class="weather-condition">
            <img class="weather-icon" src="" alt="">
            <span class="weather-degrees"></span>
            <span class="weather-condition-text"></span>
        </div>
    
        <div class="details">
            <div class="details-humidity">
                <i class="fa-solid fa-droplet"></i>
                <span class="humidity"></span>
            </div>
            <div class="details-wind">
                <i class="fa-solid fa-wind"></i>
                <span class="wind"></span>
            </div>
        </div>
    `

    return div
}

function updateContainer() {
    welcomeMessage.remove()
    const div = container.querySelector(".weather-result")
    if(div !== null){
        div.remove()
    }
}

function toggleLoader() {
    loader.classList.toggle("hidden")
}