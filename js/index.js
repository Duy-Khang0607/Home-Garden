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
var valueRain = 0;
var stateServo = false;
var valueServo = 0;
var stateLamp = false;
var valueLamp = 0;
var stateMotor = false;
var valueMotor = 0;
var valueTemp;
var valueSoil;

function dataFirebase(rain, servo, lamp, motor, temp, soil) {
  firebase.database().ref("Garden").set({
    rain,
    servo,
    lamp,
    motor,
    temp,
    soil,
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
    var soil = snap.val().soil;

    if (rain === 1) document.querySelector("#btnRain").click();

    if (lamp === 1) document.querySelector("#btnLight").click();

    if (servo === 1) document.querySelector("#btnServo").click();

    if (motor === 1) document.querySelector("#btnMotor").click();

    if (temp >= 100) temp = 10;
    if (soil >= 100) soil = 10;

    dataFirebase(rain, servo, lamp, motor, temp, soil);
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

function sensorSoil() {
  var doAm = document.getElementById("valueSoil");
  var dbRef = firebase.database().ref("Garden").child("soil");
  dbRef.on("value", (snap) => {
    doAm.innerText = snap.val();
    valueSoil = doAm.innerText;
    console.log(valueSoil);
  });
}

window.onload = () => {
  // sensorTemp();
  changeValueFirebase();
  sensorTemp();
  sensorSoil();
};

function sensorRain() {
  var imgRain1 = document.querySelector("#imgRain");
  var imgOn = "./img/rainOn.png";
  var imgOff = "./img/rainOff.png";
  stateRain = !stateRain;
  if (stateRain) {
    valueRain = 1;
    imgRain1.src = imgOn;
    imgRain1.style.animation = "rainOn 0.5s linear  infinite alternate";
    document.querySelector("#modeRain").innerHTML =
      `Rain` + `<ion-icon name="thunderstorm-outline" class="ml-1"></ion-icon>`;
    document.querySelector(".rain").style.opacity = "1";
  } else {
    valueRain = 0;
    imgRain1.src = imgOff;
    imgRain1.style.animation = "none";
    document.querySelector("#modeRain").innerHTML = "No rain";
    document.querySelector(".rain").style.opacity = "0";
  }
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor, valueTemp);
}

function motorServo() {
  // var servo = document.querySelector("#modeServo").innerHTML;
  stateServo = !stateServo;
  if (stateServo) {
    valueServo = 1;
    document.querySelector("#imgServo").style.transform = "rotate(30deg)";
    document.querySelector("#imgServo").style.animation =
      "rainOn 0.5s linear  infinite alternate";
    document.querySelector("#modeServo").innerHTML = "ON";
  } else {
    valueServo = 0;
    document.querySelector("#imgServo").style.transform = "rotate(0)";
    document.querySelector("#imgServo").style.animation = "none";
    document.querySelector("#modeServo").innerHTML = "OFF";
  }
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor, valueTemp);
}

function sensorLight() {
  var imgLight = document.querySelector("#imgLight");
  var imgOn = "./img/lampON.png";
  var imgOff = "./img/lampOFF.png";
  stateLamp = !stateLamp;
  if (stateLamp) {
    valueLamp = 1;
    imgLight.src = imgOn;
    document.querySelector("#modeLight").innerHTML =
      "Light" + `<ion-icon name="sunny-outline" class="ml-2"></ion-icon>`;
  } else {
    imgLight.src = imgOff;
    valueLamp = 0;
    document.querySelector("#modeLight").innerHTML = "Dark";
  }
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor, valueTemp);
}

function motorWater() {
  stateMotor = !stateMotor;
  if (stateMotor) {
    valueMotor = 1;
    document.querySelector("#imgMotor").style.transform = "rotate(30deg)";
    document.querySelector("#imgMotor").style.animation =
      "rainOn 0.5s linear  infinite alternate";
    document.querySelector("#modeMotor").innerHTML = "ON";
    document.querySelector(".motor").style.opacity = "1";
  } else {
    valueMotor = 0;
    document.querySelector("#imgMotor").style.transform = "rotate(0)";
    document.querySelector("#imgMotor").style.animation = "none";
    document.querySelector("#modeMotor").innerHTML = "OFF";
    document.querySelector(".motor").style.opacity = "0";
  }
  dataFirebase(valueRain, valueServo, valueLamp, valueMotor, valueTemp);
}

// Active sidebar
let list = document.querySelectorAll(".list");
let audio = document.querySelector("#audio");
for (let index = 0; index < list.length; index++) {
  list[index].onclick = () => {
    audio.play();
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
// let meunuBar = document.querySelector("#menuBar");
// meunuBar.onclick = () => {
//   sidebar.style.opacity = "1";
//   sidebar.style.width = "100px";
// };
