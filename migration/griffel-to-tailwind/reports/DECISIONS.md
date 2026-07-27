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
