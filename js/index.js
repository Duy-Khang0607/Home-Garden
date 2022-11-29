const firebaseConfig = {
  apiKey: "AIzaSyCQuGR-TLofY3cknj9hxV30Cgl9lUXCBE8",
  authDomain: "home-garden-7da60.firebaseapp.com",
  databaseURL: "https://home-garden-7da60-default-rtdb.firebaseio.com",
  projectId: "home-garden-7da60",
  storageBucket: "home-garden-7da60.appspot.com",
  messagingSenderId: "764448158497",
  appId: "1:764448158497:web:d7d0cabd295ecec1324460",
  measurementId: "G-6D4P013Z6J",
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
var valueTemp;

function dataFirebase(rain, servo, lamp, motor, temp) {
  firebase.database().ref("Garden").set({
    rain,
    servo,
    lamp,
    motor,
    temp,
  });
}

function changeValueFirebase() {
  var database = firebase.database();
  database.ref("Garden").on("value", (snap) => {
    var rain = snap.val().rain;
    var servo = snap.val().servo;
    var lamp = snap.val().lamp;
    var motor = snap.val().motor;
    var temp = snap.val().temp;

    if (rain === "ON") document.querySelector("#btnRain").click();

    if (lamp === "ON") document.querySelector("#btnLight").click();

    if (servo === "ON") document.querySelector("#btnServo").click();

    if (motor === "ON") document.querySelector("#btnMotor").click();

    if (temp >= 100) temp = 10;

    dataFirebase(rain, servo, lamp, motor, temp);
  });
}

function sensorTemp() {
  var nhietDo = document.getElementById("valueTemperature");
  var dbRef = firebase.database().ref("Garden").child("temp");
  dbRef.on("value", (snap) => {
    nhietDo.innerText = snap.val();
    valueTemp = nhietDo.innerText;
    console.log(valueTemp);
  });
}

window.onload = () => {
  // sensorTemp();
  changeValueFirebase();
  sensorTemp();
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
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor, valueTemp);
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
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor, valueTemp);
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
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor, valueTemp);
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
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor, valueTemp);
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

// Menu bar
let meunuBar = document.querySelector("#menuBar");
meunuBar.onclick = () => {
  sidebar.style.opacity = "1";
  sidebar.style.width = "100px";
};
