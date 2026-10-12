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

const deliverables = [
  ["01", "Key Visual & Poster", "Menyusun identitas visual utama yang menjadi fondasi poster registrasi, pengumuman, dan seluruh materi promosi.", ["Main poster", "Open registration", "Matchday poster", "Winner announcement"]],
  ["02", "Social Media Assets", "Membuat sistem konten yang konsisten agar informasi turnamen mudah dibaca dan cepat dipublikasikan.", ["Roster reveal", "Schedule update", "Match result", "Story template"]],
  ["03", "Rundown & Timeline", "Merancang alur dari masa registrasi hingga awarding agar panitia, talent, dan peserta bergerak pada timeline yang sama.", ["Pre-event timeline", "Technical meeting", "Matchday rundown", "Contingency time"]],
  ["04", "Bracket Management", "Menyiapkan struktur pertandingan, seeding, jadwal, serta pembaruan hasil secara tertib dan transparan.", ["Team seeding", "Bracket setup", "Score update", "Match progress"]],
  ["05", "Tournament System", "Menyusun format kompetisi, ruleset, alur komunikasi, dan prosedur dispute yang dapat dipahami semua pihak.", ["Competition format", "Rules & penalty", "Map veto", "Dispute flow"]],
  ["06", "Matchday Operations", "Mengawal pelaksanaan turnamen melalui check-in, koordinasi lobby, pencatatan hasil, dan komunikasi peserta.", ["Team check-in", "Lobby coordination", "Admin support", "Result validation"]],
];

const phases = [
  ["01", "Discovery", "Menentukan objektif, target peserta, skala acara, game title, dan kebutuhan publikasi."],
  ["02", "System Design", "Menyusun format, ruleset, bracket, timeline, pembagian peran, dan jalur komunikasi."],
  ["03", "Visual Production", "Mengembangkan key visual beserta seluruh aset promosi dan kebutuhan broadcast."],
  ["04", "Tournament Day", "Menjalankan check-in, match flow, update score, dokumentasi, dan koordinasi peserta."],
  ["05", "Wrap Up", "Mengumumkan pemenang, merapikan dokumentasi, dan mengevaluasi jalannya turnamen."],
];

const tournamentPage = document.querySelector(".tournament-page");

if (tournamentPage) {
  const arrowIcon = '<span class="arrow-icon" aria-hidden="true"></span>';
  const deliverablesContainer = tournamentPage.querySelector("#deliverables");
  const phasesContainer = tournamentPage.querySelector("#phases");
  const teamsContainer = tournamentPage.querySelector("#teams");

  if (deliverablesContainer) {
    deliverablesContainer.innerHTML = deliverables.map(([number, title, description, items]) => `
      <article class="deliverable-card">
        <div class="card-top"><span>${number}</span>${arrowIcon}</div>
        <div>
          <h3 class="display-font">${title}</h3>
          <p>${description}</p>
          <ul>${items.map((item) => `<li><i></i>${item}</li>`).join("")}</ul>
        </div>
      </article>
    `).join("");
  }

  if (phasesContainer) {
    phasesContainer.innerHTML = phases.map(([number, title, description]) => `
      <div class="phase"><span>${number}</span><h3 class="display-font">${title}</h3><p>${description}</p></div>
    `).join("");
  }

  if (teamsContainer) {
    teamsContainer.innerHTML = ["TEAM 01", "TEAM 02", "TEAM 03", "TEAM 04"].map((team, index) => `
      <div class="match"><span>${team}</span><b>${index % 2 ? "0" : "1"}</b></div>
    `).join("");
  }
}
