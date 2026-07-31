# S-I — Residue sweep (ungated portion)

**Date:** 2026-07-31 · **Branch:** `styling/tailwind-css-modules` · **Scope:** provenance comments,
RFC/handbook/contributor docs, `CONVERSION_GUIDE.md §2` D2a5 close-out, `DECISIONS.md` superseding
amendment, package README/MIGRATION staleness. The icons-gated remainder is listed in §5 and is
explicitly NOT done here.

The plan's "~216 provenance comments" estimate was measured before the mass conversion finished;
the actual surface at S-I start was **2,787 `griffel`-mention lines across 1,351 non-deprecated
files** (excluding CHANGELOGs, api.md, snapshots). This sweep worked that surface by class, not
line-by-line: each repeated comment class got one keep/drop/condense ruling, applied by script with
exact-match verification; bespoke variants were edited by hand. After the sweep: **1,825 mention
lines remain**, and every remaining class is enumerated below with its reason.

## 1. Comment classes DROPPED or CONDENSED

| class                                                                                                                                                                                                   | files | ruling                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `make-styles-overrides-win` narration in component `*.test.tsx` (the blocks S-H left "for the S-I provenance sweep")                                                                                    |   165 | scripted: history paragraph → 3-line live-constraint note on `classname-overrides-win` (D2/D9)                                                                                                       |
| same class, bespoke variants (DataGrid\* ×6, swatch-picker ×4, Tooltip, AvatarGroupPopover, TeachingPopoverCarouselCard, AriaLive, Toaster, Drawer, OverlayDrawer, NavDrawer, migration-v0-v9 jsdoc ×8) |    26 | hand-matched replacements; live nuances (portal roots, marker sets, `TooltipSlots` has no `root`, D16.3 dual markers) kept verbatim                                                                  |
| `src/testing/isConformant.ts` wrapper blocks claiming "`griffelTests` stays registered" — **stale**: S-H unwired griffelTests from every wrapper                                                        |    15 | 11 wrappers: block deleted outright (pure narration + false claim); 4 wrappers (color-picker, text, table, teaching-popover): live wiring rationale kept, narration + stale claim dropped            |
| `// Griffel → Tailwind + CSS Modules migration (…)` bare header lines heading the blocks above                                                                                                          |     — | dropped with their blocks (they were the first line of the rewritten paragraphs)                                                                                                                     |
| `NOTE on the directive above (Griffel → …):` / `NOTE (Griffel → …):` 'use client' framing                                                                                                               |    65 | parenthetical stripped (`NOTE on the directive above:` / `NOTE:`); bodies kept — they are the live reason a directive is present/absent                                                              |
| `/* Story styles for X, converted from Griffel makeStyles (S-F batch N). * Token references are the CSS variables they compile to. */` story-CSS headers                                                |   509 | scripted: 508 header clauses + 505 "compile to" lines rewritten to `/* Story styles for X. * Token references are the Fluent theme's CSS variables. */`; bespoke tails (value-resolution notes) kept |
| ThemeFonts story header (hand-conversion variant)                                                                                                                                                       |     1 | first line trimmed, Teams-light-theme rationale kept                                                                                                                                                 |
| test-fixture history clauses ("was a Griffel makeStyles rule/hook … (S-H)") in Menu.cy, Dialog.test, useActiveDescendant.cy + headless Introduction.module.css header                                   |     4 | condensed to what the fixture IS, history clause dropped                                                                                                                                             |
| `react-conformance` `classNameOverridesWin.tsx` jsdoc + `README.md` — told Griffel-composing consumers to "keep using" the retired package                                                              |     2 | updated: package named as retired, no further releases; the by-design "Griffel composition does not satisfy this test" rationale kept                                                                |

**Net: ~787 files with comment edits, all verified comment-only** (see §4 gate 1).

## 2. Comment classes KEPT, with reasons

