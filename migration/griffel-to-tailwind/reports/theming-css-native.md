# Theming, CSS-native — the staged removal of the JS theming path

This file accumulates the theming-architecture work settled with the user 2026-07-29
(supersedes review item #18's line of discussion): Phase 1 restructures the spacing token
values so the CSS custom-property graph is the contract; Phase 2 (future) removes the
FluentProvider runtime theme tag / JS theming path.

## Phase 1 — numeric-axis spacing aliases; old camelCase names removed (option B); stroke rename

Date: 2026-08-05 · Branch: `styling/tailwind-css-modules` · Change surface:
`packages/react-components/react-tailwind-theme/` (generator
`scripts/generate-tokens-css.js`, regenerated `css/tokens.css`, comment updates in
`css/index.css` / `css/emit.css` / `package.json`, new committed browser test
`scripts/probe-spacing-behavior.mjs`), `packages/tokens/src/tokens.ts` (+ exact-string
unit test), `packages/react-components/react-theme-sass/sass/*.scss`, and a 651-replacement
/ 197-file repo sweep of raw old-name `var()` references. Decision record: DECISIONS.md
"D4 superseding amendment" (option B + stroke rename).

> An earlier same-day draft kept the old camelCase names as CSS read-aliases. The user
> then chose **option B**: no CSS aliases — the old names cease to exist in emitted CSS
> (documented major break for hand-written consumer CSS), and the JS `tokens.*` constants
> repoint to the canonical names instead. Plus the **stroke rename** (public
> `--stroke-width-*`, private `--spacing-<step>` hooks).

### The structure

- **Recorded base (verified, unchanged):** `--spacing: calc(1px * var(--base-scale))`
  (`css/index.css`), with `--base-scale: calc(1rem / 16px)`. The base is 1px-scaled — NOT
  the 4px Tailwind default — so token multipliers equal their canonical px values
  (integers, not 0.5 steps).
- **22 spacing tokens** register in `@theme inline` AND emit at `:root, :host` as
  `calc(var(--spacing) * <px>)` (None stays `0`). `--spacing` is the single density knob.
- **4 stroke widths**: public `--stroke-width-thin/thick/thicker/thickest` emitted as
  literal `calc(<px> * var(--base-scale))` — deliberately NOT `--spacing`-coupled
  (borders must not thin when layout density changes). The `--spacing-thin/…` names are
  PRIVATE hooks (`--spacing-thin: var(--stroke-width-thin)`) feeding Tailwind utility
  generation (`w-thin` compiles to `width: var(--stroke-width-thin)`) and the sanctioned
  module authoring form `var(--spacing-thin)` for border/outline widths. Not registering
  `--stroke-width-*` in `@theme` is deliberate — that Tailwind namespace drives SVG
  `stroke-width` utilities, the wrong property.
- **Old camelCase names removed** from all emitted CSS. Read path = JS:
  `tokens.spacingHorizontalM === 'var(--spacing-horizontal-m)'`,
  `tokens.strokeWidthThin === 'var(--stroke-width-thin)'` (all 26; exact-string unit test
  in `packages/tokens/src/tokens.test.ts`; the generator asserts the same lockstep from
  the CSS side on every run and throws on drift). `react-theme-sass` `$`-variables
  repoint identically (SCSS names stay camelCase — they are a JS-like read API).

### Multiplier table (token → old literal → new value; default resolution exact for all 26)

| Token (both axes)                      | old literal                                               | new value                                                                            | default   |
| -------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------- |
| …None                                  | `0`                                                       | `0` (unchanged)                                                                      | 0px       |
| …XXS                                   | `calc(2px * var(--base-scale))`                           | `calc(var(--spacing) * 2)`                                                           | 2px       |
| …XS                                    | `calc(4px * var(--base-scale))`                           | `calc(var(--spacing) * 4)`                                                           | 4px       |
| …SNudge                                | `calc(6px * var(--base-scale))`                           | `calc(var(--spacing) * 6)`                                                           | 6px       |
| …S                                     | `calc(8px * var(--base-scale))`                           | `calc(var(--spacing) * 8)`                                                           | 8px       |
| …MNudge                                | `calc(10px * var(--base-scale))`                          | `calc(var(--spacing) * 10)`                                                          | 10px      |
| …M                                     | `calc(12px * var(--base-scale))`                          | `calc(var(--spacing) * 12)`                                                          | 12px      |
| …L                                     | `calc(16px * var(--base-scale))`                          | `calc(var(--spacing) * 16)`                                                          | 16px      |
| …XL                                    | `calc(20px * var(--base-scale))`                          | `calc(var(--spacing) * 20)`                                                          | 20px      |
| …XXL                                   | `calc(24px * var(--base-scale))`                          | `calc(var(--spacing) * 24)`                                                          | 24px      |
| …XXXL                                  | `calc(32px * var(--base-scale))`                          | `calc(var(--spacing) * 32)`                                                          | 32px      |
| strokeWidthThin/Thick/Thicker/Thickest | `--spacing-<step>: calc(<1/2/3/4>px * var(--base-scale))` | `--stroke-width-<step>` same literal; `--spacing-<step>: var(--stroke-width-<step>)` | 1/2/3/4px |

(Applies identically to `spacingHorizontal*` and `spacingVertical*`; full 26-row dump with
per-token old/new strings in the gate output, `.scratch/phase1-theming/arith-identity.mjs`.)

### Gates

1. **Arithmetic identity (PASS)** — `.scratch/phase1-theming/arith-identity.mjs`: 26/26
   token defaults exact old (git HEAD) vs new; 4 canonical strokes literal + hooks
   aliased; no old camelCase name outside removal-documenting comments; tokens.ts
   lockstep 26/26; compiled-utility identity `p-horizontal-<step>` === `p-<px>`
   (string-identical declaration values) for all 20 non-zero named utilities.
2. **Behavior probes (PASS 15/15; committed test)** —
   `scripts/probe-spacing-behavior.mjs` (headless Chromium via playwright; jsdom cannot
   resolve var()/calc() chains, so this is a browser test by necessity; npm script
   `test-spacing-behavior`):
   - Density knob: subtree `--spacing: calc(2px * var(--base-scale))` → `.p-12` AND
     `.p-horizontal-m` both compute 24px (identical response); `.p-24` /
     `.p-horizontal-xxl` both 48px.
   - Canonical reads at `:root` scope (no FluentProvider on the page):
     `var(--spacing-horizontal-m)` 12px; `var(--stroke-width-thin)` 1px; private hook
     `var(--spacing-thin)` 1px; `.w-thin` width 1px.
   - Stroke decoupling: the same subtree override leaves `var(--stroke-width-thin)` /
     `var(--spacing-thin)` borders at 1px.
   - Removal: `var(--spacingHorizontalM)` does not resolve (padding falls to 0px);
     `var(--strokeWidthThin)` border does not compute to the canonical 1px (browser
     default `medium` = 3px observed); plus a hard artifact-level assertion that no old
     name appears in emitted CSS.
   - **Red under the pre-phase-1 structure (probe-demonstrated on the alias-draft run,
     `.scratch/phase1-theming/probe-old-structure.log`):** named utilities ignored the
     subtree override (12px vs numeric's 24px) — the density-knob property is what the
     restructure buys.
3. **Zero-reference sweep (PASS)** — `.scratch/phase1-theming/repoint-oldnames.mjs`: 651
   replacements across 197 react-domain files (library `*.module.css`, stories, docsite
   MDX/css, vr-tests utils, charts react libs, react-theme-sass); residual check finds no
   exact old name outside comment prose documenting the removal. **Excluded:**
   `packages/web-components/**` and `packages/charts/chart-web-components/**` — a
   separate component system whose own `design-tokens.ts` DEFINES the camelCase variables
   it reads (self-consistent; not governed by the react theme artifact).
4. **`packages/tokens` unit tests green** — 4/4 (format test amended with the 26-entry
   canonical map; new exact-string repoint test; a no-old-names regex over every token
   value).
5. **D13 re-verified (PASS)** — a module compiled through `@reference '#theme'` emits zero
   theme declarations while `@apply w-thin` inlines `width: var(--stroke-width-thin)`,
   `@apply p-horizontal-m` inlines `padding: calc(var(--spacing) * 12)`, and direct
   `var(--spacing-thin)` / `var(--stroke-width-thick)` authoring is untouched.
6. **Full VR sweep at zero tolerance — 76/76 canonical sets PASS, failing: none.** Fresh
   `--skip-nx-cache` `vr-tests-react-components:build-storybook` (bundle staleness-guarded
   and marker-verified: numeric-axis utility output present, canonical stroke emission
   present, zero old-name declarations); driver `.scratch/phase1b-sweep-driver.mjs`
   (S-G/int1 shape; the 26 `review36513-*` scratch probe dirs excluded as non-canonical),
   results `.scratch/phase1b-sweep-results.json`.

   - First pass: 67/76 clean; the 9 failures were ALL extras-only story-inventory drift —
     **2,292/2,292 matched pairs pixel-identical, 0 failed, 0 missing** across `button`
     (141 pairs, 20 extras), `button-family` (351/12), `harness-se` (1438/36),
     `react-card` (148/8), `react-carousel` (0 pairs — empty baseline, 9 extras),
     `react-checkbox` (36/8), `react-radio` (52/8), `react-slider` (39/8),
     `react-switch` (87/8). Every extra shot traces to stories committed AFTER the last
     full sweep (Focus stories `40ef24502f` 2026-08-04; S-J swap stories 2026-08-01;
     CarouselAutoplayButton `c9b6a14156` 2026-08-05) — pre-existing drift, not a Phase-1
     effect (a CSS-value change cannot add stories).
   - Drift resolution WITHOUT adjudication: the 9 sets' filters were captured from a
     CONTROL storybook (all Phase-1 changes stashed; control bundle verified pre-change —
     266 literal-form utility occurrences, zero canonical names), 117 control shots folded
     into the baselines with manifest `additions` provenance (sj-batch1 precedent), the
     candidate rebuilt fresh, and the 9 sets re-run: **all 9 PASS at zero tolerance**,
     i.e. control and candidate render the drift stories pixel-identically too.
   - Final: **76/76 sets, zero pixel diffs anywhere.** Arithmetic neutrality holds
     end-to-end, including the charts sets whose inline styles exercise the repointed
     `tokens.*` strings.
   - (An earlier aborted run and its root cause — a mid-sweep `git stash` tripping the
     capture staleness guard, zero pixel evidence involved — is documented in the section
     below.)

   _Aborted first attempt, root-caused (no pixel evidence of any defect):_ the initial
   sweep (`.scratch/phase1-sweep-results.json`) recorded 0/102 — but **all 102 failures
   were CAPTURE-stage, zero diff-stage**. Cause: a `git stash push/pop` was run mid-sweep
   (to prove an unrelated accordion snapshot failure pre-existed on the branch); the pop
   rewrote ~200 tracked files with fresh mtimes, and capture.mjs's staleness guard
   (component sources newer than the built bundle → refuse to capture) then correctly
   fast-failed every remaining set. Not a generation defect and not an amendment design
   flaw: the arithmetic-identity gate, the 15/15 behavior probe, and a byte-level
   inspection of the REBUILT VR bundle (one `@layer fui.theme { :root, :host }` block
   carrying `--base-scale`, `--spacing`, the 4 canonical `--stroke-width-*` literals, the
   4 hooks, and the 22 spacing canonicals; zero old-name declarations) all pass against
   the current artifacts. The only diff-stage record in that aborted run (`button`, taken
   before the stash) was the known pre-existing Focus-stories baseline drift: 141/141
   matched pairs pixel-identical, 20 extra shots from stories committed 2026-08-04 after
   the last full sweep. That file also enumerated 26 `review36513-*` scratch baseline
   dirs from the review session — non-canonical, excluded from phase1b and from all
   verdict math (canonical set count: 76).

7. **Perf spot-check — within noise.** E-cell rig (scenario E, 100 instances/flip),
   control (git HEAD theme + tokens, stashed build) vs restructured, both `PERF_LEG=after`
   bundles of the same source; pooled-window methodology per
   `reports/perf-consumer-dynamic-class.md` (31 windows + 5 warmups per visit, 3 reps,
   legs shuffled per cell per rep, seed 20260805, pooled n = 93/cell; headless Chromium
   141.0.7390.37; per-leg liveness asserted: control bundle 41 literal-form / 0 axis-form
   occurrences, new bundle 33 axis-form + canonical stroke emission). Medians:
   | Cell                                                                                  | control (ms) | new (ms) | delta |
   | ------------------------------------------------------------------------------------- | -----------: | -------: | ----: |
   | Button E                                                                              |        3.500 |    3.500 | +0.0% |
   | Switch E                                                                              |        5.400 |    5.500 | +1.9% |
   | Divider E                                                                             |        1.300 |    1.300 | +0.0% |
   | Switch's +0.1 ms median shift sits inside the overlapping IQRs (control [5.30, 5.60], |
   | new [5.30, 5.80]) — below the series' within-leg spread; Button and Switch anchors    |
   | reproduce the post-remedy series values (3.4–3.5 / 5.3–5.5). The one added var() hop  |
   | on ~18 spacing values does not register above noise. Raw:                             |
   | `.scratch/perf-eval/phase1-theming/results/raw-e-cells.json`.                         |

### Tailwind mechanics that make this work (probe-verified, `.scratch/phase1-theming/`)

`@theme inline` carries a `var()` reference in a theme value VERBATIM into the compiled
utility — `.p-horizontal-m { padding: calc(var(--spacing) * 12) }` (byte-identical in
shape to `.p-12`) and `.w-thin { width: var(--stroke-width-thin) }`. That is the property
the restructure buys: one density knob rescales both spacing vocabularies, while stroke
widths resolve through their density-decoupled canonical. The generator emits 30
declarations in the `@layer fui.theme { :root, :host }` block. (The compiled
`dist/styles.css` byte pair originally quoted here — "1,410 → 2,810" — is removed:
`dist/` is gitignored (`.gitignore:64:dist`), so neither side is reproducible from git at
any ref and neither could be re-derived. See _Measurement conventions_ at the end of this
report.)

### Interim-state semantics (honest statement, until Phase 2)

FluentProvider's runtime theme tag (`createCSSRuleFromTheme` → one rule on
`.fui-FluentProviderN`, unlayered) still writes ALL old camelCase names as literal values
on every provider element. With option B there is no CSS alias and no shipped reader of
those names left — they are **harmless orphans** until Phase 2 removes the tag. The tag
never sets the canonical `--spacing-*` / `--stroke-width-*` names, so utilities, the
density knob, and `tokens.*` readers are provider-independent.

