# Phase 3 — Execution Worklist

Compiled 2026-07-29 against branch `styling/tailwind-css-modules` (`ledger.phase = 3-integration`;
88 packages: 60 `validated`, 4 `done`, 24 `no-styles`).

Authority: `RUNBOOK.md` (Phase 3 checklist + addenda), `reports/DECISIONS.md`, `ledger.json`
notes, and the accumulated flags in `reports/*.md`. Every state claim below was verified against
the working tree on this date — items completed en route are marked DONE and are **not** re-planned.

Sizing key: **S** = one batch, mechanical, ≤ half a session · **M** = one or two sessions,
needs judgement per site · **L** = multi-session, cross-package seams, own validation gate.

---

## Item-by-item state

### 1 — `'use client'` directive sweep · **TODO (S)**

**State.** Not started. The migration deliberately deferred it and tagged the exact target set.

- `*.styles.ts` carrying the directive: **277**. Of those, **232** import a `.module.css`
  (converted); **229** converted files carry the directive; **48** unconverted ones do too.
- **187** carry `'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client`
  plus a migration note block. **Zero** of the 187 import any `use*` symbol — all 187 are
  genuinely `unnecessaryUseClient` under the rule.
- The remaining **41** carry a bare directive and must keep it: 39 import a `use*` hook, 1
  (`react-avatar/.../useAvatarStyles.styles.ts`) calls a local `useSizeStyles()`, 1
  (`react-infolabel/.../useInfoButtonStyles.styles.ts`) still imports `makeStyles` from
  `@griffel/react`.

**Rule facts** (`packages/react-components/eslint-plugin-react-components/src/rules/enforce-use-client.ts`):
the rule is bidirectional and reports/auto-fixes `unnecessaryUseClient`. It triggers on
`CLIENT_REACT_APIS`, any imported-or-called `use[A-Z]` identifier, `RSC_UNSAFE_FUNCTIONS`
(`canUseDOM`, `makeStyles`, `makeResetStyles`, `makeStaticStyles`), browser globals, and JSX
`on*` handlers. **There is no CSS-Modules or `clsx` detection at all** — a pure converted styles
file is invisible to it. Enabled at `error` in
`packages/eslint-plugin/src/configs/react/index.js:54`, off only for stories/cypress/tests.

**Spec.**

1. Strip the `eslint-disable-line` comment + the T1 note block from the 187 files.
2. Run `eslint --fix` with the rule on; the `unnecessaryUseClient` autofix removes exactly the
   droppable directives. Grep-equivalent acceptance test: drop iff no `use[A-Z]\w*(` call, no
   imported `use[A-Z]` identifier, no `makeStyles|makeResetStyles|makeStaticStyles|canUseDOM`,
   no bare browser global.
3. **Hard constraint carried in the notes:** never leave a block comment above a surviving
   directive — it pushes `'use client'` off line 1 of the emitted `lib`/`lib-commonjs` output.
   Since this pass deletes both comment and directive together, the constraint is satisfied by
   construction; verify on the 41 survivors that nothing moved.
4. Deleting the T1 note block also closes 209 files' worth of Item 3's inline surface.

**Validation.** Lint + type-check + build of touched packages, **plus `apps/ssr-tests-v9`** — this
changes emitted module output and is the one hygiene item with a real RSC/SSR blast radius.

---

### 2 — D14 state-mutation-pattern removal · **TODO (L)** + one embedded DECISION

**State.** Not started; deliberately preserved per-conversion (`useAvatarStyles.styles.ts` note:
"its removal is a single Phase 3 sweep, not a per-conversion change").

**One finding inverts the RUNBOOK's framing.** The RUNBOOK says "enable `react-hooks/immutability`
repo-wide with ZERO disables". The rule is **already enabled repo-wide today**:
`eslint-plugin-react-hooks@7.1.1` ships `immutability` at `severity: Error`,
`preset: Recommended`, and `packages/eslint-plugin/src/configs/react/index.js:15-19` spreads the
entire `recommended-latest` rule set into the repo config. The codebase passes only because of
**323 `react-hooks/immutability` disables across 143 files** (158 in 65 `*.styles.ts`, 165 in 78
non-styles files). So this is not an enablement task — it is a 323-disable-deletion task with a
self-enforcing finish line: delete a disable, and lint tells you if you missed a mutation.

**Measured scope.**

| Unit                                                       | Count                                        |
| ---------------------------------------------------------- | -------------------------------------------- |
| Mutating source files (styles + base), excl. tests/stories | 251                                          |
| — converted (import a `.module.css`)                       | 187                                          |
| — still-Griffel / other                                    | 64                                           |
| `use*Styles_unstable` to re-sign                           | ~211 (≈211 return `XState`, 3 return `void`) |
| Call sites that **discard** the return                     | **235** (98.3% of 239)                       |
| — in component `.tsx`                                      | 199                                          |
| — in sibling/parent `.styles.ts` delegation seams          | 32                                           |
| `useCustomStyleHook_unstable('…')(state)` invocations      | 198 (197 identical shape)                    |
| `CustomStyleHooksContextValue` slots to retype             | 193                                          |
| Base (non-styles) hooks mutating `state.root`              | 224 assignments / 87 files                   |
| `react-hooks/immutability` disables to delete              | **323 / 143 files**                          |

Non-styles mutation is dominated by **`react-headless-components-preview` (54 files)**, which
builds `data-*` by mutation in its base `use*.ts` hooks — uniform and highly mechanical.

**The three coupled seams that make this non-decomposable per-package:**

1. Sibling/parent delegation across packages — e.g. `useToolbarButtonStyles_unstable` calls
   `useButtonStyles_unstable(state)` on the same object (32 sites).
2. The public extension contract `type CustomStyleHook = (state: unknown) => void` at
   `packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts:5`
   — mutation is baked into the _type_, across 193 slots and 198 call sites.
3. The 235 discard sites fail **silently** (dropped classes, not type errors) if converted out of
   step with the return types.

**DECISION-NEEDED inside this item:** redesigning `customStyleHooks_unstable` to functional form
is a breaking change to a public `_unstable` contract that external consumers implement. Options:
(a) change the type outright and take the break; (b) accept both shapes at the call site
(`const next = hook(state) ?? state`) so existing void-returning consumer hooks keep working;
(c) add a parallel functional slot map and deprecate the void one. The RUNBOOK commits to the
redesign but does not settle the compat story. **Ask the user before writing code.**

**Spec — staged, in this order (the ordering is the safety mechanism).**

- **F1** Change return types first (`: XState` on all ~211, drop the 3 `void`), and fix the 32
  in-styles delegation seams. Every stale discard site becomes a _visible type error_.
- **F2** Re-thread the 199 component `.tsx` discard sites to assign the composed result.
- **F3** Settle + apply the `CustomStyleHooks` contract decision (193 slots, 198 call sites).
- **F4** Convert the 224 base-hook mutations (start with the 54 uniform headless-preview files).
- **F5** Delete all 323 `react-hooks/immutability` disables; lint must be clean with zero
  remaining.
