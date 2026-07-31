# S-G — core specials (react-provider nonce + TextDirectionProvider, tabster factories, positioning types)

Stage S-G of the griffel-zero plan (`reports/griffel-zero-plan.md`), scope per evaluation §6/§8
(`reports/griffel-elimination-evaluation.md`): the react-provider runtime specials that S-H (the
umbrella break) depends on, plus the tabster factory deletion and the positioning type swap.
Decisions recorded as **D20** in `reports/DECISIONS.md` (D20.1–D20.3).

## 1. What changed

### react-provider — now zero `@griffel/*` (imports and dependencies)

| item                                       | before                                                                                                                                                                                             | after                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSP nonce for the theme-vars `<style>` tag | `useRenderer_unstable().styleElementAttributes` (Griffel renderer context; consumers wrapped the app in `RendererProvider` + `createDOMRenderer(document, { styleElementAttributes: { nonce } })`) | **`FluentProviderProps.nonce?: string`** + internal `StyleNonceContext` (new file `StyleNonceContext.ts`, not exported). Nested providers inherit the root nonce and may override it. Nonce reaches both the client-created tag and `serverStyleProps.attributes` (SSR). Stripped from the root `<div>` DOM spread. |
| RTL flipping for consumer Griffel styles   | `<TextDirectionProvider dir={…}>` wrapped the tree                                                                                                                                                 | **Removed, no replacement** (D20.2). First-party CSS flips via `dir` attribute + logical properties / `:dir(rtl)` (D5); icons keep `IconDirectionContextProvider`. Zero in-repo consumers of Griffel's direction context existed (grep-verified).                                                                   |
| deps                                       | `@griffel/core`, `@griffel/react`                                                                                                                                                                  | removed from `package.json`; `@griffel/jest-serializer` dropped from `jest.config.js`                                                                                                                                                                                                                               |

### react-tabster — Griffel focus-ring factories deleted

- `src/focus/createFocusOutlineStyle.ts` and `src/focus/createCustomFocusIndicatorStyle.ts`
  **deleted** (evaluation §6: "verify, then delete the factories outright" — verified: zero
  converted-package consumers; the shared focus-ring CSS utilities (D6) replaced them).
- `focus/constants.ts` loses the factories' `defaultOptions`; `FOCUS_VISIBLE_ATTR` /
  `FOCUS_WITHIN_ATTR` + polyfills unchanged (they remain the public focus contract).
- `@griffel/react` dep and `@griffel/jest-serializer` removed.
- The two remaining live callers were **deprecated** packages (`deprecated/react-alert`,
  `deprecated/react-infobutton`, which intentionally stay on Griffel): the factories' output is
  inlined verbatim at both call sites, so their rendered Griffel styles are byte-identical.

### react-positioning — public types off `@griffel/react`

- `createArrowStyles` / `createArrowHeightStyles` / `createSlideStyles` return the new exported
  structural type **`PositioningStyleObject`** (`{ [selectorOrProperty: string]: unknown }`,
  defined in `types.ts`); `CreateArrowStylesOptions.border*` now use
  `React.CSSProperties['borderBottom*']`. Runtime objects unchanged.
- `@griffel/react` (type-only) dep and `@griffel/jest-serializer` removed.
- Pre-existing seam fixed: `tsconfig.spec.json` was missing the `static-assets` types entry
  (declares `*.module.css`), so `react-positioning:type-check` failed on SafeZoneArea's
  css-module imports — same fix/comment as react-provider's spec tsconfig.

### Umbrella (`@fluentui/react-components`) — S-G's only umbrella touch

- Removed re-exports: `createCustomFocusIndicatorStyle`, `createFocusOutlineStyle`,
  `CreateCustomFocusIndicatorStyleOptions`, `CreateFocusOutlineStyleOptions` (forced by the
  tabster deletion). The 12 Griffel runtime re-exports + 3 types + `wyw-in-js` block + the
  `@griffel/react` dep are untouched — S-H scope (D19, D20.3).

## 2. Public API surface delta (api.md regenerated & committed)

- **react-provider**: `FluentProviderProps` + `nonce?: string`; `FluentProviderState` +
  optional `nonce`; `FluentProviderContextValues` − `textDirection` (**breaking**, `_unstable`)
  - `styleTagNonce: string | undefined`; `useFluentProviderThemeStyleTag` options
    `rendererAttributes` → `nonce` (**breaking**, `@internal`).
