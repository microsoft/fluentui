# RFC: Component Style Spec

_Contributors: @dmytrokirpa_

_Stakeholders: Fluent UI React (v9), Fluent UI Web Components, Headless Components_

_Originally authored: 2026-09-16_

_Target end date for feedback: open_

## Summary

Introduce a **framework-agnostic, JSON-shaped component style specification** as the shared source of truth for Fluent UI visual styles across:

- Griffel `makeStyles` / `makeResetStyles` for v9 React components
- FAST `css` templates for web components
- CSS Modules for styled wrappers over headless components (and any other CSS consumer)

The proposal ships three packages:

| Package                           | Role                                                                 |
| --------------------------------- | -------------------------------------------------------------------- |
| `@fluentui/style-spec`            | Spec types, JSON schema, validation, normalization to a canonical IR |
| `@fluentui/component-style-specs` | Published per-component style data (Badge, Button, Divider, …)       |
| `@fluentui/style-spec-compilers`  | Deterministic adapters that emit Griffel / WC CSS / CSS Modules      |

The **spec is target-agnostic**. It never contains selectors, class names, attribute names, or emitter options. Target mapping lives exclusively in per-target **adapter configs** owned by the compilers package.

This RFC is accompanied by a side-by-side PoC for Badge, Divider, and Button that does not replace the hand-written styles yet.

## Background

Fluent UI currently re-authors the same design decisions three times:

1. **v9 React** — Griffel object styles with flat variant class maps and runtime `mergeClasses` indexing (`rootStyles[\`${appearance}-${color}\`]`), tokens via `tokens.x`from`@fluentui/react-theme`.
2. **Web Components** — FAST `css` tagged templates with `:host([appearance='x'][color='y'])`, `:state(...)`, `::slotted(...)`, tokens as generated `var(--x)` constants.
3. **Headless** — unstyled primitives that expose only behavior `data-*` attributes; stories demonstrate CSS Modules styled against those attributes (never design attrs like `data-appearance`).

All three already share one token vocabulary (`@fluentui/tokens` → `--tokenName`). Component styles do not share a machine-readable contract.

Duplication is large and drifts: Button's Griffel styles alone are ~600 lines; the WC Button styles restate the same appearance × interaction matrix with different selectors.

## Problem statement

- **Triple authoring** of the same visual design across React, WC, and potential headless wrappers.
- **No shared contract** that tools can validate, generate from, or consume outside this monorepo.
- **Drift** between platforms is inevitable and expensive to detect.
- **Headless adoption** needs a path to a Fluent-styled CSS Modules layer without forking Griffel output by hand.

We need a single, publishable, language-neutral description of component styles that deterministic tooling can turn into each target's idiomatic style surface.

## Detailed Design or Proposal

### Spec shape (type-safe JSON)

A component style spec is a plain data object (or `.json` file). TypeScript authors type it as `ComponentStyleSpec`; non-TS consumers validate against the JSON schema. There are **no helper functions** (`token()`, `defineComponentStyleSpec`, etc.). Token references are tagged objects. Repetition across rules is intentional — the format prioritizes readability and trivial traversal over DRY authoring sugar.

```ts
export const BadgeSpec: ComponentStyleSpec = {
  $schema: 'https://fluentui.dev/schemas/component-style-spec/v1.json',
  name: 'Badge',
  version: 1,
  slots: ['root', 'icon'],
  variants: {
    appearance: { values: ['filled', 'ghost', 'outline', 'tint'], default: 'filled' },
    size: { values: ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'], default: 'medium' },
  },
  states: { hasText: { type: 'boolean' } },
  rules: [
    { slot: 'root', declarations: { display: 'inline-flex', color: { token: 'colorNeutralForeground1' } } },
    { slot: 'root', when: { variants: { size: 'small' } }, declarations: { height: '16px' } },
    {
      slot: 'root',
      when: { variants: { appearance: 'filled', color: 'brand' } },
      declarations: {
        backgroundColor: { token: 'colorBrandBackground' },
        color: { token: 'colorNeutralForegroundOnBrand' },
      },
    },
    { slot: 'root', when: { media: '(forced-colors: active)' }, declarations: { borderColor: 'CanvasText' } },
  ],
};
```

**Value model:** `string | number | { token: keyof Theme } | { var: '--name', fallback? } | { concat: [...] }`.

**Condition model:** each rule has optional `when` with `variants`, `states`, `pseudo`, `rootPseudo` (pseudo on root while styling another slot), `media`, `supports`. All present conditions AND together. Declarations are flat — no nested selectors.

**Slots** are names only. The spec never maps them to selectors.

Every spec must round-trip through `JSON.stringify` / `JSON.parse` unchanged and validate against `component-style-spec.schema.json`.

### Canonical IR

`normalizeSpec(spec)` produces a deterministic intermediate representation:

- Conditions sorted by axis/state declaration order
- Rules sorted by slot → condition rank (base → variants → states → compound) → at-rules → pseudo text
- Stable `groupKey` (slot + variants + states) and unique `key` (includes pseudo/media/supports)

Compilers consume the IR, never the authoring-order spec, so output is byte-identical across machines.

### Adapter configs (target-specific, live in compilers)

Each emitter takes `(ir, adapterConfig)`. Adapter configs are the **only** place target mapping is expressed:

