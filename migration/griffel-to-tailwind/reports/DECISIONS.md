# Architecture Decisions

Settled 2026-07-26 from the seven research reports in this directory. **Do not re-litigate
without new evidence.** Every decision cites its evidence report.

## D1 — CSS is compiled at package build time; consumers receive plain CSS

Source of truth is Tailwind-flavored CSS Modules (`*.module.css` with `@reference`,
`@apply`, `@variant`) living next to each component. The **package build** compiles them
(PostCSS: `@tailwindcss/postcss` → CSS Modules hashing) into:

- a per-package aggregated stylesheet shipped at `dist/styles.css` (layered, plain CSS,
  no Tailwind syntax), and
- generated class-map JS (what `import styles from './X.module.css'` resolves to in
  `lib/`/`lib-commonjs`).

Consumers never run Tailwind. Precedent: `@fluentui/react-storybook-addon` already ships
`dist/styles.css` with a `sideEffects` allowlist + `exports` map (build-metrics report).
The accepted in-repo RFC `stop-styles-transforms.md` rejects dual-output shipping — we do
not ship raw `.module.css` sources for consumers to compile (build-metrics).

Component JS keeps auto-loading semantics via a side-effect CSS import, which **requires**
flipping `"sideEffects": false` → `"sideEffects": ["**/*.css"]` in every converted package
first (risk-analysis BLOCKER: 83/85 packages would silently tree-shake the import today).

## D2 — Cascade determinism via `@layer fui.*` sublayers, `:where()` everywhere

Griffel's ordering (bucket order + mergeClasses last-wins property deletion) is replaced by
explicit cascade layers, declared once in the shared theme layer:

```css
@layer fui.reset, fui.base, fui.variant, fui.state, fui.override;
```

- `fui.reset` — `makeResetStyles` output (126 call sites rely on reset-loses-to-variant;
  bucket `r` → lowest layer).
- `fui.base` — the base makeStyles slice of each slot.
- `fui.variant` — enum/appearance/size/shape slices.
- `fui.state` — disabled/selected/checked and interaction states.
- `fui.override` — the rare later-argument overrides that contradict source order
  (23 confirmed inversions in 12 files, e.g. Button `size`-then-`shape` borderRadius —
  risk-analysis). Conversion must replicate **mergeClasses argument order**, not source
  declaration order.

All selectors inside layers wrap conditions in `:where()` so specificity stays flat
(nyt-games convention). Consumer CSS (unlayered — including consumer Griffel atomics,
which Griffel injects unlayered) beats layered Fluent CSS for normal declarations,
preserving the "consumer overrides win" contract that `mergeClasses` provided
(risk-analysis §2 verified).

**Accepted new failure modes** (documented for the PR): unlayered third-party resets now
beat Fluent styles; `!important` inside layers inverts strength (only 1 file uses it:
`usePresenceBadgeStyles`); v8 `merge-styles` (unlayered) wins ties in mixed v8/v9 apps.
Layer names become public API; the theme layer emits the `@layer` statement first.

## D3 — Enum "look" props → module classes; states → data-attributes + custom variants

Following nyt-games conventions and the in-repo headless preview's established data-attribute
vocabulary (25 names, headless-precedent report — reuse its names: `data-orientation`,
`data-disabled`, `data-checked`, `data-icon-position`, …):

- Look props (`appearance`, `shape`, `color`): `styles[appearance]` class lookups.
- State/scale props (`size`, `disabled`, `vertical`, `checked`…): `data-*` attributes
  rendered by the component's `useX` hook, targeted by `@custom-variant` selectors
  defined once in the shared theme layer (all `:where()`-wrapped).
- Composition: `clsx(staticSlotClass, styles.slot, styles[enumProp]…, className)` —
  static `fui-*` class first (a conformance-tested contract, 839 call sites), consumer
  `className` last.
- Selectors referencing other components' static classes (191 sites across 22 files) use
  `:global(.fui-…)`.

## D4 — Theming: raw `var(--token)`; Tailwind theme gets ONLY `--base-scale`

Fluent tokens are already plain inherited CSS custom properties written by FluentProvider
(`.fui-FluentProviderN { --colorNeutralForeground1: … }`, 459 per theme) — theming is
100% Griffel-independent and keeps working unchanged, including nested provider scoping,
portals (`applyStylesToPortals` threads the theme class), and all 7 themes
(theming-system report).

Therefore: component CSS consumes tokens as literal `var(--colorNeutralForeground1)`
(plain declarations or Tailwind arbitrary values). Tokens are **never** registered with a
plain (non-inline) Tailwind `@theme` — a plain `@theme` writes to `:root` and cannot express
nested-provider scoping (risk-analysis).

**Corrected to shipped reality:** all 467 Fluent tokens **are** registered, via
`@theme inline` (`css/tokens.css`, generated). `inline` substitutes `var(--fluentToken)` into
each utility instead of emitting a `:root` variable, so values still resolve per-element
against the nearest FluentProvider — the scoping constraint above is honoured, not violated.
Literal `var(--tokenName)` authoring stays valid and unchanged.

The only Tailwind theme values that are _emitted_ rather than aliased:

```css
@theme static {
  --base-scale: calc(1rem / 16px); /* the ONE carry-over from nyt-games */
  --spacing: calc(1px * var(--base-scale)); /* numeric utilities read px, compute rem */
}
```

Intentional, user-approved deviation: px→rem via `--base-scale` means values scale with
root font-size (an accessibility goal). At default 16px root, computed pixels are
identical; VR validation runs at default.

zIndex tokens are theme-absent with hardcoded fallbacks (`var(--zIndexPopup, 2000)`) —
carry the fallback forms verbatim (theming-system).

## D5 — RTL: logical properties + `:dir(rtl)` variant for value-level flips

Griffel auto-flips ~500 physical declarations at compile time (theming/risk reports).
Replacement:

- Property-level flips → CSS logical properties (`padding-inline-start`,
  `margin-inline-end`, `inset-inline`, `border-start-start-radius`, `text-align: start`…).
  Precedent: `packages/web-components` already does exactly this.
- Value-level flips (gradients, `translateX`, box-shadow x-offset, 4-value shorthands,
  `cursor: *-resize`, `transform-origin`, keyframe bodies — logical properties cannot
  express these) → explicit `@custom-variant rtl (&:where(:dir(rtl)));` rules.
  `:dir()` resolves **computed** direction (correct with nesting, specificity-flat under
  `:where()`; supported by all 2026 baseline browsers).
- Semantics change (documented): direction now follows the DOM (`dir` attributes, which
  FluentProvider always writes) instead of React context. A raw `<div dir>` inside a
  provider now flips styles — arguably more correct; flagged for the PR description.

## D6 — Focus indicators: keep keyborg attributes, share one focus-ring CSS utility

No behavior change: keyborg/tabster continues to set `data-fui-focus-visible`/
`data-fui-focus-within`. The shared theme layer defines
`@custom-variant focus-visible-fui` / `focus-within-fui` plus focus-ring utilities that
reproduce `createFocusOutlineStyle`'s **compiled** output byte-for-byte:
`border: 2px solid var(--colorStrokeFocus2)` on `::after`, offsets `calc(2px * -1)`,
`@media (forced-colors: active) { … Highlight }` — including the hardcoded `2px`
(do NOT "fix" it to `strokeWidthThick`; known FIXME, changing it changes rendering —
theming-system). react-tabster's Griffel helpers (used in 46 styles files) are replaced by
these utilities during each package's conversion; the JS helpers remain exported until
Phase 3 cleanup.

**Amendment (2026-08-04, perf-property-remedy):** the focus knobs
(`--fui-focus-outline-*` / `--fui-focus-ring-*`) are now UNREGISTERED — the 8
`@property … syntax:'*'; inherits:false` rules were removed from
react-tailwind-theme/css/utilities.css. `perf-mechanism-diagnostic.md` proved any
non-empty custom-property registry flips Blink's transition-start path onto a
page-global slow branch (~9.4 µs per started transition — the whole unexplained E-cliff
residual; Button E +145% → ±0% vs Griffel, Switch +165% → +23% on removal). The
isolation the registrations provided is reproduced by **element-level resets**: each
focus utility opens by setting every knob it consumes to `initial` (guaranteed-invalid
for unregistered properties) on the element it is applied to, so ancestor overrides
never reach a nested component's indicator and unset knobs still hit their `var()`
fallbacks. Knob overrides on `::after` (all in-repo callers) are unaffected;
same-element overrides must cascade past the component's focus rule (after the
`@apply`, higher layer, inline, or unlayered). One previously-inert edge became live:
an outline knob set directly on a component's own root now inherits into its own
`::after` (measured, no in-repo/story occurrence). Gated by scenario-equivalence CDP
probes, isolation probes, VR 2770/2772 pixel-identical at zero tolerance (2 = proven
CalendarCompat.multiDayView flake), and new focus VR stories (Button family incl.
SplitButton + ancestor-knob isolation, Checkbox, Radio, Switch, Slider, Card). Do NOT
reintroduce `@property` into shipped CSS without re-running the perf gate — and note
the win is host-page fragile (any host `@property`, e.g. Tailwind v4 apps, restores the
engine penalty for the whole page).

## D7 — Public API: hooks stay, Griffel exports stay (for now)

`useXStyles_unstable` hooks (180) keep existing and now apply module classes;
`xClassNames` (193) unchanged; `customStyleHooks_unstable` (194 keys) keeps working —
it is className-string based, and consumer `mergeClasses` passes non-atomic strings
through. Griffel symbol re-exports from the suite package remain (consumers may use them
standalone); marked deprecated in the PR, removed in a later major. `GriffelStyle`-typed
option APIs (`createArrowStyles`, `createSlideStyles`, focus helpers) are converted
per-package as `special` items.

## D8 — Validation: VR storybook + StoryWright (local) + in-repo pixelmatch CLI

- Harness: `apps/vr-tests-react-components` — 1578 stories × themes/RTL/HC, StoryWright
  writes PNGs locally (no cloud), and it is the **only** storybook that builds on this
  Windows machine (storybook-vr-infra; the docsite storybooks fail on a POSIX-path regex
  in `react-storybook-addon-export-to-sandbox/src/webpack.ts:19` — fix separately).
- Diff: `tools/visual-regression-assert` (in-repo pixelmatch CLI, currently unwired) with
  tolerance aligned to the cloud pipeline (`--threshold 0.04 --cumThreshold 1` semantics),
  not its default zero-pixel strictness.
- The harness must **assert expected screenshot counts** (StoryWright exits 0 on browser
  launch failure) and treat renamed stories as failures, not add/remove noise.
- Same-machine before/after only; never compare local vs CI captures (font/GPU
  differences).
- VR storybook webpack gains a `.module.css` rule (Tailwind PostCSS + css-loader modules)
  since storybooks build from TS source; keep `griffelRule` alongside until Phase 3
  (unconverted packages still need it).

## D9 — Tests: deterministic class names + serializer swap + conformance replacement