| class                                                                                                                                                                                                                                                   | approx. size | reason                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `*.module.css` evidence headers (layer-assignment maps mirroring mergeClasses argument order, RTL pair analysis, "Verified against the compiled Griffel atomics in lib-commonjs/…")                                                                     |   ~106 files | the only record of WHY each value/order is load-bearing, and the reviewer's map for the migration PR. Ruling recorded in CONVERSION_GUIDE §2: citations STAY until the PR lands; dropping them is a post-merge cleanup |
| slice citations (`/* from useXStyles.base */`) and mergeClasses-order mentions in hooks                                                                                                                                                                 |    pervasive | same PR-review-aid ruling                                                                                                                                                                                              |
| `jest.config.js` serializer explanation headers                                                                                                                                                                                                         |    ~59 files | describe the live `@griffel/jest-serializer` + cssModules serializer wiring — **icons-gated**, retires with the serializer itself (§5)                                                                                 |
| retirement notes at public API sites (umbrella `src/index.ts` D19/S-G blocks, react-migration-v0-v9 `src/index.ts`, react-tabster `focus/index.ts`, react-positioning `types.ts`, provider D20/nonce/TextDirectionProvider notes)                       |          ~10 | they state the replacement path — the live consumer contract for the major. "Update" ruling applied where they claimed re-exports still exist (none did)                                                               |
| contextual migration citations inside live explanations (jsdom-injection test rewrites, `fuiSelector` `/`-marker notes, charts §3d M2 prop-placement, `contexts/constants.ts` literal-duplication warnings, FluentProvider hydrate/node snapshot notes) |         ~120 | each documents why code is shaped oddly; the migration reference is the citation, not narration                                                                                                                        |
| `eslint-plugin-react-components` README/rule Griffel examples                                                                                                                                                                                           |            2 | the `enforce-use-client` rule deliberately keeps detecting Griffel usage for external consumers (S-H kept-tooling list)                                                                                                |
| VR `utils.module.css` scaffolding headers                                                                                                                                                                                                               |           15 | evidence blocks (typography expansion, RTL flip rationale) — same ruling as module.css headers                                                                                                                         |
| D11 survivors, `deprecated/`, rule/executor fixtures                                                                                                                                                                                                    |            — | out of scope by instruction                                                                                                                                                                                            |

## 3. Docs

| doc                                                                                                                                                                                                               | action                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7 styling-centric RFCs (`make-styles-no-functions`, `move-out-n-rename-makestyles`, `no-css-shorthands-in-make-styles`, `custom-styling`, `make-overrides`, `provider-style-overrides`, `stop-styles-transforms`) | **annotated, not rewritten** (historical records): uniform `> **Status (2026-07)**` note after the H1 pointing to DECISIONS.md + CONVERSION_GUIDE                            |
| `specs/makeStyles.md`                                                                                                                                                                                             | annotated historical (tailored note: no longer used by nor re-exported from the umbrella, D19)                                                                               |
| `docs/react-v9/contributing/rfcs/react-components/styles-handbook.md`                                                                                                                                             | already had an S-F scope note, but it claimed the Griffel APIs "are still re-exported from `@fluentui/react-components`" — **stale after S-H**; rewritten to the D19 reality |
| `react-text` + `react-image` `docs/MIGRATION.md`                                                                                                                                                                  | same stale re-export claim fixed; react-text's two sentences actively RECOMMENDING `makeStyles()` migration rewritten to plain-CSS-through-`className` guidance              |
| `packages/eslint-plugin/README.md` `no-restricted-imports` example                                                                                                                                                | example config/snippets no longer teach `import { makeStyles } from '@fluentui/react-components'` (now impossible); rewritten on `webDarkTheme` only                         |
| `react-components/docs/MIGRATION-NOTES.md`, `react-headless-components-preview` README, `basic-recomposition.md`, react-wiki-archive, incidental-mention RFCs (~13)                                               | already correct/annotated or mention is incidental — untouched                                                                                                               |
| `.github/CODEOWNERS`                                                                                                                                                                                              | only Griffel line is the `deprecated/react-conformance-griffel` path — correct, untouched                                                                                    |

