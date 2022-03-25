"use strict";

const getLocation = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// const btnGetWeather = document.querySelector(".btn-get-weather");

const inputCityName = document.querySelector("#input-city-name");

const checkboxGetLocation = document.querySelector("#input-location-access");

// clear checkbox on city name input

inputCityName.addEventListener("change", (e) => {
  if (this.value !== "") checkboxGetLocation.checked = false;
});

// get location on checkbox "checked" and clear input city name field
checkboxGetLocation.addEventListener("change", async (e) => {
  if (e.target.checked) {
    if (inputCityName.value !== "") inputCityName.value = "";

    try {
      const coords = await getLocation();

      const [lat, lng] = [coords.coords.latitude, coords.coords.longitude];

      checkboxGetLocation.value = `${lat},${lng}`;
    } catch (e) {
      console.log(e, "Could not get location.");
    }
  }
});
