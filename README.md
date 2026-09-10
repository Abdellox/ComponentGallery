<div align="center">

# 🎨 Component Gallery

**Small HTML/CSS components, built by the community.** Buttons, cards, navbars,
modals, footers — pick an issue, build a component, open a PR. It takes *5–10 minutes*.

*A perfect first open-source contribution.*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

</div>

---

## ✨ What is this?

A growing **gallery of small, reusable UI components** (buttons, cards, navbars,
modals, footers, badges, toggles…) contributed by developers of **all skill levels**.
Every component is one self-contained HTML file in the [`components/`](components/)
folder. The gallery page loads them all automatically and renders a live preview.

**No framework. No build step. No server required.** Just HTML, CSS, and a little
vanilla JavaScript.

## 🖼️ Live demo

Open `index.html` — or better, serve it locally:

```bash
# with Python
python -m http.server 8000

# with Node
npx serve .
```

Then visit `http://localhost:8000`.

> **Note:** `script.js` reads `components.json` with `fetch()`, so you need a local
> server (any of the above) instead of opening the file directly.

## 🚀 How to contribute (the short version)

1. **Fork** this repo and clone it to your machine.
2. **Pick or create an issue** labeled [`good first issue`](https://github.com/Abdellox/ComponentGallery/issues?q=label%3A%22good+first+issue%22). If there is none, suggest a new component!
3. **Create a component** — add a self-contained `.html` file in `components/`,
   e.g. `components/button-rgb.html`. Your component must have its own `<style>`
   block so it looks correct anywhere.
4. **Register it** — add one entry to [`components.json`](components.json):
   ```json
   {
     "file": "components/button-rgb.html",
     "name": "RGB Button",
     "category": "button",
     "author": "your-github-username",
     "github": "https://github.com/your-github-username",
     "description": "A rainbow-animated button."
   }
   ```
5. **Open a pull request.** That's it — you're in the gallery! 🎉

> 📖 Full details, tips and checklist: see **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## 🎯 Current components

| # | Component | Category | Author |
|---|-----------|----------|--------|
| 1 | [Glow Button](components/button-glow.html) | button | [Abdellox](https://github.com/Abdellox) |
| 2 | [Profile Card](components/card-profile.html) | card | [Abdellox](https://github.com/Abdellox) |
| 3 | [Glassmorphism Navbar](components/navbar-glassmorphism.html) | navbar | [Abdellox](https://github.com/Abdellox) |
| 4 | [Animated Modal](components/modal-animated.html) | modal | [Abdellox](https://github.com/Abdellox) |
| 5 | [Simple Footer](components/footer-simple.html) | footer | [Abdellox](https://github.com/Abdellox) |

*Count updates automatically as components are added.*

## 🗂️ Project structure

```
ComponentGallery/
├── index.html          # The gallery page
├── style.css           # Styles for the gallery page (not components)
├── script.js           # Loads components.json + renders previews
├── components.json     # Manifest: every component listed here
├── components/         # ← add your component file here
├── README.md
└── CONTRIBUTING.md
```

## 🧪 Component requirements (minimal!)

- One self-contained `.html` file (own `<style>` block).
- Something *visual* — you can see it in the gallery.
- No external libraries (keep it pure HTML/CSS).
- Category already exists (button, card, navbar, modal, footer…) or suggest a new one.
- Register it in `components.json`.

## 💬 Community

- Found a bug? [Open an issue](https://github.com/Abdellox/ComponentGallery/issues).
- Want to chat? Join us on Discord / share on r/webdev and r/opensource!

## 🧑‍🤝‍🧑 Contributors

Thanks to everyone who contributes — this project is what **you** make it. 💙

---

<div align="center">
  Built with 💖 by <a href="https://github.com/Abdellox">Abdellox</a> and the community.
</div>