Consequence extended (was already priced in for utilities by the 2026-07-27 amendments):
a custom FluentProvider `theme` override of `spacingHorizontal*` / `strokeWidth*` no
longer reaches ANY shipped reader — `tokens.*` inline styles now resolve the `:root`
canonicals. All 7 shipped themes carry byte-identical spacing/strokeWidth values
(previously asserted, zero divergence), so no shipped theme changes behavior.

Docsite note: the `createCSSRuleFromTheme` usage examples demo a util whose output is the
old camelCase names; their module CSS was repointed to canonical names (they render under
the docsite's provider either way). The util itself is Phase-2 scope.

One CSS-inheritance nuance, priced in: the emitted custom properties substitute their
`var(--spacing)` at `:root`, so a SUBTREE `--spacing` override reaches utilities (calc
inlined per element) but not custom-property readers (`var(--spacing-horizontal-m)` /
`tokens.*` inline styles), which keep root-level density. Document-level density (set
`--spacing` at `:root`) reaches everything.

### Open question (recorded for the user — NOT implemented)

Full-token-set kebab rename: the remaining ~440 tokens (colors, fonts, radii, shadows,
durations, curves, z-index) still use camelCase CSS variables
(`--colorNeutralBackground1`). Under consideration for Phase 2 alongside the runtime-tag
removal; nothing in Phase 1 depends on it either way.

### Phase 2 (queued)

Remove the FluentProvider runtime theme style tag / JS theming path; the CSS-native
variable graph (canonical `--spacing-*` / `--stroke-width-*` + Fluent color/typography
vars) becomes the sole contract. Decide the full-token-set kebab rename question above.

## Phase 2a — full-token-set kebab rename (option B, Tailwind-namespace-aligned canonicals)

Date: 2026-08-06 · Branch: `styling/tailwind-css-modules` · Closes the Phase-1 open
question: the remaining 441 camelCase token CSS variables (colors incl. palette, font
families/sizes/weights, line heights, radii, shadows, curves, durations, z-index) are
renamed to canonical kebab-case names aligned with the Tailwind v4 theme namespaces.
Single vocabulary, option B: the old names cease to exist in every shipped read path;
`tokens.*` repoints. Complete mapping committed as `reports/token-rename-map.md` +
`.json` (467 rows: 26 Phase 1 + 441 Phase 2a — the machine-readable find/replace source
for consumer migration). Decision record: DECISIONS.md "D4 Phase-2a amendment".

### Namespace mapping (canonical = the token's Tailwind `@theme` key, except durations)

Colors → `--color-*` (palette: `--color-palette-*`); font families → `--font-*`; font
sizes → `--text-*`; font weights → `--font-weight-*`; line heights → `--leading-*`;
radii → `--radius-*`; shadows → `--shadow-*`; curves → `--ease-*`; z-index →
`--z-index-*` (tokens.\* keeps the value fallback, e.g. `var(--z-index-popup, 2000)`).
**Durations split** (user intent — family-consistent custom namespace): canonical
runtime variable `--duration-fast`; the `@theme` key stays what the installed v4.3.3
utility registry reads (`--transition-duration-fast`), registered as
`var(--duration-fast)` so utilities carry the canonical reference verbatim. All 467
canonical names asserted unique.

### Utility-name impact verdict: ZERO

The `@theme` keys were already these kebab names. Byte-compared HEAD vs new: the 467
registered keys are identical sets; only registered VALUES changed
(`var(--colorNeutralBackground1)` → `var(--color-neutral-background-1)`). No utility
class name changes; no module.css class-usage sweep.

### Architectural correction to the task premise (recorded honestly)

The task assumed the FluentProvider runtime tag's literals would "feed NOTHING" after
the rename (Phase-1 semantics). That held in Phase 1 only because spacing/stroke are
theme-INVARIANT and `:root`-emitted. The 441 renamed tokens are theme-VARIANT (7 shipped
themes differ; dark/HC VR stories resolve through per-provider values) with NO static
value emission — the tag is their sole value source (verified: zero static camelCase
value definitions in repo CSS). A camelCase-only tag would have unstyled everything.

**Resolution — dual-vocabulary tag (interim until 2b):** `createCSSRuleFromTheme` writes
each theme entry under BOTH names, deriving the canonical from the repointed `tokens.*`
strings (guaranteed lockstep, no second kebab implementation). Shipped readers all use
canonical names; the camelCase half feeds nothing shipped — the task's stated interim
semantics, made true constructively — and doubles as unbroken-interim insurance for
hand-written consumer CSS. Cost: per-provider rule 459 → 918 declarations
(webLightTheme 19,215 → 39,873 chars), inserted once per provider mount.

### `@theme inline reference` adopted (earlier rejection retired)

With runtime names equal to theme keys, every registration is self-named
(`--color-x: var(--color-x)`); plain `inline` emits 400+ self-referential aliases at
`:root, :host` (cycle-invalid at `:root`, ~19KB — probe `.scratch/phase2a-theming/probe/`).
`reference` suppresses exactly that emission (probed byte-identical utility output); its
pre-2a rejection reason — "emits CSS against a variable nothing defines" — is retired
because the tag now defines the canonical names. `dist/styles.css` byte-stable across the
change (verified locally at build time; the artifact is gitignored, so the byte count is
not reproducible from git and is omitted), Phase-1 emission block unchanged, zero old
names.

### Sweep counts

- `packages/tokens/src/tokens.ts`: 441 values repointed; test rewritten as an
  INDEPENDENT canonical-derivation exact-string test (all 467) + no-camelCase-var regex
  - uniqueness; generator drift-throw extended to every token (fallback only for
    zIndex).
- `react-theme-sass`: 433 values across 8 scss files (SCSS `$` names stay camelCase).
- react-tailwind-theme: tokens.css regenerated (441 values); 12 hand-written refs in
  css/utilities.css.
- Repo sweep: **5,331 replacements across 438 files** (module.css HCM blocks, stories,
  docsite MDX/css, vr-tests utils, charts inline styles, motion token strings,
  storybook-addon css, theme-designer, workspace-plugin template, calendar/datepicker
  compat, migration-v0/v8 shims). Residuals: zero in sweep scope.
- Exemptions (verified): web-components / chart-web-components /
  vr-tests-web-components' WCThemeDecorator (separate system defining its own camelCase
  vars — 49 files / 2,424 occurrences untouched); `deprecated/**` — ZERO raw old-name
  references (consumes tokens only via `tokens.*` JS inside Griffel makeStyles, e.g.
  react-alert's `tokens.colorTransparentStroke` — follows the repoint automatically,
  resolves against the dual tag; no exemption needed, nothing to sweep); migration
  history reports/ledger; the two dual-emission SSR snapshot tests (legacy names are
  CORRECT there until 2b); removal-documenting comments. Docsite residual
  `--colorPaletteSilverForeground1` is NOT a token (v0-migration doc example, dead
  before and after).