- **F6** Verify slot-symbol metadata survives spread (RUNBOOK requirement) — `react-utilities`
  `compose/types.ts` slot symbols must be present on the new objects.

**Validation.** This is the one item that earns a **full** gate, not a batch-scoped one: full
repo type-check (the safety net), full unit suites, full VR, SSR. Also re-run the perf evaluation
afterwards — `reports/perf-eval.md:503-506` explicitly asks for it, because the measured `data-*`
writes happen via direct mutation of `state.root` and the functional rewrite changes that path.

---

### 3 — Documentation audit · **TODO (M)** — with one premise correction

**Premise correction: there is no Spec.md drift flagged in the batch reports.** `Spec.md` returns
**0 matches** across the entire `migration/` tree. The reports' actual drift flags are unrelated
(`reports/spacing-dual-support.md:59` — CONVERSION_GUIDE token statement; `phase15-css-emission.md:152`
— sourcemap; several measurement-drift notes in `perf-eval.md`). Separately, 5 of the 59
`packages/**/docs/Spec.md` files do mention `makeStyles`/`mergeClasses`/`classNames`
(`react-text`, `react-portal`, `react-popover`, `react-input`, `react-headless-components-preview`)
— a real but small surface, just not one the reports flagged.

**Inline surface** (`packages/**/src/**/*.{ts,tsx}`, comment-only estimate): **1379 hits / 495
files**; 98% sits inside converted packages, i.e. this is an audit of the migration's own
boilerplate, not of legacy prose. `Griffel` is 688/690 comment-only (the identifier is gone from
code); `makeStyles` is the inverse (198/1223 comment-only — ~1025 live code hits, in unconverted
packages and `*.stories.tsx` examples).

Four distinct note templates:

| #   | Template                                                                            | Files                                                                              | Canonical file                                      | Disposition                                                 |
| --- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| T1  | `'use client'` retention note                                                       | **209**                                                                            | `react-divider/.../useDividerStyles.styles.ts:4-12` | **Delete with Item 1** — it self-identifies as Phase 3 work |
| T2  | Conformance-rewiring note in tests (`make-styles-overrides-win` jest-mocks Griffel) | **220** (152 carry the jest-mocks sentence, 216 mention `classname-overrides-win`) | `react-divider/.../Divider.test.tsx:16-22`          | **Keep until Griffel is gone**; accurate today              |
| T3  | `mergeClasses()` argument-order pointer                                             | **83**                                                                             | `react-tree/.../useTreeItemStyles.styles.ts`        | Rewrite to describe clsx order directly, or delete          |
| T4  | Statics/BEM removal note (D16.1)                                                    | subset of T2                                                                       | same as T2                                          | Keep — describes a settled permanent contract               |

**External surface.** 125 `.md`/`.mdx` files repo-wide (excl. node_modules, `migration/`, `change/`,
CHANGELOGs) mention makeStyles/mergeClasses/Griffel/shorthands; **507** `*.stories.tsx` do, and
that story-example surface is the real teaching corpus. Highest-value targets by hit density:

1. `docs/react-v9/contributing/rfcs/react-components/styles-handbook.md` — 114 hits (note: it is
   under `rfcs/react-components/`, not the path assumed in the RUNBOOK)
2. `apps/public-docsite-v9/src/Concepts/StylingComponents.mdx` — 31
3. `apps/public-docsite-v9/src/Concepts/BuildTimeStyles.mdx` — 21 (Griffel AOT story; wholly
   obsolete post-removal)
4. `docs/.../convergence/no-css-shorthands-in-make-styles.md` — 27 ·
   `.../motion-definition-n-apis.md` — 27 · `.../make-overrides.md` — 20 ·
   `.../provider-style-overrides.md` — 18
5. `packages/react-components/react-text/library/docs/MIGRATION.md` — 50 (highest in packages/)
6. `packages/react-components/react-components/docs/MIGRATION-NOTES.md` — 22
7. SSR pages documenting the Griffel SSR renderer: `Concepts/SSR/Nextjs.mdx` (8),
   `Concepts/SSR/Remix.mdx` (5), `Concepts/UnprocessedStyles.mdx` (6),
   `Concepts/BuildingCustomControls.mdx` (6)
8. `react-conformance-griffel/README.md` (7), `eslint-plugin-react-components/README.md` (7)

There is **no** `GettingStarted` doc for `react-headless-components-preview` (only
`stories/README.md` + 4 `*Description.md`).

**DECISIONS.md stale VR-path references — exactly one stale path, two occurrences.** All 29
backtick-quoted paths in `reports/DECISIONS.md` were existence-checked;
`apps/vr-tests-react-components/.storybook/tailwind-theme.css` does not exist (cited at **L214**
and **L645**). Ground truth after the S0 commit: `scripts/storybook/src/tailwind-theme.css`,
imported by `apps/vr-tests-react-components/.storybook/preview.js:6`. Every other cited path
exists.

**Also fold in here** (found by the residual sweep, same class of work):
`reports/phase15-conformance-tokens-monosize.md:190` — _"`DECISIONS.md` D4 and `CONVERSION_GUIDE.md`
are now stale. D4 states 'Tokens are **never** registered in Tailwind `@theme`'"_; the shipped
reality is `@theme inline`. `reports/spacing-dual-support.md:59` records the same drift against
`CONVERSION_GUIDE.md:87`.

**Spec.** Split into a mechanical half and a judgement half.

- **3a (S, mechanical, Batch A):** the 2 stale DECISIONS.md VR paths; the D4 / CONVERSION_GUIDE
  `@theme inline` correction; T1 deletion (rides Item 1).
- **3b (M, judgement, late):** external docs + T2/T3/T4. Must run **after** the Griffel dependency
  sweep, because T2's accuracy is a function of whether Griffel is still present. Method per the
  RUNBOOK: sweep greps, classify every hit as accurate / historical / stale, and verify every doc
  code sample against the converted API.

---

### 4 — `variants.css` catalog consolidation · **TODO (M)** — scope is larger than the label implies

**State.** The catalog is `packages/react-components/react-tailwind-theme/css/variants.css` —
**446 lines, 96 `@custom-variant` declarations**, ~60% prose rationale. Naming: kebab-case from the
headless-preview data-attribute vocabulary where one exists, else the public prop name; enums →
`<attr>-<value>`, booleans → bare name, complements → `not-<name>`, unions carry `-or-`. Every
entry is the canonical `&:where(…)` self-form.

**Shared-file discipline held perfectly: there are ZERO `@custom-variant` declarations outside the
theme package.** So "consolidation" is a misnomer — nothing needs _moving_. The actual work is
**promoting raw `[data-*]` attribute selectors written inside module files up into named catalog
entries**. The 14 non-theme `.css` files that match the string `@custom-variant` are all prose
comments explaining why a raw selector was used instead.

