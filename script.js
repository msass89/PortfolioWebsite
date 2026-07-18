// EmailJS initialization
(function () {
  emailjs.init("FbcccHWRjmInOlwSO");
})();

class Project {
  constructor(projectClass, imageSource, imageAlt, projectName, projectDescription, projectLink, lastUpdate) {
    this.projectClass = projectClass;
    this.projectName = projectName;
    this.imageSource = imageSource;
    this.imageAlt = imageAlt;
    this.imgClass = "lightbox-img";
    this.projectDescription = projectDescription;
    this.projectLink = projectLink;
    this.lastUpdate = lastUpdate;
  }
}


document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const burger = document.getElementById("burger");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav a");
  const projectGallery = document.getElementById("project-gallery");
  const checkboxes = document.querySelectorAll(".filters input");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxText = document.getElementById("lightbox-text");
  const closeButton = document.getElementById("lightbox-close");
  
  // set up the project items in the gallery
  const projects = [
    new Project(
      "web", 
      "img/self_service_portal.png", 
      "Screenshot of Self-Service-Portal", 
      "Self-Service-Portal", 
      "A multi-tenancy SaaS fullstack-project build with ASP.NET Razor Pages. Currently in development.", 
      "https://github.com/msass89/Self-Service-Portal", 
      "2024-05-18"),
    new Project("web", 
      "img/InventoryManagementApi.png", 
      "Screenshot of Inventory and Order Management API", 
      "Inventory and Order Management API", 
      "A RESTful API for managing inventory items and orders using Asp.Net and Swagger. Currently in development.", 
      "https://github.com/msass89/Inventory-Management-API", 
      "2024-05-30"),
    new Project("game", 
      "img/roots_of_revival_screenshot.png", 
      "Screenshot of Roots of Revival", 
      "Roots of Revival", 
      "An indie game I am currently developing with Unity, C# and Blender.", 
      "https://github.com/msass89/Roots-of-Revival", 
      "2025-12-15")
  ];

  // Toggle navigation menu on burger click
  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // set burger to inactive when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  projects.forEach(project => {
    const projectElement = document.createElement("figure");
    projectElement.classList.add("item", project.projectClass);

    const img = document.createElement("img");
    img.src = project.imageSource;
    img.alt = project.imageAlt;
    img.setAttribute("role", "image");
    img.classList.add(project.imgClass);
    projectElement.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = `<h3><b>${project.projectName}</b></h3>`;
    figcaption.setAttribute("role", "heading");
    projectElement.appendChild(figcaption);

    const details = document.createElement("p");
    details.innerHTML = `${project.projectDescription} <br><br>See more details on <a href="${project.projectLink}" target="_blank" rel="noopener" role="link">GitHub</a>.`;
    details.setAttribute("role", "contentinfo");
    projectElement.appendChild(details);

    const lastUpdate = document.createElement("p");
    lastUpdate.innerHTML = `<b>Last Update: </b><time datetime="${project.lastUpdate}"><i>${project.lastUpdate}</i></time>`;
    lastUpdate.setAttribute("role", "contentinfo");
    projectElement.appendChild(lastUpdate);

    projectGallery.appendChild(projectElement);
  });

  // Lightbox-Function for project images
  document.querySelectorAll(".lightbox-img").forEach(img => {
  img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightboxText.textContent = img.getAttribute("data-text");
      lightbox.classList.add("active");
    });
  });

  // Close lightbox on close button click
  closeButton.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) lightbox.classList.remove("active");
  });

  // Filter project items based on selected checkboxes
  items = projectGallery.querySelectorAll(".item");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {

      // If one checkbox is checked, uncheck all other checkboxes
      if (checkbox.checked) {
        checkboxes.forEach(other => {
          if (other !== checkbox) {
            other.checked = false;
          }
        });
      }

      // If no checkbox is checked, check "All"
      if (![...checkboxes].some(checkbox => checkbox.checked)) {
      document
        .querySelector('input[value="all"]')
        .checked = true;
      }

      filterItems();
    });
  });

  // Filter-Function for project gallery
  function filterItems() {
    const active = [...checkboxes].find(cb => cb.checked);

    // If "All" is selected, show all items
    if (active.value === "all") {
      items.forEach(item => item.classList.remove("hide"));
      return;
    }

    // Otherwise, show only items that match the selected tag
    const tag = active.value;
    items.forEach(item => {
      const match = item.classList.contains(tag);
      item.classList.toggle("hide", !match);
    });
  }

  // Send contact form using EmailJS
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_swj6m08", "template_of9jjc8", this)
      .then(function () {
        alert("Nachricht wurde erfolgreich gesendet!");
        form.reset();
      })
      .catch(function (error) {
        alert("Fehler beim Senden: " + error.text);
    });

    emailjs.sendForm("service_swj6m08", "template_18chji6", this)
        .then(function () {
            alert("Auto-Response wurde erfolgreich gesendet!");
        })
        .catch(function (error) {
            alert("Fehler beim Senden der Auto-Response: " + error.text);
        });
  });

});


