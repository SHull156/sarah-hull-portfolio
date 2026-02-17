// burger menu for mobile
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.getElementById("site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const THEME_KEY = "theme";

const setTheme = (theme) => {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeToggle?.setAttribute("aria-pressed", "true");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeToggle?.setAttribute("aria-pressed", "false");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
};

const savedTheme = localStorage.getItem(THEME_KEY);
const systemPrefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;

setTheme(savedTheme ?? (systemPrefersLight ? "light" : "dark"));

themeToggle?.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  const nextTheme = isLight ? "dark" : "light";

  localStorage.setItem(THEME_KEY, nextTheme);
  setTheme(nextTheme);

  if (siteNav && navToggle) {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// external links open in new browser window
document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

