"use_strict";

import { projects } from "./projects/projects.js";

////////////////////////////////////
// Show/Hide Navigation Banner

$("nav ul").hide();

$(".nav-toggle").click(function () {
  $("nav ul").slideToggle("medium");
});

$("nav ul li a, .brand a").click(function () {
  $("nav ul").hide();
});

////////////////////////////////////
// Smooth Scrolling

$(function () {
  var navHeight = $("nav").outerHeight();
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - navHeight,
          },
          1000
        );
        return false;
      }
    }
  });
});

////////////////////////////////////
// Sticky Nav Bar

var viewHeight = $(window).height();
var navigation = $("nav");

$(window).scroll(function () {
  if ($(window).scrollTop() > viewHeight - 175) {
    //edit for nav height
    navigation.addClass("sticky");
  } else {
    navigation.removeClass("sticky");
  }
});

////////////////////////////////////////////////
// Splash Container

function centerSplash() {
  var navHeight = $("nav").outerHeight();
  var splashHeight = $(".splash .container").height();
  var remainingHeight = $(window).height() - splashHeight - navHeight;
  $(".splash .container").css({
    "padding-top": remainingHeight / 2,
    "padding-bottom": remainingHeight / 2,
  });
}

$(document).ready(function () {
  centerSplash();
});

$(window).resize(function () {
  centerSplash();
});

////////////////////////////////////
// Load Project Images

const projectGallery = document.getElementById("project-gallery");

// Loop through the projects array
for (const project of projects) {
  // Create image
  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery-image");
  galleryImage.src = `projects/${project.image}`;
  galleryImage.alt = project.title;

  // Add anchor
  const anchor = document.createElement("a");
  anchor.target = "_blank";
  if (project.show !== "#") {
    anchor.href = project.show;
  } else if (project.source !== "#") {
    anchor.href = project.source;
  }
  anchor.appendChild(galleryImage);

  projectGallery.appendChild(anchor);
}

////////////////////////////////////
// Show Number of Projects

const totalProjects = document.getElementById("total-project");
totalProjects.textContent = projects.length;
totalProjects.style.color = "yellow";

////////////////////////////////////////////////
// Load Tech Stack

const techStack = [
  { name: "Flutter", image: "assets/flutter.png" },
  { name: "JavaScript", image: "assets/javascript.png" },
  { name: "PHP", image: "assets/php.png" },
  { name: "React", image: "assets/react.png" },
  { name: "HTML", image: "assets/html.png" },
  { name: "CSS", image: "assets/css.png" },
  { name: "Python", image: "assets/python.png" },
  { name: "Java", image: "assets/java.png" },
  { name: "C", image: "assets/c.png" },
  { name: "C++", image: "assets/cpp.png" },
  { name: "Git", image: "assets/git.png" },
  { name: "MySQL", image: "assets/mysql.png" },
  { name: "Firebase", image: "assets/firebase.png" },
  { name: "SQLite", image: "assets/sqlite.png" },
  { name: "VS Code", image: "assets/vscode.png" },
  { name: "Android Studio", image: "assets/android-studio.png" },
  { name: "PyCharm", image: "assets/pycharm.png" },
  { name: "IntelliJ", image: "assets/intellij.png" },
  { name: "mac OS", image: "assets/macos.png" },
  { name: "Windows", image: "assets/windows.png" },
  { name: "Android", image: "assets/android.png" },
  { name: "Visual Paradigm", image: "assets/visual-paradigm.png" },
  { name: "CS:GO", image: "assets/csgo.png" },
];

// Get the container element where you want to display the tech stack items
const container = document.getElementById("tech-stack-container");

// Loop through the tech stack array and create HTML elements for each item
techStack.forEach((item) => {
  // Create a div element for the item
  const div = document.createElement("div");

  // Create an image element for the item's image
  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.name;

  // Create a span element for the item's name
  const name = document.createElement("span");
  name.textContent = item.name;

  // Append the image and name elements to the div element
  div.appendChild(image);
  div.appendChild(name);

  // Append the div element to the container
  container.appendChild(div);
});

////////////////////////////////////
// Handle Contact Form Submission

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

const submit = document.getElementById("submit-btn");
submit.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (!validateEmail(email)) {
    alert("Invalid Email Address!");
    return;
  }

  const body = `Hi, I'm ${name}. ${message}. Reach out via my email at ${email}`;

  window.open(`mailto:j.lok2301@gmail.com?subject=${subject}&body=${body}`);
});
