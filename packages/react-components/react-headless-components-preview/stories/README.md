# @fluentui/react-headless-components-preview-stories

Storybook stories for [`@fluentui/react-headless-components-preview`](../library).

These stories double as the visual reference for the "Design system" design language: the
headless components stay unstyled in `library/`, all visual concerns live in CSS
Modules, and the stories pull both together.
`.storybook/tokens.css` is imported once in `.storybook/preview.js` and defines
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

## DatePicker integration status

Headless DatePicker is **blocked**, not implemented or exported. The final DatePicker stack layer
reserves this integration after the styled implementation and its separate public-preview
publication layer. Do not use the styled Calendar as a temporary default for an unstyled DatePicker.

Prerequisites:

- [Headless Calendar, microsoft/fluentui#36752](https://github.com/microsoft/fluentui/pull/36752)
  must provide the unstyled Calendar family and its public composition/focus contract.
- [Calendar popup focus and geometry fixes, microsoft/fluentui#36917](https://github.com/microsoft/fluentui/pull/36917)
  must merge independently before rebasing the DatePicker stack. These changes intentionally
  remain outside the DatePicker GitHub PR stack.

### Verified upstream inventory

| Surface                   | Available foundation                                                                                                                                                                                                                                               | Remaining headless integration                                                                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Date state and validation | [`useDatePickerBase_unstable`](../../react-datepicker-preview/library/src/components/DatePicker/useDatePickerBase.ts) shares controlled/uncontrolled selection, editable drafts, parsing/formatting, required/boundary/restriction validation, and popup requests. | Reuse this behavior; do not duplicate date arithmetic or callback/validation rules.                                                                                                                                |
| Props and state           | [`DatePickerBaseProps` and `DatePickerBaseState`](../../react-datepicker-preview/library/src/components/DatePicker/DatePicker.types.ts) are exported. The base hook does not produce DOM slots or accept a ref.                                                    | Define native/headless slots and preserve the native input ref. Do not alias the styled Input/Calendar slot types or claim the base state is renderable.                                                           |
| Input                     | The headless [Input family](../library/src/components/Input) already exists.                                                                                                                                                                                       | Preserve Field naming, required/invalid associations, text editing, and consumer slot forwarding without appearance/size defaults or icons.                                                                        |
| Calendar                  | The current base does not export a headless Calendar subpath.                                                                                                                                                                                                      | Integrate the public unstyled Calendar family from the prerequisite PR; verify selection/range events, restricted dates, view switching, and focus entry.                                                          |
| Popup and rendering       | The [styled integration](../../react-datepicker-preview/library/src/components/DatePicker/useDatePicker.tsx) documents and tests open/dismiss/focus behavior; its renderer composes styled Input and Calendar and cannot be aliased.                               | Use headless popup/positioning primitives, with correct document ownership, SSR/hydration, Escape/outside dismissal, and input-focus restoration. Do not copy Tabster or Griffel into the headless implementation. |

### Completion requirements after the prerequisite lands

- Export stable `DatePicker`, `useDatePicker`, `renderDatePicker`, and related props/slots/state/event
  types through the public `date-picker` subpath. Keep the package root-export policy unchanged.
- Define and test reserved root presence attributes for behavioral state (`data-open`,
  `data-disabled`, and `data-invalid`), including their absent states and consumer-override
  protection. These are proposed selectors, not an API currently available to consumers.
- Cover conformance, controlled/uncontrolled selection and visibility, validation callbacks,
  accessible input/dialog relationships, and consumer slot/ref forwarding.
- Add browser coverage for open/select/close and inverse actions, Escape/outside dismissal, focus
  entry/return, Calendar keyboard/view navigation, RTL, iframe ownership, and hydration.
- Add token-based CSS Module stories demonstrating default, editable, controlled, invalid, and
  disabled states, with light/dark themes, visible focus, forced-colors support, and complete
  TSX/CSS "Show code" output.
- Add the package dependency/export-map entry, subpath API report, AllComponents bundle fixture,
  and package-scoped Beachball change file only when the implementation exists. Verify the
  headless bundle does not introduce styled Calendar, default icons, Griffel, or Tabster.

This readiness record adds no executable DatePicker API, stories, package dependencies, or release
claim. Keep the final PR in draft until the dependency and implementation requirements are met.

---

## Authoring a new component story

### 1 · The pattern at a glance

For each new component:

1. Create the headless component under `library/src/components/<Name>/` (out of
   scope for this guide).
2. Add a CSS Module at `stories/src/<Component>/<name>.module.css` driven entirely by
   `var(--…)` from `.storybook/tokens.css`. **Do not hardcode colors, sizes, or
   typography.**
3. Add a stories folder at `stories/src/<Name>/` containing:
   - `<Name>Description.md` — short MDX-friendly markdown component description.
   - `<Name>Default.stories.tsx` (and any extra variant `*.stories.tsx`).
   - `index.stories.tsx` — meta export with `title`, `component`, and docs
     description (see §3).

The component itself stays unstyled in `library/`. All visual concerns live in
the CSS Module, and stories pull both together.

### 2 · Story file boilerplate

```tsx
import * as React from 'react';
import { MyComponent } from '@fluentui/react-headless-components-preview/my-component';
import styles from './my-component.module.css';

export const Default = (): React.ReactNode => <MyComponent className={styles.root} />;
```

- No inline styles, no Tailwind, no Griffel. Tokens come from `.storybook/tokens.css`.
- Every CSS value must resolve through a `var(--…)` token.

### 3 · Show code wiring (`index.stories.tsx`)

The docsite's "Show code" panel is fully automatic — no manual wiring needed:

- **Story TSX** and **CSS Module sources** are injected at build time by
  `@fluentui/babel-preset-storybook-full-source`. Just `import` your
  `*.module.css` file and the plugin handles the rest.

```tsx
import { MyComponent } from '@fluentui/react-headless-components-preview/my-component';

import descriptionMd from './MyComponentDescription.md';
import classes from './my-component.module.css';

export { Default } from './MyComponentDefault.stories';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    docs: {
      description: { component: descriptionMd },
    },
  },
};
```

If a story uses multiple CSS modules (e.g. `Field` stories nest `Input`), just
import them all — the Babel plugin collects every `*.module.css` import it
finds.

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
| Type      | `--font-sans` (Segoe UI), `--font-mono`, `--font-display`, `--font-weight-semibold`    |
| Motion    | `--ease-standard`, `--ease-emphasized`, `--duration-fast/medium/slow`                  |

Read the file directly when in doubt: `.storybook/tokens.css`.

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
| `.storybook/tokens.css`                              | CSS custom properties, light + dark. Imported once in `preview.js`. |
| `stories/src/<Component>/<name>.module.css`          | Per-component scoped styles.                                        |
| `stories/src/<Name>/<Name>Default.stories.tsx`       | Default story body using CSS Module classes.                        |
| `stories/src/<Name>/<Name>Description.md`            | Component description shown in the Docs panel.                      |
| `stories/src/<Name>/index.stories.tsx`               | Meta + component docs description.                                  |
| `stories/.storybook/css-modules-webpack.js`          | Source-of-truth webpack wiring for `*.module.css`.                  |
| `stories/.storybook/main.js`                         | Per-package storybook (consumes the shared webpack module).         |
| `stories/.storybook/HeadlessDocsPage.tsx`            | Custom docs page wired into `parameters.docs.page`.                 |
| `stories/.storybook/HeadlessSourcePanel.tsx`         | Tabbed "Show code" panel (TSX + each referenced CSS Module).        |
| `apps/public-docsite-v9-headless/.storybook/main.js` | Deployed docsite config (re-exports from the stories storybook).    |
| `typings/static-assets/index.d.ts`                   | Ambient `*.module.css` declaration (workspace-wide).                |
