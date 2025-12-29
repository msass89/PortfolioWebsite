// EmailJS initialisieren
(function () {
  emailjs.init("FbcccHWRjmInOlwSO");
})();


document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const burger = document.getElementById("burger");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav a");
  const checkboxes = document.querySelectorAll('.filters input');
  const items = document.querySelectorAll('.project-gallery .item');
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.getElementById("lightbox-close");

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

  // Filter project items based on selected checkboxes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterItems);
  });

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

  // Lightbox-Function for project images
  document.querySelectorAll(".lightbox-img").forEach(img => {
  img.addEventListener("click", () => {
      lightboxImage.src = img.src;
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

  // Filter-Funktion for project gallery
  function filterItems() {
    const active = [...checkboxes]
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    items.forEach(item => {
      const match = active.every(tag => item.classList.contains(tag));
      item.classList.toggle("hide", active.length && !match);
    });
  }

});


