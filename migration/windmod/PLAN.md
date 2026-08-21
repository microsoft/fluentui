# react-windmod-preview — Campaign Plan

_Approved by the user 2026-08-20. This file is the durable source of truth; the
conversation is not. Resume protocol: read this file, then LEDGER.md, then the
latest report in reports/._

## What we are building

Two production-quality packages under `packages/react-components/`, merge-ready
in discipline (beachball, changelogs, conformance, docs) even though upstream
has not asked for them:

1. **`@fluentui/react-tailwind-theme-preview`** — Fluent themes/tokens as a
   Tailwind v4 + CSS layer. Ported from the closed branch's
   `react-tailwind-theme` (`styling/tailwind-css-modules`): `tokens.css`
   (@theme inline, 467 tokens → utilities), `themes.css` (7 theme classes ×
   433 tokens, generated with lockstep assertions), `variants.css` (catalog
   already named after the headless data-* vocabulary), the `fui.*` cascade
   layer order, and the CSS-Modules build pipeline. Standalone value: teams
   styling raw headless components get real Fluent themes.
2. **`@fluentui/react-windmod-preview`** — styled Fluent components composing
   `@fluentui/react-headless-components-preview` hooks with Tailwind v4 + CSS
   Modules, visually parity-matched to the Griffel suite. `library/` +
   `stories/` split and subpath exports mirror the headless preview 1:1, plus a
   root barrel; unstylable/infra subpaths (`/positioning`, `/utils`) are
   re-exported pass-through so one package imports everything.

## Settled decisions (user-confirmed)

- **Name:** react-windmod-preview (portmanteau: tailWIND + CSS MODules).
- **Theme layer is its own package** (react-tailwind-theme-preview).
- **Per-component architecture — hook composition, not component wrapping:**
  `useX(props, ref)` (headless; emits data-* state attrs) → `useXStyles(state)`
  (ours: module class-map onto every slot's className, clsx-merged with
  consumer classNames; JS variant branching on state where headless emits no
  data-* — e.g. Button appearance/size/shape; group marker per D15/D16) →
  `renderX(state)` (headless re-export). Full state access; upstream tactical
  edits (e.g. adding data-appearance) become optional in-pattern PRs, never
  blockers.
- **ThemeProvider renders a `display:contents` div** carrying the theme class
  (`fui-theme-web-light`, …) and composes the headless Provider context
  (dir/targetDocument). Verified in Chrome 2026-08-20: vars on a
  display:contents element inherit to children INCLUDING open top-layer
  popovers inside it, and nested providers override element-locally
  (probe: .scratch/display-contents-probe/).
- **No portal special-casing needed:** headless surfaces use the native
  top-layer (PopoverSurface `<dialog popover="auto">`, Tooltip
  `popover="hint"`, Toaster `popover="manual"`, MenuPopover `popover="auto"`,
  non-modal Dialog `popover="manual"`). Top-layer keeps DOM ancestry → theme
  vars cascade in.
- **Icons: `@fluentui/react-icons/headless`** — published upstream since
  2.0.334 (verified in node_modules). Griffel-free; never import the classic
  Griffel entrypoints.
- **Tokens stay kebab-case** (`--color-neutral-foreground-1`). Self-contained
  namespace; deliberately NOT interoperable with classic FluentProvider
  camelCase theming. Documented as a design decision.
- **Parity bar: zero-tolerance VR** against the Griffel suite's rendering,
  webLightTheme default, like the previous campaign.
- **Coverage = whatever headless ships.** We track upstream; see
  BLOCKED_ON_UPSTREAM.md. Currently absent upstream: Table/DataGrid, Tree,
  List, Carousel, Virtualizer, Text (typography).
- **Communication:** chat carries deltas/decisions/findings only; long-form
  lives here (user feedback 2026-08-20).

## Phases

- **Phase 0 — Scaffold** (branch `styling/react-windmod` off master):
  both packages per repo conventions (nx, tsconfig, eslint, beachball), theme
  package ported + generator re-verified against current @fluentui/tokens,
  stories Storybook wired with the Tailwind v4 pipeline.
- **Phase 1 — Pilot (GATE: user review): Button + Tooltip + ThemeProvider.**
  Tooltip forces the theme provider, top-layer and positioning path; Button
  covers variant-branching without data-*. Side-by-side stories vs the Griffel
  suite for review. A third component only if the user asks after review.
- **Phase 2 — Audit matrix:** all ~53 headless components × {DOM/slot parity
  vs styled twin, data-* coverage vs module.css selector needs, top-layer CSS
  adaptation, port complexity} → batch plan + optional-upstream-PR list.
- **Phase 3 — Batch conversion** under the established protocol: full contract
  per batch, batch+seam validation only, chunked per-package commits; full
  sweeps only at phase boundaries.
- **Phase 4 — Ship polish:** 7 theme classes exercised (VR subset per theme),
  bundle-isolation gate (adopt @fluentui/verify-bundle-isolation — no Griffel
  in our bundles), docs, metrics, PR assembly.

## Reuse map (source: branch `styling/tailwind-css-modules`)

- react-tailwind-theme package → ported wholesale, renamed.
- Converted `useXStyles` hooks + `*.module.css` per component → primary
  styling source; re-targeted onto headless state objects. Top-layer surfaces
  (popover/dialog/menu/tooltip/toast) need real adaptation, not a port — the
  old CSS assumed portaled DOM + positioning wrappers.
- CSS Modules build executor (commits c9942bcca9 + cc63894a05 on the branch)
  → compile module.css → dist/styles.css + class-map JS.
- VR harness (migration/griffel-to-tailwind/validation/) → adapt for
  cross-package A/B (our story render vs Griffel suite story render).
- DECISIONS.md (D2 layers, D15/D16 class-name & data-* contract, D20 nonce,
  …) → contract carries forward unless a decision here supersedes it.

## Risk register

1. Top-layer CSS adaptation (::backdrop, top-layer stacking, headless's own
   usePositioning) — sized in Phase 2; late batches. Tooltip in the pilot
   de-risks the pattern early.
2. Headless is v0.2.x and moving — pin exact versions per batch; re-run seam
   checks on upstream sync; export-map diff script flags new components.
3. Icons: verify-bundle-isolation gate catches any Griffel leak via icon
   imports. Fork branch `feature/headless-promotion`
   (fluentui-system-icons) is reference only.
4. Variant-prop defaults (e.g. Button appearance='secondary') are applied
   inside base hooks — our styles hooks branch on RESOLVED state, never
   replicate defaults from props.

## Working-docs hygiene

Everything under `migration/windmod/` is working state, committed on this
branch, and STRIPPED in a single marked commit at PR-assembly time (Phase 4).
The eventual PR contains only the two packages + stories + docs/app wiring.

## Files here

- PLAN.md (this file)
- LEDGER.md — per-component status (pilot → audited → converted → validated)
- BLOCKED_ON_UPSTREAM.md — components with no headless counterpart
- reports/ — per-phase/batch reports