### Gates

1. **Browser identity probe — 2,237 checks, ALL PASS** (headless Chromium, rebuilt dist
   - real `createCSSRuleFromTheme` rules from webLight/webDark/teamsHighContrast; script
     `.scratch/phase2a-theming/identity-probe.mjs`): per Phase-2a token (441 × 5) —
     canonical var == theme literal under a light provider; legacy var == same value (dual
     emission); canonical switches under a nested dark provider; canonical carries HC
     values; canonical does NOT resolve outside any provider (camelCase-era semantics
     preserved). Plus 26 Phase-1 root-resolution checks and 6 end-to-end utility spot
     checks (bg/shadow/duration/text/radius/ease computed == theme-literal reference
     elements).
2. **Emitted-CSS verification — zero old names**: dist/styles.css (byte-stable emission
   shape; artifact gitignored, byte count not reproducible from git); fresh
   `--skip-nx-cache` VR storybook bundle — 247
   css/js files, 0 old-name occurrences, canonical forms present (172
   `var(--color-neutral-background-1)` refs); public-docsite-v9 storybook build green —
   354 files, 0 real old-token refs, 266 canonical refs.
3. **Full VR sweep at zero tolerance — 76/76 canonical sets PASS, failing: none.**
   Fresh `--skip-nx-cache` `vr-tests-react-components:build-storybook` (bundle
   marker-verified pre-sweep: zero old names, canonical present); driver
   `.scratch/phase2a-sweep-driver.mjs` (phase1b shape, review36513-\* excluded), results
   `.scratch/phase2a-sweep-results.json`. All matched pairs pixel-identical except two
   documented flake classes, both within pre-adjudicated protocol: `property-remedy`
   (2,772 shots) had 3 `CalendarCompat.multiDayView*` shots at 11–21 diff px — the
   ledger-adjudicated bistable text-antialiasing flake (ceiling 26; diff image
   inspected: single-glyph speckle, not a value change) — the react-calendar-compat
   tolerance was mirrored onto this composite set that embeds the same shots;
   `react-progress` passed on its protocol recapture (known ProgressBar HC flake). No
   story-inventory drift: the phase1b-folded baselines were current, 0 extras / 0
   missing anywhere.
