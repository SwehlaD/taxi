const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const form = document.querySelector("[data-contact-form]");
const note = document.querySelector("[data-form-note]");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = () => {
  const current = sections.findLast((section) => section.getBoundingClientRect().top <= 120) || sections[0];
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const fullName = `${data.get("name") || ""} ${data.get("lastName") || ""}`.trim();
  const subject = encodeURIComponent(`Ride request from ${fullName || "website visitor"}`);
  const body = encodeURIComponent(
    [
      `Name: ${fullName}`,
      `Phone: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Service: ${data.get("service") || ""}`,
      "",
      data.get("message") || ""
    ].join("\n")
  );

  note.textContent = "Opening your email app to send the request.";
  window.location.href = `mailto:americabtaxicompany@gmail.com?subject=${subject}&body=${body}`;
});