**Already consolidated en route (do not re-plan):** carousel `not-selected` · checkbox
`not-checked` / `with-label` / `label-above|after|before` / `disabled-control` / `enabled-control` ·
link `inline`, `focus-visible` · spinner `size-extra-tiny|tiny|extra-small|extra-large|huge` ·
progress `thickness-medium|large` · skeleton `size-8`…`size-128` (20) · radio `label-below`,
`layout-vertical|horizontal|horizontal-stacked` · toolbar `at-rest`.

**Still outstanding, per candidate:**

| Candidate                                       | Source                                                           | Status                                                                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------- |
| accordion `data-expand-icon-position`           | `phase2-batch3.md:74`, `AccordionHeader.module.css:217-227`      | still-local; 4 files, 3 raw uses (also NavCategoryItem, TreeItemLayout, TreeItemPersonaLayout)                 |
| accordion `data-icon` (`has-icon`/`no-icon`)    | same                                                             | still-local (AccordionHeader, Tab)                                                                             |
| message-bar `intent-*`                          | `phase2-batch3.md:75`, `MessageBar.module.css:63-69`             | still-local; 6 raw uses (also ToastTitle)                                                                      |
| message-bar `layout-singleline`/`-multiline`    | same                                                             | **partial** — `layout-vertical                                                                                 | horizontal                                                        | horizontal-stacked` exist; singleline/multiline don't. 5 files |
| message-bar `has-actions`                       | `MessageBarActions.module.css:54-57`                             | still-local                                                                                                    |
| card `has-description`                          | `phase2-batch3.md:76`, `CardHeader.module.css:39-44`             | **not an attribute at all** — CardHeader kept two module-class maps; no `data-has-description` exists anywhere |
| drawer `position-start                          | end                                                              | bottom`                                                                                                        | `InlineDrawer.module.css:48-60`, `OverlayDrawer.module.css:74-80` | still-local; 16 raw `[data-position` uses                      |
| drawer `size-full`                              | same                                                             | still-local                                                                                                    |
| drawer `scroll-state-*`                         | `DrawerHeader.module.css:44-48`, `DrawerFooter.module.css:48-52` | still-local; 6 raw uses                                                                                        |
| avatar `data-active` / `data-active-appearance` | `Avatar.module.css`                                              | still-local; 10 raw uses; cited as the precedent other modules copy                                            |
| combobox `data-activedescendant-focusvisible`   | `Option.module.css:69-73`                                        | **deliberately not a candidate** — "D15.5 admits no additions"                                                 |

Also refused-by-design and out of scope: `Field.module.css:185-190`, `Image.module.css:36-38`,
`TreeItemLayout.module.css:203-206`, `TreeItemPersonaLayout.module.css:234`.

**Raw `[data-*]` selector census in `.module.css` (excl. headless-preview stories):**
`data-size` 149 · `data-fui-focus-visible` 64 · `data-position` 16 · `data-popper-placement` 13 ·
`data-fui-focus-within` 10 · `data-orientation` 9 · `data-active-appearance` 8 · `data-disabled` 7 ·
`data-scroll-state` 6 · `data-intent` 6 · `data-spin-active` 4 · `data-overflowing` 3 ·
`data-overflow-menu` 3 · `data-expand-icon-position` 3 · `data-selected` 2 · `data-open` 2 ·
`data-multiline` 2 · `data-layout` 2 · `data-empty` 2 · `data-active` 2 · `data-inline` 1 ·
`data-icon` 1 · `data-has-actions` 1 · `data-activedescendant-focusvisible` 1.

The high-count entries (`data-size`, `data-fui-focus-*`, `data-orientation`, `data-disabled`,
`data-open`, `data-selected`, `data-empty`, `data-multiline`, `data-inline`) are _already-catalogued
names being written raw anyway_ — pure cleanup. Genuinely new families a pass would add: ~9
(`position-*`, `active-appearance-*`/`active`, `scroll-state-*`, `intent-*`, `spin-active`,
`overflowing`/`overflow-menu`, `expand-icon-position-*`, `has-actions`, `icon`/`no-icon`), plus
`size-full` and `layout-singleline|multiline`. Two families were **never proposed in any report**
and should be decided consciously: `data-popper-placement` (13 uses) and
`data-overflowing`/`data-overflow-menu` (6).

**DECISION-NEEDED (scoping, small):** does this pass stay CSS-only (promote existing selectors), or
does it also change hooks to emit new attributes? `card has-description` is the forcing case — there
is no attribute to promote; consolidating it means inventing `data-has-description` and rewriting
`useCardHeaderStyles`. Recommendation: keep the pass CSS-only and drop card `has-description` from
scope, since D15.6 makes `data-*` fallback-only.

**Spec.** (1) Add the ~9 new families + `size-full` + `layout-singleline|multiline` to
`variants.css` in the existing grouped order, each with the canonical `&:where(…)` self-form and a
one-line rationale. (2) Rewrite the raw selectors in the affected module files to the named
variants — including the already-catalogued-but-written-raw cleanup set. (3) Delete the now-false
"catalog entries are requested in the conversion report" comments in the 14 module headers.

**Validation.** Emitted `dist/styles.css` must be **selector-equivalent** per package (diff before/
after — a `@custom-variant` expands to the same `:where()` selector by construction, so any
difference is a bug), then VR for every package touched: accordion, message-bar, toast, drawer,
avatar, carousel, teaching-popover, nav, tree, tab, toolbar, card.

---

### 5 — Suite `no-deprecated` lint decision · **DECISION-NEEDED**, then **S**

**State.** Undecided; explicitly parked. `ledger.json` (react-components): _"Remaining: the
no-deprecated lint decision (Phase 3)"_; `reports/phase2-batch4.md:30`: _"no-deprecated lint
decision — suite pass planned with Phase 3"_.

**Facts.**

- Rule is **`@typescript-eslint/no-deprecated`** (not `deprecation/deprecation`), set to `'error'`
  at `packages/eslint-plugin/src/configs/core.js:196` in `typeAwareRules`. `import/no-deprecated`
  is `'off'` (core.js:182). Existing built-in relaxations: `core.js:330-335` (deprecated tests),
  `configs/react/legacy.js:29`.
- `packages/react-components/react-components/src/index.ts` re-exports **176** `*ClassNames`
  identifiers; **166** `*ClassNames` consts in converted `*.styles.ts` now carry `@deprecated`
  JSDoc, **149** of which are re-exported by name → that is the error surface.
- Recorded count is stale: `ledger.json:122` says _"10 new no-deprecated errors … (66 already there
  from batches 1-3)"_ = **76 as of batch 4**. No later batch updated it. **Current true count must
  be measured before the fix** — estimate ≈149 minus the 11 already suppressed.
- The suite's own `eslint.config.js` has **no** `no-deprecated` override. `src/index.ts` already
  carries 9 `eslint-disable-next-line` + 2 `eslint-disable-line` for this rule and **zero**
  file-level block disables.

**What the repo's lint architecture favors — measured, source files only:**

| Style                                                           | Occurrences     | Files |
| --------------------------------------------------------------- | --------------- | ----- |
| `// eslint-disable-next-line …no-deprecated`                    | **1101**        | 525   |
| `// eslint-disable-line …no-deprecated` (trailing)              | **151**         | 114   |
| `/* eslint-disable @typescript-eslint/no-deprecated */` (block) | **60**          | 58    |
| per-package eslint-config override                              | 17 config files | —     |

