# Contributing to Component Gallery 🎨

First off, **thank you** for contributing! This project exists so developers of all
levels can practice open source with small, visual, satisfying contributions.

Community members are expected to follow the code of conduct: be respectful, be
patient, and help others learn.

---

## Table of contents

- [What kinds of contributions we accept](#what-kinds-of-contributions-we-accept)
- [Step-by-step guide](#step-by-step-guide)
  - [1. Fork and clone](#1-fork-and-clone)
  - [2. Create (or find) an issue](#2-create-or-find-an-issue)
  - [3. Create your component](#3-create-your-component)
  - [4. Register it in components.json](#4-register-it-in-componentsjson)
  - [5. Test locally](#5-test-locally)
  - [6. Open a pull request](#6-open-a-pull-request)
- [Component guidelines](#component-guidelines)
- [Checklist before you submit](#-checklist-before-you-submit)
- [Frequently asked questions](#frequently-asked-questions)

---

## What kinds of contributions we accept

Any of these is welcome:

- **New components** (the main one!) — buttons, cards, navbars, modals, footers,
  badges, toggles, progress bars, banners, forms, and anything visual you can build
  with pure HTML + CSS (+ optional vanilla JS).
- **Bug fixes** — broken previews, `components.json` typos, accessibility fixes.
- **Documentation** — clearer README, better examples in comments.

## Step-by-step guide

### 1. Fork and clone

1. Click **Fork** at the top-right of the repository page.
2. Clone your fork:
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/ComponentGallery.git
   cd ComponentGallery
   ```
3. Create a branch for your work:
   ```bash
   git checkout -b add/<component-name>
   ```

### 2. Create (or find) an issue

Browse the [open issues](https://github.com/Abdellox/ComponentGallery/issues).
Issues labeled [`good first issue`](https://github.com/Abdellox/ComponentGallery/issues?q=label%3A%22good+first+issue%22)
are perfect for first-timers.

**No fitting issue? Create one.** Suggest the component you want to build and ask to
be assigned. It only takes a minute and makes your PR traceable.

> 💡 *Tip:* Don't create a PR without an issue — a short comment on the issue keeps
> everyone informed and avoids duplicated work.

### 3. Create your component

Add one **self-contained HTML file** in the `components/` folder:

```
components/
└── <name>-<thing>.html     e.g. components/button-gradient.html
```

A component file looks like this (complete example):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    /* Your component's own styles live here */
    body { margin: 0; display: grid; place-items: center; height: 100vh;
           background: #0f1224; font-family: Arial, sans-serif; }
    .btn {
      padding: 1rem 2.5rem; border: 0; border-radius: 50px; font-size: 1.1rem;
      font-weight: 700; color: #fff; cursor: pointer;
      background: linear-gradient(135deg, #6d5dfc, #22c1c3);
    }
    .btn:hover { transform: translateY(-3px); }
  </style>
</head>
<body>
  <button class="btn">Click me!</button>
</body>
</html>
```

**Rules of the road:**
- Include the full `<!DOCTYPE html>` structure so it also opens standalone.
- Your styles **must** live inside a `<style>` block in the file (the gallery shows
  it in an isolated preview).
- Make the component look good in the ~640×260px preview: center your demo with
  `place-items: center` (like above).
- Aim for **5–10 minutes of work**. Keep it small and focused — one component = one file.

### 4. Register it in components.json

Add one object to the `components.json` array (mind the comma after the previous entry!):

```json
{
  "file": "components/button-gradient.html",
  "name": "Gradient Button",
  "category": "button",
  "author": "your-github-username",
  "github": "https://github.com/your-github-username",
  "description": "A bold gradient button with hover lift."
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `file` | ✅ | Relative path from the repo root to your component file |
| `name` | ✅ | Display name of the component |
| `category` | ✅ | `button`, `card`, `navbar`, `modal`, `footer`… or a new one |
| `author` | ✅ | Your GitHub username |
| `github` | ✅ | Link to your GitHub profile |
| `description` | ⬜ | Short, friendly one-liner (highly recommended) |

### 5. Test locally

```bash
# Python
python -m http.server 8000
# or Node
npx serve .
```

Open `http://localhost:8000` and check:

- ✅ Your component renders nicely in the gallery grid.
- ✅ It also works when opened directly (`components/your-file.html`).
- ✅ Search + category filter find it.

### 6. Open a pull request

```bash
git add components/your-file.html components.json
git commit -m "Add <Component Name> component"
git push origin add/<component-name>
```

Then open a PR from your branch. In the PR description, mention **which issue it
resolves** (e.g. `Closes #12`) and describe your component.

> 🙏 **Please:** one component per PR. It keeps history clean and review fast.

---

## Component guidelines

- ✅ Pure HTML + CSS. Vanilla JS is okay for interactive components (modals, dropdowns).
- ✅ Works without external libraries or frameworks.
- ✅ Has its own `background` so it looks good on any preview surface.
- ✅ Follows basic accessibility (visible focus, sensible contrast, buttons not `<div>`s).
- ❌ No `npm` dependencies, no images you don't own, no copied proprietary code.
- ❌ No multiple components squeezed into one file.

## ✔️ Checklist before you submit

- [ ] File created in `components/` with a unique, descriptive name
- [ ] Registered in `components.json` (valid JSON!)
- [ ] Tested locally with a server — preview looks great
- [ ] Self-contained (opens fine on its own)
- [ ] No external dependencies or assets
- [ ] PR references its issue (`Closes #N`)

## Frequently asked questions

**I'm brand new to GitHub. Is this too hard for me?**
No — this project is *made* for you. The whole contribution is one file plus one
JSON line. If you get stuck, open a draft PR and ask for help there; we're happy to
guide you.

**My PR has a conflict in components.json. What do I do?**
Another contributor probably added a component before you. [Sync your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)
with the latest `main`, resolve the conflict (keep both entries!), and push again.

**Can I claim an issue in advance?**
Yes — comment on it and ask to be assigned. If it's been idle for a while, politely
ask for an update.

**My component uses JS. Will the preview still work?**
Yes — the preview is a full iframe, so scripts run inside it. Just keep it simple (no
external CDNs).

---

<div align="center">

**Quality over quantity.** Every PR is reviewed with care and respect. Thank you for
helping people learn open source. 💙

</div>