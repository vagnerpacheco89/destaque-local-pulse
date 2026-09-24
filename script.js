const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#menu-mobile");
const demoModal = document.querySelector("#demo-modal");

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

document.querySelectorAll("[data-pending]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    closeMenu();
  });
});

document.querySelectorAll("[data-demo-cta]").forEach((button) => {
  button.addEventListener("click", () => {
    demoModal.hidden = false;
    document.body.classList.add("is-locked");
    demoModal.querySelector(".demo-modal__close")?.focus();
  });
});

function closeDemo() {
  if (!demoModal) return;
  demoModal.hidden = true;
  document.body.classList.remove("is-locked");
}

document.querySelectorAll("[data-close-demo]").forEach((button) => {
  button.addEventListener("click", closeDemo);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    if (!demoModal?.hidden) closeDemo();
  }
});
