# EONLINK

ORG/OPS/CAL — a construction and project business operations prototype covering project organization, quotations, files, expenses, financial visibility, and assistance.

## Developer handoff

Start with the [product and development scope brief](EONLINK-Developer-Brief.md). An editable [Word copy](EONLINK-Developer-Brief.docx) is also included. The brief describes projected production capabilities and asks for an estimate by module and integration.

[Design direction and implementation notes](REDISENO.md) document the approved visual principles and current implementation in Spanish.

## Run locally

Requires a maintained Node.js version supporting ES modules and the built-in Node test runner (Node.js 22 or later recommended). The app has no external npm dependencies.

```sh
git clone https://github.com/rodmvm/EONLINK.git
cd EONLINK
npm run build
npm test
npm start
```

Open **http://localhost:3000/**. The server binds port 3000; stop another process using that port before starting. Keep the terminal running while using the app.

## Source structure

- `index.original.html`: preserved original bundled React prototype.
- `redesign.js`: editable components, interactions, and local persistence added to the prototype.
- `redesign.css`: shared visual system and responsive layouts.
- `build-redesign.mjs`: integrates the extension into the original bundle and validates inline JavaScript.
- `index.html`: current generated application, committed so it can run immediately.
- `server.mjs`: local static server for the application and PNG icon assets.
- `iconos-3d/`: provisional illustrations and their catalog.
- `test-redesign.mjs`: targeted checks for account propagation, file classification, and storage behavior.
- `build-brief.py`: optional Word brief builder, requiring Python and `python-docx`; not needed to run the app.

After editing the redesign source, run `npm run build` and reload the browser. Avoid editing generated `index.html` directly.

## Current interactions

- Organize and Calculate navigation, project details, overview cards, and search.
- Quotation creation/editing, demonstration approval states, and horizontal quotation carousels in global and project views.
- Business-purpose account replacement with shared account identity across financial views.
- Custom project thumbnails using the translucent white plus control, including restore and undo.
- Project document uploads stored locally with download support.
- Dark responsive surfaces, semantic accent colors, and a softly animated blue/violet background with reduced-motion support.

## Prototype boundaries

Records include example data. Browser localStorage stores application state and thumbnails; IndexedDB stores uploaded document blobs. These records are browser-specific and are not part of the Git repository. A developer cloning this repository starts with example data rather than this computer's saved records.

There is no production backend, real authentication, server-enforced permissions, live AI, banking connection, WhatsApp integration, or Google Drive integration. Assistant responses and supplier prices illustrate proposed workflows. The local server is a development preview, not a production hosting setup.

Account/card graphics identify business funding purposes; they do not process payments. The prototype must be replaced or extended with the production services and permission model described in the brief.

## Visual references

These screenshots capture the current prototype and earlier redesign views; they are visual references, not exhaustive acceptance tests.

- [Horizontal quotation cards](cotizaciones-sliding.jpg)
- [Quotation screen](redesign-cotizaciones.jpg)
- [Project screen](redesign-obras.jpg)
- [Application preview](eonlink-visible.jpg)

The final icon system and original project photography remain to be supplied. Current illustrations are provisional.