4. **jest**: tokens 3/3 (new full-set tests); react-provider (dual-emission snapshots
   updated; suite green); react-button, react-avatar, react-motion, react-card green;
   react-badge 66/66 after regenerating ONE pre-existing stale PresenceBadge snapshot
   (icon `data-fui-icon` drift from committed S-J history — same root cause as the 3
   carousel snapshots regenerated in `944cccc0bc`; verified via `git log -S` that no
   Phase-2a file touches icon rendering); charts react-charts 917 passed / 86 skipped.
5. **SSR run green**: `ssr-tests-v9:test-ssr` exit 0.
6. **lint/type-check** on touched-project sample: type-check tokens, react-provider,
   react-button, react-motion, react-charts + `verify-tokens-css` all green; lint
   tokens (after a JSDoc tag-name fix in the new comments), react-provider,
   react-button, react-motion, react-charts all green.
7. **Perf E-cell spot-check — flat.** Same rig as Phase 1 (scenario E, pooled-window,
   31 windows + 5 warmups per visit, 6 reps, legs shuffled per cell per rep, seed
   20260806, n = 186/cell; Chromium 141.0.7390.37; per-leg liveness asserted: control
   bundle carries `var(--colorNeutralBackground1)` forms and zero canonical forms, new
   bundle the inverse). Medians:
   | Cell                                                                                 | control (ms) | new (ms) | delta |
   | ------------------------------------------------------------------------------------ | -----------: | -------: | ----: |
   | Button E                                                                             |        3.500 |    3.500 | +0.0% |
   | Switch E                                                                             |        5.600 |    5.550 | -0.9% |
   | Divider E                                                                            |        1.300 |    1.300 | +0.0% |
   | IQRs overlap fully (Button [3.400, 3.700] both legs; Switch control [5.400, 5.900] / |
   | new [5.400, 5.900]; Divider [1.300, 1.400] both). Raw:                               |
   | `.scratch/perf-eval/phase2a-theming/results/`. The provider-rule doubling (dual      |
   | emission) is a once-per-provider-mount cost outside scenario E's re-render loop; its |
   | size delta is recorded above and it disappears with the tag in Phase 2b.             |

### Interim-state semantics (until Phase 2b)

FluentProvider's runtime tag now writes BOTH vocabularies per provider element. The
camelCase half feeds no shipped reader (all shipped CSS and `tokens.*` strings are
canonical); it keeps hand-written consumer reads of old names working under providers
during the interim. A custom provider `theme` override reaches every shipped reader
through the canonical half — unlike Phase 1's spacing (which froze at `:root`), color/
font/etc. theming behavior through providers is fully preserved. Outside any provider,
canonical names do not resolve — exactly the camelCase-era semantics.

### Phase 2b (queued)

Remove the FluentProvider runtime theme tag / JS theming path. With Phase 2a done, the
tag is the ONLY remaining writer of both vocabularies; 2b must introduce the static
value emission / theme-application mechanism for the canonical names (the design
question deferred from this phase) and delete `createCSSRuleFromTheme`'s runtime role.

