# Icons integration — batch 1 (fork adoption: override + layered CSS import)

**Date:** 2026-07-31 · **Branch:** `styling/tailwind-css-modules` · **Decisions:** D18(c) fork
adoption, D24 (local override, revert-before-PR), D27 (layer assignment `fui.components.l1`)

First icons-gated batch of the Griffel-zero campaign: fluentui consumes the headless
`@fluentui/react-icons` 3.0 fork (sibling checkout
`C:/Users/ArrayKnight/Code/fluentui-system-icons`, branch `main`, HEAD `d435375837`) and wires
its REQUIRED stylesheet into the repo's cascade-layer system. The D2a5 62 unlayered
`:global(.fui-Icon-*)` lines are deliberately UNTOUCHED — they retire in S-J only after this
import proves stable.

## 1. Fork build (icons repo — nothing committed there)

- `yarn build` in `packages/react-icons`: **green** (full pipeline — svg/font generation,
  26,443-icon atom conversion, transpile to `lib/` + `lib-cjs/`, static export map incl.
  `./styles.css` → `./lib/styles.css`).
- `yarn build-verify`: **139 passed / 8 skipped** across the 4 suites, after one environment
  artifact: the metadata-sync test failed because building on Windows re-sorts
  `metadata.json` keys by locale. Proved a pure key reordering (26,443 keys, same key set,
  order-insensitive deep-equal) and restored the committed file; the suite then passed
  (58 passed / 8 skipped). No content difference; icons working tree left clean.

## 2. Local dependency override (LOCAL-ONLY, revert before PR)

Mechanism (recorded per task + D24): **yarn `resolutions` → packed tarball**, one root entry

```
"@fluentui/react-icons": "file:../fluentui-system-icons/packages/react-icons/fluentui-react-icons-local.tgz"
```

produced by `yarn pack` in the fork's `packages/react-icons` (honors the `files` allowlist;
29.2 MB tgz). Two LOCAL-ONLY commits:

- `90d1096404` `LOCAL-ONLY(revert-before-PR): point @fluentui/react-icons at the headless fork via yarn portal`
- `b0248a57f1` `LOCAL-ONLY(revert-before-PR): consume the icons fork as a packed tarball, not a portal`

**Why the mechanism moved from `portal:` to a tarball:** the portal symlink exposes the
fork's nested `node_modules/@types/react@17.0.93` (its own pinned devDependency). TypeScript
resolving the fork's `.d.ts` walked into it and rejected `IconDirectionContextProvider` as a
JSX element (TS2786) in `react-provider`'s declaration build — a failure mode the published
npm package can never have, since tarballs ship no nested `node_modules`. The packed tarball
restores npm-faithful resolution (icons types resolve against this repo's
`@types/react@19.2.2`); `react-provider:build` green immediately after. Refresh procedure
after a fork change: `yarn pack --out ./fluentui-react-icons-local.tgz` in the fork, then
`yarn install` here.

Resolution proof: `yarn why @fluentui/react-icons` shows the `file:` locator for the root and
every workspace consumer; `node_modules/@fluentui/react-icons` is a real extracted copy with
**no nested node_modules**; `require.resolve('@fluentui/react-icons/styles.css')` →
`node_modules/@fluentui/react-icons/lib/styles.css`.

## 3. CSS import at `fui.components.l1` (commit `c5d6a9b932`)

`@import '@fluentui/react-icons/styles.css' layer(fui.components.l1);` added at both theme
emission points (the idiom matches `css/index.css`'s existing `@import … layer(fui.theme)`
modifiers):