- CSS Modules compile with deterministic `localIdentName` (readable pattern, stable
  prefix, e.g. `fuicm-<component>__<local>`), so a small jest snapshot serializer strips
  them exactly like `@griffel/jest-serializer` strips atomics today → the 126 `class=`
  snapshots stay byte-identical.
- `jest.preset.js` gains a repo-wide `moduleNameMapper` for `\.module\.css$` (maps to the
  generated class map / deterministic proxy) **before** the first conversion
  (build-metrics BLOCKER: zero jest configs handle CSS today).
- `make-styles-overrides-win` conformance (57 wrappers / 243 call sites, mocks
  `mergeClasses`) — converted packages disable it via existing `disabledTests` and enable
  a new `classname-overrides-win` conformance test asserting consumer `className` is last
  in the rendered class list (clsx-equivalent).

## D10 — Metrics methodology (report backbone)

Baseline captured on this machine before any component change; identical commands after.

- **Build time**: `nx run-many -t build --projects=tag:vNext --skip-nx-cache` (baseline
  measured 3m04.9s / 91 projects); per-package via `NX_VERBOSE_LOGGING` Execution Timings.
- **Bundle size**: monosize with `assetTypes: ['js','css']` + webpack
  `experiments.css` + `output.cssFilename` (proven zero-dep fix — build-metrics). Local
  A/B via snapshotting `packages/**/dist/bundle-size/monosize.json` (compare-reports
  requires GITHUB_TOKEN; not used). **Primary metric: combined JS+CSS min+gzip** — gzip
  is not additive; never derive savings by subtraction.
- **Install size**: `npm pack --dry-run --json` per package (react-button baseline:
  124,354 B packed). `*.styles.raw.js` (719,570 B repo-wide, 15.2% of shipped lib JS,
  imported by nothing) is deleted by conversion — counted as its own line item.
- **Storybook client bundle**: `vr-tests-react-components` static build size (35 MB
  baseline; docsite unbuildable on Windows).
- Griffel-AOT elimination tracked via `grep 'Processing griffel AOT' build.log`
  (62 packages / 277 files at baseline → 0).

## D11 — Out-of-scope / accepted losses (state in PR)

- **Iframe & shadow-DOM style injection** (`createDOMRenderer(contentDocument)`,
  `@griffel/shadow-dom`): static stylesheets don't cross document boundaries. Affected:
  1 iframe story, ShadowDOM VR stories. Replacement (stylesheet cloning /
  `adoptedStyleSheets`) is deliberately deferred; stories marked known-changed.
- **CSP nonce for component styles**: static CSS needs no nonce (improvement); the
  theme `<style>` tag keeps its existing nonce path via the retained renderer context
  until Phase 3 decides its replacement.
- `@fluentui/react-icons` is an external package using Griffel internally — out of scope.
- Griffel-specific VR stories (`MakeStyles*`, `CustomStyleHooks` — 11 stories) are
  retired with their baselines; listed explicitly in the PR.
- `react-migration-v8-v9` and compat packages convert last (`special`), given v8 interop.

## D12 — Conversion order

Phase 1 pilot: `react-divider` (user sign-off gate) → `react-badge`. Phase 2 batches:
theme layer + tabster focus utilities first, then leaf packages by ascending styles-file
count, compound components later (menu/table/tree last among leaves), suite package +
storybook/test infra in Phase 3. `react-motion` needs no conversion (Web Animations API,
zero Griffel — risk-analysis).

## D13 — Theme emission ownership: one root artifact, never per-package (settled with user 2026-07-27)

The nyt-games consumption model applies verbatim: the **document root imports the theme
CSS exactly once** (storybook: `scripts/storybook/src/tailwind-theme.css`; consumers: the theme
package's emitted CSS, or a suite-level convenience stylesheet that includes it);
component packages' compiled `dist/styles.css` contain **only** component rules and
must never embed the theme emission. Modules only ever `@reference` (compile-time,
emits nothing) — validated against the built VR storybook: `--base-scale:` declarations
appear in exactly one webpack module (main bundle) with three converted packages loaded;
zero in any component chunk.

Facts for Phase 1.5 packaging (validated 2026-07-27):

- **Tailwind v4 rewrites the repeated `@layer` order statement during module
  compilation** (Divider's `@layer fui.reset, …, fui.override;` compiled to
  `@layer fui.reset;` + blocks in file order). Single-module order survives only
  because the cookbook mandates canonical block order in-file. The CSS-emission build
  step MUST prepend the canonical full order statement verbatim to every package's
  `dist/styles.css` — do not rely on Tailwind preserving it.
- Bundle-text duplication of a module's CSS across lazy chunks (observed: Divider's
  text in two storybook chunks) is a chunking artifact — webpack's module registry
  executes it once; runtime injection is single. Irrelevant for consumers, who receive
  one static per-package stylesheet.
- Consumer integration notes: (a) non-Tailwind consumers override via unlayered CSS,
  which beats all `fui.*` layers — no setup needed; (b) Tailwind-using consumers who
  want nyt-games semantics (their utilities beat Fluent styles) must ensure `fui` is
  declared before their `utilities` layer — one line, e.g. `@layer fui.reset, fui.base,
fui.variant, fui.state, fui.override;` before `@import 'tailwindcss'` (layer order is
  first-appearance). Document in the PR.

## D2/D13 amendment — unified layer family (settled with user 2026-07-27)

Tailwind's own cascade layers are RETIRED; one family only:

```css
@layer fui.theme, fui.reset, fui.base, fui.variant, fui.state, fui.override, fui.utilities;
```

Mapping from Tailwind's conventional layers: theme → fui.theme; base (preflight) →
excluded (sanctioned slot layer(fui.reset) if ever needed); components → retired
(Tailwind v4 emits nothing into it — verified: tailwindcss/index.css declares it but
contains no @layer components block); utilities → fui.utilities (top of family — beats
component styles by design, loses to unlayered consumer CSS).

Feasibility verified first-party: tailwindcss/utilities.css is a bare '@tailwind
utilities;' with NO layer name — cascade layers are assigned exclusively by the
caller's layer(...) import modifiers, so redirection is supported, not a hack.
Consumer guidance simplifies to positioning ONE root layer name (fui).
Re-validated: all 5 VR sets pixel-identical after the re-layering (see ledger).

## D2/D13 amendment 2 — implementation-altitude levels (settled with user 2026-07-27)

The family gains the nyt-games numbered-level dimension — **altitude** (who is styling)
orthogonal to the intra-component slices (what stage of one component's cascade):

```css
@layer fui.theme,
  fui.l1.reset, fui.l1.base, fui.l1.variant, fui.l1.state, fui.l1.override,
  fui.l2, fui.l3, fui.l4, fui.l5,
  fui.utilities;
```

- `fui.l1.*` — base library components; the five slices encode mergeClasses argument
  order (unchanged semantics, now nested under l1).
- `fui.l2` — **library compositions**: styles a component applies to elements whose base
  styles come from ANOTHER component's hook (Menu styling its buttons, ToggleButton's
  additions over Button's root, SplitButton over children). Inner slices (`fui.l2.state`
  etc.) spring into existence on use. Conversion rule: _own slots → l1 slices; anything
  applied over another component's hook output → l2._ This replaces the load-order
  nondeterminism that would otherwise decide converted-vs-converted composition.
- `fui.l3` — application-global overrides (a consumer design system atop Fluent).
- `fui.l4` — application implementation/page/feature-specific styling.
- `fui.l5` — headroom for bespoke depth.
- `fui.utilities` — inline utility classes, top of family; unlayered CSS still beats all.

Cascade-layer comparison happens at the highest differing level, so anything in l2 beats
everything in l1 regardless of slice, specificity (all `:where()`-flat anyway), or
source order — each altitude overrides the one below in a guaranteed manner.

**Custom-variant/utility hardcoding check (user request): NOT hardcoded.** Empirical
probe (.scratch/layer-probe): with `@import 'tailwindcss/utilities.css'
layer(fui.utilities)`, source-scanned built-in utilities (`p-4`, `flex`), a custom
`@utility myring`, and custom-variant compositions (`checked:flex`, `checked:myring`,
`hover:myring`) ALL emit inside `@layer fui.utilities`; the output contains no
`utilities`-named layer at all. (The remembered constraint is Tailwind v3's
`@layer utilities` directive requirement for variant-composable custom classes — v4's
`@utility` has no fixed cascade-layer location.)
Re-validated post-restructure: all VR sets pixel-identical (see ledger).

## D7 revision — mergeClasses is not a compatibility target (settled with user 2026-07-27)

The Griffel runtime winner-selection machinery (sequence hashes, DEFINITION_LOOKUP_TABLE,
property-map merge, per-property class deletion) is being **removed, not emulated**.
Converted components compose class names with plain `clsx`; class names are inert
identifiers; ALL property-conflict resolution belongs to the cascade via the `fui.*`
layer family. No dedup exists or is needed — elements may carry multiple classes that
set the same property, and the layer order decides the winner.

Scope changes vs. original D7:

- Griffel symbol re-exports (`mergeClasses`, `makeStyles`, renderer APIs, …) and
  mergeClasses-defined extension contracts are **part of this migration's breaking
  change**, not deferred to a later major. `customStyleHooks_unstable` keeps working
  mechanically (string-based), but its override semantics are cascade semantics now.
- The `classname-overrides-win` replacement conformance test asserts the cascade-native
  contract (consumer className present; consumer CSS wins via unlayered-beats-layered),
  not call-order.

Unchanged and NOT compatibility: reading the OLD mergeClasses **argument order** during
conversion. That is fidelity extraction — the argument order is the only record of which
slice wins each property conflict, and pixel-identity requires the same winners after the
cascade takes over. Workers translate it into layer assignments once (the module-header
mapping table), then the mechanism is gone.

## D2 amendment 3 — FINAL layer family: the nyt-games structure (settled with user 2026-07-27)

Supersedes amendments 1–2's slice layers. The family is a direct copy of the nyt-games
structure under the `fui` root:

```css
@layer fui.theme, fui.reset, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;
```

- The `reset/base/variant/state/override` slice layers are REMOVED. Within a level,
  winner order = **in-file source order** (all selectors `:where()`-flat); modules author
  their `fui.components.l1` blocks in mergeClasses argument order.
- `fui.reset` is **levelless** (the nyt-games `base` slot): hosts makeResetStyles output,
  losing to every component level — reproducing Griffel's reset-bucket subordination.
  Also the sanctioned preflight slot for apps; the library ships no global resets.
- Altitude semantics unchanged: l1 base components, l2 library compositions, l3–l5
  consumer space, `fui.utilities` top, unlayered consumer CSS above all.
- Probe-verified (.scratch/layer-probe/parent-vs-sublayer.mjs, Chromium): rules directly
  in a parent layer beat ALL its sublayers (implicit-last), and sublayers order by
  declaration. Casual `@layer fui.components.l3 { … }`-style use therefore beats nothing
  above it and everything structured below it; library code never authors parent-direct.
