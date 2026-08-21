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

### Phase 2 items from PR review (2026-08-20)

- Shared look-prop types: suggest one home for the appearance/shape/size unions
  and per-component Props/State extensions (ideally exported by the headless
  package) instead of windmod redeclaring them — user asked to suggest, not
  implement yet.
- Upstream tactical-edit candidate: headless Tooltip arrow has no
  slot/className hook (arrowRef exists, nothing applies a class) — windmod must
  style the `[data-arrow]` child via descendant selector until then.
- DONE (user-approved tactical edit, 2026-08-21): icons fork branch
  `feature/data-variant` stamps `data-variant="filled|regular"` in headless
  bundleIcon; fluentui consumes it via a LOCAL-ONLY tarball resolution
  (`file:../fluentui-system-icons/packages/react-icons/fluentui-react-icons-local.tgz`)
  — REVERT the resolutions entry + yarn.lock before any merge/publish (same
  protocol as the previous campaign), and upstream the icons change. Button's
  glyph swap now rides `variant-filled`/`variant-regular` catalog variants;
  zero `fui-Icon-*` class references remain in compiled CSS. To rebuild the
  tarball: icons repo `yarn build:generate-chunks-and-atoms && yarn build:js`,
  `npm pack`, copy to `fluentui-react-icons-local.tgz`, then here
  `rm .yarn/cache/@fluentui-react-icons-file-*.zip && yarn install`.
- Optional headless edit if wanted: emit `data-appearance` on Button so
  appearance-conditional icon colors can ride named-group variants too.
- Story convention: ONE export per `*.stories.tsx`, re-exported through
  `index.stories.tsx` — the export-to-sandbox addon injects `fullSource` only
  on the last export otherwise (docs pages error with 'issues with data').

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
