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
filename collisions. They cover default and high-contrast themes.
Other stories are not included in the focused font build.

The existing `IconSizing` and `IconSizingFont` story files also cover:

- Default SearchBox search/dismiss icons; Combobox and Dropdown expand/clear icons;
  Option check icons; Select and TagPickerControl icons; Rating/RatingDisplay icons.
- Every PresenceBadge status, with and without out-of-office, at every size.
- Custom icons in every affected public slot, including Input's before/after,
  SearchBox's before/after/dismiss, RatingItem's selected/unselected slots,
  and PresenceBadge's icon. Attachment coverage stays in the separate migration
  Storybook; the VRT app does not depend on the v0-to-v9 migration package.
- Plain `<i>` content and a mixed `<span>` containing both italic text and a Fluent
  icon. Plain text is compared with adjacent unstyled text; Input/SearchBox retain
  their direct-child sizing behavior, while descendant selectors still reach icons
  in mixed wrappers.
- Unmarked custom SVGs, which must keep receiving the existing SVG styling even in
  the font build. Custom and mixed content also have high-contrast variants.

Font-specific selectors use `.fui-Icon-font`, not bare `i`, so ordinary italic text
does not receive icon-only sizing, block layout, flex, or text-stroke rules. Existing
SVG selectors and child/descendant combinators are preserved. The class filter has
higher specificity than the previous type selector; consumer slot overrides may
need to target the same marker. No `:where()` is used because it exceeds the
documented browser support matrix.

SearchBox's trailing content is hidden until focus. Custom-content stories capture
the full fixture and then focus each size's SearchBox to capture its trailing slot.
These cases extend the same two builds; no additional Storybook instance is needed.

### Icon browser assertions

```bash
yarn nx run vr-tests-react-components:e2e
```

Playwright runs real Chromium assertions against two focused, production Storybook
outputs. `e2e` depends on:

- `build-storybook-icons-svg`: sets `FLUENTUI_VRT_ICON_SIZING=true`, selects only
  `IconSizing.stories.tsx`, and writes `dist/storybook-icons-svg`.
- `build-storybook-fonts`: reuses the existing focused font build and output.

The Playwright server only serves these prebuilt directories; it does not build
Storybook. Tests and VRT render the same stories and examples. Assertions live in
`e2e/`, not in Storybook `play` functions, so StoryWright remains capture-only.
The E2E command checks both build indexes contain exactly the expected icon stories.

The suite asserts renderer selection, loaded font faces, fixed dimensions, every
PresenceBadge status/size combination, plain italic text preservation, mixed-wrapper
inheritance, and half-rating container geometry and non-shrinking icons. It clicks
each SearchBox size to check trailing content after focus. Dedicated tests emulate
`forced-colors: active` and check font rating text strokes; selecting a high-contrast
theme alone is not treated as forced-color coverage. Unmarked custom SVGs must
remain SVG in both builds.

`HalfStarClipping` renders full, empty, and half-filled references for Rating and
RatingDisplay, at every size in LTR and RTL. Playwright screenshots each first star
and compares the actual pixels in each half against the appropriate live reference:
filled on the left in LTR and on the right in RTL, empty on the opposite side.
Each half must be close to its expected reference (less than 20% of the full/empty
reference difference) and closer to it than the opposite reference. This allows
minor antialiasing differences without accepting a reversed or unclipped star.
The comparisons run in both renderer projects and require no checked-in image
baselines or extra Storybook build.

Before interacting, Playwright waits for the stories' `afterEach` readiness marker.
This lets Storybook finish its initial animation wait before focus changes can
cancel transitions. The hook signals readiness only; it contains no assertions.

The existing PR workflow invokes affected `e2e` targets, including this project's.
`test-vr` remains unchanged as the screenshot entry point and still uses the full
SVG build plus the focused font build. Running `e2e` alone does not build the full
VRT Storybook. Its focused SVG build is an additional cached target, not another
build added to `test-vr`. Both targets reuse `build-storybook-fonts` on the same
checkout/cache; separate CI runners need their own builds or cache restoration.

Storybook build inputs exclude `e2e/` and the Playwright configuration so changing
assertions does not invalidate their build cache. Failure screenshots and traces
are written to `dist/e2e-results` and included in the PR workflow's existing E2E
failure artifact upload.

### Visual checks and limitations

Open the following direct story previews in each renderer:

- [Default icon sizes](http://localhost:6006/iframe.html?id=icon-sizing--default-theme&viewMode=story)
- [Default icon slots](http://localhost:6006/iframe.html?id=icon-sizing--default-icon-slots&viewMode=story)
- [All presence icons](http://localhost:6006/iframe.html?id=icon-sizing--all-presence-icons&viewMode=story)
- [Painted half-star clipping](http://localhost:6006/iframe.html?id=icon-sizing--half-star-clipping&viewMode=story)
- [Custom icon slots](http://localhost:6006/iframe.html?id=icon-sizing--custom-icon-slots&viewMode=story)
- [Plain italic slot content](http://localhost:6006/iframe.html?id=icon-sizing--italic-slot-content&viewMode=story)
- [Mixed text and icons](http://localhost:6006/iframe.html?id=icon-sizing--mixed-slot-content&viewMode=story)
- [Unmarked custom SVGs](http://localhost:6006/iframe.html?id=icon-sizing--custom-svg-slots&viewMode=story)
- [Attachment with overridden typography](http://localhost:6007/iframe.html?id=migration-shims-v0-attachment--typography-overrides&viewMode=story)

In the focused font build, use the same story suffixes with the `icon-sizing-fonts`
prefix. The unmarked custom SVG story intentionally stays SVG in both builds.

The icon-sizing stories contain no `play` assertions. Use the E2E command above to
run their assertions; building Storybook or capturing screenshots does not run them.
The separate migration Storybook's Attachment fixture retains its manual checks
and is not part of this VRT project's E2E suite.

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

Browser assertions fail the `e2e` command. The half-star pixel comparisons verify
painted clipping and fill direction relative to live full/empty references, but
do not independently prove the reference glyph's identity or visual contrast.
Those aspects still need VRT/visual inspection. The VRT and E2E icon suites are
focused coverage, not a full-suite font-variant matrix.

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
