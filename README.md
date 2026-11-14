# DAMAYANTHI J – PORTFOLIO WEBSITE
## File Guide & Beginner Instructions

---

## 📁 Project Folder Structure

```
damayanthi-portfolio/
│
├── index.html                    ← Main website file (all 9 sections)
├── css/
│   └── style.css                 ← All styling and design
├── js/
│   └── main.js                   ← All interactions and animations
└── assets/
    ├── images/                   ← Profile photo (optional)
    ├── certificates/             ← Add your certificate PDFs here
    │   ├── pinnacle-plus.pdf     ← Pinnacle Plus Certificate
    │   ├── bytexl-python.pdf     ← BYTEXL Python Certificate
    │   ├── bytexl-dbms.pdf       ← BYTEXL DBMS Certificate
    │   ├── bytexl-dsa.pdf        ← BYTEXL DSA Certificate
    │   └── internship-itp.pdf    ← iT Pro Internship Certificate
    └── resume/
        └── damayanthi-resume.pdf ← Your Resume PDF
```

---

## 🌐 How to Run the Website

**Method 1 – Double click:**
1. Open the `damayanthi-portfolio` folder.
2. Double-click `index.html` → it opens in your browser.

**Method 2 – VS Code Live Server (Recommended):**
1. Install VS Code from https://code.visualstudio.com
2. Install the "Live Server" extension (search in Extensions panel).
3. Open the `damayanthi-portfolio` folder in VS Code.
4. Right-click `index.html` → click "Open with Live Server".
5. The website opens at `http://127.0.0.1:5500`.

> ⚠️ NOTE: PDF preview inside the modal works best with Live Server.
> When you double-click and open directly from file, browsers may block PDF iframes for security.

---

## 📄 How to Add Certificate PDFs

1. Get your certificate PDF file.
2. Rename it exactly as listed below:

| Certificate           | File name                |
|-----------------------|--------------------------|
| Pinnacle Plus         | `pinnacle-plus.pdf`      |
| BYTEXL Python         | `bytexl-python.pdf`      |
| BYTEXL DBMS           | `bytexl-dbms.pdf`        |
| BYTEXL DSA            | `bytexl-dsa.pdf`         |
| iT Pro Internship     | `internship-itp.pdf`     |

3. Place each file inside the `assets/certificates/` folder.
4. Reload the website – the View Certificate button will now show the PDF.

---

## 📋 How to Add Your Resume

1. Save your resume as a PDF file.
2. Rename it to: `damayanthi-resume.pdf`
3. Place it inside the `assets/resume/` folder.
4. Reload the website – the Download Resume button will work.

---

## 🔗 How to Update GitHub Repository Links

For each project, find the GitHub button in `index.html`:

**Example for Quick Wash project:**
```html
<a href="https://github.com/damayanthij42-44" ...>
  GitHub Repository
</a>
<!-- UPDATE: Replace href with the actual repository URL for Quick Wash -->
```

Replace `https://github.com/damayanthij42-44` with the actual repo URL.
Example: `https://github.com/damayanthij42-44/quick-wash`

---

## ✏️ How to Update G2 Technology Internship Details

Open `index.html`. Find the section marked:
```html
<!-- Internship 2 -->
<div class="internship-card reveal intern-placeholder">
```

Update:
- `intern-role` → Your actual role title
- `Duration` → Your internship dates
- Replace `placeholder-notice` with actual bullet points (like Internship 1)

---

## ✏️ How to Update Project Details

Open `index.html`. Find each project card:
```
<!-- Project 1: Quick Wash -->
<!-- Project 2: Research Paper Answer Bot -->
<!-- Project 3: Hackathon Prototype -->
```

You can update:
- Project description
- Problem statement
- Technologies used
- Key features
- My contribution
- GitHub link

---

## 🖼️ How to Add a Profile Photo

1. Save your photo as `profile.jpg` (or `.png`)
2. Place it in `assets/images/`
3. In `index.html`, find the `about-avatar` section and replace:
```html
<div class="avatar-placeholder">
  <i class="fas fa-user"></i>
</div>
```
with:
```html
<img src="assets/images/profile.jpg" alt="Damayanthi J" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
```

---

## 💾 How to Save the Project to GitHub

1. Open VS Code terminal (View → Terminal)
2. Run these commands one by one:

```bash
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/damayanthij42-44/portfolio.git
git push -u origin main
```

Then go to GitHub → Repository → Settings → Pages → Source: main → Save
Your website will be live at: `https://damayanthij42-44.github.io/portfolio`

---

## 🛠️ How to Edit Website Content

| What to change          | Where to change it         |
|-------------------------|---------------------------|
| Colors, fonts, spacing  | `css/style.css`           |
| Text content, sections  | `index.html`              |
| Animations, buttons     | `js/main.js`              |
| Certificate PDFs        | `assets/certificates/`    |
| Resume PDF              | `assets/resume/`          |
| Profile photo           | `assets/images/`          |

---

*Built with ❤️ for Damayanthi J*
