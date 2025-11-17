# Ekwa Owl Carousel

Ekwa Owl Carousel is a small WordPress plugin that provides a Gutenberg "Carousel" block using Owl Carousel. The block supports inner blocks for carousel items, custom navigation SVG icons, responsive item counts, autoplay, dots, and margin settings.

---

## Features

- Gutenberg block: `ekwa-blocks/carousel` (server-side rendered)
- Child block: `ekwa-blocks/carousel-item`
- Lazy-loading of Owl Carousel assets on user interaction (mouse move / scroll)
- Configurable responsive slides-per-device, autoplay, dots, nav, margin
- Custom SVG prev/next navigation icons (sanitized and allowed)
- Plugin update checker integrated

---

## Requirements

- WordPress 6.1+
- PHP 7.0+
- Node.js + npm (only required for development / building)

---

## Installation (as a user)

1. Copy the `ekwa-owl-carousel` folder to your WordPress `wp-content/plugins/` directory.
2. Activate the plugin in the Plugins admin screen.
3. Use the "Carousel" block in the block editor and add carousel items.

Note: The plugin ships compiled files in `build/`. If you modify `src/`, you'll need to rebuild (see Developer section).

---

## Developer: build & run

From the plugin root (where `package.json` lives):

```bash
npm install
npm run build   # create production build in `build/`
npm run start   # start dev watcher
```

If your environment doesn't have `@wordpress/scripts` available globally, `npm install` will fetch it (see `package.json`).

After `npm run build` the `build/` folder will be updated and WordPress will use the compiled block and `build/render.php` for server-side rendering.

---

## Server-side rendering details

- The block is registered from `carousel.php` and references the compiled `build/` directory.
- The block uses a PHP render callback (`render.php`) so the front-end HTML is produced by PHP. This keeps markup stable across script builds and helps with backward compatibility.

---

## Assets loading & jQuery dependency

- Owl Carousel JS and CSS are injected lazily (on first mousemove or scroll) to improve perceived performance.
- The plugin checks for `jQuery` before injecting Owl Carousel. It retries for up to 8 seconds (50ms intervals) before giving up and logging an error.
- If you prefer immediate load, you can change the injection logic in `carousel.php`.

---

## SVG icons & sanitization

- Navigation icons are stored as block attributes (`prevBtnSvg`, `nextBtnSvg`) and rendered server-side.
- To allow SVG icons while keeping output safe, the plugin uses `wp_kses()` with a whitelist for `<svg>` and `<path>` attributes (including `viewBox` — handled as lowercase in the whitelist).
- If you add more SVG attributes, extend the allowed list in `src/render.php` and rebuild.

---

## Troubleshooting

- If you still see old class names (e.g. `bizgrow`), run `npm run build` to compile `src/` changes into `build/`.
- If SVG icons appear but are empty, confirm the SVG has a `viewBox` attribute. The plugin allows `viewbox` (lowercase) in its whitelist to avoid stripping it.
- If carousel doesn't initialize, check console for `jQuery` related errors — the plugin waits for jQuery before injecting Owl Carousel.

---

## Contributing

- Fork the repo, make changes in `src/`, then run `npm run build` and create a PR.
- Keep code style consistent with existing files.

---

## License

GPL-2.0-or-later

---

If you'd like, I can also:

- Add a short CHANGELOG.md
- Add automated build instructions for GitHub Actions
- Add more allowed SVG attributes or a sanitization helper

Tell me which you'd like next.