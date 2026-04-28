# @fluentui/react-headless-components-preview-stories

Storybook stories for [`@fluentui/react-headless-components-preview`](../library).

These stories double as the visual reference for the "Design system" design language: the
headless components stay unstyled in `library/`, all visual concerns live in CSS
Modules under `theme/` at the repo root, and the stories pull both together.
`theme/tokens.css` is imported once in `.storybook/preview.js` and defines
`:root` (light) and `[data-theme="dark"]` (dark) CSS variables for every story.

## Usage

To include these stories in a Storybook composition, specify the stories globs:

```js
module.exports = {
  stories: [
    '../packages/react-components/react-headless-components-preview/stories/src/**/*.mdx',
    '../packages/react-components/react-headless-components-preview/stories/src/**/index.stories.@(ts|tsx)',
  ],
};
```

## API

No public API — this package only ships stories.

---

## Authoring a new component story

### 1 · The pattern at a glance

For each new component:

1. Create the headless component under `library/src/components/<Name>/` (out of
   scope for this guide).
2. Add a CSS Module at `stories/src/<Component>/<name>.module.css` driven entirely by
   `var(--…)` from `theme/tokens.css`. **Do not hardcode colors, sizes, or
   typography.**
3. Add a stories folder at `stories/src/<Name>/` containing:
   - `<Name>Description.md` — short MDX-friendly markdown component description.
   - `<Name>Default.stories.tsx` (and any extra variant `*.stories.tsx`).
   - `index.stories.tsx` — meta export with `title`, `component`, and the
     `parameters.docs.source.transform` wiring (see §3).

The component itself stays unstyled in `library/`. All visual concerns live in
the CSS Module, and stories pull both together.

### 2 · Story file boilerplate

```tsx
import * as React from 'react';
import { MyComponent } from '@fluentui/react-headless-components-preview/my-component';
import styles from './my-component.module.css';

export const Default = (): React.ReactNode => <MyComponent className={styles.root} />;
```

Notes:

- The `../../../../../../` reaches the repo root from
  `stories/src/<Name>/<File>.tsx`. The webpack rule that handles `*.module.css`
  is registered both in the docsite (`apps/public-docsite-v9-headless/.storybook/main.js`)
  and in this package's per-package storybook
  (`stories/.storybook/main.js`). If you add the file outside `theme/` make sure
  the rule's `include` list covers it.
- No inline styles, no Tailwind, no Griffel. Tokens come from `theme/tokens.css`.
- Every CSS value must resolve through a `var(--…)` token — search the diff
  for raw `#` and `rgb(` to confirm.

### 3 · Show code wiring (`index.stories.tsx`)

Every component's `index.stories.tsx` exposes its CSS Module source in the
Storybook "Show code" panel via `parameters.docs.source.transform`. The shared
helper at `stories/src/_helpers/withCssModuleSource.ts` does the stitching:

```tsx
import { MyComponent } from '@fluentui/react-headless-components-preview/my-component';

import descriptionMd from './MyComponentDescription.md';
import myComponentCss from './my-component.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './MyComponentDefault.stories';

export default {
  title: 'Headless Components/MyComponent',
  component: MyComponent,
  parameters: {
    docs: {
      description: { component: descriptionMd },
      source: {
        transform: withCssModuleSource({ name: 'my-component.module.css', source: myComponentCss }),
      },
    },
  },
};
```

If a story uses multiple modules (e.g. `Field` stories nest `Input`), pass them
all to `withCssModuleSource` in render order:

```ts
transform: withCssModuleSource(
  { name: 'field.module.css', source: fieldCss },
  { name: 'input.module.css', source: inputCss },
);
```

The `?raw` suffix is webpack's "asset/source" — Storybook 9's
`@storybook/builder-webpack5` ships the rule out of the box, and ambient TS
declarations live at `typings/static-assets/index.d.ts`.

### 4 · Token tiers

| Tier      | Variables (selected)                                                                   |
| --------- | -------------------------------------------------------------------------------------- |
| Surface   | `--bg`, `--bg-soft`, `--bg-elev`, `--bg-elev-2`, `--surface-muted`, `--surface-sunken` |
| Line      | `--border`, `--border-strong`, `--border-stronger`                                     |
| Ink       | `--text`, `--text-muted`, `--text-soft`, `--text-faint`, `--text-on-accent`            |
| Accent    | `--accent`, `--accent-strong`, `--accent-soft`, `--accent-contrast`                    |
| Brand     | `--brand`, `--brand-strong`, `--brand-soft` (signature magenta — hot states only)      |
| Status    | `--success`, `--warning`, `--danger`, `--info` (each with a `-soft` companion)         |
| Elevation | `--shadow-1` … `--shadow-6` (dark mode doubles opacity)                                |
| Radius    | `--radius-xs` 4 px → `--radius-3xl` 24 px, `--radius-pill` 999 px                      |
| Stroke    | `--stroke-thin/thick/thicker` (1 / 2 / 3 px)                                           |
| Spacing   | `--space-1` … `--space-16` on a 4 px grid                                              |
| Type      | `--font-sans` (Segoe UI), `--font-mono`, `--font-display`                              |
| Motion    | `--ease-standard`, `--ease-emphasized`, `--duration-fast/medium/slow`                  |

