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
widths resolve through their density-decoupled canonical. dist/styles.css: 1,410 → 2,810
bytes (30 emitted declarations).

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
because the tag now defines the canonical names. `dist/styles.css` byte-stable: 2,810
bytes, Phase-1 emission block unchanged, zero old names.

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
2. **Emitted-CSS verification — zero old names**: dist/styles.css (2,810 bytes,
   byte-stable emission shape); fresh `--skip-nx-cache` VR storybook bundle — 247
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
