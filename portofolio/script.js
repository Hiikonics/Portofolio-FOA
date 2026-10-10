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
    title: "Valorant Community Cup",
    category: "Graphic Design",
    year: "2025",
    summary: "Identitas visual turnamen yang dirancang agar konsisten dari pengumuman hingga hari pertandingan.",
    tags: ["Key Visual", "Social Media", "Event"],
    cover: "https://images.unsplash.com/photo-1619616713221-a511d7037e06?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1800",
    href: "https://example.com/projects/valorant-community-cup",
    featured: true
  },
  {
    number: "02",
    title: "Matchday Social Series",
    category: "Graphic Design",
    year: "2025",
    summary: "Sistem konten modular untuk roster reveal, jadwal, hasil pertandingan, dan momen komunitas.",
    tags: ["Campaign", "Template", "Content"],
    cover: "https://images.unsplash.com/photo-1558707538-c56435bdcdf3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
    href: "https://example.com/projects/matchday-social-series"
  },
  {
    number: "03",
    title: "Broadcast Visual Kit",
    category: "Graphic Design",
    year: "2024",
    summary: "Paket grafis siaran yang membantu informasi pertandingan terbaca cepat tanpa kehilangan energi.",
    tags: ["Broadcast", "Overlay", "Motion"],
    cover: "https://images.unsplash.com/photo-1589829100333-e215933ccd67?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
    href: "https://example.com/projects/broadcast-visual-kit"
  },
  {
    number: "04",
    title: "Tournament Control",
    category: "UI/UX",
    year: "2025",
    summary: "Eksplorasi dashboard untuk mengelola tim, bracket, jadwal, dan status pertandingan dalam satu alur.",
    tags: ["Dashboard", "UX Flow", "Prototype"],
    cover: "https://images.unsplash.com/photo-1767449280971-46e438b1ce4a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1800",
    href: "https://example.com/projects/tournament-control",
    featured: true
  },
  {
    number: "05",
    title: "QueueUp Mobile",
    category: "UI/UX",
    year: "2025",
    summary: "Konsep aplikasi komunitas untuk mencari rekan bermain dan membangun party berdasarkan gaya bermain.",
    tags: ["Mobile App", "Research", "UI Design"],
    cover: "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
    href: "https://example.com/projects/queueup-mobile"
  },
  {
    number: "06",
    title: "FOA Digital Home",
    category: "UI/UX",
    year: "2026",
    summary: "Sistem website modular yang menyatukan profil tim, layanan, arsip karya, dan jalur kontak.",
    tags: ["Web Design", "Design System", "Responsive"],
    cover: "https://images.unsplash.com/photo-1640653410511-bee9946865ab?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
    href: "https://example.com/projects/foa-digital-home"
  }
];

const projectList = document.querySelector("#project-list");
const projectCount = document.querySelector("#project-count");
const filterButtons = document.querySelectorAll("[data-filter]");

function arrow() {
  return '<span aria-hidden="true">↗</span>';
}

function projectMarkup(project, isFeatured) {
  const tags = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  return `
    <a class="project-entry${isFeatured ? " is-featured" : ""}" href="${project.href}" target="_blank" rel="noreferrer" aria-label="Buka project ${project.title}">
      <div class="project-cover">
        <img src="${project.cover}" alt="Cover ${project.title}" loading="lazy" />
        <span class="category-label">${project.category}</span>
        <span class="view-project">View project ${arrow()}</span>
      </div>
      <div class="project-details">
        <span class="project-number">${project.number}</span>
        <div>
          <p class="project-meta">${project.category} / ${project.year}</p>
          <h2 class="display-font project-title">${project.title}</h2>
          <p class="project-summary">${project.summary}</p>
          <div class="project-tags">${tags}</div>
        </div>
        <span class="project-arrow">${arrow()}</span>
      </div>
    </a>
  `;
}

function renderProjects(category) {
  const visibleProjects = category === "All"
    ? projects
    : projects.filter((project) => project.category === category);

  projectCount.textContent = `${String(visibleProjects.length).padStart(2, "0")} PROJECTS`;
  projectList.innerHTML = visibleProjects
    .map((project, index) => projectMarkup(project, category === "All" && index === 0 && project.featured))
    .join("");
}

if (projectList && projectCount) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderProjects(button.dataset.filter);
    });
  });

  renderProjects("All");
}