- **react-tabster**: − `createCustomFocusIndicatorStyle`, − `createFocusOutlineStyle`,
  − `CreateCustomFocusIndicatorStyleOptions`, − `CreateFocusOutlineStyleOptions`,
  − `FocusOutlineOffset`, − `FocusOutlineStyleOptions` (**breaking**; rides the D16/D19 major).
- **react-positioning**: `GriffelStyle` → `PositioningStyleObject` in factory signatures
  (+ new exported type). Structurally loosened; external Griffel `makeStyles` spreads still
  type-check for objects, low-risk break called out in evaluation §6.
- **react-components (umbrella)**: − 2 runtime exports, − 2 types (tabster factories).

## 3. Test / gate results

- **jest**: react-provider 46/46 (7 suites) — includes 5 nonce-path tests (4 new: SSR nonce via
  prop, nested inheritance, nested override, no-leak/no-emission); react-tabster,
  react-positioning, react-portal-compat (10/10), react-alert (26/26), react-infobutton all
  green (`nx run-many -t test` for the 6 projects: success).
- **type-check + lint**: green for react-provider, react-tabster, react-positioning,
  react-portal-compat, react-components, react-alert, react-infobutton (no new warnings).
- **SSR gate**: `ssr-tests-v9:test-ssr` full run green (esbuild bundle → renderToString →
  puppeteer hydration, "Test finished successfully"); `scripts-test-ssr:test` 12/12 (4 suites,
  9 snapshots).
- **VR**: fresh `--skip-nx-cache` `vr-tests-react-components:build-storybook` (zero
  cache-replay lines, bundle mtimes verified fresh); full sweep of ALL baseline sets in
  `validation/baseline/` at zero tolerance (calendar-compat at its adjudicated 26px ceiling)
  via a copy of the sweep driver writing to `.scratch/sg-sweep-results.json` (seeded
  `.scratch/sweep-results.json` untouched). **Result: see §5.**
- **RTL evidence**: the sweep's sets include RTL story shots (e.g. react-menu
  `basic.default - RTL`, react-avatar `basic - RTL`/`badgeMask - RTL`, AvatarGroup RTL
  layouts) — passing at zero tolerance proves direction handling survives the
  TextDirectionProvider removal.

## 4. Deferred to S-H / S-I (with reasons)

- Umbrella's 12 Griffel runtime re-exports + 3 types + `wyw-in-js` block + `@griffel/react`
  dep — D19/S-H (the deliberate consumer break).
- `@fluentui/react-conformance-griffel` retirement — D23/S-H (same major).
- `@griffel` babel preset / eslint rules / remaining root devDeps — S-H.
- `react-migration-v0-v9` mixins' `GriffelStyle` usage — migration-shim package whose purpose
  is emitting Griffel for v0 consumers; disposition per specials triage, not S-G scope.
- Repo-wide `jest.preset.js` `@griffel/jest-serializer` + remaining per-package serializer
  entries — S-I sweep (S-G removed only the three entries in packages it made Griffel-free).
- ~216 provenance comments — S-I.

## 5. VR sweep totals

**73/73 baseline sets PASS — 4654 screenshots, zero diffs, zero flaky retries.**

- Fresh `vr-tests-react-components:build-storybook --skip-nx-cache` (exit 0, zero
  cache-replay lines; bundle mtimes verified fresh before capture; capture.mjs staleness
  guard active on every set).
- Zero tolerance everywhere; `react-calendar-compat` ran under its adjudicated 26px ceiling
  but needed none of it this run (8 pairs, 8 clean, 0 failed).
- No set required the driver's one-recapture flake retry (`flakyFirstAttempt`: none).
- Results: `.scratch/sg-sweep-results.json` (driver copy `.scratch/sg-sweep-driver.mjs`);
  the seeded `.scratch/sweep-results.json` was not touched (mtime 2026-07-30 15:07,
  pre-sweep). Log: `.scratch/sg-sweep.log`. The driver was killed externally once
  mid-`react-spinbutton` (57 sets recorded, all passed) and resumed from the results file;
  remaining 16 sets completed on the second run — every set's verdict is from this
  session's fresh build.
- **RTL evidence**: `react-menu` (22 RTL shots, e.g. `basic.default - RTL`) and
  `react-avatar` (6 RTL shots, e.g. `badgeMask - RTL`) both pass at zero tolerance —
  direction handling survives the TextDirectionProvider removal.
