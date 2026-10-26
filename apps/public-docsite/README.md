# [Fluent UI website](https://dev.microsoft.com/fabric)

**The official website for the Fluent UI project.**

Fluent UI is a collection of projects that represent the Fluent design language in code. This website helps document the components and styles that make up Fluent UI.

## Build the website

See the [readme](https://github.com/microsoft/fluentui) for instructions on getting started with Fluent UI development.

Once your repo is set up, run the following to start a local copy of the website. (Be sure to **start from the root of the repo**, not the `public-docsite` folder.)

```
yarn
yarn nx run public-docsite:prebundle

yarn nx run public-docsite:start
```

`yarn nx run public-docsite:start` will open your operating system's default web browser with the website. You can make changes to the code which will automatically build and refresh the page using live-reload.

## Verify responsive section navigation

The desktop sidebar becomes an inline **Section navigation** disclosure below 768 CSS pixels.
It uses ordinary navigation links, not an ARIA menu or modal dialog. Navigation remains available
with or without the host site's Universal Header and Footer.

Run the focused checks from the repository root:

```sh
yarn nx run public-docsite:test --runInBand
yarn nx run public-docsite:test-type-check
yarn nx run public-docsite:type-check
yarn nx run public-docsite:lint
yarn nx run public-docsite:bundle
```

For manual verification, start the site and open
`http://localhost:4322/#/controls/ios/button`:

1. At a 1280 CSS-pixel viewport width, confirm that the sidebar is visible and the disclosure button is absent.
2. Resize to 320 CSS pixels wide, including a short 320 by 256 viewport. Confirm that **Section navigation**
   is visible above the content. The closed navigation must not expose hidden links in the Tab sequence.
3. Tab to the button and press Enter or Space. Confirm its expanded state is announced by assistive
   technology and the same platform picker, search, categories and links become available.
4. Use Tab and Shift+Tab to enter and leave the navigation. Expand **Items & Lists** and reach **Avatar**.
   Long navigation should scroll vertically with the page, without requiring horizontal page scrolling.
5. Press Escape inside the navigation. Confirm it closes and focus returns to **Section navigation**.
6. Reopen it and activate **Avatar**. Confirm the route changes, navigation closes and focus moves to the
   content. Modified-click/new-tab navigation should not close the current page's disclosure or steal its focus.
7. Repeat at widths immediately below, exactly at, and above 768 CSS pixels. Resize while a navigation
   link or the disclosure button has focus; focus must remain on a visible control. With **Items & Lists**
   expanded and **Avatar** focused, cross the breakpoint in both directions: the category must stay
   expanded and **Avatar** must retain focus. Manually collapsed categories must also stay collapsed.
8. Separately check actual browser zoom at 200% and 400% from a 1280-wide content viewport. A 320 CSS-pixel
   viewport emulates reflow width, not actual browser zoom or text-only resizing. Also check text resizing
   to 200%, visible focus, forced colors, and a supported screen reader/browser combination.

The acceptance criteria come from W3C WAI's
[Reflow (1.4.10)](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html),
[Resize Text (1.4.4)](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html),
and [Disclosure Navigation guidance](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).
For this vertically scrolling site, Reflow requires a width equivalent to 320 CSS pixels without losing
information or functionality; it does not require the sidebar to remain permanently expanded.
The APG example is guidance, not a substitute for testing the implementation with assistive technology.