Per-line dominates ~20:1. Block disables cluster exclusively in genuinely-deprecated code
(`react-components/deprecated/**` 20 files, `packages/react` 15, `react-examples` 7,
`react-experiments` 5, …), and only 26 of the 60 are at line 1. Config overrides exist as
precedent too: `deprecated/react-virtualizer/eslint.config.js:9` (`off`),
`packages/react-cards/eslint.config.js:11` (`off`), `react-examples/eslint.config.js:13` (`warn`),
`apps/rit-tests-v9/eslint.config.js:20` (`warn`).

**Recommendation to put to the user.** The suite's situation matches the _block-disable_ cluster's
semantics — `src/index.ts` is a pure barrel whose whole job in this PR is re-exporting knowingly
deprecated compat symbols (D7) — but the repo's overwhelming convention is per-line. The
consistent-with-both answer: **one scoped block disable around the deprecated `*ClassNames`
re-export region of `src/index.ts`, not the whole file and not a config override**, matching
`packages/react/src/components/DetailsList/DetailsList.base.tsx:931` (a mid-file scoped block, the
majority shape among the 60). A config override would silence the rule for genuinely-new
deprecations later and is the worst of the three. Once decided, the work is **S** (one file).

Companion work in the same touch: `etc/react-components.api.md` regeneration
(`phase2-batch4.md:29`).

---

### 6 — `prettier-plugin-tailwindcss` · **SKIP-AND-TELL — the RUNBOOK's own guard 3 fires**

**Guard 3 outcome: the repo is on Prettier 2, and pinned there.**

- `package.json:272` `devDependencies.prettier: "2.8.8"` **and** `package.json:378`
  `resolutions.prettier: "2.8.8"`. Installed `node_modules/prettier/package.json` → `2.8.8`.
- `prettier-plugin-tailwindcss` v0.6.x requires `prettier ^3.0`; only the abandoned v0.5.x line
  supports Prettier 2. Prettier 2 additionally has no async plugin loading, which the Tailwind-v4
  `tailwindStylesheet` resolution path needs.

The RUNBOOK addendum's explicit instruction for this case: _"if the repo is on 2.x and cannot move,
SKIP the whole task and tell the user (their explicit instruction)."_ **This item is therefore
closed as SKIP pending the user's word.**

**Everything else about the task checks out**, which is why it is worth surfacing rather than just
dropping:

- `nano-staged.js` does run `prettier --write` and its non-JS glob resolves to
  `**/*.{css,scss,less,md,mdx,html,json,yml}` (`scripts/prettier/src/prettier-helpers.js:12-17`) —
  **`.css` is included**, so the plugin would in fact run on `.module.css`.
- Value would be high, not marginal: **277** authored `*.module.css`, **204** contain `@apply`
  (73.6%), **1201** `@apply` occurrences.
- `tailwindStylesheet` target would be
  `packages/react-components/react-tailwind-theme/css/index.css` (the file with the canonical
  `@layer` statement at L41 and the `@import 'tailwindcss/...'` at L43-44).
- `prettier.config.js` has no `plugins` key and two CSS-irrelevant `overrides`.
- Guard 1 confirmed relevant: `clsx(styles.root, 'group/fui-x', state.root.className)` is
  order-semantic and pervasive — but moot, since `tailwindFunctions` defaults to empty and `clsx`
  is untouched unless opted in.

**If the user wants it:** the prerequisite is a repo-wide Prettier 2 → 3 upgrade (a `resolutions`
pin change plus a whole-repo reformat), which is far outside this PR. Recommend deferring to a
separate change.

---

### 7 — INFRA-1c: docsite pragma blocker · **TODO (S–M)**

**State.** Recorded, root-caused, unfixed. Sole record:
`reports/specials-triage.md:445` — _"INFRA-1c: docsite full build blocked by 7 story files with
'/\*\* @jsxRuntime automatic _/' + pragma conflict (react-motion x6, react-tree x1) — bisected
independent of S0 config; NOT yet A/B'd against master. Fix or A/B in Phase 3."\*

**The 7 files** (each carrying, at lines 1-2, `/** @jsxRuntime automatic */` +
`/** @jsxImportSource @fluentui/react-jsx-runtime */`):
`react-motion/stories/src/MotionSlotAPI/MotionSlot{Customize,Default,Disable}.stories.tsx`,
`react-motion/stories/src/PresenceMotionSlotAPI/PresenceMotionSlot{Customize,Default,Disable}.stories.tsx`,
`react-tree/stories/src/Tree/Virtualization.stories.tsx`. (Non-story files carry the same pragma but
are not matched by the story webpack rule — hence exactly 7.)

**Root cause is a Babel pass, not tsc.**
`packages/react-components/react-storybook-addon-export-to-sandbox/src/webpack.ts:47-62` registers a
`babel-loader` rule `test: /\.stories\.(jsx?$|tsx?$)/`, `enforce: 'pre'`, **without
`babelrc: false` / `configFile: false`** — so the root Babel config loads. `.storybook/main.js:46-49`
narrows it to `{ test: /\.stories\.tsx$/, include: /stories/ }`. Root `babel.config.js` spreads
`@fluentui/scripts-babel`, whose preset list at `scripts/babel/src/index.js:40` is a bare
`'@babel/preset-react'` → defaults to `runtime: 'classic'`, colliding with the files' `automatic`
pragma. `scripts/storybook/src/loaders/custom-loader.js` strips only `['@griffel',
'@fluentui/scripts-babel/preset-v9']` — not `@babel/preset-react`. Secondary: the docsite's swc rule
(`scripts/storybook/src/rules.js:234-263`) also has no `jsc.transform.react` block.

**Pre-existing on master: CONFIRMED.** `git diff master --name-only` over both story directories
returns **empty** — all 7 files are byte-identical to master (`master` tip `d712b3c8fb`). The blocker
is not introduced by this branch.

**Spec.** The A/B is already effectively answered by the empty diff; do the cheap explicit
confirmation (build docsite storybook on master, observe the same failure) and record it, then take
the one-line fix: add `configFile: false` **or** `presets: [['@babel/preset-react', { runtime:
'automatic' }]]` to the `babel-loader` options in
`react-storybook-addon-export-to-sandbox/src/webpack.ts:47-62`. That file already has a spec
(`webpack.spec.ts`) touched by the S0 commit, so the fix has a test home.

**Why it can't just be deferred:** RUNBOOK Phase 3 requires _"storybook (public-docsite-v9) builds"_
as a checklist item. A pre-existing-on-master failure can be signed off as out-of-scope, but only
with the A/B on record.

---

### 8 — INFRA-1d: docs-view emotion reset · **TODO (S)**

