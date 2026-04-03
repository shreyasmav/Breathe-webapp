const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

let intervalId = null;
let breatheTimeout = null;
let holdTimeout = null;
let paused = false;

function breathAnimation() {
  text.innerText = "Breathe In!";
  container.className = "container grow";

  breatheTimeout = setTimeout(() => {
    text.innerText = "Hold";

    holdTimeout = setTimeout(() => {
      text.innerText = "Breathe Out!";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

function start() {
  breathAnimation();
  intervalId = setInterval(breathAnimation, totalTime);
}

function stop() {
  clearInterval(intervalId);
  clearTimeout(breatheTimeout);
  clearTimeout(holdTimeout);
  intervalId = null;
}

container.addEventListener("click", () => {
  if (paused) {
    paused = false;
    container.classList.remove("paused");
    start();
  } else {
    paused = true;
    container.classList.add("paused");
    container.className = "container paused";
    text.innerText = "Paused (click to resume)";
    stop();
  }
});

start();
