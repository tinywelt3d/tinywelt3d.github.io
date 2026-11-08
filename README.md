# tinywelt3d.github.io

Link page for **TinyWelt3D** – *Mini worlds brought to life.*
Live at <https://tinywelt3d.github.io>

## Files
- `index.html` – the link page (buttons, colours, layout)
- `impressum.html` – Impressum & Datenschutz (legal notice / privacy)
- `fonts.css` – Comfortaa, Montserrat and Nunito. The font files themselves are downloaded into `fonts/` by the deploy workflow, so they're served from this site and visitors never connect to Google
- `logo.svg` – logo, also used as favicon
- `.github/workflows/static.yml` – publishes the site automatically on every push to `main`

## Adding a new button
Copy one `<a class="link" ...>` block in `index.html`, change the link and label, and commit.
Icons are Font Awesome Free SVGs (CC BY 4.0) – copy the `<path>` from fontawesome.com.

## Credits
Fonts: SIL Open Font License 1.1 · Icons: Font Awesome Free (CC BY 4.0)