**State.** Recorded, fully root-caused with CDP-measured evidence, unfixed.
`ledger.json` (theme-designer): _"INFRA-1d: storybook DOCS-VIEW emotion reset (unlayered div-margin)
beats layered module CSS — presentation-only, migration-wide in docs mode; sanctioned unlayered fix
fails on document order (style-loader before emotion); candidate fix = sb-unstyled (carved out of
the reset selector) in shared storybook infra — Phase 3. Evidence in TokenList.module.css header."_

**Evidence** —
`packages/react-components/theme-designer/src/components/ColorTokens/TokenList.module.css:5-40`.
The offending emotion rule is
`.css-x28zkw :where(div:not(.sb-anchor, .sb-unstyled, .sb-unstyled div)) { margin: 0 }`. Measured,
in order: Griffel model (unlayered 0-1-0, injected at render time, _after_ emotion) → 4px/8px, won;
`@layer fui.components.l4` → 0px/0px; unlayered in the module → **still** 0px/0px, because
style-loader injects at import time, i.e. _before_ emotion. Two genuine regressions vs Griffel
(`.badge` margin-inline-end, `.menu` margin-top); the third (`.cell-row` padding-block, lost to the
`td` rule at 1-1-1) is pre-existing and Griffel never won it either.

**This is migration-wide, not a theme-designer bug** — any converted package rendered in Storybook
docs mode loses div margins.

**Candidate fix locations, in order of directness:**

1. `packages/react-components/react-storybook-addon/src/styles.css` — the repo's global docs-view
   override sheet; add the `sb-unstyled` carve-out here.
2. `.storybook/preview.js` — the single global CSS injection point (its import order is what decides
   document order vs emotion).
3. `.storybook/preview-head-template.html` — the only hook that lands in `<head>` _before_ emotion.
4. Where `sb-unstyled` is applied today, if the fix is instead to widen its application:
   `react-storybook-addon/src/docs/FluentDocsContainer.tsx:21`, `FluentStory.tsx:22`,
   `FluentDocsPage.tsx:387,420`.

**Spec.** Prefer option 1 or 4 — extend the `sb-unstyled` carve-out to cover converted-component
subtrees in docs mode. **Do not** invent a specificity bump in the module (the TokenList header
explicitly refused that, correctly). After the fix, re-measure the two regressions with CDP
matched-rules and confirm `.cell-row` stays pre-existing.

**Validation.** Docsite storybook build + visual spot-check in docs mode. **No VR impact** — VR
renders in story mode, not docs mode.

---

### 9 — accordion `@griffel/react` test-import removal · **TODO (S)**

**State.** Still present, exactly as the ledger says.
`packages/react-components/react-accordion/library/src/components/Accordion/useAccordion.test.tsx:6`
→ `import { mergeClasses } from '@griffel/react';`, used at 4 call sites (L120, L130, L140, L155),
all inside custom-style-hook test fixtures of the shape
`state.root.className = mergeClasses('accordion', ..., state.root.className);`.

`@griffel/react` is a **runtime `dependencies`** entry (`library/package.json:27`, `^1.5.32`);
**`clsx` is already a dependency** (L29) and is imported in 8 source files.

**This test file is the only remaining `@griffel/react` import in the package.** All other hits are
prose (comments in the two styles files and in `AccordionHeader.test.tsx:17` /
`AccordionPanel.test.tsx:27`) or CHANGELOG history.

**One thing that must NOT be removed with it:** `library/jest.config.js:51` keeps
`snapshotSerializers: ['@griffel/jest-serializer', cssModules.snapshotSerializer]`. That is
`@griffel/jest-serializer`, a _different_ package, retained because AccordionHeader still renders
Griffel atomics coming from a dependency (L39-43 explain this). Leave it.

**Spec.** Swap the import to `clsx` and the 4 call sites to `clsx(...)` (argument order is
preserved — `mergeClasses` and `clsx` both take last-wins order here, and the fixture is simulating
a consumer, so it should now simulate the _converted_ consumer contract). Drop `@griffel/react` from
`library/package.json` dependencies. Note the semantic difference in the test: `mergeClasses`
de-duplicates Griffel atomics, `clsx` concatenates — verify the assertions still hold rather than
assuming.

**Validation.** react-accordion unit suite + a dependency-graph check that nothing else in the
package resolves `@griffel/react` through hoisting.

---

### 10 — Dependent-snapshot sweep + transitional `disabledTests` wrappers · **mostly DONE; small TODO (S)**

**The "27 wrappers" figure does not match the tree, and none are stale-because-converted.** There is
no shared list anywhere; the closest recorded number is 30
(`reports/statics-removal-design.md:957-959`, anticipating "19 needs-conversion and 11 special").
Actual on disk: **10 package-level wrappers + 12 per-component opt-outs.**

Test definition: `packages/react-conformance/src/componentHasGroupMarker.tsx` (registered as a
default at `defaultTests.tsx:259`). Displaced counterpart:
`packages/react-conformance/src/hasStaticClassNames.tsx:23` — the name is deliberately reused so
pre-existing `disabledTests` entries keep working.

| #   | File                                                                          | Converted?                                             | Verdict                                                                                                                                                                                                                   |
| --- | ----------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `packages/react/src/common/isConformant.ts:10-22`                             | no                                                     | STILL-APPLIES — **permanent** (v8 never converts; `s4-v8-layering-decision.md:216`)                                                                                                                                       |
| 2   | `packages/react-focus/src/common/isConformant.ts:11`                          | no                                                     | STILL-APPLIES — permanent                                                                                                                                                                                                 |
| 3   | `component-selector-preview/library/src/testing/isConformant.ts:20`           | no                                                     | **DEAD CONFIG** — 0 `*.test.tsx` in the package                                                                                                                                                                           |
| 4   | `deprecated/react-alert/src/testing/isConformant.ts:20`                       | no                                                     | STILL-APPLIES                                                                                                                                                                                                             |
| 5   | `deprecated/react-infobutton/src/testing/isConformant.ts:20`                  | no                                                     | STILL-APPLIES                                                                                                                                                                                                             |
| 6   | `react-headless-components-preview/library/src/testing/isConformant.ts:28-36` | 47 bespoke pre-existing modules (not migration output) | STILL-APPLIES — still publishes BEM statics, stamps no marker                                                                                                                                                             |
| 7   | `react-icons-compat/library/src/testing/isConformant.ts:20`                   | no                                                     | **DEAD CONFIG** — 0 `*.test.tsx`                                                                                                                                                                                          |
| 8   | `react-migration-v8-v9/library/src/testing/isConformant.ts:32`                | **yes (3 modules)**                                    | **INTENTIONALLY RETAINED** — L19-25 explains: conversion reached only the 3 components owning a styles file; CheckboxShim + 8 Button shims render no DOM of their own. Candidate to _narrow_ to per-component, not remove |
| 9   | `react-motion-components-preview/library/src/testing/isConformant.ts:20`      | no                                                     | STILL-APPLIES                                                                                                                                                                                                             |
| 10  | `react-utilities-compat/library/src/testing/isConformant.ts:20`               | no                                                     | **DEAD CONFIG** — no components                                                                                                                                                                                           |

Removal precedent already set: `react-color-picker/library/src/testing/isConformant.ts:27-31`.