| file                                                    | reach                                                                                                     |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `scripts/storybook/src/tailwind-theme.css`              | every storybook document — root preview, VR harness, docsite (S-E's deferred harness-import item, closed) |
| `react-tailwind-theme/css/emit.css` → `dist/styles.css` | package-consumer path: inlined at build time into the D13 root artifact, one document import covers icons |

`css/index.css` (the `@reference '#theme'` target) deliberately does NOT carry the import —
`@reference` emits nothing and must stay a definitions-only surface; the icons sheet is pure
emission.

Documented (user amendment §4) in the two module headers, DECISIONS.md **D27**, and
CONVERSION_GUIDE §2: **icons 3.0 ships its stylesheet UNLAYERED by default; adhering to the
fui layering system requires this layer-scoped import.** `fui.components.l1` is the user's
explicit altitude pick ("lowest level component layer… we can see how that plays out"), held
loosely pending the S-J VR gates.

Build-time assertions (the plan §2.1 "explicit assertion, not VR alone"):

> **Provenance caveat (added 2026-08-07).** The `@fluentui/react-icons` `dist/styles.css`
> referenced below is produced by the icons fork and reaches this workspace only through
> the LOCAL-ONLY packed-tarball override in the root `package.json` `resolutions`
> (`git revert b0248a57f1 90d1096404` removes it — `GRIFFEL_ZERO_CLOSURE.md` §3). It is
> therefore doubly unverifiable in a reviewed tree: `dist` is gitignored
> (`.gitignore:64`), and the producing dependency is not in the tree a maintainer clones.
> A byte figure quoted here previously has been removed for that reason; the structural
> assertion (which block the file contains) is what is being claimed.

- `dist/styles.css` contains the full `@layer fui.components.l1 { … }` block: base
  `:where([data-fui-icon])`, forced-colors, font `display`/family variants, RTL flip,
  bundled-pair hide.
- The fresh VR storybook bundle contains the same layered block
  (`main.*.iframe.bundle.js`: `fui.components.l1{:where([data-fui-icon]){…}`).

## 4. Icon rendering sanity (pre-sweep)

Fresh `vr-tests-react-components:build-storybook --skip-nx-cache` (exit 0, zero cache-replay
lines; first attempt surfaced the portal typing defect above, rebuilt green under the
tarball). Subset captures diffed against the seeded baselines at zero tolerance:

| subset                                                                    | pairs | verdict             |
| ------------------------------------------------------------------------- | ----: | ------------------- |
| Button `With icon before content` / `Icon only` (incl. hover/pressed/RTL) |     9 | 9/9 pixel-identical |
| Menu `icon slotted content` (default/hover/RTL)                           |     4 | 4/4 pixel-identical |
| Avatar `size+icon+badge+square`, `badgeMask` (+RTL)                       |     3 | 3/3 pixel-identical |

Screenshots: `migration/griffel-to-tailwind/validation/icons-integration-1/*.png`. Note the
baselines were captured under icons 2.x + Griffel runtime — pixel-identity across the
implementation swap is the strongest sanity signal available.

## 5. Full VR sweep

**73/73 baseline sets PASS — 4,654 screenshots, zero tolerance, zero flaky retries — after a
documented icon-content-drift adjudication covering 127 shots in 9 sets.** Driver copy
`.scratch/int1-sweep-driver.mjs` → results `.scratch/int1-sweep-results.json` (seeded
`.scratch/sweep-results.json` untouched); log `.scratch/int1-sweep.log`. Fresh
`--skip-nx-cache` build, zero cache-replay lines, capture.mjs staleness guard active on every
set. The driver was killed externally twice mid-run (same incident class S-G recorded) and
resumed from the batch results file each time; every verdict is a fresh capture against this
session's single storybook build. `react-calendar-compat` ran under its adjudicated 26px
ceiling as always.

### The adjudication: upstream icon content drift, not an integration defect

The plan's zero-diff expectation rested on the fork's parity suites proving pixel-identity
of the _implementation swap_ — which held. What additionally surfaced: the _icon artwork_
itself changed upstream between npm **2.0.311** (the lockfile-pinned version all baselines
were captured against — verified from pre-override `yarn.lock`) and the fork's atoms
(2.0.334 lineage regenerated from `main` HEAD assets). Nine sets failed deterministically
(twice each, identical pixel counts); every failing shot was bbox-verified to be confined to
specific icon glyph boxes, and each glyph was proven redrawn at the path-data level by
diffing `createFluentIcon` path arrays extracted from the cached 2.0.311 tarball vs the
fork's `lib/` (comparator: `.scratch/icon-drift.mjs`; note: ~23k of 26k icons differ as
_strings_ due to lossless converter re-serialization — z-trims, `q`/`m` shorthand — which
rasterizes identically and correctly produced no VR diffs; only the glyphs below changed
geometry visible at zero tolerance):

