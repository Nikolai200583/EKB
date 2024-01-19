"use strict";
const setedMonth = document.querySelector(".setedMonth");
const setedYear = document.querySelector(".setedYear");
const nextButton = document.querySelector(".date-control__button_next");
const previousButton = document.querySelector(".date-control__button_previous");

const setMonth = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const setWeek = [
  "Понедельник ",
  "Вторник ",
  "Среда ",
  "Четверг ",
  "Пятница ",
  "Суббота ",
  "Воскресенье ",
];

const date = new Date();
let getMonth = date.getMonth();
let getYear = date.getFullYear();
let numberDay = date.getDate();
let indexDay = 0;
setedMonth.textContent = setMonth[getMonth];
setedYear.textContent = getYear;
createCalendar(calendar, getYear, getMonth);

nextButton.addEventListener("click", () => {
  if (getMonth >= 11) {
    getMonth = -1;
    getYear++;
  }
  getMonth++;
  setedMonth.textContent = setMonth[getMonth];
  setedYear.textContent = getYear;
  createCalendar(calendar, getYear, getMonth);
  indexDay = 0;
  setAtribute();
});

previousButton.addEventListener("click", () => {
  if (getMonth <= 0) {
    getMonth = 12;
    getYear--;
  }
  getMonth--;
  setedMonth.textContent = setMonth[getMonth];
  setedYear.textContent = getYear;
  createCalendar(calendar, getYear, getMonth);
  indexDay = 0;
  setAtribute();
});

function createCalendar(elem, year, month) {
  let d = new Date(year, month);
  let table = "<table><tr>";
  for (let i = 0; i < getDay(d); i++) {
    table +=
      '<td class ="containerDay" >' +
      '<div class ="dayBox"><span class ="weekDay"></span></div>' +
      "</td>";
  }
  while (d.getMonth() === month) {
    table +=
      '<td class ="containerDay">' +
      '<div class ="dayBox"><span class ="weekDay"></span>' +
      "<span>" +
      d.getDate() +
      "</span></div>" +
      "</td>";
    if (getDay(d) % 7 === 6) {
      table += "</tr><tr>";
    }
    d.setDate(d.getDate() + 1);
  }

  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += '<td class ="containerDay"></td>';
    }
  }
  table += "</tr></table>";
  elem.innerHTML = table;
  setAtribute();
  setFocus();
  isToday();
}

function getDay(date) {
  let day = date.getDay();
  if (day === 0) day = 7;
  return day - 1;
}

function setAtribute() {
  const dayBox = document.querySelectorAll(".weekDay");
  let count = 0;
  for (const elem of dayBox) {
    elem.textContent = setWeek[count];
    if (count >= 6) {
      return;
    }
    count++;
  }
}

function setFocus() {
  const containerDay = document.querySelectorAll(".containerDay");
  indexDay = 0;
  for (const elem of containerDay) {
    indexDay++;
    elem.setAttribute("data-day", indexDay);
    elem.addEventListener("click", () => {
      let isActive = elem.classList.contains("focus");
      !isActive ? elem.classList.add("focus") : elem.classList.remove("focus");
    });
  }
}

function isToday() {
  const today = document.querySelector(".date-control__button_today");
  const containerDay = document.querySelectorAll(".containerDay");
  today.addEventListener("click", () => {
    for (const elem of containerDay) {
      if (elem.getAttribute("data-day") == numberDay) {
        elem.classList.add("focus");
      }
    }
  });
}