The **12 per-component opt-outs** (react-dialog ×2, react-popover ×2, react-tag-picker,
react-teaching-popover ×2, react-toast ×2, react-menu ×2, react-nav) are all in converted packages
and all **structural, not transitional** — trigger/provider components that render no DOM of their
own. Keep.

Other families: `make-styles-overrides-win` (203 files) stays until Griffel is gone;
`component-has-static-classnames-object` (173 files) is now inert-by-design (only registered when a
package opts into `hasStaticClassNames`).

**Dependent snapshots — nearly clean.**

- Griffel atomic hashes in `.snap`: **0 files** across all 322 `.snap` files. The
  `@griffel/jest-serializer` retention strategy held.
- Stale BEM statics from converted packages: **2 files**, both in `packages/charts/react-charts`
  (which is not in the migration ledger):
  `AreaChart/__snapshots__/AreaChart.test.tsx.snap` and
  `DeclarativeChart/__snapshots__/DeclarativeChartRTL.test.tsx.snap` — 38× `class="fui-Button …"`,
  6× `class="fui-Overflow …"`. Both packages are converted and no longer emit those classes; these
  snapshots will fail.
- **RESOLVED en route:** the react-popover `.fui-PopoverSurface` seam in `HeatMapChart.test.tsx`
  (`ledger.json:328`) — the file now reads _"react-popover is converted, so `.fui-PopoverSurface` is
  no longer rendered"_; zero such selectors remain. The tag-picker jest serializer follow-up
  (`ledger.json:483`) — `react-tag-picker/library/jest.config.js` now imports `{ cssModules }` from
  `@fluentui/scripts-jest`.

**Spec (S).** (1) Delete the 3 dead-config wrappers. (2) `-u` the 2 charts snapshots and eyeball the
diff for anything beyond the two class removals. (3) Leave wrappers 1-2, 4-6, 9-10 and the 12
per-component opt-outs alone; consider narrowing #8 to per-component. (4) The real snapshot gate
(RUNBOOK:206, _"snapshot tests updated intentionally"_) belongs to the final Phase 4 sweep, after
D14 — do not run it now.

---

### 11 — Per-component CSS packaging candidate · **DECISION-NEEDED** (evidence complete)

**State.** Recorded at `RUNBOOK.md:146-152` (batch-1 finding); never decided. **All the measurement
needed to decide already exists** — no new work is required to answer it.

`metrics/batch1-monosize-summary.txt` (gz, js+css combined per D10):
`Badge 7352 → 5680 (-22.7%)` · `CounterBadge 7610 → 5878 (-22.8%)` ·
**`PresenceBadge 8292 → 10474 (+26.3%)`** · `Suite Button+Provider+theme 19002 → 15765 (-17.0%)` ·
`Suite 6-component 68049 → 65980 (-3.0%)` · `Suite ENTIRE LIBRARY 326152 → 319145 (-2.1%)`.

`metrics/batch3/monosize-react-badge.json` splits js/css and gives the smoking gun: **all three
badge fixtures pay an identical `css` gz of 2517** — that is the whole-package stylesheet, charged
once per fixture regardless of how little of it each uses. PresenceBadge's own JS share is small
(`@fluentui/react-icons` dominates, external per D11), so the fixed CSS cost swamps it.

**Implementation cost is genuinely small and contained**, confirming the RUNBOOK's claim.
`tools/workspace-plugin/src/executors/build/lib/css-modules.ts` (**434 lines**, with a
`css-modules.spec.ts` guardrail alongside) aggregates all `src/**/*.module.css` into one
`dist/styles.css` (`STYLESHEET_RELATIVE_PATH` at L97; the join is a single
`compiled.map(...).join('\n\n')` in `writeAggregatedStylesheet()`). Three functions in that one file
would change — `writeAggregatedStylesheet()`, `renderEsmClassMap()`, and the `stylesheetSpecifier`
computation — plus each converted `package.json`'s `"./styles.css"` export + `files` entry. **No
authoring changes.** Side-effect imports are emitted into the ESM class map only
(`import "<rel>/dist/styles.css"`); `renderCommonJsClassMap()` deliberately emits none. 60 converted
packages already carry `"sideEffects": ["**/*.css"]`.

**The open question.** This is a **public export-surface change** (`./styles.css` becomes N subpaths
or a glob) shipped inside an already-enormous PR, to fix a regression that only appears in
single-component micro-bundles and washes out at suite level (entire library is **−2.1%** at 13/87
packages converted, and the batch-3 leg showed **−6.7%**). Consumers reading the `./styles.css`
subpath directly (SSR/CJS setups) are the compatibility risk.

**Recommendation: DROP for this PR, record as a follow-up.** The evidence is captured, the change is
localized to one file, and it can land independently at any time without re-doing authoring work.
Shipping it here adds public-API risk to a PR whose headline number is already positive. **User's
call.**

---

### 12 — Residual Phase 3 items found by sweep

Deduped against items 1-11. Ordered by severity.

#### 12a — `@fluentui/react-tailwind-theme` is unpublishable · **DECISION-NEEDED — highest severity found**

`reports/phase15-css-emission.md:151`, verbatim:

> **\*`@fluentui/react-tailwind-theme` is `"private": true` at version `0.0.0`.** Real consumers
> cannot install it, so today they have no way to obtain the theme emission. D13 sanctions either
> publishing it or a suite-level convenience stylesheet — that packaging decision is unmade, and I
> deliberately did not settle it by side effect. **This is the one thing still blocking "a consumer
> can `npm install` these three packages and have them work."\***

Coupled: `reports/phase15-conformance-tokens-monosize.md:191` — _"`--check` is not wired to a CI
target … Exposed as `yarn verify-tokens-css`; wire it when that packaging decision is made."_

This is a genuine ship blocker for the PR's central claim and should be the **first** decision put
to the user. Options per D13: publish the theme package, or emit a suite-level convenience
stylesheet from `@fluentui/react-components`.

#### 12b — Griffel dependency sweep (RUNBOOK:223, _"Remove Griffel deps where no longer used"_) · **TODO (M)**

- `reports/pilot-provider-inventory.md:170` — `@griffel/core` is imported only by
  `FluentProvider-node.test.tsx` in react-provider but remains a runtime `dependency`.
- `reports/phase2-batch1.md:467,911` — `@fluentui/react-theme` kept in dependencies of packages
  whose converted styles no longer import `tokens`; explicitly _"flagging as a candidate for the
  Phase 3 dependency sweep"_ / _"Phase 3 cleanup item"_.
- **24 `no-styles` ledger entries** each carry: _"No `_.styles.ts` files; verify no stray @griffel
  imports during Phase 3 sweep."\*
- `ledger.json` (react-popover) — react-infolabel's whitelisted `@griffel/react` import in
  `useInfoButtonStyles.styles.ts` (`info` slot) _"is now UNBLOCKED — PopoverSurface is layered … it
  is a cleanup, not a fix."_ Note this is also the 41st surviving `'use client'` in Item 1; removing
  it shrinks that set by one.
