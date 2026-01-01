let input = document.getElementById("cityInput");
let btn = document.getElementById("searchBtn");
let wheInfo = document.getElementById("weatherInfo");
let h2 = document.createElement("h2");
let p = document.createElement("p")
let p1 = document.createElement("p")
wheInfo.append(h2, p, p1)
let cityName;
btn.addEventListener("click", () => {
    console.log("clicked")
    if (input.value === "") {
        // console.log("Plese enter the CityName");
        p.innerText = "Please Enter the city Name "
        h2.innerText = ""
        p1.innerText = ""
    }

    else {
        cityName = input.value
        // console.log(cityName);
        getWhether(cityName)
    }

})
async function getWhether(name) {
   try{
     if (name.trim().length < 3) {
        p.innerText = "Invalid City";
        h2.innerText = ""
        p1.innerText = ""
        return;
    }
    // console.log(`Fetching weather for: ${name}`);
    const apiKey = "93ad1227616860a71841c941b0e5ef4b";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;
    // console.log(url);

    p.innerText = "Loading..."
    h2.innerText = ""
    p1.innerText = ""
    const response = await fetch(url);
    const data = await response.json();

    if (Number(data.cod) !== 200) {
        p.innerText = "Invalid City";
        h2.innerText = ""
        p1.innerText = ""
        return;
    }
    const inputCity = name.trim().toLowerCase();
    const apiCity = data.name.toLowerCase();
    // console.log(data);

    if (!apiCity.includes(inputCity)) {
        p.innerText = "City not found";
        h2.innerText = "";
        p1.innerText = "";
        return;
    }
    else {
        h2.innerText = "City Name : " + data.name;
        p.innerText = "Temp. : " + data.main.temp;
        p1.innerText = "Description : " + data.weather[0].description;

    }

   }catch{
     p.innerText = "You are in Offline mode";
        h2.innerText = ""
        p1.innerText = ""
   }

}