## Phase 2b — the JS theming path is removed; themes are static CSS classes

Date: 2026-08-06 · Branch: `styling/tailwind-css-modules` · Decision record:
DECISIONS.md **D28** (+ D20.1 retirement note). Completes the arc: FluentProvider's
runtime theme style tag — since 2a the SOLE value source for the 433 theme-variant
canonical variables — is deleted, and the react-tailwind-theme artifact becomes the
only writer of token values.

### The shipped artifact

- `css/tokens.css`: the `@layer fui.theme { :root, :host }` block now carries the 433
  theme-variant web-light values below the Phase-1 spacing/stroke emission (41,511 →
  63,560 bytes, measured `git show 4e90ba2a89:…/css/tokens.css | wc -c` and `wc -c` on the
  working tree). Default = web light, no provider or class needed.
- **NEW generated `css/themes.css`** (152,729 bytes): one class per shipped theme —
  `.fui-theme-web-light`, `.fui-theme-web-dark`, `.fui-theme-teams-light`,
  `.fui-theme-teams-dark`, `.fui-theme-teams-high-contrast`,
  `.fui-theme-teams-light-v21`, `.fui-theme-teams-dark-v21` — 433 custom-property
  declarations each, `@layer fui.theme`, imported by `css/index.css`.
  `dist/styles.css`: 175,638 bytes raw / 14,603 bytes gzip
  (`zlib.gzipSync(buf, { level: 9 })`; the same file is 15,530 B at zlib level 6, which is
  the level monosize uses — always state the level). `dist/` is gitignored, so this is a
  build-tree measurement: rebuild `react-tailwind-theme` to reproduce it. The pre-2b
  baseline is omitted for the same reason — it is not reproducible from git at any ref.
- Per-class exclusions, generator-asserted: the 26 spacing/stroke tokens are
  theme-invariant (all 7 themes checked against the pinned scales) and stay
  `:root`-only in density-knob form; the 8 zIndex tokens are theme-absent
  (fallback-carried).
- Value source: committed `packages/tokens/theme-values.json` (7 themes × 459 keys;
  jest drift gate deep-equals it against the computed themes; `verify-theme-values`
  wired into the CI target lists). Class-name constants (`webLightThemeClassName`, …,
  `themeClassNames`, `ThemeClassName`) live in @fluentui/tokens and re-export through
  react-theme + the umbrella; the generator re-derives and asserts them on every run.
  Generated css files are prettier-ignored — value bytes stay identical to the JS
  themes (prettier would rewrite rgba spacing / trailing zeros / wrap font stacks).
- D13 re-verified: an `@reference '#theme'` module compile emits 210 bytes with ZERO
  theme declarations or classes while `w-thin` / `bg-neutral-background-1` inline the
  canonical var() references.

### Provider surface (prop-shape decision recorded)

`themeClassName?: string` — chosen because `themeClassName` is already the provider's
own vocabulary (state field + portal channel). Resolution: prop → inherited from the
parent provider (new `FluentProviderThemeClassName` context; hook
`useFluentProviderThemeClassName_unstable`, `@internal`) → `''` (root defaults). The
class joins `root.className` (now AFTER `styles.root` + marker — it can be empty;
D15.1) and reaches portals through the untouched `ThemeClassNameContext` propagation.
REMOVED: `theme` prop, `useFluentProviderThemeStyleTag`, `createCSSRuleFromTheme`,
`serverStyleProps` + SSR style element, `nonce` prop + `StyleNonceContext` (D20.1
retired), the theme-undefined warning and the duplicate-id dev check;
`ThemeContext_unstable`/`ThemeProvider_unstable`/`ThemeContextValue_unstable` removed
from react-shared-contexts (which drops its react-theme dependency);
react-portal-compat applies the resolved class from the new context instead of
regex-extracting the dead runtime `fui-FluentProvider<useId>` class. Umbrella +
react-theme drop the theme objects / `create*Theme` / `themeToTokensObject` /
`Theme`-family types (all remain in @fluentui/tokens as build-time input) and gain the
class constants. api.md regenerated for 6 packages with the breaking shapes.

### Runtime value-reader inventory (migrated per the useCssVarValue directive)

- `charts/react-charts` `useIsDarkTheme` (the ONLY shipped runtime theme-object
  reader; 2 duplicated copies) — unified onto one hook taking an element ref; reads
  `--color-neutral-background-1` / `--color-neutral-foreground-1` (names derived from
  the `tokens.*` strings) via `useCssVarValue` at the chart container and compares HSL
  lightness; web-light fallbacks reproduce the pre-2b no-provider behavior.
- `react-storybook-addon` example container: `tokens.colorNeutralBackground2` var()
  string as inline style (no read at all).
- `theme-designer` + `react-migration-v8-v9` shim stories: still build Theme OBJECTS
  (from @fluentui/tokens) and apply them as generated custom-property classes via a
  local `applyThemeAsClass` util (canonical names derived from `tokens.*` — no second
  kebab implementation); export snippets emit the new consumer pattern.
- `useCssVarValue` upgraded per the user directive: module-level memo keyed by
  (element, variable) + an explicit `deps` re-read trigger (effect-style list; a
  change re-reads the DOM and refreshes the cache; providing `deps` opts out of the
  cross-mount memo on first read — a cached hit after a theme change while unmounted
  would be stale). Read-once stays the default; no per-render reads, no observers.
  10/10 unit tests.

### Harness/story sweep (mechanical record)

Scripted sweep `.scratch/phase2b-theming/sweep-theme-prop.mjs` (log:
`sweep-theme-prop.log.json`): **96 files / 119 `theme={<shipped>Theme}` →
`themeClassName={<shipped>ThemeClassName}` replacements** with import repoints (38
cypress files, 8 perf scenarios, migration shim stories, docsite MDX, SSR entry
generator, sandbox scaffold, fixtures). Manual clusters (two subagents + direct work):
`getStoryVariant` (vr-tests + tools mirror) maps DARK_MODE/HIGH_CONTRAST/RTL to class
constants; `withFluentProvider` id→class map; provider stories (nested custom theming
now demos a module-css theme class); theme-designer; v8↔v9 shims;
`Utilities/Theme/createCSSRuleFromTheme` docsite section replaced by
`Utilities/Theme/ThemeClasses`; Theming.mdx rewritten; react-theme value-table stories
import @fluentui/tokens; bundle-size fixtures follow the new exports. v8-domain files
(packages/react, react-charting v8, react-examples, azure-themes, v8 apps) and
web-components are out of scope and untouched; eslint-plugin lint-rule fixtures use
the old names as arbitrary symbols and were left (recorded).

