# V9 Visual Regression Tests

## Run

```bash
yarn nx run vr-tests-react-components:test-vr
yarn nx run vr-tests-react-components:e2e
```

| Target    | Storybook outputs           | Result                                                         |
| --------- | --------------------------- | -------------------------------------------------------------- |
| `test-vr` | Full SVG + focused fonts    | StoryWright captures in `dist/screenshots`                     |
| `e2e`     | Focused SVG + focused fonts | Playwright assertions; failure artifacts in `dist/e2e-results` |

## Shared icon coverage

[IconSizing.stories.tsx](src/stories/IconSizing.stories.tsx) and its
[font wrapper](src/stories/IconSizingFont.stories.tsx) reuse the
[same fixtures](src/stories/IconSizingSlots.tsx). Add examples there, expose them
through both story files, and update the [E2E story list](e2e/icon-sizing.spec-e2e.ts).

- Default/custom icons, all PresenceBadge statuses and sizes, plain italic content,
  mixed text/icon wrappers, unmarked custom SVGs, and focused SearchBox trailing content.
- Playwright checks dimensions, loaded font faces, text preservation, and forced-color
  outlines. Storybook hooks signal render readiness; assertions live only in `e2e/`.
- Half-star screenshots are compared with live full/empty references across Rating,
  RatingDisplay, sizes, and LTR/RTL. Each painted half must match within 20% of the
  reference difference and be closer to the correct reference than the opposite one.
  No checked-in pixel baselines are needed.

StoryWright captures high-contrast themes but does not emulate forced colors;
Playwright explicitly activates that media feature. Pixel checks verify clipping,
not independent glyph identity or contrast compliance; visual review is still needed.
This is focused icon coverage, not a full-suite font-renderer matrix.

## Preview

```bash
yarn nx run vr-tests-react-components:start --port 6006
FLUENTUI_ICON_VARIANT=fonts yarn nx run vr-tests-react-components:start --port 6006
```

Open the **Icon sizing** story group (or **Icon sizing fonts** in the focused font
build). Unsupported font icons intentionally fall back to SVG. See
[shared icon configuration](../../scripts/storybook/README.md#configurereacticons).
