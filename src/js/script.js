document.addEventListener("DOMContentLoaded", () => {
  // get current year for display on footer section
  const currentYearElement = document.getElementById("currentYear");
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;

  // add event when click course option
  const courseOption = document.querySelectorAll("ul.course-option li");

  courseOption.forEach((e) => {
    e.addEventListener("click", function () {
      courseOption.forEach((cOpt) => cOpt.classList.remove("course-active")); // remove  all the classes from each element in array
      this.classList.add("course-active"); // add active class on button clicked
    });
  });

  // date of week
  const originalDate = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // get each of element
  const monthOfWeek = document.querySelectorAll(".month");
  const dayOfWeek = document.querySelectorAll(".day");
  const dateOfWeek = document.querySelectorAll(".date");

  // get currentDate with param originalDate(now) to ensure that each calculated date starts from the same start date
  const manipulationDate = new Date(originalDate);
  const daysInWeek = 7;
  const dateBadge = document.querySelectorAll(".date-badge");
  const currentDate = new Date(manipulationDate);
  const optionWeeks = document.querySelector(".weekOption");
  const minWeekDate = new Date(currentYear, 1, 11);
  const getWeek = function () {
    const firstDayOfYear = new Date(minWeekDate);
    const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000; // 86400000 ms in a day
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // for each per week
  // get param dateElement & index, where the index start from 0 to 6
  dateOfWeek.forEach((dateElement, index) => {
    const startOfWeek = new Date(); //set date, when week start from sun

    // what a day of the week is it now like mon is day-1. cause start from 0
    const dayOfWeekStart = startOfWeek.getDay();
    console.log(`current date : ${manipulationDate.getDate()}`);
    console.log(`dayOfWeekStart : day ${dayOfWeekStart}`);

    // set date of week from current date like (13) - 1
    startOfWeek.setDate(manipulationDate.getDate() - dayOfWeekStart);

    console.log(
      `current week date = manipulationDate - dayOfWeekStart = startOfWeek.getDate()`
    );
    console.log(
      `current week date : ${manipulationDate.getDate()} - ${dayOfWeekStart} = ${startOfWeek.getDate()}`
    );

    // for forward to next week when value of index more than equal to 7
    if (index >= daysInWeek) {
      startOfWeek.setDate(manipulationDate.getDate() + daysInWeek); // forward to next week
    }

    // get dayName for manipulationDate from array dayNames
    // like dayNames[0 == "sun"];
    const day = dayNames[index];
    // get monthName for manipulationDate from array monthNames
    // like monthNames[5 == "May"];
    const month = monthNames[manipulationDate.getMonth()];
    // get date where date is start from date per week like 12 is sun
    const date = startOfWeek.getDate();
    console.log(date);
    console.log("");

    // set textContent for each element
    dateElement.textContent = date;
    dayOfWeek[index].textContent = day;
    monthOfWeek[index].textContent = month;

    console.log(originalDate.getDate());
    console.log(date);
    console.log(originalDate.getDate() == date);
    console.log(originalDate.getMonth() == startOfWeek.getMonth());
    console.log(
      originalDate.getDate() == date &&
        originalDate.getMonth() == startOfWeek.getMonth()
    );
    // add class active for today
    if (
      originalDate.getDate() == date &&
      originalDate.getMonth() == startOfWeek.getMonth()
    ) {
      dateBadge[index].classList.add("date-active");
    } else {
      dateBadge[index].classList.remove("date-active");
    }

    // set manipulationDate to get date per week
    manipulationDate.setDate(manipulationDate.getDate() + 1);
    optionWeeks.textContent = `Week ${getWeek()}`;
  });

  // EVENT CHOOSE WEEK
  const prevWeek = document.getElementById("prevWeek");
  const nextWeek = document.getElementById("nextWeek");

  // for restart current date to prev week
  manipulationDate.setDate(manipulationDate.getDate() - 1);

  function changeWeek() {
    console.log(manipulationDate);

    dateOfWeek.forEach((dateElement, index) => {
      // Update each day's date, day name, and month name
      const day = dayNames[index];
      const month = monthNames[manipulationDate.getMonth()];
      const date = manipulationDate.getDate();

      // for if date more than minWeekDate
      if (manipulationDate < minWeekDate) {
        manipulationDate.setDate(minWeekDate.getDate());
      }

      dateElement.textContent = date;
      dayOfWeek[index].textContent = day;
      monthOfWeek[index].textContent = month;

      // add class active for today
      if (
        originalDate.getDate() == date &&
        originalDate.getMonth() == manipulationDate.getMonth()
      ) {
        dateBadge[index].classList.add("date-active");
      } else {
        dateBadge[index].classList.remove("date-active");
      }

      // Move to the next day
      manipulationDate.setDate(manipulationDate.getDate() + 1);
    });
  }

  let previousValue = 0; // To store the previous value
  let currentValue = getWeek(); // To store the current value
  console.log(`currentValue : ${currentValue}`);

  prevWeek.addEventListener("click", function () {
    previousValue = currentValue;
    currentValue -= 1;
    currentValue = currentValue == 0 ? currentValue + 1 : currentValue;

    optionWeeks.textContent = `Week ${currentValue}`;
    console.log(previousValue);
    console.log(currentValue);

    if (currentValue < previousValue) {
      manipulationDate.setDate(manipulationDate.getDate() - 14);
      console.log(manipulationDate);
      nextWeek.style.display = "block";
      changeWeek();
    }
    prevWeek.style.display = currentValue == 1 ? "none" : "block";
  });

  nextWeek.addEventListener("click", function () {
    console.log(true);
    previousValue = currentValue;
    currentValue += 1;

    if (currentValue == 19) {
      nextWeek.style.display = "none";
    }

    optionWeeks.textContent = `Week ${currentValue}`;
    if (currentValue > previousValue) {
      prevWeek.style.display = "block";
      changeWeek();
    }
    prevWeek.style.display = currentValue == 1 ? "none" : "block";
  });
});

// NAVBAR EVENT
const nav = document.querySelector("nav");
const navbar = document.querySelector("nav.nav-sticky");
let prevScrollPos = window.scrollY;

const handleScroll = () => {
  let header = document.querySelector("nav.nav-sticky");
  if (header) {
    header.classList.toggle("sticky-navbar", window.scrollY > 0);
    // navbar.classList.toggle("border-b", window.scrollY > 0);
    // navbar.classList.toggle("border-neutral-300", window.scrollY > 0);
  }
  let currentScrollPos = window.scrollY;

  if (navbar && nav) {
    if (prevScrollPos > currentScrollPos) {
      navbar.style.transform = "translateY(0)";
      nav.style.transform = "translateY(0)";
    } else {
      navbar.style.transform = "translateY(-100%)";
      nav.style.transform = "translateY(-100%)";
    }
  }

  prevScrollPos = currentScrollPos;
};

window.addEventListener("scroll", handleScroll);
