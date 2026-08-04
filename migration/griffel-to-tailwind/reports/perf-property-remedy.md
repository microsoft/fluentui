# Remedy: `@property` registrations removed, knob isolation moved to element-level resets

Date: 2026-08-04 · Branch: `styling/tailwind-css-modules` · Implements the remedy sketched
in `perf-mechanism-diagnostic.md` ("Option A: drop the registrations; enforce isolation by
reset"). SHIPPED — all gates below passed at zero tolerance.

## The change

The migration's theme layer registered 8 focus-knob custom properties
(`--fui-focus-outline-{width,color,radius,offset}`, `--fui-focus-ring-{color,radius,width,
inset-width}`) with `@property … syntax:'*'; inherits:false` in
`packages/react-components/react-tailwind-theme/css/utilities.css`. The mechanism
diagnostic proved those registrations' mere existence flips Blink's transition-start path
onto a page-global slow branch (~9.4 µs per started CSS transition, a step function of
registry-non-emptiness) — the entire unexplained E-cliff residual.

Their only functional role was nesting ISOLATION: `inherits:false` guaranteed a knob set
on one component never leaks into a nested one (SplitButton renders a Button inside a
Button), and guaranteed-invalid initial values kept unset knobs on their `var()`
fallbacks. Both properties are reproduced without the registry:

- **Registrations removed** (all 8 `@property` blocks deleted from `utilities.css`).
- **Element-level resets added**: each focus utility now opens by resetting every knob it
  consumes to `initial` on the element it is applied to — `fui-focus-outline` resets the
  4 outline knobs, `fui-focus-ring` the 4 ring knobs. For unregistered custom properties
  `initial` is the guaranteed-invalid value, and an own declaration always beats
  inheritance, so: an ancestor's knob override stops at the consuming element (isolation),
  an unset knob still resolves to its `var()` fallback (defaults preserved), and knob
  declarations on `::after` (how ALL in-repo callers parameterise the outline ring —
  Card, Slider, ColorArea, CalendarDayGrid) sit past the element-level reset and win.
- Because `@apply` inlines the utilities, the resets land inside each consumer's
  focus-visible/focus-within rule — exactly the rule that consumes the knobs, at the
  altitude the component already owns. No new rule, selector, or layer.

### Files changed

- `packages/react-components/react-tailwind-theme/css/utilities.css` — registrations
  removed, resets + isolation rationale added (the authoritative comment).
- `packages/react-components/react-tailwind-theme/css/emit.css`, `build.js`, `README.md` —
  emission docs updated ("the artifact must contain ZERO `@property` rules").
- `packages/react-components/react-card/library/src/components/Card/Card.module.css`,
  `react-slider/.../Slider.module.css`,
  `react-calendar-compat/.../CalendarDayGrid.module.css` — comments only (the "knob on
  `::after` because registered `inherits:false`" rationale re-grounded on the reset
  mechanism; no declaration changed).
- New VR stories (separate commit): `apps/vr-tests-react-components/src/stories/
{Button/ButtonFamilyFocus,Button/SplitButtonFocus,Checkbox/CheckboxFocus,
Radio/RadioFocus,Switch/SwitchFocus,Slider/SliderFocus,Card/CardFocus}.stories.tsx` —
  focus-visible states for the Button family (incl. SplitButton nested + ancestor-knob
  isolation stories), Checkbox, Radio, Switch, Slider, Card had NO VR coverage; they gate
  this and any future change to the isolation mechanism.

### Documented public-behavior contract (checked before shipping)

Nothing documents the knobs as inheritable — every in-repo description (utilities.css,
Card/Slider/CalendarDayGrid comments, D6) states the opposite ("a knob set on one
component can NEVER leak into a nested one"). The remedy preserves that contract. One
edge pattern diverges, measured and accepted (see gate 2): setting an OUTLINE knob
directly on a component's own root element — previously a silent no-op (`inherits:false`
blocked element→`::after` inheritance), now effective (unregistered properties inherit
into the component's own `::after`; the reset lives in a layered rule and loses to inline
styles / unlayered CSS on the same element). No in-repo code, story, or doc uses that
pattern; nothing could have depended on the old no-op behavior.

## Gate 1 — Perf (the point of the change)

`.scratch/perf-eval/mechanism/probe-remedy.mjs`: retained diagnostic bundles
(`mech-before` = contemporaneous Griffel anchor, `mech-after` = shipped-with-registrations
control) vs `mech-remedy` (fresh `PERF_LEG=after` build from the remedy tree, packages
rebuilt). 31 iters + 5 warm-ups × 3 reps, legs rotated per rep, pooled n = 93/cell.

Pooled medians, ms per toggle of 100 instances:

| Cell                 | Griffel | with `@property` | remedy | strip-experiment prediction |
| -------------------- | ------: | ---------------: | -----: | --------------------------: |
| Switch E (`runMech`) |     4.4 |             11.7 |    5.4 |                         5.4 |
| Switch E (scenario)  |     4.4 |             11.7 |    5.3 |                           — |
| Button E (`runMech`) |     3.4 |              8.2 |    3.5 |                         3.4 |
| Button E (scenario)  |     3.4 |              8.1 |    3.4 |                           — |
| Divider E (control)  |     1.3 |              1.3 |    1.3 |                           — |

- Button: the entire transition-attributable gap is erased (3.4–3.5 vs Griffel 3.4).
- Switch: ~87% of the gap recovered (residual +0.9–1.0 ms ≈ +23% — the ordinary
  selector/var costs previously bounded by `perf-layers-vs-literals`).
- Divider (transition-detection control): world-equal before, unchanged after.
- Liveness (CSSOM): control 8 `CSSPropertyRule`s, remedy **0**.
- Computed-style + geometry fingerprint (Switch/Button, base + toggled, 26 props/element):
  **0 mismatches** remedy vs control.

Bundle verification: theme `dist/styles.css` 0 `@property` (was 8); all 57 built
`packages/react-components/*/library/dist/styles.css` contain 0 `@property` (including
Tailwind-internal `--tw-*` — none are emitted into shipped component CSS); resets present
in every consumer (e.g. react-button: 4 ring resets inside the
`:where([data-fui-focus-visible])` rule, react-switch/card/slider: 4 outline resets).
Tailwind's `@layer properties` `@supports` fallback block (inert in Chromium — probe-
verified by the diagnostic) is no longer emitted either.

