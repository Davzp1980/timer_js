import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const iziToastOptions = {
  message: "Timer is stopped",
  position: "topCenter",
  backgroundColor: "#09f7a7",
};

const inputElem = document.querySelector(".timer-text");

let initTime;

const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const setBtn = document.querySelector(".set-btn");
const formElem = document.querySelector(".input-time");

let timerId;
let intervalId;

startBtn.disabled = true;
stopBtn.disabled = true;
startBtn.classList.add("disabled");
stopBtn.classList.add("disabled");

formElem.addEventListener("submit", (e) => {
  e.preventDefault();
  const hours = formElem.elements.hours.value;
  const minutes = formElem.elements.minutes.value;
  const seconds = formElem.elements.seconds.value;
  inputElem.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  initTime = convertFromHMS(hours, minutes, seconds);
  if (initTime === 0) {
    startBtn.disabled = true;
    startBtn.classList.add("disabled");
  } else {
    startBtn.disabled = false;
    startBtn.classList.remove("disabled");
  }

  formElem.reset();
});

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  startBtn.classList.add("disabled");
  setBtn.disabled = true;
  stopBtn.disabled = false;
  stopBtn.classList.remove("disabled");

  timerId = setInterval(() => {
    initTime -= 1000;
    let time = convertMs(initTime);

    inputElem.textContent = `${time.hours
      .toString()
      .padStart(2, "0")}:${time.minutes
      .toString()
      .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;

    if (initTime < 999) {
      clearTimeout(timerId);
      setBtn.disabled = false;
      iziToast.show(iziToastOptions);
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearTimeout(timerId);

  setBtn.disabled = false;
  stopBtn.disabled = true;
  stopBtn.classList.add("disabled");
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function convertFromHMS(h = 0, m = 0, s = 0) {
  return h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;
}

function soundClick() {
  var audio = new Audio();
  audio.src = soundFile;
  audio.autoplay = true;
}
