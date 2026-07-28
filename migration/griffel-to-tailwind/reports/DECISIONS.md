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
(plain declarations or Tailwind arbitrary values). Tokens are **never** registered in
Tailwind `@theme` — `@theme` writes to `:root` and cannot express nested-provider scoping
(risk-analysis). The only Tailwind theme values:

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
CSS exactly once** (storybook: `.storybook/tailwind-theme.css`; consumers: the theme
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

**Scope.** Permanent for `@fluentui/react-icons` (D11 keeps it on Griffel, so nothing will
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
  (`apps/vr-tests-react-components/.storybook/tailwind-theme.css`) compiles to a byte-identical
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