## Gate 2 — Focus/nesting equivalence (CDP computed styles)

`.scratch/perf-eval/equiv-probe/` (page) + `.scratch/perf-eval/mechanism/probe-equiv.mjs`
(comparator). The **pre** leg is built from the genuinely stashed pre-remedy tree
(packages + theme rebuilt pre-change), the **post** leg from the remedy tree — same
probe page JS byte-for-byte, only the CSS legs differ (pre: 8 CSSOM registrations,
post: 0). 25 focus-indicator properties per element AND per `::after`, all elements of
each scenario subtree, focus forced via keyborg attributes + real `.focus()`.

Pre == post **IDENTICAL** (0 property mismatches) on all gated scenarios:

- Button focused (`fui-focus-ring`)
- SplitButton primary focused + menu focused (nested button family)
- Input focused (own underline machinery)
- Card focused (`fui-focus-outline` + knob overrides on `::after`)
- Slider focused (`focus-within-fui` + knob override)
- all isolation scenarios below, and the knob-live positive control

Isolation probes (HOLD in BOTH legs — behavioral equivalence of the two mechanisms):

- ancestor `<div>` sets all 4 ring knobs → focused Button inside == plain focused Button
- ancestor `<div>` sets all 4 outline knobs → focused Card inside == plain focused Card
- knob-carrying `<div>` > Card > focused Button == plain focused Button (isolation
  through an intermediate component)
- positive control: `--fui-focus-ring-color` inline on the Button itself reaches the
  ring's box-shadow in both legs (`rgb(0, 128, 0)` — proves the knob channel is live, so
  the isolation results are not "knobs are dead")

Documented divergence probe (excluded from the equality gate, by design):
`--fui-focus-outline-color: rgb(255,0,0)` inline on a Card's own root → Card's `::after`
ring border: pre `rgb(0,0,0)` (no-op, fallback `--colorStrokeFocus2`), post
`rgb(255,0,0)` (inherits into own `::after`). This is the edge pattern described above —
previously inert, so nothing can regress.

Incidental observation (pre-existing, identical both legs, not introduced here): Button's
focus rule lives in `fui.base`, so its `border-color` declaration is outranked by the l1
appearance border color; the visible focus indicator is the inset box-shadow + outline.
Recorded for a possible follow-up altitude review; VR baselines embed this rendering.

## Gate 3 — VR, zero tolerance

Protocol: `validation/README.md` — same machine, fresh `--skip-nx-cache` storybook builds
per leg (staleness guard: pre-leg bundle grep-verified to contain the 8 registrations,
post-leg 0), StoryWright capture, `diff.mjs --maxDiffPixels 0`.

Sets: every baseline set implicated by the knob grep (31 consumer packages) plus every
focus-step-exercising set plus the new focus stories — filter:
Accordion, AvatarGroup, Breadcrumb, Button (+ - Focus), Calendar Compat, CalendarCompat,
Card (4 kinds + - Focus), Checkbox (+ - Focus), ColorPicker, Combobox, CompoundButton,
DataGrid subtle single/multi select, DatePicker Compat, Dialog, Drawer, Dropdown,
InfoLabel, Input, InteractionTag, Link (3 kinds), Menu (all kinds incl. MenuButton /
MenuGrid + SplitButton - Focus), Popover, Radio (+ - Focus), Rating, RatingDisplay,
SearchBox, Select, Slider (+ - Focus), SpinButton, SplitButton, Switch (+ - Focus),
TabList and Tab, Table (12 kinds), Tag, TagGroup, TagPicker, Textarea, Toast,
ToggleButton, Tree.

