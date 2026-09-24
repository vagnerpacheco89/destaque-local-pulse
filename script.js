const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#menu-mobile");
const demoModal = document.querySelector("#demo-modal");
let lastFocused = null;

function closeMenu() {
  if (!menuToggle || !mobileMenu) return;
  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  mobileMenu.hidden = open;
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function openDemo(trigger) {
  if (!demoModal) return;
  lastFocused = trigger || document.activeElement;
  demoModal.hidden = false;
  document.body.classList.add("is-locked");
  demoModal.querySelector(".demo-modal__close")?.focus();
}

function closeDemo() {
  if (!demoModal || demoModal.hidden) return;
  demoModal.hidden = true;
  document.body.classList.remove("is-locked");
  if (lastFocused instanceof HTMLElement) lastFocused.focus();
}

document.querySelectorAll("[data-demo-cta]").forEach((button) => {
  button.addEventListener("click", () => openDemo(button));
});

document.querySelectorAll("[data-close-demo]").forEach((button) => {
  button.addEventListener("click", closeDemo);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeDemo();
  }
});

const faqItems = [...document.querySelectorAll(".faq details")];
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const navLinks = [...document.querySelectorAll('.nav__links a[href^="#"]')];
const sectionIds = navLinks.map((link) => link.getAttribute("href")).filter(Boolean);
const sections = sectionIds
  .map((id) => document.querySelector(id))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const id = `#${visible.target.id}`;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === id);
    });
  }, {
    rootMargin: "-32% 0px -55% 0px",
    threshold: [0.05, 0.2, 0.45]
  });

  sections.forEach((section) => observer.observe(section));
}
