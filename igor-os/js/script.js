const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  root.dataset.theme = "light";
}

function updateThemeButton() {
  const isLight = root.dataset.theme === "light";

  themeButton.textContent = isLight ? "☾" : "☼";
  themeButton.setAttribute(
    "aria-label",
    isLight ? "Ativar tema escuro" : "Ativar tema claro"
  );
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  const isLight = root.dataset.theme === "light";

  if (isLight) {
    delete root.dataset.theme;
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    root.dataset.theme = "light";
    localStorage.setItem("portfolio-theme", "light");
  }

  updateThemeButton();
});

const revealElements = document.querySelectorAll(".reveal");

document.documentElement.classList.add("js-ready");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -20px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();