Counts: **8 docs annotated** (7 RFC notes + 1 spec note), **5 docs rewritten where misleading**
(styles-handbook, 2 MIGRATION.md, eslint-plugin README, react-conformance README), rest verified
and left alone.

## 4. CONVERSION_GUIDE §2 + DECISIONS.md (D2a5 close-out)

- **CONVERSION_GUIDE §2** Scope paragraph updated: in-repo transitional half CLOSED (promotions
  completed S-G / charts C7); icons half no longer permanent — unlayered `:global(.fui-Icon-*)`
  blocks stay REQUIRED until icons 3.0 adoption and retire in S-J. Comment-trail bullet updated
  with the S-I ruling (citations stay until the PR lands).
- **DECISIONS.md** — new section `D2 amendment 5 — superseding amendment: the "permanent" scope is
retired (S-I, 2026-07-31)` appended after the D2a5 postmortem, with an inline
  `(Superseded in part …)` marker on the original Scope clause (original text preserved). Records:
  both premises gone, the 62 lines / 14 files are transitional pending S-J, the lint-rule hardening
  is unnecessary, the authoring rule and the stale-bundle postmortem stand.

## 5. Gates

| gate                                     | result                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Zero functional diffs (word-level audit) | **PASS** — scripted audit over `git diff -U0`: every changed line in every `.ts/.tsx/.js/.css` file is a comment line or blank; non-comment changes confined to 15 `.md` docs (+ the user's pre-existing `CLAUDE.md`/`.gitignore` edits, not part of this sweep)                                             |
| CSS-comment emission note                | comment edits in `.css` files change dev-build emitted comments only (comments are stripped from minified prod CSS); no rule, selector, or declaration changed anywhere                                                                                                                                      |
| prettier                                 | run over all ~800 changed files before commit (pre-commit parity)                                                                                                                                                                                                                                            |
| lint (10-project sample)                 | **green** — react-table, react-toast, react-swatch-picker, react-text, react-migration-v0-v9, react-tooltip, react-conformance, react-color-picker, eslint-plugin, react-menu                                                                                                                                |
| type-check (same sample)                 | **green for 8/10**; `react-menu:type-check` + `react-color-picker:type-check` fail with `TS2307 Cannot find module './X.module.css'` — **pre-existing**: verified by stashing this sweep's edits to both projects and re-running at HEAD state (`--skip-nx-cache`), identical failures; stash popped cleanly |
| jest (5 most-touched packages)           | **green** — react-table, react-toast, react-migration-v0-v9 (11 suites / 198 passed + 37 pre-existing skips), react-tooltip, react-swatch-picker; `nx run-many` exit 0, "Successfully ran target test for 5 projects"                                                                                        |

## 6. Icons-gated remainder (NOT done here — S-I gated portion + S-J)

1. `@griffel/jest-serializer`: root devDep, the `jest.preset.js` entry, and **56 per-package
   `snapshotSerializers` entries** (73 files mention it incl. the kept explanation headers) —
   load-bearing for react-icons 2.x atomics (C7 proved it); retirable only after headless icons
   3.0 adoption.
2. The **62 unlayered `:global(.fui-Icon-*)` selector lines across 14 `.module.css` files**
   (griffel-zero-plan §0) — retire in S-J proper, per the D2a5 superseding amendment.
3. The icons CSS `@import` wiring (storybook preview / VR harness / package styles.css), lands
   with fork adoption.
4. Kept tooling with verified consumers (sh-the-break §2 table): `@griffel/babel-preset`
   (deprecated AOT), `@griffel/shadow-dom` + `@griffel/webpack-loader` (D11 revisit),
   `vr-tests` `griffelRule`, `custom-loader.js` `'@griffel'` exclusion.
5. `migrate-converged-pkg`'s conditional Griffel logic — inert post-break (only `deprecated/`
   packages still match); left untouched here because removing it is a functional generator change
   outside this sweep's comment/docs gate; retires with the deprecated packages.
6. `deprecated/` packages, D11 survivor VR/ShadowDOM stories, eslint/executor rule fixtures —
   permanent carve-outs (out of S-I scope by definition).