### Gates

1. **Scoped-theming browser probe (committed test) — PASS 2/2**:
   `react-menu/library/src/components/Menu/MenuThemeScoping.cy.tsx` (cypress component
   runner, real Chromium): a bare `webDarkThemeClassName` div themes its subtree
   (probe computes `#292929`/`#ffffff`) while a sibling stays web light; a menu opened
   from inside a themed provider carries the theme to its PORTALED surface (probe
   inside MenuPopover computes the dark value; the mount node carries the class;
   siblings outside stay light).
2. **Deprecated-package themed rendering — verified via cypress, not stories**:
   react-alert/react-infobutton have NO stories anywhere (docsite explicitly excludes
   deprecated packages; no vr-tests dirs) — recorded as the answer to the task's
   "verify dark-mode stories" item. Evidence instead:
   `deprecated/react-infobutton/.../InfoLabel.cy.tsx` (+2 tests, suite 5/5) proves the
   still-Griffel package's `tokens.colorNeutralForeground2` reference computes the
   webDark value (`#d6d6d6`) under the dark CLASS and the light value (`#424242`)
   under the default — Griffel-var → theme-class resolution end to end.
3. **jest**: react-provider 37/37 (suites rewritten to the new contract: class
   application, inheritance, override, SSR = plain div, empty-head hydration);
   react-portal-compat green (context-based extraction incl. multi-class + nested
   cases); tokens 10/10 (2 new gates); react-utilities/react-shared-contexts/
   react-theme/react-button/react-avatar/react-motion/react-card/react-badge = 131
   passed; react-table green; charts react-charts 917 passed / 86 skipped (69
   snapshots regenerated — diffs inspected: provider markup + useId shifts only);
   sandbox-export + workspace-plugin + vr utilities + test-ssr generator specs green.
4. **SSR full run green**: `ssr-tests-v9:test-ssr` exit 0 (fresh) — the harness
   template now emits `themeClassName={teamsLightThemeClassName}`; the provider
   injects nothing, hydration clean.
5. **lint/type-check**: type-check green across tokens, react-theme,
   react-shared-contexts, react-provider, react-portal-compat, react-components,
   react-charts, react-table, react-portal, react-infobutton,
   react-storybook-addon(-export-to-sandbox), vr-tests-react-components,
   visual-regression-utilities, theme-designer, react-migration-v8-v9(+stories),
   react-theme-stories, react-provider-stories, react-migration-v0-v9-stories,
   public-docsite-v9. lint green on the touched core packages; `react-utilities:lint`
   fails PRE-EXISTING (2 `no-deprecated` errors in files 2b does not touch:
   `compose/types.ts`, `hooks/useOnClickOutside.ts`). public-docsite-v9 storybook
   build green (fresh).
6. **Perf — provider mount, measured before/after**: dedicated benchmark
   (`.scratch/phase2b-theming/perf-provider-mount/`; control = pre-2b HEAD worktree
   bundled from source, new = working tree; 40 providers mounted per window via
   `flushSync`, 31 windows + 5 warmups per visit, 6 interleaved reps, pooled
   n = 186/leg, headless Chromium; liveness asserted: control injected 40 theme style
   tags per window, new injected 0). Medians: control **9.4 ms** [IQR 9.1, 9.6] vs new
   **0.3 ms** [0.2, 0.4] per 40-provider window — **−96.8%** (~0.235 → ~0.008 ms per
   provider). The deleted work: building + inserting the 918-declaration dual-vocab
   rule per provider. Raw: `perf-provider-mount/results.json`.
7. **Full VR sweep at zero tolerance — 76/76 canonical sets PASS, failing: none.**
   **7,621 matched pairs, ALL clean — 0 failed, 0 missing, 0 extra — every set on its
   FIRST attempt** (no flake retries; even the two adjudicated-ceiling sets,
   react-calendar-compat and property-remedy [2,772 pairs], and the known
   ProgressBar-HC flake set diffed zero pixels). The harness themes exclusively via
   classes now, so this sweep IS the proof that the class-based themes are
   pixel-identical, including every dark/HC variant story.
   Fresh `--skip-nx-cache` `vr-tests-react-components:build-storybook` AFTER all edits
   settled (bundle marker-verified: 0 camelCase declarations, 0
   createCSSRuleFromTheme / useFluentProviderThemeStyleTag references, theme classes
   present in the bundled CSS, 511 themeClassName references); driver
   `.scratch/phase2b-sweep-driver.mjs` (phase2a shape, review36513-\* excluded),
   results `.scratch/phase2b-sweep-results.json`. An earlier same-day attempt recorded
   0/76 — ALL capture-stage staleness-guard refusals (the docs subagent was still
   editing sources; zero pixel evidence involved); the results file was reset and the
   sweep re-run against the fresh bundle.

### Interim semantics RESOLVED

No runtime tag, no camelCase emission anywhere (the dual tag died with the tag), no JS
theme objects in the runtime API. Deprecated packages' Griffel styles read `tokens.*`
strings → canonical vars → resolved by the static `:root` emission + theme classes
(gate 2). A theme class on any DOM node themes that subtree; portals and nested
providers inherit; outside any class, web light applies everywhere (canonical vars now
RESOLVE at `:root` — the one deliberate semantics change vs the provider-scoped era,
part of the documented contract).

### Closeout audit — defects fixed after the sweep

The Phase-2b run was interrupted before its docs commit. A three-auditor review of the
uncommitted tail found the following; all were fixed and re-gated (no VR re-run, see the
coverage note below).

1. **BEHAVIOURAL REGRESSION — `react-charts` `useIsDarkTheme` lost theme reactivity.**
   Pre-2b it read `ThemeContext_unstable`, so a provider theme change re-rendered charts
   with the new dark/light decision. Post-2b it called `useCssVarValue` with no `deps`,
   which is read-once-per-(element, variable) and module-memoized in a WeakMap — and the
   chart container is a stable DOM node, so `DeclarativeChart` / `VegaDeclarativeChart`
   stayed stuck on the theme active at first mount. FIXED by passing the closest
   provider's class string (`useThemeClassName_unstable`, already a react-charts
   dependency — the resolved theme class joins `root.className` and is published as that
   context value) as `deps` on both reads. This restores the pre-2b reactivity envelope
   exactly: provider theme changes are tracked; a class swapped on a bare element was not
   tracked pre-2b either and still is not. NOTE: the audit's suggested
   `useFluentProviderThemeClassName_unstable` would have required a new react-provider
   dependency AND would not have fixed the bare-element case it cited.
   NEW TEST: `VegaDeclarativeChartHooks.test.tsx`, 5 tests — the two reactivity tests were
   confirmed to FAIL with `deps` removed and PASS with it.
