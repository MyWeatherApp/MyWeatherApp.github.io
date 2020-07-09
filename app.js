window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let icons = document.querySelector(".icons");
  let windSpeed = document.querySelector(".wind-speed");
  let feelsLike = document.querySelector(".feels-like");
  let backgroundImage = document.querySelector("#background");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const key = "4d6bdb6aba895a9ca3db4b8734af690f";
      console.log(position);
      let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const wind = data.wind.speed * 3.6;
          temperatureDegree.textContent = Math.floor(temp) + " C";
          locationTimezone.textContent = data.name + ", " + data.sys.country;
          temperatureDescription.textContent = data.weather[0].description;
          windSpeed.textContent = `${Math.floor(wind)} km/h`;
          feelsLike.textContent =
            "(Feels like: " + Math.floor(data.main.feels_like) + " C)";

          icons.innerHTML = `<img src="icons/${data.weather[0].icon}.png"/>`;
          document.getElementById(
            "background"
          ).style.backgroundImage = `"url(background/${data.weather[0].main}.jpg)"`;
        });
    });
  }
});