| redrawn glyph (2.0.311 → fork)                    | evidence                                                      | affected sets / shots                                        |
| ------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| `TextItalic24Regular`                             | different path construction (bar/diagonal endpoints moved)    | harness-se ×15, react-toolbar ×15 (14×14 bbox, all variants) |
| `LockClosed20Regular`                             | padlock rebuilt (r2.5 body + r4 shackle vs r3 construction)   | harness-se ×4, react-tree ×4 (Tree.layout, RTL-mirrored)     |
| `SearchRegular`                                   | magnifier re-centered (circle center 8.5→9.5)                 | react-input ×2, react-search ×49 (glyph box at every size)   |
| `Warning12Filled` / `WarningFilled`               | triangle radius 0.9/1.5 → rounded 2/3; interior marks moved   | react-field ×3, react-message-bar ×7 (intent column)         |
| `DiamondDismiss12Filled` / `DiamondDismissFilled` | diamond enlarged (3→3.5 / 5→6 offsets)                        | react-field, react-message-bar (same shots as above)         |
| `HeartRegular`                                    | left-lobe arc reshaped (`-6.13-.02` → `-.1-.1…-6.03.08`)      | react-swatch-picker ×7 (heart-swatch top rows)               |
| `DismissRegular`                                  | degenerate end-of-path spike removed (`l.06-.07-.06.07Z`→`z`) | react-toast ×21 (dismiss column of stacked toasts, 1–3px)    |

Non-failing serialization-only examples verified inert: `Important16Regular`,
`SquareMultiple20Regular`, `Image20Regular`, `CheckmarkCircleFilled`, `InfoFilled`,
`ProhibitedFilled`, `HeartFilled` (fill closure is implicit; z-trim cannot change fill
rasterization).

**Disposition (calendar-compat deterministic-adjudication precedent):** the 127 affected
shots were rebaselined from their deterministic candidates; provenance is recorded in each
baseline set's `manifest.json` (`adjudications` array naming the batch, the redrawn glyphs,
and every rebaselined file). Every rebaselined set was then **re-verified by a fresh
capture+diff pass in the driver** (not just the copied files): all 9 re-ran clean at zero
tolerance, harness-se's full 1,438 shots included. This is version churn a plain
`@fluentui/react-icons` 2.0.311→2.0.334+ upgrade would have produced identically under
Griffel; nothing about it involves the layer assignment, CSS reach, HCM, or the
filled/regular swap. Dark Mode / High Contrast / RTL variants of the affected stories moved
in lockstep with their base shots (RTL bboxes exactly mirrored), which is itself evidence
the layered stylesheet behaves uniformly across modes.

## 6. Jest impact scan (3 icon-heavy packages)

| package      | result                                                                                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| react-button | **green** — 9 suites, 198 passed (13 pre-existing skips), 2 snapshots passed, no churn                                                                         |
| react-avatar | **green** — no churn                                                                                                                                           |
| react-menu   | 3 snapshot failures → verified pure markup churn → regenerated (commit `8db61a6ba0`); rerun **green** — 25 suites, 484 passed, 3 updated / 13 passed snapshots |

Churn anatomy (from `git diff -U0`, every changed line accounted for): `class` gains the
static `fui-Icon` + `data-fui-icon=""` (attribute-driven styling); the previously-visible
`fuicm-circle-filled` token is now stripped because with Griffel atomics gone the
css-modules serializer wins pretty-format's first-match and strips `fuicm-*` tokens the
Griffel serializer used to leave; svg path `d` loses a trailing `Z` (fork's regenerated
atoms; fill-identical, arbitrated by the VR sweep). The `@griffel/jest-serializer` stays
wired this batch (S-I gated remainder — it still serves the remaining 2.x-era surface).

## 7. Other gates

- **SSR** (`ssr-tests-v9:test-ssr`): **green** — "Test finished successfully" (headless
  icons render server-side; attributes need no runtime style insertion).
- **Lint**: `react-menu:lint` green; all other touched files are CSS/markdown/json
  (prettier via pre-commit hook). No TS source touched.
- **Type-check**: no TS touched; `react-provider:build` (tsc declaration emit) green under
  the tarball override — the one type-sensitive surface this batch exercised.

## 8. Commits

| commit       | scope                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `90d1096404` | LOCAL-ONLY portal override (superseded mechanism, kept for the record) |
| `b0248a57f1` | LOCAL-ONLY tarball override (live mechanism)                           |
| `c5d6a9b932` | CSS import wiring + D27/CONVERSION_GUIDE docs                          |
| `8db61a6ba0` | react-menu snapshot regeneration                                       |
| _(ledger)_   | ledger + this report + sanity screenshots                              |

## 9. What this batch deliberately did NOT do

- The 62 unlayered `:global(.fui-Icon-*)` lines across 14 modules — S-J proper (3 batches,
  filled/regular swap verified on hover/open/pressed/disabled per the plan's S-J gate),
  starts only after this import proves stable.
- `@griffel/jest-serializer` removal (56 per-package entries + preset) — S-I gated remainder.
- No commits and no pushes in the icons repo; no pushes here.
