# GATEOverflow Clean Book Viewer

A lightweight userscript that customizes the **GATEOverflow Book Viewer** for a cleaner, more focused reading experience.

The script is intended for use with a userscript manager such as **Tampermonkey**. It modifies the Book Viewer interface in the browser without changing the underlying book content.

## Features

- Hides selected Book Viewer controls that are not needed for reading.
- Removes selected page/site chrome for a cleaner interface.
- Keeps the main Book Viewer layout focused on the book content.
- Prevents unwanted outer-page scrolling while preserving scrolling inside the sidebar and book content areas.
- Centers the book content area for a more comfortable reading layout.
- Restores the appropriate content positioning when entering fullscreen.
- Adds a light/dark theme toggle with the selected theme saved in browser storage.
- Uses CSS overrides with `!important` where necessary so the customization remains effective against existing site styles.
- Can be customized by editing the CSS selectors in the script.

## Theme Toggle

The script stores the selected theme in `localStorage` and applies it through the document's `data-theme` attribute.

The theme button displays:

- `☾ Dark` when light mode is active
- `☀ Light` when dark mode is active

## Live Preview 
![GATEOverflow Clean Book Viewer Lightmode Demo](https://www.image2url.com/r2/default/gifs/1791036994403-828f9671-372a-4460-b180-b43c8cebf38d.gif)
![GATEOverflow Clean Book Viewer Darkmode Demo](https://www.image2url.com/r2/default/gifs/1791037182361-9f092008-0df4-443c-802b-0e76d9989422.gif)

## Installation

### 1. Install a userscript manager

Install **Tampermonkey**: https://www.tampermonkey.net/

### 2. Install the script

You can install the userscript by:

1. Opening the `.user.js` file and allowing Tampermonkey to install it.  OR,
2. Opening Tampermonkey, creating a new script, and pasting the script contents. OR,
3. Opening the raw `.user.js` file from GitHub and installing it through Tampermonkey.

Tampermonkey uses userscript metadata such as `@name`, `@match`, and `@description` to identify the script.

**Documentation**: https://www.tampermonkey.net/documentation.php

### 3. Enable userscript execution when required

On recent Chrome/Chromium-based browsers, Tampermonkey may require **Allow User Scripts** to be enabled, or Developer Mode may need to be enabled depending on the browser and Tampermonkey configuration.

See FAQs: https://www.tampermonkey.net/faq.php

## Usage

After installation:

1. Open a GATEOverflow Book Viewer page covered by the script's `@match` rule.
2. Make sure the userscript is enabled in Tampermonkey.
3. Reload the page.
4. The Book Viewer interface will be adjusted automatically.

No separate application or server is required.


## Troubleshooting

### The script does not run

Check that:

- Tampermonkey is installed and enabled.
- The script itself is enabled.
- The current page matches the script's `@match` rule.
- The browser allows userscripts to execute.
- The page has been reloaded after changing the script.

## Compatibility

The script is designed for the GATEOverflow Book Viewer and a browser environment that supports modern userscripts, DOM APIs, CSS, and `localStorage`.

Compatibility depends on the current structure of the target page.

## Important Notes

- This is a client-side customization.
- It does not modify GATEOverflow's server-side data.
- It is not intended to bypass authentication, access controls, or security protections.
- The script may require maintenance if the Book Viewer interface changes.
- Use the script in accordance with the target website's terms and applicable policies.

## Demo

▶ [Watch the GATEOverflow Book Viewer demonstration on YouTube.](https://www.youtube.com/watch?v=7pWf5UXEZFU)

## Contributing

Bug reports, selector updates, layout improvements, and compatibility fixes are welcome.

When reporting an issue, include:

- browser and userscript manager,
- affected Book Viewer page,
- what changed,
- and the relevant selector or code section when possible.

## License

No license is currently specified.