- Item 9 (accordion) is a member of this family.
- `reports/pilot-provider-inventory.md:169` — `*.styles.raw.js` still emitted for converted
  packages (per that pre-Phase-1.5 note). Phase 1.5 checked off _"Gate off Griffel AOT +
  `_.styles.raw.js` generation for converted packages"\* — **verify the note is stale before
  planning work**; if it is, delete it.

#### 12c — `react-storybook-addon/src/docs/*.tsx` conversion · **TODO (S)**

`reports/pilot-provider-inventory.md:136` — 7 `makeStyles` in the storybook addon's docs
components, deferred as _"Phase 3. Only reaches docsite storybooks… Converting early buys nothing
and adds risk."_ Naturally pairs with Item 8 (same files' neighbourhood, same docs-mode surface).

#### 12d — Release plumbing · **TODO (S)**

`reports/phase15-conformance-tokens-monosize.md:79` — _"`@fluentui/react-conformance` gains public
API… This branch adds **zero** change files vs `master`… If release notes are handled at PR time,
nothing to do; otherwise one is needed."_ Plus the `etc/react-components.api.md` regen bundled with
Item 5.

#### 12e — Build-output hygiene, small · **TODO (S)**

All from `reports/phase15-css-emission.md`: **stale `dist/styles.css`** orphan when a package's last
`*.module.css` is deleted (`cleanOutput` does not clean `dist/`) — L154; **sourcemap drift**, the
specifier rewrite lengthens one import line by 3 chars without regenerating `.js.map` — L152; **AMD
(`lib-amd`)** gets the commonjs class-map shape plus a build warning, no converted package ships AMD
— L153, defer; **`'use client'` placement changed** for react-divider/react-provider CJS — L155,
resolved by Item 1.

#### 12f — Open perf follow-ups · **DECISION-NEEDED (scope), then M**

- `reports/perf-eval.md:575-577` — _"The remaining ~8ms is unexplained and is the next experiment;
  it is flagged, not guessed at."_ And L780-787: the next step is _"a diagnostic experiment to
  identify the mechanism, not another code change."_
- `reports/perf-eval.md:792-794` — _"Add an update-path scenario to the perf gate (follow-up 3 from
  the original evaluation, **still unaddressed**). Every regression in this whole evaluation is on
  the update path."_
- `reports/perf-eval.md:795-799` — Switch's root `data-checked` write: _"a product decision, not a
  perf one."_
- `reports/perf-eval.md:503-506` — **re-run the whole evaluation after the D14 rewrite** (Item 2).
- `reports/transition-audit.md:387` — a `diag-tight-transition` leg would be the first datapoint on
  why migrated transitions cost 4.4× Griffel's.

Recommendation: the ~8ms diagnostic is a research task, not a PR blocker. Do the **perf re-run after
D14** (cheap, harness retained at `.scratch/perf-eval/`) and the **update-path scenario**; defer the
mechanism hunt.

#### 12g — Small design open items · **TODO (S) / informational**

- `reports/named-groups-design.md:721-733` — (1) `group/fui-FluentProvider` is inert surface on the
  most-consumed class in v9; drop it if the team prefers, nothing depends on it. (4) Tier-1
  mirroring invalidation cost on a real Switch page is **unmeasured** (only a synthetic equivalent
  was run) — _"worth one run of the existing harness."_
- `reports/phase15-conformance-tokens-monosize.md:192` — `--ease-*` is not zeroed in `index.css`, so
  Tailwind's `ease-in`/`ease-out`/`ease-in-out` survive alongside Fluent's. Flagged in case strict
  vocabulary purity is wanted.
- `reports/s4-v8-layering-decision.md:350` — a refactor-hazard note (a later reader "tidying" the
  unlayered v8 block into the layer). Ensure this survives into the shipped comment.

#### 12h — Housekeeping (needs user confirmation per standing preference) · **XS**

`.scratch/fmt-baseline/` (`reports/stroke-widths-spacing.md:34`, _"awaiting user confirmation"_);
`.scratch/perf-eval/` + `git worktree remove .scratch/perf-eval/before-tree` (RUNBOOK:199-200);
`.scratch/phase15*` (`phase15-css-emission.md:156`, _"Say the word and I'll clean it up"_). Also
untracked `graphify-out/` and `packages/graphify-out/` are in the working tree and must not reach
the PR.

#### 12i — Already DONE en route (do not re-plan)

- **INFRA-1 / S0 — docsite + shared storybook CSS-modules/Tailwind wiring**: commit `b0ed9dd7c5`
  (`.storybook/main.js`, `.storybook/preview.js`, `scripts/storybook/src/rules.js` +142,
  `scripts/storybook/src/tailwind-theme.css` moved to the shared location). This also closes the
  `ledger.json` `recipes` note (_"Docsite storybook lacks CSS-modules/Tailwind wiring"_).
- **INFRA-2 — Cypress had no CSS rule** (`specials-triage.md:307`, `phase2-batch4.md:31-32`):
  closed by the same commit, `scripts/cypress/src/base.config.ts` +89.
- **INFRA-1b — Windows/POSIX regex blocker** in
  `react-storybook-addon-export-to-sandbox/src/webpack.ts:19` (`storybook-vr-infra.md:34`): the same
  commit touches `webpack.ts` (+13) and adds `webpack.spec.ts` (+23). **Verify** with a Windows
  docsite build during Batch D rather than assuming.
- **react-popover / HeatMapChart `.fui-PopoverSurface` seam** (`ledger.json:328`) — resolved.
- **tag-picker jest css-modules serializer** (`ledger.json:483`) — resolved.
- **Suite `overflowClassNames` forwarding** — commit `f585d844dd`.

---

## Recommended execution order (batch-scoped validation regime)

Per the RUNBOOK process rule: each batch applies its full contract in one pass and validates
**only** its own surface plus flagged seams. Full-suite sweeps are reserved for the phase boundary
(Batch H). Bottom-up ordering means earlier batches sit below later ones and cannot be invalidated
by them — with one exception, called out in Batch E.

### Batch 0 — Decision round (no code) · blocking

Put four questions to the user **before** any Phase 3 code lands, because three of them gate other
batches:

| #   | Question                                                                                                   | Gates                                                          |
| --- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 12a | `react-tailwind-theme` `private: true @ 0.0.0` — publish it, or emit a suite-level convenience stylesheet? | Ship viability; also unblocks wiring `verify-tokens-css` to CI |
| 6   | Prettier is pinned at 2.8.8 — the RUNBOOK's guard-3 skip condition fires. Confirm SKIP?                    | Closes Item 6                                                  |
| 11  | Per-component CSS emission: pursue in this PR or record as a follow-up? (Recommendation: follow-up)        | Batch C's package.json/export shape                            |
| 2   | `customStyleHooks_unstable` functional redesign: hard break, dual-shape tolerance, or parallel slot map?   | Batch F                                                        |

Two smaller ones can ride along: Item 5's suppression style (recommendation in §5), and Item 4's
CSS-only scoping (recommendation in §4).

### Batch A — Zero-risk hygiene · **S**

