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
  const currentDate = new Date(originalDate);
  const daysInWeek = 7;

  const dateBadge = document.querySelectorAll(".date-badge");

  // for each per week
  // get param dateElement & index, where the index start from 0 to 6
  dateOfWeek.forEach((dateElement, index) => {
    const startOfWeek = new Date(); //set date, when week start from sun

    // what a day of the week is it now like mon is day-1. cause start from 0
    const dayOfWeekStart = startOfWeek.getDay();
    console.log(`current date : ${currentDate.getDate()}`);
    console.log(`dayOfWeekStart : day ${dayOfWeekStart}`);

    // set date of week from current date like (13) - 1
    startOfWeek.setDate(currentDate.getDate() - dayOfWeekStart);

    console.log(
      `current week date = currentDate - dayOfWeekStart = startOfWeek.getDate()`
    );
    console.log(
      `current week date : ${currentDate.getDate()} - ${dayOfWeekStart} = ${startOfWeek.getDate()}`
    );

    // for forward to next week when value of index more than equal to 7
    if (index >= daysInWeek) {
      startOfWeek.setDate(currentDate.getDate() + daysInWeek); // forward to next week
    }

    // get dayName for currentDate from array dayNames
    // like dayNames[0 == "sun"];
    const day = dayNames[index];
    // get monthName for currentDate from array monthNames
    // like monthNames[5 == "May"];
    const month = monthNames[startOfWeek.getMonth()];
    // get date where date is start from date per week like 12 is sun
    const date = startOfWeek.getDate();
    console.log(date);
    console.log("");

    // set textContent for each element
    dateElement.textContent = date;
    dayOfWeek[index].textContent = day;
    monthOfWeek[index].textContent = month;

    // add class active for today
    if (originalDate.getDate() == date) {
      dateBadge[index].classList.add("date-active");
    }

    // set currentDate to get date per week
    currentDate.setDate(currentDate.getDate() + 1);
  });
});

// NAVBAR EVENT

const handleLoad = () => {
  let header = document.querySelector("nav");
  if (header) {
    header.style.transform = "translateY(0)";
  }
};

const nav = document.querySelector("nav ul");
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
window.addEventListener("load", handleLoad, handleScroll);
