// Mobile menu toggle
const hamburgerMenu = document.getElementById("hamburgerMenu");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

hamburgerMenu.addEventListener("click", () => {
  nav.classList.toggle("hidden-sm");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.add("hidden-sm");
  });
});

// Disable future date selection
const birthdateDatepicker = document.getElementById("birthdate");
const today = new Date().toISOString().split("T")[0];
birthdateDatepicker.setAttribute("max", today);

// Age verification logic
document.addEventListener("DOMContentLoaded", () => {
  const ageGate = document.getElementById("ageGate");
  const ageForm = document.getElementById("ageForm");
  const rememberMeCheckbox = document.getElementById("rememberMe");
  const errorMessage = document.getElementById("errorMessage");
  let isAgeVerified = localStorage.getItem("ageVerified");

  if (isAgeVerified === "true") {
    showHomepage();
  } else {
    ageGate.style.display = "flex";

    if (isAgeVerified === "false") {
      errorMessage.style.display = "flex";
    }

    ageForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const birthdate = document.getElementById("birthdate").value;
      const age = getAgeInYears(birthdate);
      isAgeVerified = age >= 21 ? "true" : "false";

      if (isAgeVerified === "true") {
        showHomepage();
      } else {
        errorMessage.style.display = "flex";
      }

      if (rememberMeCheckbox.checked) {
        localStorage.setItem("ageVerified", isAgeVerified);
      }
    });
  }
});

// Show homepage logic
function showHomepage() {
  const ageGate = document.getElementById("ageGate");
  ageGate.style.display = "none";
  document.body.classList.remove("hidden");
}

// Get age in years from birthdate
function getAgeInYears(birthdate) {
  const birthdateInput = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthdateInput.getFullYear();
  const monthDiff = today.getMonth() - birthdateInput.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdateInput.getDate())
  ) {
    age--;
  }

  return age;
}
