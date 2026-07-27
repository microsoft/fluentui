# Griffel → Tailwind v4 + CSS Modules Migration

**Branch:** `styling/tailwind-css-modules` · **Started:** 2026-07-26 · **Status ledger:** `ledger.json`

## Mission

Convert the styling mechanism of every Fluent UI v9 react-component from Griffel
(`makeStyles`/`mergeClasses` CSS-in-JS) to **Tailwind v4 + CSS Modules with variant
selectors**, following the conventions established in `C:/Users/ArrayKnight/Code/nyt-games`.

**Invariants (non-negotiable):**

1. Every component looks pixel-identical and functions identically from the user's
   perspective, across all states, options, themes (web/teams, light/dark/high-contrast),
   and RTL.
2. Only the styling _mechanism_ changes. No behavior, DOM-structure, or API redesigns
   beyond what the mechanism swap strictly requires.
3. Theme values adhere to the existing Fluent UI theme (design tokens as CSS custom
   properties). The **only** Tailwind theme value carried over from nyt-games is:
   `--base-scale: calc(1rem / 16px);`
4. Validation is Storybook-driven: existing stories (docs + VR stories) are the source of
   truth for states/options/themes, screenshot-diffed before vs. after per package.
5. Deliverable includes a metrics report: build time, build output size, client bundle
   size, before vs. after.

## Target styling convention (from nyt-games, verified against its source)

- **CSS Modules** per component (`button.module.css`), header `@reference '#theme';`,
  rules inside `@layer components.lN` (N = nesting/precedence level).
- **Tailwind v4** syntax: `@apply` for utilities, `@variant <name> { ... }` for state
  blocks inside a class.
- **Custom variants** defined once in a shared theme file via
  `@custom-variant name (&:where([data-...="..."], :pseudo));` — `:where()` keeps
  specificity flat so consumer overrides win.
- **Enum props → module classes** (e.g. `styles[appearance]`, `styles[shape]`);
  **stateful/interactive props → data-attributes** (e.g. `data-size`, `data-disabled`)
  targeted by custom variants.
- **Composition:** `clsx(staticSlotClass, styles.root, styles[enumProp]..., className)` —
  consumer `className` always last.
- Dual-selector theming variants (`dark`/`light`) keyed off both class and `data-theme`.

## Directory map

| Path                  | Purpose                                                                   |
| --------------------- | ------------------------------------------------------------------------- |
| `README.md`           | This file — mission + invariants.                                         |
| `RUNBOOK.md`          | **Resume protocol.** Any session/person continues the work from here.     |
| `CONVERSION_GUIDE.md` | The cookbook workers follow for each package (exact recipes).             |
| `ledger.json`         | Machine-readable per-package status. Single source of truth for progress. |
| `reports/`            | Research reports, decisions, and the final metrics report.                |
| `workflows/`          | Orchestration workflow scripts (batch conversion, validation).            |
| `validation/`         | Screenshot-diff harness (Storybook → Playwright → pixel diff).            |
| `metrics/`            | Baseline + post-migration measurements (build time, bundle sizes).        |

## Phases

0. **Infrastructure** — research, this scaffolding, Tailwind/CSS-Modules build wiring,
   validation harness, baseline metrics capture. _(current)_
1. **Pilot** — convert 1–2 simple packages end-to-end (e.g. react-divider, react-badge);
   prove the pipeline: convert → build → screenshot-diff green → metrics.
2. **Mass conversion** — ledger-driven batches via workflow orchestration
   (Opus/Sonnet workers, Fable oversight). Update `ledger.json` after every batch.
3. **Integration** — suite package, docsite, SSR tests, conformance tests green.
4. **Report** — metrics before/after, PR authoring.