Result: **2772 screenshots per leg (counts equal by construction — `--expect 2772` on the
candidate), 2770/2772 pixel-identical at `--maxDiffPixels 0`, 0 missing, 0 extra.** The 2
failures are both `CalendarCompat.multiDayView` (LTR 21 px, RTL 21 px, localized to the
day-19 cell glyph) and are **proven pre-existing nondeterminism by the established
double-capture protocol**, not adjudicated by eye:

- Same-bundle determinism probe: the remedy bundle captured 3× disagrees with ITSELF —
  pass A vs B: LTR + RTL + Dark Mode dirty (21 px each); B vs C: High Contrast dirty
  (17 px). The failing theme VARIANT migrates between passes and the pixel count varies;
  Dark Mode was clean in the two-leg diff but dirty pass-to-pass.
- A fresh candidate capture diffed against the pre-change baseline left only Dark Mode
  dirty (21 px) — i.e. the specific leg-to-leg failures did not reproduce.
- The compiled react-calendar-compat CSS is **sha1-identical** (`4ee3539b…`) with and
  without the only calendar-touching edit (a comment), and `multiDayView` exercises no
  focus state, so no mechanism exists for the remedy to move these pixels.

Recorded as a known flaky story in `validation/README.md` (alongside the ProgressBar HC
precedent). Every focus story — including all 36 new focus stories × 2 snapshots — is
pixel-identical, as are the ancestor-knob isolation stories (any leak would be a red
7px ring; see the SplitButtonFocus captures).

## Gate 4 — Jest / lint

- `nx run-many -t test -p react-button react-card react-slider react-calendar-compat
react-switch react-checkbox react-radio react-input`: 7/8 green.
  `react-checkbox` fails 2/40 (icon snapshot: `fui-Icon` class + `data-fui-icon`
  attribute + path data) — **pre-existing**, proven by stash-rerun: identical 2 failures
  with the remedy diff stashed (`--skip-nx-cache`). Icons-3.0-migration snapshot lag,
  unrelated to CSS (the remedy touches no JS/DOM).
- `vr-tests-react-components:lint` green (includes the 7 new story files).
- `vr-tests-react-components:type-check`: the only error is pre-existing in the untouched
  `src/stories/Charts/ChartAnnotationLayer.stories.tsx:118` (TS2322); the new story files
  produce zero diagnostics.

## Caveats

- **The remedy's perf win is host-page fragile** (diagnostic "Remedy assessment"): ANY
  `@property` from any stylesheet on the host page — Tailwind v4 apps emit them routinely
  — restores the page-global penalty for everyone, Griffel included. This change makes
  FluentUI registry-clean; it cannot control the host document. The VR storybook page
  itself demonstrates this: `react-storybook-addon`'s compiled CSS registers
  `--tw-font-weight` / `--tw-leading` (harness-only, NOT shipped in any component or
  theme artifact).
- **File the Chromium issue** (diagnostic recommendation, unchanged): the engine's fast
  path keys on "any registration exists" rather than "a registered property could
  transition here"; Chromium 141 measured, version-specific. Implicated region:
  per-start `InterpolationTypesMap(registry, …)` construction and the
  before/after-change-style machinery in `css_animations.cc` / `style_cascade.cc` /
  `style_resolver.cc`.
- The `initial` resets are ordinary declarations: a same-element knob override must beat
  the component's focus rule (declaration after the `@apply`, higher layer, inline style,
  or unlayered consumer CSS). All existing override sites (`::after`-level) are
  unaffected by construction.
- Firefox/Safari were not measured (diagnostic caveat carried forward); the reset
  mechanism is spec-level CSS (custom-property inheritance + CSS-wide keywords) and is
  not engine-gated the way the perf win is.

## Reproduction

```sh
# perf gate
cd .scratch/perf-eval/harness
PERF_LEG=after PERF_OUT=mech-remedy node ../../../node_modules/vite/bin/vite.js build
cd ../mechanism && node probe-remedy.mjs        # results/raw-remedy.json

# equivalence gate (two-leg build orchestration: stash remedy diff, rebuild
# theme+button+input+card+slider, EQUIV_OUT=pre vite build in ../equiv-probe,
# pop, rebuild, EQUIV_OUT=post) then:
node probe-equiv.mjs                            # results/raw-equiv.json

# VR gate: validation/README.md workflow with the filter quoted above;
# baseline/property-remedy + candidate/property-remedy (+-diff/summary.json)
```
