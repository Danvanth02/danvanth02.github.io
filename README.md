# Danvanth P S - Accessible Portfolio Website

Plain HTML, CSS and JavaScript. No build step. Theme: white, green and gold.

## IMPORTANT: keep this folder separate
Open ONLY this `portfolio` folder in VS Code. Do not copy the files from `github-projects/` into it.
Each project there has its own `index.html`, `style.css` and `script.js`, and copying them here
would overwrite the portfolio (this is why Home can suddenly open the To-Do list).

## Folder structure
```
index.html  about.html  projects.html  skills.html  contact.html
css/style.css     all styling (colours are variables at the top)
js/script.js      contact form validation (browser only)
images/           profile.svg and project preview images
demos/            the three working project demos (each in its own folder)
```

## Important
Every project folder has its own `index.html`. Keep them inside `demos/` and never copy them next to the portfolio `index.html`, or the home page will turn into a project.

## Still to replace
- `your-username` in GitHub and LinkedIn links (all pages).
- `YOUR-DOMAIN.example` in every canonical, `og:url` and `og:image` tag, and the JSON-LD in `index.html` and `about.html`.
- Skill percentages on `skills.html`: set them to what is honestly true for you.

## Run locally
VS Code: right-click `index.html` > Open with Live Server. Or run `python3 -m http.server 8000` here.

## Contact form
`js/script.js` validates the fields, then sends the message to Formspree (form `maeolopz`), which emails it to you. Manage messages in your Formspree dashboard.

## Deploy
GitHub Pages: push this folder to a repo, then Settings > Pages > deploy from the main branch.