```ts
interface WebComponentsAdapterConfig {
  slotSelectors: Record<string, string>; // root: ':host', icon: '::slotted(svg)'
  variantAttributes: Record<string, string>;
  omitAttributeForDefault: string[]; // filled → no appearance attribute
  states: Record<string, { kind: 'custom-state' | 'attribute'; name: string }>;
  tokenImportPath: string;
}

interface GriffelAdapterConfig {
  classNamePrefix: string; // 'fui-Badge'
  variantProps: Record<string, string>;
  stateProps: Record<string, string>;
  tokensImport: string;
}

interface CssModulesAdapterConfig {
  stateAttributes: Record<string, string>; // hasText → data-icon-position is NOT a state attr; disabled → data-disabled
  variantClassFormat: 'axis-value' | 'value';
}
```

Defaults are derived from the spec (slot `root` → `:host`, axis `appearance` → attribute `appearance`). Per-component overrides live under `style-spec-compilers/src/adapters/<target>/configs/`. Adapter configs are validated against the spec they are applied to.

### Emitters

- **Griffel:** unconditional group → `makeResetStyles`; other groups → `makeStyles` with deterministic keys (`size-small`, `appearance-filled--color-brand`); tokens → `tokens.x`; known shorthands → `shorthands.*`; generated `use{Name}Styles_unstable` keeps user `className` last.
- **Web Components:** `:host` / `:host([attr])` / `:state()` / configured slot selectors; tokens → `var(--x)`; emits `.css` and a FAST `css` wrapper `.ts`.
- **CSS Modules:** `.root` + variant classes; behavior states as `[data-*]`; `getClassNames` helper for styled headless wrappers.

Determinism: prettier-formatted output, generated-file banner, CLI `--check` mode, double-compile byte-equality tests.

### Package topology

```
Tier 1: @fluentui/tokens, @fluentui/style-spec
        @fluentui/component-style-specs (data; depends only on style-spec)
Tools:  @fluentui/style-spec-compilers (node; depends on style-spec + specs)
```

No dependency from Tier 3 component packages into compilers is required for the PoC (side-by-side). Specs are intended to be published and consumed outside the monorepo.

### Adoption phases

1. **PoC (this PR):** packages private; Badge/Divider/Button specs; compilers with fixtures; Storybook side-by-side demo; parity tests against hand-written styles. No edits to `react-badge`, `react-button`, `react-divider`, or `web-components` sources.
2. **Opt-in generation:** generated files land next to hand-written ones under `generated/`; nx `generate` / `--check` targets; hand-written remains live.
3. **Source of truth:** per-component cutover; hand-written styles deleted; conformance and VRT remain the gate.

### Governance

- Spec ownership follows the component's CODEOWNERS team.
- Hardcoded colors in specs are rejected by `validateSpec` (system colors like `CanvasText` / `Highlight` are allowed as forced-colors literals).
- Schema version field (`version: 1`) gates breaking format changes.

### Pros and Cons

**Pros**

- One publishable contract for all platforms and external consumers
- Deterministic generation removes hand-porting drift
- Plain JSON is traversable by any language / AI / design tooling
- Target concerns stay out of the data package

**Cons**

- Verbosity (intentional repetition)
- Not every Griffel idiom maps 1:1 (tabster focus indicators, icon-library class swaps)
- Initial migration cost to author specs for existing components
- Adapter configs are another surface to maintain

## Discarded Solutions

- **Runtime adapters that interpret the spec in the browser** — adds payload and couples runtime to a format meant for build-time generation.
- **Style Dictionary / Theo as the shared source** — excellent for tokens; poor fit for component variant matrices and slot models.
- **Sass as the shared source** — already tried via `react-theme-sass` for tokens only; Sass is not a good IR for Griffel object styles.
- **Single static CSS consumed via Griffel `makeStaticStyles`** — loses Griffel atomic/variant ergonomics and does not help WC or CSS Modules consumers with their native patterns.
- **Colocating specs inside each component package** — conflicts with "publish and use beyond the monorepo" and forces every consumer to depend on React packages.
- **Putting target mapping (`targets: { webComponents: … }`) inside the spec** — rejected; it couples data to platforms and blocks third-party adapters.

## Open Issues

1. **Focus indicators:** v9 uses `createCustomFocusIndicatorStyle` (`[data-fui-focus-visible]`). The PoC emits plain `:focus-visible`. Should the Griffel adapter optionally emit tabster selectors?
2. **`::slotted` vs `::part`:** WC adapter defaults to `::slotted(svg)` for icon slots; some components use `part=`. Per-component adapter config covers this — is a convention doc enough?
3. **Styled headless wrappers and design variants:** headless forbids `data-appearance` / `data-size`. CSS Modules adapter therefore uses **classes** for design variants and **`[data-*]`** only for behavior states. Confirm this is the intended contract for a future styled-headless package that could replace v9.
4. **Shorthand expansion:** Griffel has `shorthands.borderColor`; CSS needs longhands or a single `border-color`. Compilers currently emit the property as authored. Should we expand shorthands in the IR?
5. **Motion / keyframes / RTL:** not in the PoC. Spec would need `keyframes` and logical properties guidance.
6. **Button parity gaps:** filled/regular icon swap via `@fluentui/react-icons` class names is icon-library specific and omitted from the Button spec.
7. **Release:** packages are `private: true` for the PoC. Flip via `prepare-initial-release` after RFC acceptance; decide npm tag (`alpha` vs `latest`).
