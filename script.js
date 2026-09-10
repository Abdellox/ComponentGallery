/* ==========================================================================
   Component Gallery — script.js
   Loads components.json, renders each component into an isolated iframe
   preview, and adds search / category filtering + dark mode.
   ========================================================================== */

(() => {
  "use strict";

  const MANIFEST = "components.json";
  const grid = document.getElementById("gallery-grid");
  const statusEl = document.getElementById("gallery-status");
  const emptyState = document.getElementById("empty-state");
  const galleryCount = document.getElementById("gallery-count");
  const searchInput = document.getElementById("search");
  const chipContainer = document.getElementById("filter-chips");
  const statComponents = document.getElementById("stat-components");
  const statAuthors = document.getElementById("stat-authors");
  const statCategories = document.getElementById("stat-categories");

  let components = [];
  let activeCategory = "All";

  /* ---------- Theme (persisted to localStorage) ---------- */

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem("cg-theme");
    } catch (_) {
      /* storage unavailable — ignore */
    }
    const theme =
      saved ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    applyTheme(theme);
  }

  function toggleTheme() {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("cg-theme", next);
    } catch (_) {
      /* ignore */
    }
  }

  /* ---------- Rendering ---------- */

  function buildSkeleton() {
    grid.innerHTML = Array.from({ length: 6 })
      .map(
        () => `
        <div class="card">
          <div class="preview" style="background: var(--bg-alt);"></div>
          <div class="card-info">
            <div style="height:16px;width:55%;background:var(--border);border-radius:6px;"></div>
            <div style="height:12px;width:85%;background:var(--border);border-radius:6px;margin-top:8px;"></div>
          </div>
        </div>`
      )
      .join("");
  }

  function createCard(item) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.category = item.category;
    card.dataset.name = (item.name || "").toLowerCase();
    card.dataset.author = (item.author || "").toLowerCase();

    const preview = document.createElement("div");
    preview.className = "preview";

    const iframe = document.createElement("iframe");
    iframe.loading = "lazy";
    iframe.title = `${item.name} preview`;

    // Fully isolated preview: the component file embeds its own styles.
    fetch(item.file)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((html) => {
        iframe.srcdoc = html;
      })
      .catch(() => {
        preview.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:0.9rem;">Preview unavailable</div>`;
      });

    preview.appendChild(iframe);

    const info = document.createElement("div");
    info.className = "card-info";

    const titleRow = document.createElement("div");
    titleRow.className = "card-title-row";
    titleRow.innerHTML = `
      <h3 class="card-title"></h3>
      <span class="badge"></span>`;
    const titleEl = titleRow.querySelector(".card-title");
    const badgeEl = titleRow.querySelector(".badge");
    titleEl.textContent = item.name;
    badgeEl.textContent = item.category;

    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = item.description || "";

    const author = document.createElement("p");
    author.className = "card-author";
    author.innerHTML = `<span>Made by</span><a href="${item.github || "#"}" target="_blank" rel="noopener"></a>`;
    author.querySelector("a").textContent = item.author;

    const actions = document.createElement("div");
    actions.className = "card-actions";
    const fullLink = document.createElement("a");
    fullLink.className = "btn btn-sm btn-ghost";
    fullLink.href = item.file;
    fullLink.target = "_blank";
    fullLink.rel = "noopener";
    fullLink.textContent = "Open component ↗";
    actions.appendChild(fullLink);

    info.append(titleRow, desc, author, actions);
    card.append(preview, info);
    return card;
  }

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = components.filter((c) => {
      if (activeCategory !== "All" && c.category !== activeCategory) return false;
      if (!query) return true;
      const haystack =
        `${c.name} ${c.category} ${c.author} ${c.description || ""}`.toLowerCase();
      return haystack.includes(query);
    });

    galleryCount.textContent = `(${filtered.length} of ${components.length})`;
    grid.innerHTML = "";

    if (filtered.length === 0) {
      emptyState.hidden = false;
      grid.hidden = true;
      return;
    }

    emptyState.hidden = true;
    grid.hidden = false;
    filtered.forEach((c) => grid.appendChild(createCard(c)));
  }

  /* ---------- Filters ---------- */

  function buildChips() {
    const categories = [
      "All",
      ...[...new Set(components.map((c) => c.category))].sort(),
    ];
    chipContainer.innerHTML = "";
    categories.forEach((cat) => {
      const chip = document.createElement("button");
      chip.className = "chip" + (cat === activeCategory ? " active" : "");
      chip.textContent = cat;
      chip.addEventListener("click", () => {
        activeCategory = cat;
        chipContainer
          .querySelectorAll(".chip")
          .forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        render();
      });
      chipContainer.appendChild(chip);
    });
  }

  function updateStats() {
    statComponents.textContent = components.length;
    statAuthors.textContent = new Set(components.map((c) => c.author)).size;
    statCategories.textContent = new Set(components.map((c) => c.category)).size;
  }

  /* ---------- Boot ---------- */

  function init() {
    initTheme();
    const toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.addEventListener("click", toggleTheme);

    searchInput.addEventListener("input", render);

    buildSkeleton();

    fetch(MANIFEST)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        components = Array.isArray(data) ? data : [];
        updateStats();
        buildChips();
        render();
        statusEl.textContent = "";
      })
      .catch((err) => {
        statusEl.textContent = `Failed to load components (${err.message}). Did you start it with a local server?`;
        emptyState.hidden = false;
      });
  }

  document.addEventListener("DOMContentLoaded", init);
})();