2. **beachball, CI-blocking.** Added missing entries for `@fluentui/tokens` and
   `@fluentui/react-theme-sass` (both `prerelease` — their manifests disallow
   major/minor/patch). Lifted the `major` gate in `react-theme`,
   `react-shared-contexts` and `react-portal-compat` (precedent: commit `9b59224287`),
   and flipped `@fluentui/react-storybook-addon` (v0.7.1) from `major` to `minor` per the
   branch's 0.x convention (`eae2756306`) — which removes its need for a gate lift.
   Added changelog-fidelity entries for `react-storybook-addon-export-to-sandbox` (the
   sandbox scaffold change) and `react-tailwind-theme` (the 2b artifact delta).
   Simulating beachball's validator over all 223 change entries now reports **0 with a
   disallowed type**.
3. **Docs prescribing a removed API.** `AdvancedConfiguration.mdx` still documented the
   `nonce` prop and the runtime `<style>` tag and told consumers to migrate TO the nonce
   prop; its "Configuring rendering" section still claimed FluentProvider writes theme
   custom properties into the child document. Both rewritten. Also finished three
   half-applied files whose code fences were swapped but whose prose was not:
   `QuickStart.mdx`, `Migration/GettingStarted.mdx`, and the `storybook-llms-extractor`
   golden fixture + its inline snapshot (which publish the model into generated
   `llms.txt`). Updated the two maintained in-repo docs that still imported removed
   umbrella symbols: `docs/react-v9/contributing/patterns/extending-tokens.md` and
   `docs/architecture/design-tokens.md` (the unswept twin of the
   `copilot.instructions.md` block already in the diff).
4. **Pre-2a vocabulary still documented.** Both `design-tokens.md` and
   `copilot.instructions.md` asserted `tokens.colorNeutralForeground1 ===
'var(--colorNeutralForeground1)'`. Verified false — the value is
   `'var(--color-neutral-foreground-1)'`, and `css/themes.css` declares **0** camelCase
   names vs **7** kebab-case (one per theme class). Corrected in both.
5. **Undeclared dependency.** `public-docsite-v9` imports `@fluentui/tokens` in 4 ThemeShim
   files without declaring it (4 `import/no-extraneous-dependencies` errors). Added it as
   `"*"`, matching the convention of all 16 other `@fluentui` deps in that private app's
   manifest (a hard pin would be the only one of its kind and would rot). The 4 errors are
   gone; the 9 that remain in those files were proven pre-existing by linting the pre-2b
   file content.
6. **Child-window bug in the duplicated theme util.** `theme-designer`'s
   `applyThemeAsClass` injected into the global `document` while its byte-identical twin in
   `react-migration-v8-v9/stories` correctly used `useFluent().targetDocument`. Fixed, and
   both copies now carry a DUPLICATE cross-reference plus a note that a theme key with no
   matching `tokens` entry is silently dropped.
7. **Staleness-guard hole.** `validation/capture.mjs` walked only
   `packages/react-components`, so a stale `getStoryVariant` could never have tripped it.
   Widened to `packages/charts` (19 `stories/Charts/*` files import `@fluentui/react-charts`
   — a hole the audit did not spot), `apps/vr-tests-react-components/src` and
   `tools/visual-regression-utilities/src`.

Also added: `reports/theme-api-migration-map.{md,json}` — the consumer find/replace source
for this break (7 theme→class rows, the prop rename, the relocated-to-`@fluentui/tokens`
list and the removed-with-no-replacement table), the Phase-2b counterpart to
`token-rename-map`. And an explicit before/after migration callout in `Theming.mdx`.

### VR coverage — what the 76/76 does and does not cover

The sweep was NOT re-run (see below), so this records its exact reach:

- `git diff --quiet <captured-tree> -- <VR paths>` returns 0 for
  `apps/vr-tests-react-components`, `tools/visual-regression-utilities`,
  `react-storybook-addon(-export-to-sandbox)`, `tokens`, `react-provider`,
  `react-tailwind-theme` and `scripts/storybook` — the screenshotted tree is intact.
- **`tools/visual-regression-utilities/src/getStoryVariant.tsx` is NOT in any of the 76
  pixel sets.** It is the published mirror with zero in-repo consumers; all candidate
  manifests capture from `apps/vr-tests-react-components/dist/storybook`, which uses the
  app's own copy. Its only gate is its unit spec (3/3).
- The `react-charts` fix above touches a bundled package, but **no VR set renders a
  consumer of it**: `useIsDarkTheme` is imported only by `DeclarativeChart` and
  `VegaDeclarativeChart`, neither of which has a story anywhere under
  `apps/vr-tests-react-components/src` (grep: 0 hits), and nothing but barrel files
  re-exports them. Its gate is the new unit suite.
- The `react-theme` delta vs the captured tree is exactly one deleted line —
  `"major",` in `beachball.disallowedChangeTypes`. Release metadata; never bundled.

### Measurement conventions (corrections applied 2026-08-07)

Three defects were found in the byte figures this report originally quoted. All are now
fixed **in place** above; this section records what was wrong and the rules adopted so it
does not recur.

1. **`css/tokens.css` "20,842 →" was unsourceable and has been replaced with 41,511.**
   20,842 matches no committed revision of the file. Every revision was measured
   (`for c in $(git log --format=%H -- …/css/tokens.css); do git show $c:… | wc -c; done`):
   63,560 / 41,511 / 39,796 / 37,153 / 35,327 / 33,489. Splitting the `4e90ba2a89` blob at
   `@layer fui.theme` gives 39,281 before / 2,230 after — neither is 20,842 either. The
   value at the cited ref is **41,511** (`git show 4e90ba2a89:…/css/tokens.css | wc -c`);
   the AFTER side, 63,560, was always correct (`wc -c` on the working tree).
2. **The `dist/styles.css` baselines "1,410 →" and "2,810 →" are removed, not corrected.**
   `dist` is gitignored repo-wide (`git check-ignore -v …/dist/styles.css` →
   `.gitignore:64:dist`), and `git ls-tree 4e90ba2a89 …/dist/` and
   `git ls-tree HEAD …/dist/` are both empty. No reviewer can reproduce either figure at
   any ref, and no correct replacement exists to substitute — so the pairs are gone and
   the load-bearing claim (byte-stable emission shape) is stated on its own. The nearest
   committed proxy is the emission block in the source `tokens.css` at that ref
   (2,230 bytes), which is a different quantity and is labelled as such.