Read the file directly when in doubt: `theme/tokens.css`.

### 5 · Visual language conventions

- **Monochrome by default.** Primary action is the dark accent; everything else
  lives on a neutral gray ramp.
- **Pill-shaped controls.** Buttons, toggle buttons, message bars, badges, the
  tab segmented control, switch — all `--radius-pill`.
- **Generous radii on surfaces.** Cards, panels, dialogs use `--radius-2xl`
  (20 px) or `--radius-xl` (16 px).
- **Subtle elevation.** Default surfaces are flat; only floating overlays use
  `--shadow-3` or higher.
- **Magenta is reserved.** `--brand` shows up only for input validation errors,
  the focus halo on chat-input, and the danger button. Don't use it as a
  generic accent.

### 6 · Headless / icon gotchas

These are the things that took time to discover. Keep them in mind:

- **Headless Divider has no internal line element** — render the line via
  `::before` and `::after` on the root. The headless component only renders
  `<root><wrapper>{children}</wrapper></root>`.
- **The chat-input pattern is just an `Input`** — not a separate component. The
  `[+]` / mic / send arrangement comes from `contentBefore` / `contentAfter`.
- **Some Fluent icon names that look obvious do not exist.** Examples:
  `ProgressRingDotsRegular`, `ShimmerRegular`, `WaveformRegular`,
  `LoaderRegular`. Real equivalents: `DataBarHorizontalRegular`, `BoxRegular`,
  `MicPulseRegular`, `SpinnerIosRegular`. Verify against
  `node_modules/@fluentui/react-icons/lib/icons/chunk-*.d.ts` before using.
- **Hidden-input pattern.** Checkbox / Switch / Radio / Slider all position the
  real `<input>` absolutely with `opacity: 0` over their visual indicator. The
  CSS targets `.input:checked + .indicator` etc. Don't replace the native input
  — accessibility depends on it.
- **Slider exposes `--fui-Slider--progress`.** Use it for both the rail fill
  width and the thumb position. Don't compute it yourself.
- **`data-disabled` vs `data-disabled-focusable`.** The headless components
  emit both. Style them the same; the difference is keyboard reachability, not
  visual.
- **Disabled focus rings.** Don't suppress them — focus-visible stays on
  disabled-focusable so screen-reader users still see context.

### 7 · Verification before opening a PR

- [ ] No inline styles, no Tailwind, no Griffel — only CSS Modules + the
      headless component.
- [ ] All colors / sizes / typography come through `var(--…)`. Search the diff
      for raw `#` and `rgb(` to confirm.
- [ ] The story renders in both `data-theme="light"` and `data-theme="dark"`
      without manual overrides.
- [ ] `yarn nx run react-headless-components-preview-stories:build-storybook`
      succeeds (this is the build PR previews run; see
      `.github/workflows/pr-website-deploy.yml`).
- [ ] `yarn nx run public-docsite-v9-headless:build-storybook` succeeds (the
      deployed docsite; see `.github/workflows/docsite-publish-ghpages.yml`).
- [ ] Open the story in a browser and verify focus rings and disabled states
      visually — these are the most-likely-to-regress areas.
- [ ] The "Show code" panel shows both the JSX and the CSS Module source.

### 8 · Where things live

| Path                                                 | Purpose                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| `theme/tokens.css`                                   | CSS custom properties, light + dark. Imported once in `preview.js`. |
| `stories/src/<Component>/<name>.module.css`          | Per-component scoped styles.                                        |
| `stories/src/<Name>/<Name>Default.stories.tsx`       | Default story body using CSS Module classes.                        |
| `stories/src/<Name>/<Name>Description.md`            | Component description shown in the Docs panel.                      |
| `stories/src/<Name>/index.stories.tsx`               | Meta + `parameters.docs.source.transform` wiring.                   |
| `stories/src/_helpers/withCssModuleSource.ts`        | Helper that appends raw CSS to the Show-code output.                |
| `stories/.storybook/main.js`                         | Per-package storybook config (CSS Modules webpack rule lives here). |
| `apps/public-docsite-v9-headless/.storybook/main.js` | Deployed docsite config (mirror of the webpack rule).               |
| `typings/static-assets/index.d.ts`                   | Ambient declarations for `*.module.css` and `*?raw` imports.        |
