"use_strict";

import { projects } from "./projects.js";

// Load Projects
const projectsList = document.getElementById("my-projects");

// Loop through the projects array
for (const project of projects) {
  // Create the HTML elements
  const projectItem = document.createElement("li");
  projectItem.classList.add("project");
  projectItem.setAttribute("data-tags", project.tags);

  const projectImage = document.createElement("img");
  projectImage.src = project.image;
  projectImage.alt = project.title;

  const projectInfo = document.createElement("div");
  projectInfo.classList.add("project-info");

  const tagsList = document.createElement("ul");
  tagsList.classList.add("tags");

  const projectTitle = document.createElement("h3");
  projectTitle.textContent = project.title;

  const projectDescription = document.createElement("p");
  projectDescription.textContent = project.description;

  const projectBtns = document.createElement("ul");
  projectBtns.classList.add("project-btns");

  if (project.show !== "#") {
    const showBtn = document.createElement("li");
    const showLink = document.createElement("a");
    showLink.href = project.show;
    showLink.target = "_blank";
    showLink.classList.add("project-btn");
    showLink.innerHTML = '<i class="fa fa-external-link"></i>Show';
    showBtn.appendChild(showLink);
    projectBtns.appendChild(showBtn);
  }

  if (project.source !== "#") {
    const sourceBtn = document.createElement("li");
    const sourceLink = document.createElement("a");
    sourceLink.href = project.source;
    sourceLink.classList.add("project-btn");
    sourceLink.target = "_blank";
    sourceLink.innerHTML = '<i class="fa fa-github"></i>Code';
    sourceBtn.appendChild(sourceLink);
    projectBtns.appendChild(sourceBtn);
  }

  // Append the created elements
  projectItem.appendChild(projectImage);
  projectItem.appendChild(projectInfo);
  projectInfo.appendChild(tagsList);
  projectInfo.appendChild(projectTitle);
  projectInfo.appendChild(projectDescription);
  projectInfo.appendChild(projectBtns);

  // Append the project item to the projects list
  projectsList.appendChild(projectItem);
}

$(document).ready(function () {
  var $projectsList = $(".projects-list");
  var $projects = $projectsList.find(".project");
  var $projectsTags = $(".projects-tags");
  var tagsObj = {};
  var fadeSpeed = 500;

  $projects.each(function () {
    var project = this;
    var $project = $(this);
    var $tagsList = $project.find(".tags");
    var tags = $project.data("tags").split(",");
    tags.forEach(function (tag) {
      var li = '<li class="tag">';
      li += tag;
      li += "</li>";
      $tagsList.append($(li));
      if (!tagsObj.hasOwnProperty(tag)) tagsObj[tag] = [];
      tagsObj[tag].push(project);
    });
  });

  $.each(tagsObj, function (tag) {
    var $button = $("<button>" + tag + "</button>");
    $button
      .on("click", function () {
        if ($projects.is(":animated")) return false;
        $(this).addClass("active").siblings().removeClass("active");
        $projects.filter(":visible").fadeOut(fadeSpeed, function () {
          $projects.filter(tagsObj[tag]).fadeIn(fadeSpeed);
        });
      })
      .appendTo($projectsTags);
  });

  $("#all").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $projects.filter(":visible").fadeOut(fadeSpeed, function () {
      $projects.fadeIn(fadeSpeed);
    });
  });
});