3. **The gzip figure 14,603 is CORRECT and its earlier retraction was wrong.** A prior
   gate agent reported "measures 15,714, treat as compressor-dependent" and that
   disclaimer has been deleted. Measured on the same file, 175,638 B raw:
   `zlib.gzipSync(buf,{level:9})` = **14,603** (exact match); `{level:6}` and zlib default
   = 15,530; the `gzip` CLI at its default level = 15,714. The figure needed a method
   annotation, not a retraction, and now carries one inline.

**Rules for every byte figure in this and future migration reports:**

- Name the ref a figure was measured at, and prefer a git-reachable path so
  `git show <ref>:<path> | wc -c` reproduces it.
- Any figure for a gitignored artifact (`dist/**`) is labelled _build-tree measurement,
  not reproducible from git_ and names the build that produced it — or is omitted.
- Every compressed size states the compressor and the level. `zlib` level 6 (the default,
  and monosize's setting) and level 9 differ by roughly a kilobyte on this artifact; a
  bare "gzip" number is not reproducible by anyone.

Two reports in this directory already comply and were verified to reproduce exactly:
`prettier3-tailwind-sort.md` (837 tracked `*.module.css` / 1,771 stories at
`a6868ec088`) and `post-campaign-audit-fluentui.md` (837 / 238 at `62402f4375`). Use them
as the template. Byte figures were omitted from the changelog entry for these reasons.

### Re-gate after the closeout fixes (2026-08-07)

Every gate below was re-run AFTER the seven closeout fixes landed in the working tree.
VR was NOT re-run — justified by the frozen-path proof in the coverage note above
(`git diff --quiet` = exit 0 on all 8 genuinely-frozen VR paths), so the 76/76 at zero
tolerance still describes the committed tree.

| Gate                                           | Result                                                                                                                                                                                                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type-check                                     | exit 0 — 15 projects + 104 dependent tasks                                                                                                                                                                                              |
| lint                                           | exit 0 — 0 errors (pre-existing warnings only)                                                                                                                                                                                          |
| jest — react-charts                            | 922 passed / 86 skipped (= the prior 917 + the 5 new hook tests; no snapshot churn)                                                                                                                                                     |
| jest — react-menu                              | 484/484 (includes the scoped-theming cypress-adjacent suite)                                                                                                                                                                            |
| jest — react-button                            | 198 passed / 13 skipped                                                                                                                                                                                                                 |
| jest — react-provider                          | 37/37                                                                                                                                                                                                                                   |
| jest — tokens                                  | 10/10                                                                                                                                                                                                                                   |
| jest — react-storybook-addon-export-to-sandbox | 54/54                                                                                                                                                                                                                                   |
| jest — storybook-llms-extractor                | 9/9 (6 snapshots)                                                                                                                                                                                                                       |
| jest — react-portal-compat                     | 8/8                                                                                                                                                                                                                                     |
| jest — react-migration-v8-v9                   | 11/11                                                                                                                                                                                                                                   |
| jest — react-theme-sass                        | 1/1                                                                                                                                                                                                                                     |
| jest — visual-regression-utilities             | 3/3                                                                                                                                                                                                                                     |
| SSR                                            | `ssr-tests-v9:test-ssr` exit 0 — output asserted: **0** `<style>` elements, **0** `nonce` attributes, theme = `fui-theme-teams-light`, 588 bytes. Directly validates the CSP doc rewrite.                                               |
| docsite                                        | `public-docsite-v9:build-storybook` exit 0 (39 dependent tasks)                                                                                                                                                                         |
| perf                                           | Not re-measured (react-provider is untouched by the closeout fixes). Recomputed from the stored 186+186 raw samples: control median **9.40 ms** [9.10, 9.60] vs new **0.30 ms** [0.20, 0.40] = **−96.8%**; liveness 40 vs 0 style tags. |

**Two failures proven PRE-EXISTING** (Windows/tooling, not theming — both isolated by
running the pre-2b content of the same files):

- `workspace-plugin:test` — 59 failed / 196 passed: EBUSY temp-directory locks plus
  POSIX-vs-Windows path assertions. The pre-2b version of the one 2b-touched spec fails
  snapshots 3, 9, 11 and 12; with the 2b edit only 3 and 9 fail. Phase 2b strictly
  improved it.
- `scripts-test-ssr:test` — 1 failed / 11 passed: `A dynamic import callback was invoked
without --experimental-vm-modules` (prettier ESM under jest). Pre-2b sources give the
  identical 1-failed / 11-passed.

**beachball**: `npx beachball check` still exits 1 while the change files are UNTRACKED —
the tool filters change files through `getChangesBetweenRefs(fromRef, 'HEAD')`, so
uncommitted entries do not count. Proven by calling `readChangeFiles` directly:
`fromRef=undefined` → 220 entries with `@fluentui/tokens` and `@fluentui/react-theme-sass`
both present as `prerelease`; `fromRef=origin/master` → 73 entries with neither found.
The entries are correct and complete; the gate turns green once they are committed.
Residual: **18 other packages** are flagged as needing change files — all pre-existing
branch debt with ZERO Phase-2b-attributable non-ignored files (babel-preset-storybook-full-source,
chart-utilities, chart-web-components, codemods, cra-template, foundation-legacy,
merge-styles, public-docsite-setup, react, react-cards, react-charting,
react-docsite-components, react-experiments, react-jsx-runtime, react-monaco-editor,
react-motion-components-preview, utilities, web-components). That residual is NOT Phase
2b's to fix and needs its own decision before the PR can go green.

### Deliberately deferred (recorded, not fixed)

- **`react-tailwind-theme/css/index.css` stale header comment** — still asserts
  "FluentProvider still owns the values", contradicted by 29337609ea / 1b3af972d2. NOT
  fixed: this is a frozen VR path, and editing it for a cosmetic comment would void the
  76/76 and force a full rebuild + re-sweep. Flagged for the next commit that touches
  the package for a substantive reason.
- **`ChartAnnotationLayer.stories.tsx` `fontSize: 18` → `'18px'`** — a non-theming edit
  that arrived inside the 2b diff. Left as-is: it is part of the captured tree and is
  pixel-neutral (React serializes numeric `fontSize` to `px`), consistent with the
  76/76. Recorded here because no other report entry explained it.
- **`eslint-plugin` no-restricted-imports fixtures** — keep `webLightTheme` /
  `webDarkTheme` as arbitrary RuleTester string literals (never type-checked; the rule
  is config-driven). Previously recorded; restated here for completeness.
- **`@fluentui-contrib/react-themeless-provider` shadow-DOM path** — the rewritten
  interop guide recommends that external package's `createCSSStyleSheetFromTheme` for
  non-default themes. The package is not installed in this repo, so whether its output
  uses the canonical kebab names Phase 2a standardized on could NOT be verified here.
  This is a Phase-2a exposure that the 2b prose re-blesses; confirm or hedge before the
  PR ships.