- Consequence of dropping slices: winners are encoded in file position — module refactors
  that reorder blocks require VR re-runs (cookbook order rule). Sublayers remain an
  available corrective if a module ever genuinely needs out-of-file-order winners
  (user-noted); file order is the default, not a constraint of the platform.

## D2 amendment 4 — `fui.reset` renamed to `fui.base` (settled with user 2026-07-27)

Tailwind-default naming, since Tailwind is the adopted styling paradigm. Final family:

```css
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;
```

`fui.base` (levelless) hosts makeResetStyles output — below all component levels,
reproducing Griffel's reset-bucket subordination — and is the sanctioned preflight slot
for apps. This is a name-for-name structural mirror of the nyt-games family
(`theme, base, components, components.l1–l5, utilities`) under the `fui` root.

## D2 amendment 5 — rules styling EXTERNAL/unconverted Griffel elements must be UNLAYERED (2026-07-28)

D2 records that unlayered CSS (including consumer Griffel atomics) beats layered Fluent CSS,
and treats that as the _desirable_ half of the contract. It is also true in the direction D2
did not consider, and there it is a bug: **when a converted component styles an element owned
by a package that is still on Griffel, the converted rule is the one that loses.** The
cascade compares layer origin BEFORE specificity, so no amount of specificity rescues a rule
inside `@layer fui.components.l1`.

**Authoring rule (now in CONVERSION_GUIDE §2 dialect):** any rule whose subject element is
owned by an external or unconverted Griffel package goes in an UNLAYERED block at the bottom
of the module, ordered by mergeClasses argument order (file position is the only tiebreak
there, since `@variant` compounds are all `:where()`-flat). Rules on the component's own
elements — including its own `:global(.fui-X__slot)` static classes — stay layered.

