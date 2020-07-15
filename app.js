window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let icons = document.querySelector(".icons");
  let windSpeed = document.querySelector(".wind-speed");
  let feelsLike = document.querySelector(".feels-like");

  //Grabbing users location//
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const key = "4d6bdb6aba895a9ca3db4b8734af690f";
      console.log(position);
      let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

      //Storing API data into variables//
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const wind = data.wind.speed * 3.6;
          const tempDescription = data.weather[0].description;
          const feelLikeTemp = data.main.feels_like;

          //Storing further API data for variables to use in functions below//
          temperatureDegree.textContent = Math.floor(temp) + " C";
          locationTimezone.textContent = data.name + ", " + data.sys.country;
          temperatureDescription.textContent = tempDescription;
          windSpeed.textContent = `Wind: ${Math.floor(wind)} km/h`;
          feelsLike.textContent = `Feels like: ${Math.floor(feelLikeTemp)} C`;

          //When user clicks on weather info, further data is displayed//
          document.getElementById("temperature").onclick = function () {
            humidity(), clouds(), sunSetRise(), infoDots(), infoDots2();
          };

          function humidity() {
            if (temperatureDescription.textContent === tempDescription) {
              temperatureDescription.textContent = `Humidex: ${data.main.humidity}%`;
            } else {
              temperatureDescription.textContent = tempDescription;
            }
          }

          function clouds() {
            if (
              feelsLike.textContent ===
              `Feels like: ${Math.floor(feelLikeTemp)} C`
            ) {
              feelsLike.textContent = `Cloud Coverage: ${data.clouds.all}%`;
            } else {
              feelsLike.textContent = `Feels like: ${Math.floor(
                feelLikeTemp
              )} C`;
            }
          }

          //formats unix into local sunset/sunrise time//
          function sunSetRise() {
            if (windSpeed.textContent === `Wind: ${Math.floor(wind)} km/h`) {
              windSpeed.textContent =
                "Sunrise: " +
                formattedTime +
                "AM " +
                "|" +
                " Sunset: " +
                formattedTime2 +
                "PM";
            } else {
              windSpeed.textContent = `Wind: ${Math.floor(wind)} km/h`;
            }
          }

          //converting unix to local sunrise time//
          const unixTime = data.sys.sunrise;
          const date = new Date(unixTime * 1000);
          const hours = date.getHours();
          const minutes = "0" + date.getMinutes();
          const formattedTime = hours + ":" + minutes.substr(-2);

          console.log(formattedTime);

          const unixTime2 = data.sys.sunset;
          const date2 = new Date(unixTime2 * 1000);
          const hours2 = date2.getHours() - 12;
          const minutes2 = "0" + date2.getMinutes();
          const formattedTime2 = hours2 + ":" + minutes2.substr(-2);

          console.log(formattedTime2);

          //Changes icon in location container and background when live weather changes//
          icons.innerHTML = `<img src="${data.weather[0].icon}.png"/>`;
          document.getElementById(
            "background"
          ).style.backgroundImage = `url(${data.weather[0].main}.jpg)`;

          function infoDots() {
            if (temperatureDescription.textContent === tempDescription) {
              document.getElementById("dot1").style.backgroundColor = "black";
            } else {
              document.getElementById("dot1").style.backgroundColor =
                "rgb(211, 211, 211)";
            }
          }

          function infoDots2() {
            if (temperatureDescription.textContent === tempDescription) {
              document.getElementById("dot2").style.backgroundColor =
                "rgb(211, 211, 211)";
            } else {
              document.getElementById("dot2").style.backgroundColor = "black";
            }
          }
        });
    });
  }
});
