const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Buka menu" : "Tutup menu");
    mobileNav.hidden = isOpen;
    menuButton.classList.toggle("is-open", !isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Buka menu");
      mobileNav.hidden = true;
      menuButton.classList.remove("is-open");
    });
  });
}

const projects = [
  {
    number: "01",
    title: "Valorant Merdeka",
    category: "Graphic Design",
    year: "2026",
    summary: "Identitas visual turnamen yang dirancang agar konsisten dari pengumuman hingga hari pertandingan.",
    tags: ["Key Visual", "Social Media", "Event"],
    cover: "assets/TicketVal.png",
    href: "https://www.figma.com/design/zdBHDJ1af5VSC8HNsN9MPn/Untitled?node-id=86-10&t=4GnoGOKbqezujwK9-1"
  },
  {
    number: "02",
    title: "Scriptr",
    category: ["UI/UX", "Graphic Design"],
    year: "2025",
    summary: "Prototype game visual novel horror interaktif dengan AI generated story",
    tags: ["Horror", "Prototype", "Visual Novel"],
    cover: "assets/Scriptr.png",
    href: "https://www.figma.com/design/piuxCdJfndvbJHUZuVn5fO/Scriptr?node-id=404-76&t=VXcaZ3ED46yQuLp4-1"
  },
  {
    number: "03",
    title: "Edumatch",
    category: ["UI/UX", "Graphic Design"],
    year: "2025",
    summary: "Rekomendasi jurusan dan kampus sesuai minat, bakat, dan gaya belajarmu.",
    tags: ["Prototype", "Poster", "Education"],
    cover: "assets/Edumatch.png",
    href: "https://www.figma.com/design/Ls9qtPW4nr6ePwl4pY1SxE/EduMatch?node-id=0-1&t=LzMyRHP0oiDXEEMX-1"
  },
  {
    number: "04",
    title: "Zentory",
    category: ["UI/UX", "Graphic Design"],
    year: "2025",
    summary: "Aplikasi Manajemen Stok gudang dengan Pendukung keputusan berbasis AI.",
    tags: ["Dashboard", "UX Flow", "Prototype"],
    cover: "assets/Zentory.png",
    href: "https://www.figma.com/design/G8g0jNWyILqymgj4qCi9Zz/Design-Awal-Zentory?node-id=0-1&t=jOdErzU1ChDcBCcn-1"
  },
  {
    number: "05",
    title: "Radan",
    category: ["Graphic Design"],
    year: "2023",
    summary: "Design kemasan untuk produk Makanan Gudeg",
    tags: ["Packaging", "Food", "Logo"],
    cover: "assets/Radan.png",
    href: "https://canva.link/ni19p4x3haq115w"
  }
];

const projectList = document.querySelector("#project-list");
const projectCount = document.querySelector("#project-count");
const filterButtons = document.querySelectorAll("[data-filter]");

function arrow() {
  return '<span aria-hidden="true">↗</span>';
}

function categoryLabel(category) {
  return Array.isArray(category) ? category.join(" / ") : category;
}

function projectMarkup(project) {
  const tags = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  const category = categoryLabel(project.category);
  return `
    <a class="project-entry" href="${project.href}" target="_blank" rel="noreferrer" aria-label="Buka project ${project.title}">
      <div class="project-cover">
        <img src="${project.cover}" alt="Cover ${project.title}" loading="lazy" />
        <span class="category-label">${category}</span>
        <span class="view-project">View project ${arrow()}</span>
      </div>
      <div class="project-details">
        <span class="project-number">${project.number}</span>
        <div>
          <p class="project-meta">${category} / ${project.year}</p>
          <h2 class="display-font project-title">${project.title}</h2>
          <p class="project-summary">${project.summary}</p>
          <div class="project-tags">${tags}</div>
        </div>
        <span class="project-arrow">${arrow()}</span>
      </div>
    </a>
  `;
}

let activeCategory = "All";

function renderProjects() {
  const visibleProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => {
      const categories = Array.isArray(project.category)
        ? project.category
        : [project.category];
      return categories.includes(activeCategory);
    });

  projectCount.textContent = `${String(visibleProjects.length).padStart(2, "0")} PROJECTS`;
  projectList.innerHTML = visibleProjects
    .map((project) => projectMarkup(project))
    .join("");
}

if (projectList && projectCount) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      activeCategory = button.dataset.filter;
      renderProjects();
    });
  });

  renderProjects();
}
