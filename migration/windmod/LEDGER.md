# Ledger

Status flow: `planned` → `pilot` → `audited` → `converted` → `validated` (zero-tolerance VR vs Griffel suite).

## Infra

| Item                                   | Status  | Notes                                                                                                                                                        |
| -------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Branch styling/react-windmod           | done    | off master 06cbcbe0b1                                                                                                                                        |
| PLAN.md committed                      | done    |                                                                                                                                                              |
| Build infra port (executor, scripts)   | done    | css-modules compiler in build executor; jest+storybook wiring; react-icons → 2.0.337 for /headless                                                           |
| react-tailwind-theme-preview port      | done    | self-contained (theme-values.json + class-name constants in-package; tokens.ts = name inventory only); regenerated vs current tokens; dist builds (175,694B) |
| react-windmod-preview scaffold         | done    | generator + bespoke: type:module, subpath exports, moduleResolution bundler (type-check --baseUrl override defeats repo paths)                               |
| workspace-plugin Windows fix           | done    | generate-api subpath rollups skipped on Windows (backslash vs '/index.d.ts' suffix check) — fixed, 56 headless rollups emit                                  |
| ThemeProvider                          | done    | display:contents + headless Provider context; theme classes re-exported from /provider                                                                       |
| Stories Storybook + Tailwind v4 wiring | done    | root .storybook rules + package stories project (generator template had 2 bugs: main.cjs not inferred, wrong require depth)                                  |
| Library build/type-check/lint          | done    | all green                                                                                                                                                    |
| VR harness adaptation                  | planned | after pilot review                                                                                                                                           |
| Unit tests (conformance + behavior)    | planned | isConformant adapted (export-map shape); write with pilot round 2                                                                                            |

## Components (pilot)

| Component | Status      | Notes                                                                                                                                                                                   |
| --------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button    | pilot-built | Button.module.css ported verbatim; wrapper reintroduces appearance/shape/size (headless omits them — defaults mirrored, drift risk documented); adds data-size/data-empty               |
| Tooltip   | pilot-built | REAL top-layer adaptation: data-placement re-key (logical vocab + rtl swap), pure-CSS arrow cross-axis, JS offset compensation (4/+6); [data-hidden] producer gone — no boundary hiding |

### Storybook verification 2026-08-20 (screenshots in .scratch/windmod-shots/)

- Button GriffelComparison: side-by-side parity convincing across all 5
  appearances × 3 sizes × 3 shapes × 3 disabled states × icon variants.
- Tooltip Placements: all 12 placements render with correctly oriented arrows
  (top-layer + CSS anchor positioning + data-placement re-key + pure-CSS arrow).
- ThemeProvider NestedThemes: web-dark/teams-dark/teams-HC subtrees all resolve;
  the pinned top-layer tooltip inside the dark subtree renders DARK — the
  display:contents theming architecture is proven in-browser.
- Learning: `popover='hint'` is exclusive by spec — multiple pinned-open
  tooltips need `content={{ popover: 'manual' }}` (demo-only device).

### Pilot known gaps (for review discussion)

- Headless icons: /headless ships FACTORIES only (2.0.337) — premade icon
  components are still Griffel. Stories use classic icons in the demo layer;
  the windmod library imports none. PLAN.md corrected.

- Arrow cross-axis position for -start/-end placements is a fixed 8px inset
  (`--fui-positioning-arrow-cross`) — Griffel aligned it to the anchor from JS.
  Zero-tolerance VR may flag it on those placements; centered placements should match.
- Button's icon filled/regular hover-swap rules target `:global(.fui-Icon-*)` classes —
  verify against headless icons 2.0.337 markup in storybook (fork lineage carried them,
  unconfirmed upstream).
- ButtonContext size inheritance (Toolbar et al.) not consumed — audit item for the
  compound-component batches.
- generate-api emits `library/etc/*.api.md` per subpath — commit them once reviewed.

## Components (remaining headless coverage)

Not yet enumerated — Phase 2 audit populates this section from the headless
export map (~53 components).