Items **1** (187 directives + T1 note blocks), **9** (accordion clsx swap + dep drop), **10** (3 dead
wrappers, 2 charts snapshots), **3a** (2 stale DECISIONS.md VR paths, D4/CONVERSION_GUIDE
`@theme inline` correction).

_Why first:_ no CSS output changes at all, so no VR exposure; and deleting T1 removes 209 files from
Item 3's surface before the judgement-heavy doc pass.
_Validation:_ lint + type-check + build of touched packages, affected unit suites, **plus
`apps/ssr-tests-v9`** (Item 1 changes emitted module output — this is the batch's one real seam).

### Batch B — Lint/API/dependency closeout · **S–M**

Items **5** (suite `no-deprecated` per the Batch-0 decision + `api.md` regen), **12b** (Griffel +
`react-theme` dependency sweep, incl. the 24 `no-styles` stray-import verifications and the
react-infolabel unblock), **12d** (change files), **12e** (build-output hygiene).

_Validation:_ suite build, repo lint, dependency-graph check, `yarn verify-tokens-css`. Note the
react-infolabel unblock removes one `'use client'` survivor — re-run Item 1's grep test on that file.

### Batch C — Packaging (only if Batch 0 says pursue) · **M**

Item **11** + the 12a packaging decision's implementation (publish flags / suite stylesheet /
`verify-tokens-css` CI wiring).
_Validation:_ consumer smoke test (the Phase 1.5 harness), monosize re-run on the three badge
fixtures — the direct before/after for the +26.3% case.

### Batch D — Storybook & docs infra · **S–M**

Items **7** (INFRA-1c), **8** (INFRA-1d), **12c** (7 `makeStyles` in
`react-storybook-addon/src/docs/*.tsx`), plus the **INFRA-1b Windows verification**.

_Why grouped:_ all three live in shared storybook infra and share one validation run.
_Validation:_ docsite storybook build on Windows (the acceptance criterion for 7 and 1b), docs-mode
visual check + CDP matched-rules re-measure for 8. **No VR impact** — docs mode only.

### Batch E — `variants.css` catalog pass · **M**

Item **4**, CSS-only per the recommendation.

_Why here:_ it is the last batch that changes emitted CSS before D14, so its VR churn is isolated
and does not have to be re-baselined by later work. **This is the one batch where "bottom-up means
safe" does not hold** — `variants.css` is a shared file touched by many packages, so its validation
must cover every affected package, not just a nominal batch.
_Validation:_ per-package `dist/styles.css` selector-equivalence diff (a `@custom-variant` expands to
the same `:where()` by construction — any difference is a bug), then VR for accordion, message-bar,
toast, drawer, avatar, carousel, teaching-popover, nav, tree, tab, toolbar, card.

### Batch F — D14 mutation removal · **L** · its own gate

Item **2**, staged F1→F6 exactly as specified in §2. Treat each stage as its own commit; F1 is the
one that must land whole (partial return-type changes create silent class-dropping).

_Validation:_ full repo type-check (the deliberate safety net), full unit suites, **full VR**, SSR.
Then the perf re-run from 12f (`reports/perf-eval.md:503-506`).

### Batch G — Documentation audit, judgement half · **M**

Item **3b**: external docs (125 `.md`/`.mdx` + the 507-story teaching corpus, prioritized by the §3
list) and inline templates T2/T3/T4.

_Why last:_ T2's accuracy is a function of whether Griffel is still present (Batch B) and whether
the mutation contract still exists (Batch F). Writing final-state docs before the final state exists
guarantees a second pass.

### Batch H — Phase 3 → 4 gate

The RUNBOOK's unchecked Phase 3 boxes, run as one sweep: suite builds · docsite storybook builds ·
full VR across all packages · `apps/ssr-tests-v9` green · conformance + unit suites green repo-wide ·
snapshot sweep updated intentionally (RUNBOOK:206) · Griffel dependency graph clean. Then 12h
housekeeping (with user confirmation) and hand off to Phase 4 metrics.

---

## Summary table

| #   | Item                                              | State                                                                                              | Size         | Batch               |
| --- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------ | ------------------- |
| 1   | `'use client'` sweep                              | TODO — 187 droppable / 41 must stay, set already tagged                                            | S            | A                   |
| 2   | D14 mutation removal                              | TODO — rule already enabled; 323 disables, 235 discard sites, 193 slots                            | **L**        | F (+ decision in 0) |
| 3   | Documentation audit                               | TODO — 1379 inline hits/495 files, 125 docs; **no Spec.md drift exists**; 1 stale DECISIONS path   | S + M        | A (3a) / G (3b)     |
| 4   | `variants.css` catalog                            | TODO — 0 declarations outside theme; work is promoting raw selectors, ~9 new families              | M            | E (+ scoping in 0)  |
| 5   | Suite `no-deprecated`                             | DECISION-NEEDED — repo favors per-line 20:1; recommend scoped block in the barrel                  | S after      | 0 → B               |
| 6   | prettier-plugin-tailwindcss                       | **SKIP-AND-TELL** — prettier pinned 2.8.8, guard 3 fires                                           | —            | 0                   |
| 7   | INFRA-1c docsite pragma                           | TODO — root-caused (babel-loader lacks `configFile:false`); **pre-existing on master, diff empty** | S–M          | D                   |
| 8   | INFRA-1d emotion reset                            | TODO — fix = `sb-unstyled` carve-out in `react-storybook-addon/src/styles.css`                     | S            | D                   |
| 9   | accordion `@griffel/react`                        | TODO — still at `useAccordion.test.tsx:6`, 4 sites; clsx already a dep                             | S            | A                   |
| 10  | disabledTests + snapshots                         | **Mostly DONE** — 0 stale-because-converted; 3 dead configs, 2 charts snapshots                    | S            | A                   |
| 11  | Per-component CSS packaging                       | DECISION-NEEDED — evidence complete (all 3 fixtures pay css gz 2517); recommend defer              | M if pursued | 0 → C               |
| 12a | Theme package unpublishable                       | **DECISION-NEEDED — ship blocker**                                                                 | S after      | 0 → C               |
| 12b | Griffel dependency sweep                          | TODO                                                                                               | M            | B                   |
| 12c | storybook-addon docs `makeStyles`                 | TODO — 7 sites                                                                                     | S            | D                   |
| 12d | Change files / api.md                             | TODO                                                                                               | S            | B                   |
| 12e | Build-output hygiene                              | TODO — 4 small items                                                                               | S            | B                   |
| 12f | Perf follow-ups                                   | DECISION-NEEDED (scope); re-run after D14 is cheap and asked for                                   | M            | F, then defer       |
| 12g | Design open items                                 | TODO / informational — 3 items                                                                     | S            | B or G              |
| 12h | `.scratch` + `graphify-out` cleanup               | Needs user confirmation                                                                            | XS           | H                   |
| 12i | INFRA-1/1b/2, popover seam, tag-picker serializer | **DONE** — commits `b0ed9dd7c5`, `f585d844dd`                                                      | —            | —                   |
