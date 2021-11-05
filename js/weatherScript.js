"use strict"
const tempValue = document.querySelector("#temp-value");
const setting = document.querySelector(".setting");
const settings = document.querySelector(".settings");
const settingsClose = document.querySelector("#settings-close");

document.querySelector("#city").value = localStorage.getItem("city")
if (!localStorage.getItem("city")) {
  localStorage.setItem("city", "Moscow")
  document.querySelector("#city").value = localStorage.getItem("city")
}
if (!localStorage.getItem("country")) {
  localStorage.setItem("country", "RU")
}
// settings
document.addEventListener("click", function(event) {
  if (event.target.closest("#settings-close")) {
    settings.classList.toggle("open")
  }
})
setting.addEventListener("click", function(event) {
  settings.classList.toggle("open")
})
document.addEventListener("click", function(event) {
  if (event.target.closest("#save")) {
    setWeather()
    getWeather()
    settings.classList.toggle("open")
  }
})
function setWeather() {
  if (document.querySelector("#country").value != "select country") {
    localStorage.setItem("country", document.querySelector("#country").value)
  } else {return}
  if (document.querySelector("#city").value) {
    localStorage.setItem("city", document.querySelector("#city").value)
  } else {return}
}
function getWeather() {
  let citiesArr;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/assets/citylist.json")
  xhr.responseType = "json";
  xhr.send()
  xhr.onload = function() {
    citiesArr = xhr.response;
    let prms = new Promise((resolve, reject) => {
      let undefnd = true
      for (let item = 0; item < citiesArr.length; item++) {
        if (citiesArr[item].name === localStorage.getItem("city") && citiesArr[item].country === localStorage.getItem("country")) {
          fetch(`http://api.openweathermap.org/data/2.5/weather?id=${citiesArr[item].id}&appid=272d267ea4c0034b91826d86103da26f`)
          .then(function(resp) {return resp.json()})
          .then(function(data) {
            console.log(data);
            tempValue.textContent = `${Math.round(data.main.temp - 273)}`
            undefnd = false
            console.log("промис выполнился")
          })
        }
      }
      setTimeout(() => {
        resolve(undefnd)
      }, 300);
    })
      prms.then((result) => {
        console.log("then выполнился");
        if (result) {
          let warning = document.createElement("div")
          warning.className = "warning";
          warning.textContent = "City not found";
          document.body.prepend(warning)
          setTimeout(() => {
            document.querySelector(".warning").style.opacity = "0"
            setTimeout(() => {
              document.querySelector(".warning").remove()
            },500)
          }, 1500);
        }
      })
      // if (item.name === localStorage.getItem("city") && item.country === localStorage.getItem("country")) {
      //   let prms = new Promise(function(resolve, reject) {
      //     fetch(`http://api.openweathermap.org/data/2.5/weather?id=${item.id}&appid=272d267ea4c0034b91826d86103da26f`)
      //     .then(function(resp) {return resp.json()})
      //     .then(function(data) {
      //       console.log(data);
      //       tempValue.textContent = `${Math.round(data.main.temp - 273)}`
      //       undefnd = false
      //       console.log("промис выполнился");
      //       resolve()
      //     })   
      //   }).then((resolve) => {
      //       console.log("then выполнился");
      //       if (undefnd) {
      //       let warning = document.createElement("div")
      //       warning.className = "warning";
      //       warning.textContent = "City not found";
      //       document.body.prepend(warning)
      //       setTimeout(() => {
      //         document.querySelector(".warning").style.opacity = "0"
      //         setTimeout(() => {
      //           document.querySelector(".warning").remove()
      //         },500)
      //       }, 1500);
      //     }
      //   })
      // }
  }
}

getWeather()