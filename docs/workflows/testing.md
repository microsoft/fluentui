# Testing Guide

## Test Types

| Type              | Tool                         | Command                                         | Purpose                          |
| ----------------- | ---------------------------- | ----------------------------------------------- | -------------------------------- |
| Unit              | Jest + React Testing Library | `yarn nx run <project>:test`                    | Component behavior, hooks, utils |
| Visual Regression | Storybook + StoryWright      | `yarn nx run vr-tests-react-components:test-vr` | Screenshot diffs (CI only)       |
| E2E               | Cypress                      | `yarn nx run react-components:e2e`              | Integration flows                |
| SSR               | Custom                       | `yarn nx run ssr-tests-v9:test-ssr`             | Server-side rendering safety     |
| Cross-React       | Custom                       | `yarn nx run rit-tests-v9:test-rit`             | React version compatibility      |
| Conformance       | isConformant                 | Part of unit tests                              | Consistent component API         |

## SVG and Font Icons

Shared icon configuration is exported as `configureReactIcons` from
`@fluentui/scripts-storybook`; its implementation, CSS, and tests live in
[the Storybook tooling project](../../scripts/storybook/src/react-icons-webpack.js).

SVG icons are the default renderer. Use the existing icon variant flag to run the
visual-test Storybook with font glyphs:

```bash
yarn nx run vr-tests-react-components:start --port 6006
FLUENTUI_ICON_VARIANT=fonts yarn nx run vr-tests-react-components:start --port 6006
```

The same flag works with `vr-tests-react-components:build-storybook`. The VRT app
uses separate webpack cache names for SVG, full-font, and focused font-sizing builds.
For the Attachment examples, use the migration Storybook. Run its SVG and font
variants sequentially to avoid sharing its webpack cache:

```bash
yarn nx run react-migration-v0-v9-stories:storybook --port 6007
FLUENTUI_ICON_VARIANT=fonts yarn nx run react-migration-v0-v9-stories:storybook --port 6007
```

The icon variant is included in those tasks' Nx cache inputs.

### Focused font visual regression coverage

```bash
yarn nx run vr-tests-react-components:build-storybook-fonts
yarn nx run vr-tests-react-components:test-vr
```

`build-storybook-fonts` sets `FLUENTUI_VRT_FONT_SIZING=true` and
`FLUENTUI_ICON_VARIANT=fonts`, includes only `IconSizingFont.stories.tsx`, and writes
to `dist/storybook-fonts`. It reuses the existing sizing stories without replacing
SearchBox, PresenceBadge, or RatingDisplay's default icons. Their internal icon
imports are transformed by the normal font loader.

`test-vr` depends on both the full SVG build (`dist/storybook`) and the focused
font build. It runs StoryWright sequentially against each output, saving both sets
of screenshots in `dist/screenshots` for the existing PR and baseline publishers.
The font stories use the distinct title `Icon sizing fonts` to prevent screenshot
filename collisions. They cover default, overridden-token, and high-contrast themes.
Other stories are not included in the focused font build.

### Manual icon checks and limitations

Open the following direct story previews in each renderer:

- [Default icon sizes](http://localhost:6006/iframe.html?id=icon-sizing--default-theme&viewMode=story)
- [Overridden theme tokens](http://localhost:6006/iframe.html?id=icon-sizing--overridden-tokens&viewMode=story)
- [Overridden tokens with a high-contrast theme](http://localhost:6006/iframe.html?id=icon-sizing--overridden-tokens-high-contrast&viewMode=story)
- [Attachment with overridden typography](http://localhost:6007/iframe.html?id=migration-shims-v0-attachment--typography-overrides&viewMode=story)

Storybook runs the retained `play` functions after rendering direct story previews.
They check rendered icon boxes and font readiness. Inspect Storybook's error output
and the browser console for assertion failures, and reload the story to rerun them.
Building Storybook, including with `--docs`, does not execute these checks. Inline
Docs stories do not autoplay them by default; use the direct previews above.

Check that supported icons render as `i` in font mode and that fonts have loaded
before taking screenshots or measuring layout. Unsupported icons, including color
icons without a font equivalent, intentionally fall back to SVG.

Manually compare both renderers at the same viewport and zoom for icon and control
dimensions, alignment, spacing, disabled/selected/hover states, RTL, dark themes,
and forced colors. Include all
PresenceBadge sizes and half-filled Rating/RatingDisplay icons. Font glyphs need
`font-size` to scale their content; changing their width and height alone is not
equivalent to scaling an SVG. SVG `stroke` also does not outline a font glyph.
The high-contrast story selects a theme; also emulate `forced-colors: active` in
the browser's rendering tools to exercise the forced-colors media queries.

Include a custom theme with overridden typography, spacing, and stroke tokens.
Existing fixed icon dimensions must remain fixed in both renderers; matching a
token's default pixel value does not preserve that contract when the token changes.
The retained box checks do not prove that the painted glyph fills its box, that
half-value clipping is correct, or that outlines remain visible. Those aspects
still need visual inspection; CSS property equality checks are not a substitute.

These are manual checks, not a reliable CI assertion gate. StoryWright opens story
previews, which can trigger `play`, but the current runner does not explicitly await
`play` completion or propagate its failures into its exit status. A successful
screenshot capture therefore does not prove that the assertions passed. The
current VRT workflow captures the focused font sizing stories, not a full
font-variant matrix. The font stories' manual checks also reject SVG icons so a
missing font transformation cannot silently pass those checks.

**TODO:** Additional browser-testing design is required before treating these
stories as CI-enforced regression coverage. Decide the runner and ownership,
completion/error propagation, SVG/font matrix and cache inputs, Attachment coverage,
and forced-color emulation. Prove the chosen CI command exits nonzero for a
deliberately broken rendering before relying on it as a gate.

## Writing Unit Tests

Tests live adjacent to the component they test:

```
components/Button/
├── Button.tsx
├── Button.test.tsx          ← here
└── ...
```

### What to Test

- Default rendering (snapshot)
- All prop variants
- User interactions (click, keyboard, focus)
- Accessibility (ARIA attributes, roles, keyboard navigation)
- Controlled and uncontrolled patterns
- Edge cases (null children, empty arrays, etc.)

### Updating Snapshots

If your change intentionally alters rendered output:

```bash
yarn nx run <project>:test -u
```

Review the snapshot diff to verify the change is correct before committing.

### Motion Preferences in Browser Tests

When asserting animation lifecycles, explicitly emulate `prefers-reduced-motion: no-preference` rather than relying on the runner's operating-system setting. Emulate `reduce` for reduced-motion cases and clear media emulation in `afterEach` so settings do not leak between tests.

## Conformance Tests

Every component package has a `testing/isConformant.ts` file that validates:

- Component renders without crashing
- Ref forwarding works
- className merging works
- `as` prop (if applicable) works
- Accessibility basics

## SSR Safety

Components must work in server-side rendering. Never access browser APIs without guards:

```tsx
// WRONG — crashes on server
const width = window.innerWidth;

// RIGHT — guarded access
const width = typeof window !== 'undefined' ? window.innerWidth : 0;

// BETTER — use useIsSSR or check canUseDOM
import { canUseDOM } from '@fluentui/react-utilities';
if (canUseDOM()) {
  // safe to use window/document
}
```
