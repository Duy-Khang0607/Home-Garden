const firebaseConfig = {
  apiKey: "AIzaSyAI02jDK0PAPNvDyLkPYYpePxk7LKQPOso",
  authDomain: "home-garden-32525.firebaseapp.com",
  projectId: "home-garden-32525",
  storageBucket: "home-garden-32525.appspot.com",
  messagingSenderId: "638896422279",
  appId: "1:638896422279:web:74e1ac3ed1cc2afb096722",
  measurementId: "G-XJZZ5L5D77",
};
firebase.initializeApp(firebaseConfig);
// -------------------------------------------

var stateRain = false;
var valueRain = "OFF";
var stateServo = false;
var valueServo = "OFF";
var stateLamp = false;
var valueLamp = "OFF";
var stateMotor = false;
var valueMotor = "OFF";
// var stateSoil = true;
// var valueSoil = 10;

function dataFirebase(Rain, servo, lamp, motor) {
  firebase.database().ref("Garden").set({
    Rain,
    servo,
    lamp,
    motor,
  });
  console.log(Rain);
}

firebase
  .database()
  .ref("Garden")
  .on("value", (snap) => {
    snap.forEach((element) => {
      console.log(element.val() === "ON");
      if (element.val() === "ON") {
        document.querySelector(".check").style.background = "red";
      }
    });
  });

// va = firebase
//   .database()
//   .ref("Garden")
//   .child("soil")
//   .on("value", (snap) => {
//     if (snap.val() >= 100) {
//       stateSoil = false;
//       valueSoil = 100;
//     } else {
//       stateSoil = true;
//       valueSoil = snap.val();
//       console.log(valueSoil);
//     }
//   });

// function sensorSoil() {
//   var valueSensorSoil = document.querySelector("#valueSoil");
//   if (stateSoil) {
//     valueSensorSoil.innerHTML = valueSoil;
//   } else {
//     valueSensorSoil.innerHTML = "100";
//   }
//   dataFirebase(valueRain, valueServo, valueLamp, valueMotor, va/ }

window.onload = () => {
  // sensorSoil();
};

function sensorRain() {
  var imgRain1 = document.querySelector("#imgRain");
  var imgOn = "./img/rainOn.png";
  var imgOff = "./img/rainOff.png";
  stateRain = !stateRain;
  if (stateRain) {
    valueRain = "ON";
    imgRain1.src = imgOn;
    imgRain1.style.animation = "rainOn 0.5s linear  infinite alternate";
    document.querySelector("#modeRain").innerHTML =
      `Có mưa` +
      `<ion-icon name="thunderstorm-outline" class="ml-1"></ion-icon>`;
    document.querySelector(".rain").style.opacity = "1";
  } else {
    valueRain = "OFF";
    imgRain1.src = imgOff;
    imgRain1.style.animation = "none";
    document.querySelector("#modeRain").innerHTML = "Không mưa";
    document.querySelector(".rain").style.opacity = "0";
  }
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor);
}

function motorServo() {
  // var servo = document.querySelector("#modeServo").innerHTML;
  stateServo = !stateServo;
  if (stateServo) {
    valueServo = "ON";
    document.querySelector("#imgServo").style.transform = "rotate(30deg)";
    document.querySelector("#imgServo").style.animation =
      "rainOn 0.5s linear  infinite alternate";
    document.querySelector("#modeServo").innerHTML = "ON";
  } else {
    valueServo = "OFF";
    document.querySelector("#imgServo").style.transform = "rotate(0)";
    document.querySelector("#imgServo").style.animation = "none";
    document.querySelector("#modeServo").innerHTML = "OFF";
  }
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor);
}

function sensorLight() {
  stateLamp = !stateLamp;
  if (stateLamp) {
    valueLamp = "ON";
    document.querySelector("#modeLight").innerHTML = "Trời sáng: 1";
  } else {
    valueLamp = "OFF";
    document.querySelector("#modeLight").innerHTML = "Trời tối: 0";
  }
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor);
}

function motorWater() {
  stateMotor = !stateMotor;
  if (stateMotor) {
    valueMotor = "ON";
    document.querySelector("#imgMotor").style.transform = "rotate(30deg)";
    document.querySelector("#imgMotor").style.animation =
      "rainOn 0.5s linear  infinite alternate";
    document.querySelector("#modeMotor").innerHTML = "ON";
  } else {
    valueMotor = "OFF";
    document.querySelector("#imgMotor").style.transform = "rotate(0)";
    document.querySelector("#imgMotor").style.animation = "none";
    document.querySelector("#modeMotor").innerHTML = "OFF";
  }
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor);
}

// Active sidebar
let list = document.querySelectorAll(".list");
for (let index = 0; index < list.length; index++) {
  list[index].onclick = () => {
    let j = 0;
    while (j < list.length) {
      list[j++].className = "list";
    }
    list[index].className = "list active";
  };
}

// Toggle
let menuToggle = document.querySelector(".toggle");
let sidebar = document.querySelector(".sidebar");
menuToggle.onclick = () => {
  menuToggle.classList.toggle("active");
  sidebar.classList.toggle("active");
};