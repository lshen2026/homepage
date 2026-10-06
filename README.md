# homepage
# publish

# Lu Shen Academic Homepage

Academic homepage of Lu Shen, Assistant Professor at Peking University.

## Edit Page Content

Each page has its own HTML file:

- `pages/home.html`: introduction, recent research, and selected papers.
- `pages/research.html`: research interests.
- `pages/publication.html`: metrics and complete publication lists.
- `pages/people.html`: student mentoring summary.
- `pages/teaching.html`: courses, textbooks, and teaching awards.
- `pages/about.html`: background, service, awards, and media.
- `pages/contact.html`: contact information.

Edit `index.html` for the shared sidebar and navigation. Edit `assets/style.css` for global presentation and `assets/publication.css` for publication typography. The page loader is in `assets/app.js`.

## GitHub Pages

Keep index.html, .nojekyll, pages/, and assets/ together at the repository root. In Settings → Pages select Deploy from a branch, main, and / (root). Every commit to main triggers publication. No build step is required.

The site supports both user sites and project paths such as /homepage/. Preview through an HTTP server rather than a file URL.
