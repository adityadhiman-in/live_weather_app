const apiKey = "d7bbd99814ff70b919e460c8bafcd929";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// Function to fetch weather data
async function getWeatherData(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();

        // Process the weather data here...
        document.querySelector(".weather h1.temp").innerHTML = data.main.temp + "° C";
        document.querySelector(".weather h2.temp").innerHTML = data.name;
        document.querySelector(".details .humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".details .wind").innerHTML = (data.wind.speed * 3.6).toFixed(2) + " km/h";
        
        const weatherCondition = data.weather[0].main;
        const weatherIcon = document.querySelector(".weather i");
        
        if (weatherCondition === "Clouds") {
            weatherIcon.className = "ri-cloud-line";
        } else if (weatherCondition === "Clear") {
            weatherIcon.className = "ri-sun-fill";
        } else if (weatherCondition === "Rain") {
            weatherIcon.className = "ri-rain-fill";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.className = "ri-drizzle-fill";
        } else if (weatherCondition === "Mist") {
            weatherIcon.className = "ri-mist-line";
        } else {
            weatherIcon.className = "ri-sun-fill";
        }


    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        // Clear previous data and show error message
        document.querySelector(".weather i").className = "ri-error-warning-line";
        document.querySelector(".weather h1.temp").innerHTML = "N/A";
        document.querySelector(".weather h2.temp").innerHTML = "City not found";
        document.querySelector(".details .humidity").innerHTML = "N/A";
        document.querySelector(".details .wind").innerHTML = "N/A";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".search button");
    const searchInput = document.querySelector(".search input");

    searchButton.addEventListener("click", () => {
        const city = searchInput.value;
        if (city) {
            getWeatherData(city);
        }
    });

    searchInput.addEventListener("keydown", (event) => {
        const city = searchInput.value;
        if (city && event.key === "Enter") {
            getWeatherData(city);
        }
    });
    

    // Initial call to fetch weather data for a default city
    getWeatherData("New Delhi");
});