**Scope.** _(Superseded in part — see the D2a5 superseding amendment below, S-I 2026-07-31.)_
Permanent for `@fluentui/react-icons` (D11 keeps it on Griffel, so nothing will
ever move those atomics into a layer). Transitional for in-repo packages awaiting conversion
under D12 (e.g. react-popover's `PopoverSurface` as consumed by InfoButton); when the owner
converts, the rules return to the layer that mirrors their mergeClasses argument.

**The dominant instance is `bundleIcon()`.** `node_modules/@fluentui/react-icons/lib/utils/bundleIcon.styles.js`
compiles to `.fjseox{display:none}` / `.f1w7gpdv{display:inline}`, and `bundleIcon.js` hands
the filled `<svg>` `root + (filled && visible)` and the regular one `root + (!filled && visible)`.
Every converted `display` rule on `:global(.fui-Icon-filled)` / `:global(.fui-Icon-regular)`
is therefore in direct contention with an unlayered 0-1-0 atomic.

Found and fixed so far:

| package                                   | rules | slices                                                                                                  |
| ----------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------- |
| react-infolabel (`InfoButton.module.css`) | 6     | base, `open`, base-hover                                                                                |
| react-button (`Button.module.css`)        | 12    | `subtle` hover/pressed, `transparent` hover/pressed, `rootDisabledStyles.base` hover/pressed swap-backs |

`react-button` was found by grepping the converted modules for `fui-Icon-filled` after the
InfoButton root-cause; it was broken at runtime and had never been caught (see the postmortem
below for why VR did not flag it). **Grep every module for `fui-Icon-filled` on conversion.**

**CDP evidence, react-button** (fresh `vr-tests-react-components:build-storybook --skip-nx-cache`,
story `button-converged--with-icon-before-content`, `subtle` module token read out of the live
CSSOM and applied, `:hover` forced with `CSS.forcePseudoState`, `CSS.getMatchedStylesForNode`
on both `<svg>`s):

```
unlayered (fixed)   .fjseox                                                   layers: []                  0-1-0  display:none
                    .fuicm-Button-module__subtle--Fp5L:where(:hover)          layers: []                  0-2-0  display:inline   ← WINS
                      .fui-Icon-filled
                    getComputedStyle(.fui-Icon-filled).display  = block   (filled glyph rendered)
                    getComputedStyle(.fui-Icon-regular).display = none

layered (the bug)   .fuicm-Button-module__subtle--Fp5L:where(:hover)          layers: [fui.components.l1]  0-2-0  display:inline
                      .fui-Icon-filled
                    .fjseox                                                   layers: []                   0-1-0  display:none    ← WINS
                    getComputedStyle(.fui-Icon-filled).display  = none    (outline glyph, unchanged on hover)
                    getComputedStyle(.fui-Icon-regular).display = block
```

The two runs are the same page, same build: the layered row is an A/B counterfactual — the
identical selector re-declared inside `@layer fui.components.l1` and appended LAST in the
document, with the shipped unlayered copies deleted from the CSSOM. Appending last and still
losing is the whole point: file position cannot beat layer origin.

Two reading notes for anyone re-running this. (1) The `<svg>`s are flex items of
`.fui-Button__icon` (`inline-flex`), so CSS Display 3 **blockifies** `display:inline` to
`block` — `block` means rendered, not "wrong value"; InfoButton's `inline-flex` blockifies to
`flex` the same way. (2) Chrome exposes an empty `cssRules` on every `CSSStyleRule` (nested
CSS), so a CSSOM walker that tests `if (r.cssRules)` before `r.selectorText` silently reports
zero matches. Record `selectorText` first, then recurse.

Ordering was verified too, not assumed: with `disabled` set on the same subtle button and
`:hover` still forced, the matched chain ends
`…__root--GuFc:where([disabled], …):where(:hover) .fui-Icon-filled {display:none}` and the
filled glyph stays hidden — i.e. arg #8 beats arg #3 purely because its block is written last.

### Postmortem — how a runtime-broken swap passed VR (stale-bundle false pass)

`vr-tests-react-components:build-storybook` declared nx `inputs` that did not include the
component package sources. A rebuild whose only changes were inside `packages/**` therefore
hit the nx cache and **replayed a previously built storybook bundle**, and the capture step
screenshotted that stale bundle. Every VR round that touched only component CSS compared new
baselines against old rendering, so a real regression could not produce a diff — the runs were
green because they were not exercising the change at all. InfoButton's swap only surfaced when
a cache-miss build finally shipped the real CSS and produced a 238 px / 3-glyph diff; the same
masking is why react-button's 12 rules sat broken with a clean VR history.

Fixed in **b27bf13985** (`fix(react-infolabel): unlayered icon-swap …; fix VR storybook nx
inputs + staleness guard`), two independent layers:

1. **Correct the hash inputs** — `apps/vr-tests-react-components/project.json` `build-storybook`
   now takes `default`, `^production` and the `.storybook` globs, so any component source edit
   invalidates the bundle.
2. **Refuse to trust it anyway** — `migration/griffel-to-tailwind/validation/capture.mjs`
   compares component source mtimes against the built bundle and aborts the capture when
   sources are newer, so a future inputs regression fails loudly instead of passing silently.

Generalisable lesson, and the reason this is recorded as a decision rather than a bug note: a
cache key that omits an input turns the cache into a **correctness** hazard, not a performance
one, and a validation suite that reads from a cached artifact must independently verify the
artifact's freshness. Fixing the inputs alone would have restored correctness while leaving the
failure mode silent; the guard is what makes the next occurrence visible. Both were required.
Any VR-green claim made before b27bf13985 for a change confined to `packages/**` should be
treated as unverified and re-run on a cache-miss build.

## D2 amendment 5 — superseding amendment: the "permanent" scope is retired (S-I, 2026-07-31)

The Scope clause above rested on two premises that no longer hold:

1. **"Transitional for in-repo packages awaiting conversion"** — closed. Every in-repo
   package is converted (mass conversion complete; scoped gate 48/48) and the transitional
   unlayered rules were promoted back into the layers that mirror their mergeClasses
   argument as their owners converted (S-G core specials; charts C7 completed the last
   promotions). No in-repo unlayered escape hatch remains.
2. **"Permanent for `@fluentui/react-icons` (D11 keeps it on Griffel)"** — superseded by the
   icons fork. D18 flipped from (a) accept to **(c) CONVERT VIA FORK**
   (`reports/griffel-zero-plan.md` §0): the headless icons 3.0 promotion removes the Griffel
   atomics (`bundleIcon.styles.js`'s unlayered `.fjseox` / `.f1w7gpdv`) at the source, which
   is exactly the thing this clause said would never happen. The **62 unlayered
   `:global(.fui-Icon-*)` selector lines across 14 `.module.css` files** are therefore
   TRANSITIONAL: they stay required — and new conversions must keep authoring them per
   CONVERSION_GUIDE §2 — until the fork is adopted in this repo, and they retire with it
   (stage S-J, hard-gated on the icons workstream). The evaluation's proposed
   `fui-Icon-filled` lint-rule hardening becomes unnecessary rather than mandatory.

The authoring rule itself (rules whose subject element is owned by an external Griffel
package go unlayered, ordered by mergeClasses argument order) remains correct and in force
for as long as any external Griffel-styled element is in scope; what this amendment retires
is only its permanence. The postmortem above (stale-bundle false pass) is unaffected and
stands on its own.

## D14 — State-mutation builder pattern is REMOVED in Phase 3 (settled with user 2026-07-27)

**Committed, not a candidate.** The v9 pipeline's in-place mutation of the render-local
`state` object (`state.root.className = …`, data-attribute assignment, the pattern every
styles hook inherited from Griffel-era code complete with `react-hooks/immutability`
eslint disables) is replaced with a non-mutating pattern: hooks return new state/slot
objects composed by spread. User: "this mutation pattern is gone… it's not how React
standards are."

**Sequencing (why Phase 3, not per-conversion):** three seams depend on shared-object
mutation until the whole tree converts —

1. Sibling composition: ToggleButton/CompoundButton/MenuButton write onto
   `state.root.className` then call `useButtonStyles_unstable(state)`; mixed-mode
   (342/342 VR net) requires the shared object until the family is converted.
2. `customStyleHooks_unstable`: consumer hooks mutate the state they receive — the
   contract redesigns to a functional form in the same breaking scope D7-revision
   already opened.
3. Public hook signatures (`useXStyles_unstable(state): state`) and their documented
   recomposition patterns.

**During Phases 1–2 conversions PRESERVE the mutation contract** (cookbook §3) — the
pixel/behavior-identical guarantee depends on not changing composition semantics
mid-stream. Phase 3 executes the sweep: define the pure-builder contract, convert base +
styles hooks + render pipeline, redesign customStyleHooks, turn `react-hooks/immutability`
enforcement ON repo-wide (zero disables — the lint rule becomes the regression guard),
full VR re-validation. Verify slot-object spread preserves the compose machinery's
symbol-keyed metadata at implementation time.

## D4 amendment — dual spacing support (settled with user 2026-07-27)

**Both spacing scales ship, and they are ONE scaling system.**

1. The numeric `--base-scale` scale stays exactly as D4 defined it:
   `--spacing: calc(1px * var(--base-scale))`, so `p-12` reads as 12px and computes to rem.
2. All 22 `spacingHorizontal*` / `spacingVertical*` tokens are now REGISTERED under the
   Tailwind `--spacing-*` namespace (`--spacing-horizontal-m`, `--spacing-vertical-s`, …),
   giving `p-horizontal-m`, `px-horizontal-m`, `py-vertical-s`, `gap-vertical-s`, and every
   other spacing/sizing utility a named form. This reverses the D4-era exclusion of the two
   spacing prefixes from the generator.
3. **Component default is Fluent spacing tokens** — the named utility, or a literal `var()`
   where a utility does not fit. Numeric utilities (`p-12`, `gap-8`) are the FALLBACK, used
   only for px values that match no spacing step.
4. Raw `var(--spacing…)`-style authoring against the Tailwind multiplier
   (`padding: calc(var(--spacing) * 12)` by hand) is forbidden in modules — use the utility.
5. **Raw `var(--spacingHorizontal*)` / `var(--spacingVertical*)` is now FORBIDDEN in
   component modules**, including the `px-(--spacingHorizontalM)` arbitrary form that D4 and
   the generator's old exclusion note recommended. It compiles, but it is the one form that
   does not scale with `--base-scale`.

### RECORD — the semantic utilities carry VALUES, not token references

`--spacing-horizontal-m` is registered as `calc(12px * var(--base-scale))`, **not** as
`var(--spacingHorizontalM)`. This is the load-bearing detail of the amendment and the reason
the two scales are one system rather than two: `--spacing` is `calc(1px * var(--base-scale))`,
so `p-12` → `calc(var(--spacing) * 12)` and `p-horizontal-m` → `calc(12px * var(--base-scale))`
are the same computed length and respond identically to a root font-size change. Registering
the runtime token reference instead would have frozen named spacing at the provider's literal
px while numeric spacing scaled — two spacing systems drifting apart under user zoom.

Canonical step values (verified against `packages/tokens/src/global/spacings.ts`, and
re-asserted by the generator on every run so an upstream scale change throws instead of
silently desyncing): None 0 · XXS 2 · XS 4 · SNudge 6 · S 8 · MNudge 10 · M 12 · L 16 ·
XL 20 · XXL 24 · XXXL 32 (px). Zero registers as a plain `0`. Utility suffixes come from an
explicit table (`none, xxs, xs, s-nudge, s, m-nudge, m, l, xl, xxl, xxxl`), NOT from the
generic kebab algorithm — so the other 441 generated names cannot churn when spacing changes.

**CONSEQUENCE, accepted:** a FluentProvider `theme` override of `spacingHorizontalM` no
longer flows into utility-sourced spacing. Measured before committing
(`.scratch/layer-probe/assert-theme-spacing.js`): all 7 shipped themes carry **byte-identical**
values for all 22 spacing tokens — every factory spreads the same `horizontalSpacings` /
`verticalSpacings` objects — so there is no behavior change in practice. A custom theme that
overrides spacing would see utilities ignore the override; that is the priced-in cost of one
unified scale, and literal `var(--spacingHorizontalM)` (forbidden in library modules, still
available to consumers) remains the escape hatch.

**COEXISTENCE, probe-verified not reasoned** (`.scratch/layer-probe/check-dual-spacing.mjs`,
compiling the real `css/index.css` through `@tailwindcss/postcss`): `index.css`'s
`@theme static { --spacing-*: initial; --spacing: … }` clears only registrations that
PRECEDE it, so the later `./tokens.css` import survives. No import reorder and no scoped
reset were needed. Both scales compile side by side, the palette guardrail still holds
(`p-4` works, `text-red-500` does not exist), and dead-alias emission stays at **0 of 463**
registered keys — the emitted `@layer fui.theme` block is still 124 bytes holding only
`--base-scale` and `--spacing`.

Generator counts move from 441 registered / 26 excluded to **463 registered / 4 excluded**
(only `strokeWidth*` remains excluded). `p-px` / `m-px` still emit a literal `1px` — that is
a hardcoded v4 keyword in the spacing utility handler, not a theme lookup, and is unchanged
from before this amendment (baseline-compared in the same probe).

### Backlog opened by this amendment

Measured at amendment time: **176 raw `var(--spacingHorizontal*)` / `var(--spacingVertical*)`
declarations across 14 already-converted `*.module.css` files** (avatar, badge, button,
checkbox, infobutton, infolabel, input, label, persona, radio, searchbox, select, switch,
textarea) are now non-conformant. Zero use the `px-(--spacingHorizontalM)` arbitrary form.
Converting them to named utilities is **VR-neutral at the default 16px root** — the token is
a 12px literal and `p-horizontal-m` computes to `0.75rem` = 12px there — so the sweep can be
validated with the existing zero-tolerance VR pass. It is deliberately NOT bundled into this
amendment; schedule it as its own change so the diff is reviewable per package.

## D4 amendment addendum — stroke widths join the spacing namespace (settled with user 2026-07-27)

**The 4 `strokeWidth*` tokens are now registered under `--spacing-*` as `thin` / `thick` /
`thicker` / `thickest`, on exactly the same literal-base-scale terms as the 22 spacing steps.**
This removes the last generator exclusion: **467 registered / 0 excluded** (was 463/4).

```css
--spacing-thin: calc(1px * var(--base-scale));
--spacing-thick: calc(2px * var(--base-scale));
--spacing-thicker: calc(3px * var(--base-scale));
--spacing-thickest: calc(4px * var(--base-scale));
```

### The measurement that shaped the design — which utility families read `--spacing-*`

The working assumption going in was that Tailwind spacing powers dimensional values generally,
including border widths. **It does not.** Probed by registering a `--spacing-thin` on the real
`css/index.css` and compiling a candidate list through `@tailwindcss/postcss`
(`.scratch/layer-probe/check-stroke-namespace.mjs`); the compiled output is the evidence, no
part of this table is reasoned:

| Family                               | `-thin` compiles? | Compiled output                                              |
| ------------------------------------ | ----------------- | ------------------------------------------------------------ |
| `p-` `px-` `py-` `ps-` `pt-`         | **YES**           | `padding-inline: calc(1px * var(--base-scale))`              |
| `m-` `mx-` `mt-` `-mt-`              | **YES**           | `margin-top: calc(1px * var(--base-scale))`                  |
| `gap-` `gap-x-`                      | **YES**           | `gap: calc(1px * var(--base-scale))`                         |
| `space-x-`                           | **YES**           | `margin-inline-end: calc(calc(1px * var(--base-scale)) * …)` |
| `w-` `h-` `min-w-` `max-w-` `size-`  | **YES**           | `width: calc(1px * var(--base-scale))`                       |
| `inset-` `top-` `start-`             | **YES**           | `inset: calc(1px * var(--base-scale))`                       |
| `basis-`                             | **YES**           | `flex-basis: calc(1px * var(--base-scale))`                  |
| `translate-` `translate-x-`          | **YES**           | `--tw-translate-x: calc(1px * var(--base-scale))`            |
| `scroll-m-` `scroll-p-`              | **YES**           | `scroll-margin: calc(1px * var(--base-scale))`               |
| `indent-`                            | **YES**           | `text-indent: calc(1px * var(--base-scale))`                 |
| `leading-`                           | **YES**           | `line-height: calc(1px * var(--base-scale))`                 |
| `border-` `border-t/b/s/x-`          | **NO**            | not generated                                                |
| `divide-x-`                          | **NO**            | not generated                                                |
| `outline-` `outline-offset-`         | **NO**            | not generated                                                |
| `ring-` `ring-offset-` `inset-ring-` | **NO**            | not generated                                                |
| `underline-offset-`                  | **NO**            | not generated                                                |
| `decoration-`                        | **NO**            | not generated                                                |
| `stroke-`                            | **NO**            | not generated                                                |

The non-consuming families take a **fixed bare-number px progression** that is not a theme
lookup at all — `border-2` → `border-width: 2px`, `outline-2` → `outline-width: 2px`,
`underline-offset-2` → `text-underline-offset: 2px`, `decoration-2` →
`text-decoration-thickness: 2px` (all compiled, all literal). The only width namespace that
exists is `--stroke-width-*`, and it drives **SVG** `stroke-width` (`stroke-<name>` →
`stroke-width: 9px` from a registered `--stroke-width-probe: 9px`) — the wrong property. There
is no `--border-width-*` namespace to register against.

So registration buys genuine utilities for the dimensional uses (`w-thin`, `h-thick`,
`p-thin`, `gap-thicker`, `pb-thin` — Fluent components do use stroke widths this way) and
**cannot** give `border-thin` a meaning, no matter which namespace the tokens are put in.

### CONSEQUENCE — the 4 are the only registrations that ALSO emit a real variable

`@theme inline` emits **no** custom property (that is the whole point of D4's inline choice).
For the non-consuming properties the sanctioned authoring form is therefore a **direct
`var(--spacing-thin …)` reference**, which needs a variable that actually exists. The generator
appends one plain-CSS block to `css/tokens.css`:

```css
@layer fui.theme {
  :root, :host {
    --spacing-thin: calc(1px * var(--base-scale));
    …
  }
}
```

`:root, :host` matches the selector Tailwind emits its own `@theme` block on, so shadow-DOM
consumers see the same variable set as `--base-scale`.

Verified end to end, not reasoned (`.scratch/layer-probe/check-stroke-emission.mjs`):

- **Emitted once per document.** `css/emit.css` → `build.js` → `dist/styles.css` declares all
  four (artifact grew 1,763 → 1,770 bytes; the two `@layer fui.theme` variable blocks are 377
  bytes of it). The VR storybook's `source(none)` path
  (`scripts/storybook/src/tailwind-theme.css`) compiles to a byte-identical
  1,770-byte emission.
- **Absent from component packages.** A module compiled through `@reference '#theme'` emits
  **zero** of the four declarations while still emitting `border-block-end-width:
var(--spacing-thin)` and `padding: calc(1px * var(--base-scale))` — D13 holds unchanged.
- **Resolves in a browser.** Loaded `dist/styles.css` in Chrome: `var(--spacing-thin)` used on
  `border-block-end-width` and `var(--spacing-thick)` on `outline-width` produce computed
  values **identical to a literal `1px`/`2px`** (both read `0.8px`/`1.6px` — Chrome snapping
  border widths to device pixels at DPR 1.25; `padding-top` shows the unsnapped `1px`/`2px`/
  `3px`/`4px`). Scaling confirmed: `--spacing-thick` computes 2px at a 16px root, 2.5px at
  20px, 4px at 32px — the same `--base-scale` behavior as every other spacing entry.

### 7-theme identity — asserted, zero divergence

Same bar the spacing amendment had to clear, same method
(`.scratch/layer-probe/assert-theme-stroke-width.js`): all 7 shipped themes (webLight, webDark,
teamsLight, teamsLightV21, teamsDark, teamsDarkV21, teamsHighContrast) carry **byte-identical**
`strokeWidthThin/Thick/Thicker/Thickest` = `1px`/`2px`/`3px`/`4px`. **No divergence to report.**
Every theme factory spreads the same `strokeWidths` object. The generator re-asserts the table
against `packages/tokens/src/global/strokeWidths.ts` on every run (`readStrokeWidthScale`,
mirroring `readSpacingScale`), so an upstream change throws instead of shipping a stale literal.

The priced-in cost is identical to spacing's and accepted on the same terms: a FluentProvider
`theme` override of `strokeWidthThick` no longer reaches utility- or `--spacing-thick`-sourced
widths. No shipped theme is affected.

### AUTHORING RULE — raw `var(--strokeWidth*)` is now FORBIDDEN in component modules

Stroke widths join spacing as the second (and last) namespace with this prohibition, for the
same reason: `var(--strokeWidthThin)` is the one form that does **not** scale with
`--base-scale`, so it silently diverges from every other length on the page under user zoom.

| Property                                                                                                                                                | Sanctioned form                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `padding-*` `margin-*` `gap` `width` `height` `inset-*` `flex-basis` `text-indent`                                                                      | the utility: `pb-thin`, `h-thick`, `gap-thicker`, `w-thickest`                                                                                           |
| `border-*-width`, `outline-width`, `text-decoration-thickness`, `text-underline-offset`, `box-shadow` spreads, `clip-path`, custom-property assignments | direct `var(--spacing-thin …)`                                                                                                                           |
| a Tailwind utility is wanted on a non-consuming property                                                                                                | `border-(length:--spacing-thin)`, `outline-(length:--spacing-thick)`, `decoration-(length:--spacing-thicker)` — all compile against the emitted variable |

`border-(length:--strokeWidthThin)` — the form D4-era notes and the old exclusion comment
recommended — is now non-conformant: it compiles, but resolves the unscaled token.

### Backlog opened by this addendum

Measured at addendum time: **58 raw `var(--strokeWidth*)` declarations across 12 already-
converted `*.module.css` files** — textarea 13, avatar 10, button 8, spinner 8,
avatarGroupItem 6, image 4, divider 2, list 2, radio 2, badge 1, checkbox 1, link 1. By
property: ~20 border-width-family, 8 `box-shadow`, ~14 custom-property assignments
(`--fui-Spinner--strokeWidth`, `--fui-Avatar-ringWidth`, `--fui-Avatar-badgeGap`,
`--fuiAvatarGroupItem__divider--width`), 2 outline, and one each of
`text-decoration-thickness`, `padding-block-end`, `height`, `clip-path`. Only the last three
convert to utilities (`pb-thin`, `h-thick`); the rest become `var(--spacing-*)` references.

The conversion is **VR-neutral at the default 16px root** — the tokens are 1–4px literals and
`calc(Npx * var(--base-scale))` computes to the same N px there, browser-confirmed above — so
the sweep validates against the existing zero-tolerance VR pass. Like the spacing backlog it is
deliberately NOT bundled here; schedule it per package alongside the 176-declaration spacing
sweep, which touches an overlapping file set.

## D4 superseding amendment — spacing tokens become numeric-axis aliases; old camelCase names removed, `tokens.*` repointed (theming Phase 1, option B + stroke rename, settled with user 2026-07-29)

**Supersedes the value form recorded in the two 2026-07-27 amendments above** (and the
review-item-18 line of discussion — the user's theming-architecture decision overrides that
reviewer finding). An earlier draft of this amendment kept the old camelCase names as CSS
read-aliases; the user then chose **option B** — drop the aliases entirely and repoint the
JS constants — plus the **stroke rename** below. Behavior at the default 16px root is
UNCHANGED (arithmetic identity gated, below); what changes is the structure:

1. **The 22 spacing tokens register AND emit as aliases of the numeric axis**:
   `--spacing-horizontal-m: calc(var(--spacing) * 12)` instead of
   `calc(12px * var(--base-scale))`. `--spacing` (`calc(1px * var(--base-scale))`,
   css/index.css — already the numeric utilities' base, unchanged) is now the **single
   density knob**: it was verified (probe, `.scratch/phase1-theming/`) that `@theme inline`
   carries the `var(--spacing)` reference VERBATIM into utilities, so `p-horizontal-m`
   compiles to `padding: calc(var(--spacing) * 12)` — the same shape as `p-12` — and both
   respond identically to a `--spacing` override on any subtree. Under the old literal
   form that override reached numeric utilities and missed named ones (probe-demonstrated
   red: 24px vs 12px). Multipliers are the canonical px value over the 1px base (multiplier =
   px; exactness asserted by the generator, which throws on any px the base cannot express
   exactly).
2. **Stroke rename + deliberate density exception**: the PUBLIC stroke variables are
   **`--stroke-width-thin/thick/thicker/thickest`**, emitted with the literal
   `calc(<px> * var(--base-scale))` values — NOT `--spacing`-coupled: `--spacing` is the
   layout density knob, and borders must not thin when layout density changes. A subtree
   `--spacing` override rescales padding/gap and leaves `var(--stroke-width-thin)` at 1px
   (browser-asserted in the behavior probe). The spacing-namespace `--spacing-thin/…`
   names become **PRIVATE internal hooks** (`--spacing-thin: var(--stroke-width-thin)`)
   that exist only to feed Tailwind's spacing-consuming utility families (`w-thin`,
   `p-thick`, …) and the sanctioned module authoring form `var(--spacing-thin)` for
   border/outline widths (border-family properties do not consume the namespace — the
   probe-measured constraint stands). `--stroke-width-*` is deliberately NOT registered
   in `@theme`: Tailwind's `--stroke-width-*` namespace drives SVG `stroke-width`
   utilities, the wrong property.
3. **The old camelCase CSS variables are GONE (option B)** — no
   `--spacingHorizontalM`, no `--strokeWidthThin`, no read-aliases. Single vocabulary;
   hand-written consumer CSS against the old names is a **documented major break**.
   Instead, the READ path moved to JS: the 26 `tokens.*` constants in
   `packages/tokens/src/tokens.ts` now emit the canonical var strings
   (`tokens.spacingHorizontalM === 'var(--spacing-horizontal-m)'`,
   `tokens.strokeWidthThin === 'var(--stroke-width-thin)'`), covered by an exact-string
   unit test (`packages/tokens/src/tokens.test.ts`) AND asserted from the other side by
   the generator on every run (it throws if tokens.ts and the emitted canonicals drift).
   The `react-theme-sass` bridge (`$spacingHorizontalM` etc.) repoints identically. A
   repo-wide sweep repointed every raw old-name `var()` reference in react-domain source
   (651 replacements / 197 files: converted `*.module.css`, stories, docsite, vr-tests;
   `packages/web-components/**` excluded — it is a separate system whose own
   design-tokens.ts defines the camelCase variables it reads).
4. All spacing-namespace names plus the 4 `--stroke-width-*` canonicals are emitted as
   real custom properties in the generated `@layer fui.theme { :root, :host }` block
   (dist/styles.css 1,410 → 2,810 bytes).

**Interim-state semantics (until theming Phase 2 removes the JS theming path):**
FluentProvider's runtime theme tag (`createCSSRuleFromTheme`) still writes ALL old
camelCase names as literals on `.fui-FluentProviderN` (unlayered, element-scoped). With
the aliases dropped and every shipped reader repointed, those declarations are now
**harmless orphans** — nothing in shipped CSS or in the `tokens.*` strings reads them.
(Exception: the docsite's `createCSSRuleFromTheme` usage examples demo that util's own
output; their module CSS was repointed to canonical names like everything else.) A custom
FluentProvider `theme` spacing/strokeWidth override therefore no longer reaches ANY
shipped reader — the priced-in cost the 2026-07-27 amendments already accepted for
utilities now extends to `tokens.*` readers; all 7 shipped themes carry byte-identical
values, so no shipped theme changes behavior.

**Known CSS-inheritance nuance, priced in:** the emitted custom properties resolve their
`var(--spacing)` at `:root` (custom-property substitution happens at the declaring
element), so a _subtree_ `--spacing` override reaches UTILITIES (which carry the calc
inline per element) but not `var(--spacing-horizontal-m)` _custom-property readers_
(`tokens.*` inline styles), which keep the root-level density. Document-level density
changes (set `--spacing`/`--base-scale` at `:root`) reach everything.

Gates run for this amendment (evidence `.scratch/phase1-theming/`,
`reports/theming-css-native.md`):

- Arithmetic identity: 26/26 token defaults exact old-vs-new; canonical strokes literal +
  hooks aliased; tokens.ts lockstep 26/26; 20 named utilities string-identical to their
  numeric twins in compiled output.
- Behavior probes (`scripts/probe-spacing-behavior.mjs`, headless Chromium, committed as a
  package test, npm script `test-spacing-behavior`): 15/15 PASS, including density knob,
  stroke decoupling, canonical reads, and old-names-removed assertions.
- Zero-reference sweep: no exact old name remains in react-domain source or emitted CSS
  (comment prose documenting the removal excepted).
- `packages/tokens` unit tests green (exact-string repoint test added).
- Full VR sweep at zero tolerance (all baseline sets, fresh `--skip-nx-cache` build) — see
  `reports/theming-css-native.md` Phase 1 for totals.
- D13 re-verified: `@reference` modules emit zero theme declarations.

**Follow-on: theming Phase 2** — remove the FluentProvider runtime theme tag / JS theming
path so the CSS-native names are the sole contract end to end.

**OPEN QUESTION (recorded, NOT implemented — user to decide in Phase 2):** full-token-set
kebab rename — the remaining ~440 tokens (colors, fonts, radii, shadows, durations,
curves, z-index) still use camelCase CSS variables (`--colorNeutralBackground1`). A
uniform kebab vocabulary across the whole token set is under consideration.

## D15 — Named groups + all-lowercase generated idents (settled with user 2026-07-28)

Source analysis: `reports/named-groups-design.md`. **Naming below is the user's amendment and
overrides that report wherever the two differ** — the report proposed PascalCase
(`group/fui-Switch`, `fuicm-Switch-module__root--base64`); the settled scheme is all-lowercase.

### D15.1 — Every converted component stamps `group/fui-<component-kebab>`

**Decision.** The component's outermost slot carries an unhashed, global Tailwind group marker
as the SECOND argument of its `clsx(…)`, immediately AFTER the static `fui-*` class:

```ts
state.root.className = clsx(
  switchClassNames.root, // static class (conformance contract) — stays FIRST
  'group/fui-switch', // named group marker — literal, unhashed, GLOBAL
  styles.root, // hashed CSS-Modules class
  state.root.className, // consumer override — always last
);
```

> **AMENDED 2026-07-28 (placement).** This clause originally specified the marker as the FIRST
> argument. It is now the SECOND, and the governing rule is stated negatively because that is the
> part which must survive future refactors:
>
> **The marker must NEVER be the first class token of the emitted class string.**
>
> **Why.** jsdom does not implement `:scope` natively; it polyfills through nwsapi. nwsapi's
> `makeref()` resolves a `:scope`-bearing selector by synthesising an anchor from the element via
> `escape(element.classList[0])`. The `/` in `group/fui-<kebab>` passes through that escaping
> intact, so the synthesised anchor lands in the selector as an invalid production — observed as
> `div#a.group,,fui-list-item…` — and the query throws. Every component render that evaluates a
> `:scope` selector under jsdom then fails with a render-time `AggregateError`.
>
> **Evidence.** react-list's 4 composite-navigation tests failed exactly this way (render-time
> throws, never reaching a snapshot assertion); react-tree carried the identical latent shape and
> would have failed the moment a `:scope` query was introduced. Any consumer app testing under
> jsdom + `:scope` hits it too. Real browsers implement `:scope` natively and are unaffected, so
> this is a test-tier-only defect with a production-shaped blast radius for consumers.
>
> **Why position is free to spend.** `clsx` argument order carries NO cascade meaning in this
> system — `@layer` order decides every tie (D2). Moving the marker one slot right is therefore
> semantically inert at the CSS level and costs nothing but snapshot churn.
>
> **Rejected alternatives.** Escaping/renaming the marker would break the public contract in
> D15.8; patching the jest serializer would hide a public class from snapshots and would not help
> consumer apps at all. The positional fix is total and free.

**The name is the component's own name, lowercase-kebab, `fui-` namespaced.** Not the static
class verbatim: `group/fui-switch`, `group/fui-message-bar`, `group/fui-accordion-header`,
`group/fui-tooltip`. Lowercase-kebab is the same alphabet the generated idents (D15.2) and the
module-local class names (D15.3) use, so the entire generated + generated-adjacent class
surface is one case-insensitive namespace with no mixed-case exceptions to remember.

The `fui-` namespace is mandatory rather than decorative. nyt-games' rule is "the group name is
the component's own name" and it can stop there because it is an application; Fluent is a
library shipping into consumer apps that may themselves use Tailwind, and Tailwind group names
are a FLAT GLOBAL namespace — a bare `group/button` would be the same selector as a consumer's
own `group/button` and Fluent's rules would fire on the consumer's element.

**Why the feature exists.** A CSS-Modules class is hashed and therefore unaddressable from any
other module. The group marker is the only global handle by which one component's module can
style an element based on an ANCESTOR component's state. That is the capability nyt-games uses
at `sidenav.module.css:285-311`, where Sidenav's `.bar` reads `group-hover/button` and
`group-pressed/button` from a Button in a different package. Fluent has no equivalent today.
Flatter authoring is a side effect; cross-component state reading is the point.

**Not for performance.** `metrics/perf-eval/variants/SUMMARY.md` §7 measured the named-group
shape at −0.2% against the current selectors (inside a 0.63 ms IQR) while recalculating 1,000
more elements. A capability decision with a small, accepted invalidation cost.

**One marker per component, on the outermost slot only.** Sub-components already have their own
roots, so `fui-Accordion > fui-AccordionItem > fui-AccordionHeader` nests for free. A group
cannot style itself — the compiled selector is `.child:is(:where(.group…) *)` and the descendant
combinator excludes the group element — so a second marker on an inner slot buys nothing. The
outermost slot is `root` for 32 of the 33 converted packages; `react-tooltip` declares no `root`
at all (only `content: 'fui-Tooltip__content'`, because it portals and the content element IS
its outermost node), so its marker rides `content` — but is still named for the component:
`group/fui-tooltip`, not `group/fui-tooltip__content`.

### D15.2 — Generated idents: `fuicm-<component-kebab>-<local>-<hex6>`, all lowercase

```
fuicm-switch-root-a3f2c1
fuicm-message-bar-actions-container-action-09a1b4
```

Replaces `fuicm-[name]__[local]--[hash:base64:4]`. Point by point:

- **`fuicm-` prefix — unchanged, a HARD CONTRACT.** `scripts/jest/src/css-modules/serializer.js`
  strips every `fuicm-…` token from snapshots the way `@griffel/jest-serializer` strips atomics
  (D9). Changing it silently reintroduces generated class names into every committed snapshot.
- **No `-module__` infix, no `--` separator.** One separator style, not three; the `module`
  token carried no information.
- **No base64.** base64 is case-SENSITIVE, so it forced uppercase into names that are otherwise
  lowercase, and its alphabet contains `+` and `/`, which had to be scrubbed anyway. 6 lowercase
  hex characters (24 bits) replace it.
- **Uppercase is forbidden anywhere in a generated name.** The component token and the local are
  both kebab-cased on the way in, so the invariant holds even for a module that still declares a
  camelCase local (D15.3).

**One helper, three pipelines.** `scripts/css-modules/ident.js` is the single source of truth and
is required BY RELATIVE PATH from all three, deliberately — it must stay free of workspace
requires (jest.preset.js documents why) and be reachable from `tools/workspace-plugin`, which
depends on no `scripts/*` package:

| Pipeline      | Entry point                                                         | Uses                       |
| ------------- | ------------------------------------------------------------------- | -------------------------- |
| package build | `tools/workspace-plugin/.../lib/css-modules.ts` (`postcss-modules`) | `createGenerateScopedName` |
| VR storybook  | `apps/vr-tests-react-components/.storybook/main.js` (`css-loader`)  | `getLocalIdent`            |
| jest          | `scripts/jest/src/css-modules/proxy.js` (`moduleNameMapper`)        | `generateTestIdent`        |

The storybook uses `getLocalIdent` rather than a `localIdentName` template because the scheme is
not expressible as one (it kebab-cases both segments and hashes the package name + the
source-relative path + the local, never the file's bytes). Hashing the NAME keeps shipped class
names stable across content edits; the package name in the seed is what makes two packages that
both declare `.root` in a same-named file differ.

**Jest is the one incomplete case, by construction.** `moduleNameMapper` maps every
`*.module.css` in the repo to ONE module and gives it no way to learn which file was imported,
so the component and hash segments cannot be computed. They are dropped, not faked:
`fuicm-non-zero-determinate`. Everything the toolchain keys on — the `fuicm-` prefix, the
lowercase-kebab alphabet — is identical, and the serializer strips both shapes.

### D15.3 — Module-local class names are lowercase-kebab

`.non-zero-determinate`, not `.nonZeroDeterminate`; referenced as `styles['non-zero-determinate']`.
Same alphabet as D15.1 and D15.2, so no name in the generated surface ever needs case-folding.

`toKebabCase` in the shared helper enforces the ident half regardless, and the kebab-casing
happens AFTER hashing, on the display text only — two locals that kebab to the same string still
receive different digests and cannot collide.

**Backlog, deliberately not bundled here: 117 camelCase locals across 26 modules in 22
packages** (measured 2026-07-28, comments and `:global(…)` excluded). The four packages touched
by this rollout — react-button, react-switch, react-radio, react-tooltip — contain **zero**, so
the rollout itself needed no renames. Largest holders: `Persona` 13, `Tag` 12, `PresenceBadge`
11, `AvatarGroupItem` 16, `Field` 8, `presets` 7, `CardHeader` 7. Schedule per package alongside
the existing spacing / stroke-width sweeps, which touch an overlapping file set.

### D15.4 — BUILD PREREQUISITE (blocking): `:global()`-wrap the marker

**`postcss-modules` and `css-loader` both scope EVERY class selector in a `*.module.css` and
cannot tell the marker apart from a real local.** Left alone, `.group\/fui-switch` compiles to
`.fuicm-switch-group-fui-switch-dec2bf`, which the DOM never matches. There is no error and no
warning: the rules simply never apply, VR passes because nothing changed visually, and the
feature silently does not exist. Reproduced against the repo's real toolchain — that exact
hashed selector is the measured baseline output.

The fix is a local PostCSS plugin, `scripts/css-modules/globalize-group-markers.js`, that wraps
`.group\/…` / `.peer\/…` selector segments in `:global(…)`, which both CSS-Modules
implementations honour and strip. Verified output:

```css
.fuicm-switch-thumb-30ee69:is(:where(.group\/fui-switch):where([data-checked], :checked) *) { … }
classMap: { root, thumb, … }        ← no group key: postcss-modules ignores :global
```

Position is load-bearing and there is only one that works: BETWEEN `tailwindcss()` and
`postcssModules()` in the package build, and inside `postcssOptions.plugins` in the VR
storybook (webpack runs loaders right-to-left, so postcss-loader is already ahead of
css-loader). Tailwind must have emitted the selector before it can be rewritten; CSS Modules
must see the `:global()` before it scopes. `peer/…` is covered by the same regex so the
infrastructure never needs revisiting.

**Rejected:** adopting `@accelint/postcss-tailwind-css-modules@1.1.0` (nyt-games' choice).
Identical behaviour, but it adds a third-party runtime dependency to the build of a
Microsoft-shipped library for ~15 lines of regex, and the storybook would need it wired
separately anyway. Kept as documented prior art.

**Two guardrails, because the failure is invisible.**

1. The build THROWS if a `group/…` or `peer/…` key appears in the exported class map — the only
   observable trace of a scoped marker (`assertGroupMarkersSurvived`).
2. `tools/workspace-plugin/src/executors/build/lib/css-modules.spec.ts` compiles a real module
   through the real plugin chain and asserts the compiled selector contains `.group\/fui-` and
   no `fuicm-…group`, plus the four ident-shape invariants.

### D15.5 — Variant catalog: no additions

Tailwind v4 composes `group-*` with ANY `@custom-variant` written in the canonical `&:where(…)`
shape, which D2 already mandates for zero-specificity reasons. Verified against tailwindcss
4.3.3 for `checked`, `not-checked`, `size-small`, `disabled-control`, `hover`, `focus-within`,
`rtl`. Intersections nest and compile to a chained `:is(… *):is(… *)`.

**The sole exception is `forced-colors`**, an at-rule variant (`@media (forced-colors: active)`)
with no element for `group-*` to scope. `group-forced-colors/x` is a hard build error
(`Cannot use @variant with unknown variant`), and the required form is
`@variant forced-colors { @variant group-checked/fui-switch { … } }`. Any future variant must
keep the `&:where(…)` shape or it silently stops composing. `variants.css` carries a header note
saying exactly this; no `@custom-variant` lines were added.

### D15.6 — Mirroring: hoist state a child cannot otherwise see

State a descendant must read has to be visible ON the group element. Where a component's primary
state lives on a non-root element it is mirrored to the root as a PRESENCE `data-*` attribute
written `value || undefined` — never `|| false`, because the catalog's variants are
attribute-presence selectors and `data-checked="false"` still matches `[data-checked]`. Reference
shape: `react-checkbox` (`useCheckboxStyles.styles.ts:73-77`).

**Tier 1 (required, done here): `react-switch`, `react-radio` — `data-checked`, `data-disabled`
on the root.** Both components anchor their entire checked/disabled rule set on `.input` and
reach the indicator through SIBLING combinators, so the state is unreadable from any descendant:
`.input` is a sibling of every descendant, not an ancestor.

**Tier 2 (on request, not taken): `react-accordion` `data-open` on `AccordionItem`.** Tier 0
(nothing to do) is everything already stamping its state on the root — Button, Card, Checkbox,
Tree, Tooltip, MessageBar and the rest.

Mirroring widens invalidation (the perf leg recalculated 12,000 elements against 11,000 for
every other leg), so it is added only where a real state is otherwise unreadable, **never for
symmetry**.

**⚠ Known incompleteness, discovered during implementation and not present in the design
report.** `data-checked` on Switch and Radio reflects the CONTROLLED value only. The report cites
`react-checkbox` as the worked precedent, but Checkbox runs its value through
`useControllableState` and therefore always knows it, whereas **Switch and Radio do not**: Switch
hands `checked`/`defaultChecked` straight to the `<input>` (`useSwitch.tsx`) and Radio derives
`checked` as `group.value === props.value`, which is `undefined` whenever the RadioGroup is
uncontrolled. In both uncontrolled cases the DOM owns the state and React never learns it, so the
attribute is absent and descendants see "not checked". `defaultChecked` is deliberately NOT used
as a fallback — it is correct only until the first toggle, and a stale mirror is worse than an
absent one. `data-disabled` has no such gap: `disabled` is always a prop. Closing the checked gap
requires moving Switch/Radio to controllable state, which is a behaviour change and needs its own
decision.

### D15.7 — Published `fui-X__slot` statics: unchanged now, REMOVED later (user-confirmed)

**This rollout does not touch a single static class.** Every `fui-Switch`, `fui-Switch__indicator`
etc. stays exactly where it is, and the group marker is added ALONGSIDE it.

The settled end-state contract, for the follow-on phase:

> **The BEM statics will be REMOVED.** The public styling contract becomes: **slot `className`
> props** (typed per-slot overrides) + **the group marker as the sole public identity class** +
> **`data-*` state variants** + **the layer system**. There is no public class-name targeting of
> component internals.

Recorded here so the intermediate state is legible: during this phase a converted root carries
BOTH `fui-Switch` and `group/fui-switch`, which is redundant by design and temporary.

> **BLOCKING CONSTRAINT ON THAT FOLLOW-ON PHASE (added 2026-07-28).** The D15.1 invariant — the
> marker must never be the first class token — is currently satisfied _because_ the static class
> sits in front of it. Removing the statics naively would put the marker back at `classList[0]`
> and reintroduce the nwsapi/`:scope` breakage repo-wide, this time with no static class left to
> hide behind.
>
> The statics-removal sweep MUST therefore preserve the invariant explicitly: keep the marker
> ordered after whatever token becomes the slot's primary class (the hashed `fuicm-*` module
> class is the natural successor, since it is always present and always selector-safe). Do not
> treat "the marker is now the only identity class" as licence to make it the first one. If a
> slot would genuinely emit the marker alone, that slot needs a leading selector-safe token
> added before the sweep lands, not after.

### D15.8 — Snapshots and VR

The marker is deliberately NOT `fuicm-`-prefixed — that is the entire point — so the jest
serializer does not strip it and it appears in snapshots beside `fui-*`:

```
class="fui-Switch group/fui-switch"
```

(The static class leads and the marker follows — the D15.1 placement invariant. Snapshots taken
before the 2026-07-28 amendment show the two tokens in the opposite order.)

**Correct, and to be kept.** The marker is public DOM surface; hiding it would hide a public
contract. Do not extend the serializer.

Changes are pixel-inert by construction: a class no stylesheet selects yet, and attributes no
current selector matches (every Switch checked rule is anchored on `.input`). **VR stays 34/34 at
zero tolerance; any diff is a bug, not a baseline.**

### D15.6 — RESOLVED (user-settled 2026-07-28): data attributes are a FALLBACK, not a requirement

The uncontrolled Switch/Radio `data-checked` gap is **not a problem and needs no
fix**. Policy, in the user's framing: data attributes exist as a fallback for
when native selectors aren't possible or available. When a component runs
uncontrolled, the DOM owns the state and CSS is the driver of state styling —
native `:checked`/`:disabled` cover it, and the absent mirror is by design.

Concretely:

- No controllable-state migration for Switch/Radio. The mirrors stay as
  implemented — best-effort: present when React knows the state (controlled),
  absent otherwise.
- The dual selector form `:where([data-checked], :checked)` is the correct
  general shape: native wins wherever it exists; the data alternative carries
  the cases native can't express (non-native components, and group-element
  consumption where the native state lives on an inner element). The variant
  matrix measured this form at zero perf cost.
- General authoring rule: do NOT add `data-*` mirrors where a native selector
  already expresses the state at the element that needs it. Mirror only where
  the styling target (e.g. the group element) cannot reach the native state.

## D16 — BEM statics removed; the group marker is the sole public identity class

Executes the end-state contract recorded in D15.7. Inventory and per-edge specs:
`reports/statics-removal-design.md`.

> **Landing status.** This record is settled and complete; the sweep it governs lands in phases.
> **Foundations A (landed):** the `component-has-group-marker` conformance test (D16.2/D16.6) and
> the `fuiSelector()` helper (D16.5), both additive and both inert until the sweep uses them.
> **Not yet landed:** every removal. Until a package is swept it still renders its statics, still
> exports full `SlotClassNames`, and still leads its `clsx()` with the static class exactly as
> D15.1/D15.7 describe. Read the composition shape in D16.2 as the shape a package has AFTER its
> sweep, not as a licence to drop statics ahead of it.

### D16.1 — What is removed

All 184 `fui-X` / `fui-X__slot` strings owned by the 34 converted packages stop being rendered.
The public styling contract is: **per-slot `className` props** (typed overrides) +
**`group/fui-<component-kebab>` as the sole public identity class** + **`data-*` state variants**

- **the `@layer fui.*` system**. There is no public class-name handle on component internals.

**One exception, and it is not a BEM static.** `react-provider` keeps rendering
`fui-FluentProvider<useId>` — the runtime class hosting the 459 `--token` custom properties. The
bare `fui-FluentProvider` static is removed; the runtime theme class is not a slot class and is
load-bearing for `react-portal-compat`'s v8 interop.

### D16.2 — The D15.1 invariant, restated as the sweep's acceptance criterion

> **Every emitted class string containing a `group/…` or `peer/…` token must have a non-marker,
> selector-safe token at index 0.**

Before this phase the static class satisfied it incidentally. It is now satisfied **explicitly**
by the hashed CSS-Modules class, which is always present and always selector-safe. All 65
marker-bearing `clsx()` calls read:

```ts
clsx(styles.root, 'group/fui-<kebab>', …conditional module classes…, state.root.className)
```

**Six roots had no unconditional module class** and could not satisfy this by reordering alone —
Accordion, AccordionItem, Breadcrumb, MessageBarGroup, CounterBadge, Skeleton. Each receives an
**empty identity-only `.root {}` local** in its module, added _before_ the statics were removed.
The rule for all future work: a slot that would emit the marker alone gets a leading
selector-safe token added first; the marker is never promoted to `classList[0]` on the grounds
that it is now the only identity class. Enforced twice — by `component-has-group-marker` in
`react-conformance` (asserts `classList[0]` does not match `/^(group|peer)\//`, on all 83 call
sites) and by the compile-time assertion in
`tools/workspace-plugin/…/css-modules.spec.ts`. Both are required, because the failure is a
jsdom-only render-time throw that VR cannot see.

### D16.3 — Cross-package styling: markers for roots, JS slot composition for sub-slots

A rule in package A that styles an element owned by package B resolves one of two ways, and the
choice is determined by whether A holds B's slot object:

- **Root of a component A does not render** (a consumer-composed child) → select
  `:global(.group\/fui-<b>)`. Structural pseudo-classes and `:not()` compose unchanged, and
  specificity is preserved (class-for-class).
- **Sub-slot of a component A renders itself** → **compose the class in JS through the wrapping
  hook**, then read the owner's state via a `group-*` variant. This removes the coupling rather
  than renaming it: no global handle on B's internals survives.

Worked cases: `react-toolbar` ToolbarButton passes its own `icon` class into Button's slot and
styles it with `@variant group-vertical/fui-toolbar-button`; `react-breadcrumb` BreadcrumbButton
does the same for Button's icon; `react-list` ListItem passes an `indicator` slot override into
the Checkbox it constructs in `useListItem.tsx`. **No package gained a `data-*` attribute to
expose a sub-slot.** That mechanism is documented as available and was not needed.

`react-spinbutton`'s internal `fui-SpinButton__button_active` — never exported — becomes
`data-spin-active`, so that after this phase a `fui-`-prefixed class in rendered DOM means
"public identity" without exception.

### D16.4 — Specificity compounds must become marker compounds

`BreadcrumbButton.module.css` compounds its own static onto its module class
(`.root:global(.fui-BreadcrumbButton)`) inside an **unlayered** rule, to win a 0-2-0 tie against
react-button's unlayered icon-swap rules that `@layer` cannot arbitrate. Deleting the static
silently drops it to a tie decided by stylesheet load order. It compounds the **marker** instead
(`.root:global(.group\/fui-breadcrumb-button)`), same 0-3-0. Gate: `\.[a-z-]+:global\(\.fui-`
must have zero hits.

### D16.5 — Export policy: constants retained, `root` re-pointed, slot keys removed

The 87 `*ClassNames` exports are **kept**, their type narrowed from `SlotClassNames<XSlots>` to
`{ root: string }`, and `root` re-pointed to the group marker.

Deleting them was rejected because `fluentProviderClassNames.root` has two non-styling roles —
the `useId` prefix that mints the theme class
(`useFluentProviderThemeStyleTag.ts:58`) and the seed of `react-portal-compat`'s extraction regex
(`PortalCompatProvider.tsx:10`). Deprecated stubs holding the _old strings_ were rejected as the
worst option available: consumers keep compiling and silently select nothing, moving the breakage
from build time into their visual regressions.

Removing the slot keys is what makes the policy honest: `buttonClassNames.icon` becomes a
TypeScript error on the exact line that would otherwise have gone quiet. `buttonClassNames.root`
keeps selecting the right element.

**Escaping is part of the contract.** `'.' + 'group/fui-button'` is an invalid _selector_ (the
token itself is fine). `fuiSelector(identityClass)` ships alongside the constants and every
in-repo selector site uses it. Consumers doing `` `.${x.root}` `` must adopt it — this is the one
migration step the type system cannot force, so it leads the changelog entry.

> **Implementation note (Foundations A, landed).** The helper lives in
> `packages/react-components/react-utilities/src/utils/fuiSelector.ts` and is re-exported from
> `@fluentui/react-utilities` and `@fluentui/react-components` — one implementation, shipped on
> the same public surface as the constants, rather than 33 per-package copies. It escapes **every** > `/` in the token, not only the first: a marker only ever holds one, but a global replace has no
> failure mode and a first-only replace does.

### D16.6 — Conformance

`component-has-static-classnames-object` is **deleted** from the default set, not disabled: its
three sub-tests hard-code the `fui-<Component>__<slot>` format
(`defaultTests.tsx:244–245, 265–288`) and would fail under any policy. It is re-exported as an
opt-in `extraTests` entry, `hasStaticClassNames`, which the 19 `needs-conversion` and 11
`special` packages take, so their coverage is preserved rather than dropped.
`component-has-group-marker` replaces it for converted packages.

`component-handles-classname` and `component-preserves-default-classname` are unaffected and get
stronger — the defaults they protect are now `fuicm-…` + the marker.

> **Implementation note (Foundations A, landed).** `component-has-group-marker` exists now, in
> `packages/react-conformance/src/componentHasGroupMarker.tsx`, exported as
> `componentHasGroupMarker` + `COMPONENT_HAS_GROUP_MARKER_TEST_NAME`, with the
> `testOptions['has-group-marker'].marker` escape hatch. It is deliberately **not** in
> `defaultTests` yet, for the same reason `classname-overrides-win` is not: while the statics are
> still published, only converted packages stamp a marker, so a default-set entry would fail the
> 30 unconverted packages for a contract they are not yet under. Registering it in `defaultTests`
> and deleting `component-has-static-classnames-object` are the same one-line pair, and they land
> together with the removal sweep. Nothing about the deletion half of this clause has happened.

### D16.7 — Text presets: an accepted loss of public identity

The 17 typography presets share `group/fui-text` (a `<Body1>` IS a `<Text>`), so removing
`fui-Body1` … `fui-Title3` leaves them with **no** public identity class. Accepted, deliberately:
presets are a shorthand for `<Text font size weight>`, they hold no state a descendant could read,
and 17 new tokens in Tailwind's flat global group namespace would buy nothing D15.1 says a marker
is for. This is the only place in the phase where public identity is lost rather than renamed,
and it is recorded here so it is never mistaken for an oversight.

### D16.8 — Snapshots and VR

67 snapshot files change (883 tokens): 41 inside converted packages, 26 inside dependents —
`packages/charts/react-charts` alone is 16 files / 695 tokens, all passive rendered DOM with no
selectors. 25 further test files carry hand-written inline `class="fui-…"` assertions and are not
`-u`-regenerable (react-text 18, react-breadcrumb 4, react-provider 2, react-tooltip 1).

`scripts/jest/src/css-modules/serializer.js` is **unchanged**: it strips `fuicm-*` and preserves
`group/fui-*` by design (D15.8). A converted snapshot after this phase reads
`class="group/fui-divider"` — the public contract, exactly.

**VR stays 34/34 at zero tolerance. Every rewritten selector is class-for-class and
layer-for-layer identical, so any pixel diff is a bug, not a baseline** — with one named
exception to watch: react-button's ten icon rules move from a descendant selector to a
`group-*`-scoped one (D16.3), which is the only structural selector change in the phase.

## D20 — react-provider core specials: Fluent-owned CSP nonce; TextDirectionProvider removed (S-G, 2026-07-31)

The griffel-zero plan's decision table split D20 in two; this records the implemented shape.

### D20.1 — CSP nonce: a `nonce` prop on FluentProvider + internal inheritance context

Griffel's `useRenderer_unstable().styleElementAttributes` was the channel through which a
consumer-configured CSP nonce reached the theme-variables `<style>` element — the only style
element Fluent creates at runtime (component CSS ships as static css-modules assets, covered
by a CSP's `style-src` source lists, not nonces). The replacement is Fluent-owned and minimal:

- **`FluentProviderProps.nonce?: string`** — applied to the client-side theme `<style>` tag
  (`useFluentProviderThemeStyleTag`) and to the SSR-rendered style element
  (`state.serverStyleProps.attributes`).
- **`StyleNonceContext`** (react-provider internal, NOT exported): each FluentProvider
  provides its resolved nonce; nested providers default their `nonce` prop to the inherited
  value. This preserves the old "configure once at the app root" ergonomics of
  `RendererProvider(createDOMRenderer(document, { styleElementAttributes: { nonce } }))`.
  A nested provider may override the inherited nonce with its own prop.
- `FluentProviderContextValues` gains `styleTagNonce: string | undefined` (the render
  function's channel to the context provider); `FluentProviderState` gains optional `nonce`.
- `useFluentProviderThemeStyleTag`'s options change from
  `{ theme, targetDocument, rendererAttributes: Record<string, string> }` to
  `Pick<FluentProviderState, 'theme' | 'targetDocument' | 'nonce'>` — the attributes bag only
  ever carried the nonce. **Breaking** for direct callers of this `@internal` hook.
- The `nonce` prop is stripped from the root slot's DOM spread (it is a global HTML
  attribute and would otherwise leak onto the provider `<div>`).

Not chosen: adding nonce to `react-shared-contexts`' `ProviderContextValue` (cross-package
API for a single-package need), and a standalone public `StyleNonceProvider` export (YAGNI —
export it only if another Fluent-created style element ever appears).

### D20.2 — `TextDirectionProvider` removed with no replacement

`@griffel/react`'s `TextDirectionProvider` fed Griffel's RTL style flipping only. First-party
CSS flips via the rendered `dir` attribute + logical properties / `:dir(rtl)` (D5), and
`@fluentui/react-icons` keeps its own `IconDirectionContextProvider` (still rendered).
In-repo consumers of Griffel's direction context: zero (verified by grep — the only match was
renderFluentProvider itself). Consumer-authored Griffel styles no longer auto-flip under
FluentProvider — deliberately part of the same compat break as D19/S-H.
`FluentProviderContextValues.textDirection` is removed with it (**breaking**, `_unstable`
surface; `dir` on the provider context is unchanged and remains the source of truth).

### D20.3 — S-G / S-H boundary for the remaining Griffel API

react-provider itself re-exported nothing from Griffel, so S-G leaves **no** re-export shims:
after S-G the package has zero `@griffel/*` imports and zero `@griffel/*` dependencies. The
umbrella's `RendererProvider` / `createDOMRenderer` / `renderToStyleElements` / `makeStyles`
etc. re-exports (D7 surface, 12 symbols + 3 types + `wyw-in-js` block) remain untouched and
are S-H scope (D19). The tabster focus-ring factories and their umbrella re-exports were
deleted in S-G (evaluation §8 places them there) — that is the only umbrella surface S-G
touches.

## D19 + D23 — the break, implemented (S-H, 2026-07-31)

The griffel-zero plan's decision table resolved both; this records the implemented shape
(full record: `reports/sh-the-break.md`).

### D19 — umbrella Griffel re-exports removed

`@fluentui/react-components` drops the 12 `@griffel/react` runtime re-exports (`__css`,
`__resetCSS`, `__resetStyles`, `__styles`, `createDOMRenderer`, `makeResetStyles`,
`makeStaticStyles`, `makeStyles`, `mergeClasses`, `RendererProvider`,
`renderToStyleElements`, `shorthands`), the 3 types (`GriffelStyle`, `GriffelRenderer`,
`GriffelResetStyle`), the `wyw-in-js.tags` block, and the `@griffel/react` dependency —
**breaking**, same major as D16. No `griffel-compat` entrypoint was shipped (the plan's
"optional" variant): with S-F/S-G done there were zero in-repo consumers left, and a compat
entrypoint would keep the dependency the removal exists to drop. The react-migration-v0-v9
Griffel mixins (the one published API built ON the re-exports) retire with it, per the
disposition recorded in sf-batch1/sf-batch4; their demo stories are deleted and the FromV0
guides now teach the equivalent plain CSS.

### D23 — react-conformance-griffel retired

`griffelTests` unwired from all 55 non-deprecated `isConformant` wrappers and the
`make-styles-overrides-win` `disabledTests` entries dropped (~190 test files);
`classname-overrides-win` (D9) is the replacement. The package moved to
`packages/react-components/deprecated/` per the react-alert precedent (`eol` tag, beachball
freeze `major/minor/patch`, DEPRECATED readme) — published history untouched; the two
deprecated Griffel packages keep consuming it. Generators no longer scaffold it (or any
Griffel): react-component emits clsx + CSS Modules, react-library emits no `@griffel/react`
dep / serializer / griffel conformance wrapper.

### Toolchain end-state

`@griffel/eslint-plugin` (+ 4 rules) and root `@griffel/react` are gone. Deliberately kept,
each with a live consumer: `@griffel/babel-preset` (deprecated/ AOT via preset-v9),
`@griffel/jest-serializer` (S-I sweep), `@griffel/shadow-dom` + `@griffel/webpack-loader`
(D11 survivor VR stories + storybook `griffelRule`). Griffel-zero grep assertion: zero live
`@griffel/*` imports outside `deprecated/` and the D11 survivors (sh-the-break.md §5).

## D27 — icons stylesheet layer assignment: `fui.components.l1` (icons integration 1, 2026-07-31)

`@fluentui/react-icons` 3.0 (headless) expresses icon styling as data attributes
(`data-fui-icon`, `data-fui-icon-rtl`, `data-fui-icon-hidden`, `data-fui-icon-font`)
resolved by a REQUIRED stylesheet, `@fluentui/react-icons/styles.css`. That stylesheet
ships **UNLAYERED by default** — the package's own back-compat posture, documented in its
file header. Because cascade layers are compared before specificity, unlayered icon rules
would beat every layered `fui.*` rule no matter how specific; correct behavior inside this
repo's layering system therefore requires assigning the stylesheet a layer at import time:

```css
@import '@fluentui/react-icons/styles.css' layer(fui.components.l1);
```

**Altitude: `fui.components.l1`, the lowest component layer — the user's explicit pick**
(griffel-zero-plan.md "User amendments" §3, "we can see how that plays out"), held loosely:
icon state rules arbitrate with base library components by in-file source order; l2+,
`fui.utilities`, and unlayered consumer CSS all still win. If l1 ties misbehave in the S-J
retirement batches' VR gates, revisit the altitude.

Wiring (both emission points, one import each):

- `scripts/storybook/src/tailwind-theme.css` — every storybook document (root preview,
  VR harness, docsite compose the root preview or import this entry directly).
- `packages/react-components/react-tailwind-theme/css/emit.css` — inlined into
  `dist/styles.css` at build time, so the package-consumer document's single theme import
  also covers icons. Verified emitted: the `@layer fui.components.l1` block in
  `dist/styles.css` carries all icon rules (base `:where([data-fui-icon])`, forced-colors,
  font variants, RTL flip, bundled-pair hide).

The D2a5 62 unlayered `:global(.fui-Icon-*)` lines stay REQUIRED until this import proves
stable; they retire in S-J (per the D2a5 superseding amendment above). The icons package is
consumed locally via a LOCAL-ONLY yarn `resolutions` tarball override that MUST be reverted
before the PR (commits prefixed `LOCAL-ONLY(revert-before-PR)`); the icons upstream merge
is a dependency of the UI merge.
