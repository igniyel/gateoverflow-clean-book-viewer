# GateOverflow Book — Clean Reader

A small userscript that turns the GateOverflow Book viewer into a focused reading surface: less chrome, contained scrolling, centered content, and a compact Light/Dark toggle.

## What it does

- Hides surrounding GateOverflow page chrome so the book viewer gets the space.
- Keeps scrolling inside the sidebar and reading area instead of the whole page.
- Centers the book content with a small desktop offset that is removed in fullscreen.
- Hides selected viewer controls that are not useful for a clean reading workflow.
- Adds a compact Light/Dark toggle and persists the selected theme.
- Re-applies the layout when the Book Viewer is inserted or updated dynamically.

## Install

Use a userscript manager such as Tampermonkey or Violentmonkey.

1. Open `script.user.js`.
2. Install the script in your userscript manager.
3. Open a GateOverflow Book page.
4. The clean reader layout is applied automatically.

## Scope

The script only targets:

```text
https://gateoverflow.in/book*
```

It uses `@grant none` and does not require a build step.

## Notes

The script intentionally relies on GateOverflow's current Book Viewer DOM structure and theme attributes. Changes to the site's markup or class names may require updates to the selectors in the script.

The Light/Dark toggle persists the theme through the site's `theme` localStorage key and updates the document `data-theme` attribute.

## Development

There is no build system. Edit the `.user.js` file directly, reload the userscript, and refresh the target page.

A practical local check before committing is:

```bash
node --check gateoverflow-clean-reader.user.js
```

## Project structure

```text
.
├── script.user.js
└── README.md
```

## Version

Current userscript version: `1.4`
