# Aayush Vishwakarma - Portfolio

A responsive personal developer portfolio with a restrained voxel-inspired visual identity. It is built with HTML5, CSS3, vanilla JavaScript, Bootstrap 5, Font Awesome, and Google Fonts.

## Run locally

No build step is needed. Open `index.html` in a browser, or serve this folder with a lightweight local server for the closest deployment-like behavior.

For example, with VS Code's Live Server extension, right-click `index.html` and choose **Open with Live Server**.

## Customize before publishing

### Social links

Search the project for these placeholders and replace every occurrence:

- `https://github.com/YOUR_USERNAME`
- `https://www.linkedin.com/in/YOUR_PROFILE`
- `YOUR_EMAIL@example.com`

### Resume

Replace [public/resume.pdf](public/resume.pdf) with the final resume, keeping the same filename. The current file is a clearly marked placeholder so that the Download Resume button works during development.

### Project links and screenshots

The projects use styled visual placeholders so no fabricated screenshots or URLs are shown. When available:

1. Put project images in `public/images/`.
2. Add an `<img loading="lazy">` in the matching `.project-visual` area in `index.html`, with meaningful `alt` text.
3. Replace the GitHub URL for that project and change the `Demo unavailable` label to a genuine deployed URL.

### Contact form

The form validates inputs in the browser and stores valid development submissions in `localStorage` under `aayushPortfolioMessages`. It does **not** claim to send email.

To send real submissions, set `FORM_ENDPOINT` near the top of [js/script.js](js/script.js) to a Formspree endpoint (or adapt the `fetch` call to your own backend).

## Deploy

### Netlify

1. Push this folder to a GitHub repository, or drag the folder into Netlify's deploy area.
2. In Netlify, use the repository root as the publish directory.
3. No build command is required.

### GitHub Pages

1. Push the files to a GitHub repository.
2. Open **Settings → Pages**.
3. Set the deployment source to **Deploy from a branch**, select the branch (normally `main`) and `/ (root)`.
4. Save, then use the published Pages URL after GitHub finishes deploying.

## Structure

Porfolio/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── public/
    ├── resume.pdf
    ├── certificates/
    │   └── sih-2026-certificate.jpg
    └── images/
        ├── hero.png
        ├── govsync-logo.jpg
        ├── campusconnect.jpg
        ├── flipkart-clone.jpg
        └── todo-app.jpg


The supplied hero artwork has been placed at `public/images/hero.png` and is used directly as the hero-section background.
