const display = document.getElementById("display");
const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");
// console.log(buttons);

// for calculator
const array = Array.from(buttons);
let string = "";
let string2 = "";
array.map((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML === "=") {
      let string2 = string;
      string = eval(string).toFixed(2);
      result.value = string;
      addCalculation(string2, result.value);
    } else if (e.target.innerHTML == "AC") {
      string = "";
      result.value = "";
      display.value = string;
      localStorage.clear();
    } else if (e.target.innerHTML == "C") {
      string = string.substring(0, string.length - 1);
      display.value = string;
    } else {
      string += e.target.innerHTML;
      display.value = string;
    }
  });
});

// for date
const today = new Date();
// console.log(today);
const date = `${today.getDate()}-${
  today.getMonth() + 1
}-${today.getFullYear()}`;
document.getElementById("date").innerHTML = date;

// for time
const todaytime = () => {
  const today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let seconds = today.getSeconds();
  let result;
  if (hour > 12) {
    hour = hour - 12;
    result = "PM";
  } else {
    result = "AM";
  }
  const todaytime = `${formateTime(hour)}:${formateTime(minute)}:${formateTime(
    seconds
  )} ${result}`;

  document.getElementById("time").innerHTML = todaytime;
};
const formateTime = (time) => {
  return time < 10 ? `0${time}` : time;
};
setInterval(todaytime, 1000);

// for history
const history = [];

function addCalculation(expression, result) {
  history.push({
    expression,
    result,
  });
  localStorage.setItem("history", JSON.stringify(history));
}

function showHistory() {
  const data = JSON.parse(localStorage.getItem("history"));
  for (const calculation of data) {
    const expression = calculation.expression;
    const result = calculation.result;
    const output = `${expression} = ${result}`;
    document.getElementById("history").innerHTML += output + "<br>";
  }
}

// for popup
const historybtn = document.getElementById("historybtn");
const close = document.getElementById("close");
const popup = document.querySelector(".popup-container");

historybtn.addEventListener("click", () => {
  popup.classList.add("active");
  document.getElementById("history").innerHTML = "";
  showHistory();
});
close.addEventListener("click", () => {
  popup.classList.remove("active");
});
