"use strict"
const question = document.querySelector(".question")
const time = document.querySelector(".time");
const welcome = document.querySelector(".welcome")
const container = document.querySelector(".container")
const containerContent = document.querySelector(".container-content")
const preload = document.querySelector(".preload");

window.onload = function() {
  preload.style.opacity = "0";
  preload.style.zIndex = "0"
}
//func
function changeTime() {
  setTimeout(() => {
    let date = new Date(Date.now())
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }
    time.textContent = `${hour}:${minute}:${second}`
    changeTime()
  }, 1000)
}
function changeQuestion() {
  const arrQuestions = ["How are your?", "What are your plans for the day?",
  "Have a nice day!", "Have a nice day!", "Good luck!", "We always think that there will be enough time. And then it ends.",
  "If you want guarantees - buy a toaster!", "Failure is an opportunity to learn something new.",
  "Cake is a lie!", "Knowledge is power.", "Born to crawl, cannot fall!", "Need more gold!"]
  question.querySelector("#question-text").textContent = arrQuestions[Math.round(0 + Math.random() * (arrQuestions.length-1 - 0))];
}
function cheakTimeChangeBackground() {
  let date = new Date(Date.now())
  if (date.getHours() >= 0 && date.getHours() <= 5) {
    container.style.backgroundImage = `url(img/background4.jpg)`
    containerContent.style.color = "white";
    question.style.borderBottom = `3px solid white`;
    welcome.querySelector("#welcome-text").innerHTML = `Good&nbsp;night`
    document.querySelector(".setting").querySelector("svg").style.fill = "white";
    document.querySelector(".temp").style.color = "white";
  }
  if (date.getHours() > 5 && date.getHours() < 12) {
    container.style.backgroundImage = `url(img/background1.jpg)`
    containerContent.style.color = "white";
    question.style.borderBottom = `2px solid white`;
    welcome.querySelector("#welcome-text").innerHTML = `Good&nbsp;morning`
    document.querySelector(".setting").querySelector("svg").style.fill = "white";
    document.querySelector(".temp").style.color = "white";
  }
  if (date.getHours() >= 12 && date.getHours() < 18) {
    container.style.backgroundImage = `url(img/background2.jpg)`
    containerContent.style.color = "rgb(7, 35, 39)";
    question.style.borderBottom = `3px solid rgb(7, 35, 39)`;
    welcome.querySelector("#welcome-text").innerHTML = `Good&nbsp;afternoon`;
    document.querySelector(".setting").querySelector("svg").style.fill = "rgb(7, 35, 39)";
    document.querySelector(".temp").style.color = "rgb(7, 35, 39)";
  }
  if (date.getHours() >= 18 && date.getHours() <= 23) {
    container.style.backgroundImage = `url(img/background3.jpg)`
    containerContent.style.color = "white";
    question.style.borderBottom = `2px solid white`;
    welcome.querySelector("#welcome-text").innerHTML = `Good&nbsp;evening`
    document.querySelector(".setting").querySelector("svg").style.fill = "white";
    document.querySelector(".temp").style.color = "white";
  }
}
function setName() {
  if (localStorage.getItem("userName") === null) {
    welcome.querySelector("#name").textContent = "[name]";
  } else {
    welcome.querySelector("#name").textContent = `${localStorage.getItem("userName")}`;
  }
}
function getName() {
  localStorage.setItem("userName", welcome.querySelector("#name").textContent)
  welcome.querySelector("#name").setAttribute("contenteditable", "false")
  welcome.querySelector("#name").setAttribute("contenteditable", "true")
}
// events
document.addEventListener("keydown", function(event) {
  if (event.code == "Enter") {
    getName()
  }
})
welcome.querySelector("#name").addEventListener("blur", function(event) {
  getName()
})
// start func's
changeTime();
setName()
cheakTimeChangeBackground()
changeQuestion()