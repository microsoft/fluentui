# Post-campaign audit — fluentui-system-icons fork (headless promotion)

Audit date: 2026-08-04. Repo: `C:/Users/ArrayKnight/Code/fluentui-system-icons`, branch `main`.
Range audited: `7f1e931e2e..d435375837` (14 commits; upstream base `7f1e931e2e` = last upstream PR commit).
Range totals: 108 files, +3414/−3512 (excl. yarn.lock churn from Griffel removal: −1368 lock lines).
Mandate: "validate that the changes are as simple as they can possibly be, that your implementation is consistent."
Constraint honored (mid-audit directive): VR is the pixel gate — only render-inert-by-construction fixes committed; anything touching shipped CSS/runtime is report-only.

## Verdict

**Pass.** No leftover scaffolding, no debug artifacts, no committed binaries, no orphaned code, no unnecessary churn found. One cleanup commit of stale comments/prose was added (`f677e69de4`, render-inert). The two known dead eslint `griffel({...})` blocks remain — the config-protection hook still blocks both edits (attempted once each, both refused).

## Per-commit verdicts

| #   | Commit       | Subject                                                            | Verdict                                                                                                                                                                                                                                                                                                                                                                                         |
| --- | ------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `dbb3aed907` | feat(react-icons): add wrapIcon to the headless API                | Clean. Fills the one API hole before promotion; message documents why no styling work is needed.                                                                                                                                                                                                                                                                                                |
| 2   | `9ef27802ff` | feat(react-icons): generate headless SVG sprite atoms              | Clean. 2 files; activates already-exported-but-never-generated paths.                                                                                                                                                                                                                                                                                                                           |
| 3   | `b95953793c` | feat(webpack-plugin): subset headless SVG sprite entrypoints       | Clean. Pattern-match extension + failing-first fixture.                                                                                                                                                                                                                                                                                                                                         |
| 4   | `a1abc53493` | docs: headless sprites, wrapIcon, unlayered stylesheet             | Clean. The unlayered-CSS caveat is documented honestly.                                                                                                                                                                                                                                                                                                                                         |
| 5   | `b6176ea60e` | test: prove headless/standard API parity                           | Clean. Three suites, each proving a distinct axis (exports/arity, DOM+computed styles, published output) — not the same thing 3 ways.                                                                                                                                                                                                                                                           |
| 6   | `236af7d7f7` | test: pair every headless bundle-size fixture with a standard twin | Clean. Fixture `console.log(Icon)` calls are the standard monosize tree-shake anchor, not debris.                                                                                                                                                                                                                                                                                               |
| 7   | `f53a63ca45` | docs: record the headless parity evidence                          | Clean. `docs/headless-parity.md` (257 lines) — evidence record, table-driven, suite-backed.                                                                                                                                                                                                                                                                                                     |
| 8   | `9679d24fb6` | feat(react-icons)!: promote headless to default                    | Clean. The promotion itself. Parity suites become contract suites (`src/parity/` → `src/contract/`, `build-verify-parity` → `build-verify-contract`) — renamed, not duplicated. 9 now-duplicate fixtures retired. `.babelrc` deletion orphaned nothing (`{"compact": false}`, no babel deps in package). BREAKING CHANGE footer states the CSS-import requirement and the cascade-layer caveat. |
| 9   | `76fa48b728` | docs: rewrite bundle-size guidance against fixtures                | Clean.                                                                                                                                                                                                                                                                                                                                                                                          |
| 10  | `bc38b98892` | feat(react-icons-file-type)!: promote headless to default          | Clean. Same collapse pattern as #8, proportionally smaller.                                                                                                                                                                                                                                                                                                                                     |
| 11  | `e443bfc13e` | chore: remove the last first-party Griffel dependencies            | Clean. Message documents 3 things "found by sweeping rather than a failing gate" (sprite-plugin mock rot, icon-app missing stylesheet, docsite preview import) and why `@griffel/eslint-plugin` deliberately stays (docsite authors Griffel in 15 files via published react-components). `assertNoGriffel` guard deliberately retained with rationale.                                          |
| 12  | `3550c4fdfa` | docs(react-icons): styling contract as default                     | Clean.                                                                                                                                                                                                                                                                                                                                                                                          |
| 13  | `9d75dc5972` | docs(docsite): styling contract as default                         | Clean. `Headless/` stories → `Styling/`; R068 rename tracked.                                                                                                                                                                                                                                                                                                                                   |
| 14  | `d435375837` | chore: declare style-loader at the root                            | Clean and justified: 3 first-party usage sites (both monosize configs, icon-app webpack config).                                                                                                                                                                                                                                                                                                |

Commit messages are upstream-quality throughout — commit 8 and 11's messages in particular explain intent, evidence, and deliberate non-changes.

## Simplicity / consistency findings

- **Shim files are minimal.** All four `./headless*` shims (`react-icons/src/headless/{index,utils,fonts/index}.ts`, `react-icons-file-type/src/headless/index.ts`) are pure re-export blocks with `@deprecated` one-release notices. No duplicate implementation survives: `build-verify.test.js` negatively asserts `lib/headless/{shared.js,createFluentIcon.js,styles.css}` do **not** ship, and that `atoms/headless-*` directories are no longer emitted.
- **No dead code from the 25 deletions.** Grep for every deleted module name across `packages/`, `.github/`, `docs/` found only: (a) negative assertions in build-verify (intentional), (b) the superseded-and-labeled `headless-parity.md` evidence doc, (c) stale comments — fixed in `f677e69de4` (below). `headless-util-factory.js` (deleted test mock): zero references.
- **Parity suites proportionate.** Post-promotion there is one contract suite per axis: `src/contract/entrypoint-api.test.ts` (API surface), `src/contract/rendered-styles.test.tsx` (computed styles in Chromium, with an unclaimed `<svg>` as the negative control replacing the deleted implementation), `build-verify-contract.test.js` (published exports/aliases). No triple-testing.
- **Terminology consistent.** "Styling contract" is the name throughout docs; "headless" survives only in deprecation notes, the historical parity report (which opens with an explicit "Status: superseded" preamble), and the atomic-loader's still-real `headless` option (other packages — react-brand-icons — genuinely ship two builds; the option is documented as deprecated for react-icons specifically). One straggler found and fixed: `docs/build-transforms.md` (see below).
- **Observation (no action):** `src/core/useBaseIconState.ts` and `file-type/src/common/useFileTypeIcon.tsx` are single-consumer "shared core" layers whose second consumer was deleted. A maintainer could ask to collapse them; that is a runtime restructure (VR-gated), so report-only. Defensible as-is: `useBaseIconState` is shared across the SVG/sprite/font factories, and `useFileTypeIcon` is the Fluent v9 state-hook pattern.

## Package hygiene

- `@fluentui/react-icons` version **2.0.334** (unchanged from upstream base — release-workflow constraint honored). `react-icons-file-type` **0.0.1** (unchanged).
- Dependencies: both packages now `{"tslib": "^2.1.0"}` only — `@griffel/react ^1.6.1` removed from both. No new runtime deps anywhere. Root adds devDep `style-loader@3.3.4` (3 usage sites, justified). Root `resolutions` pin on `@griffel/*` removed with a rewritten `docs/single-version-policy.md` explaining both expiry reasons.
- `sideEffects: ["**/*.css"]` in both packages — covers `styles.css` and `fonts/styles.css`; asserted by a dedicated build-verify test.
- Export maps coherent: every `./headless*` subpath resolves to the same files as its default counterpart (asserted by `build-verify-contract.test.js:39-60`, incl. `./styles.css → ./lib/styles.css` and `./fonts/styles.css → ./lib/utils/fonts/styles.css` existence + content equality with `src/styles.css`). All targets live under `lib/`/`lib-cjs/`, both in the `files` allowlist. No upstream subpath was dropped (18 upstream keys, all present; +`./styles.css`, `./fonts/styles.css` added).
- `.gitignore` change in the range is a 2-line un-ignore for the authored `src/utils/fonts/styles.css` with a comment — correct and necessary.

## Repo hygiene

- **No binaries in any of the 14 commits** (`git diff --numstat` has zero binary entries; largest new file is the 579-line contract test). The packed tarball `packages/react-icons/fluentui-react-icons-local.tgz` was untracked but **unignored** — now added to `.git/info/exclude` (local-only; cannot enter the upstream diff).
- `graphify-out/` + `.graphify*`: still in `.git/info/exclude`, still untracked. Not committed.
- Working tree at audit start had a line-ending-only `metadata.json` modification (`git diff --numstat` empty — zero content change); restored via `git checkout --`. Tree now clean.
- Commitlint/prettier hooks ran green on the new commit.

## Eslint-edit outcome (the 2 known hook-blocked edits)

Attempted both, per instructions:

- `packages/react-icons/eslint.config.mjs` — Edit **BLOCKED** by the ECC config-protection hook ("Modifying eslint.config.mjs is not allowed").
- `packages/react-icons-file-type/eslint.config.mjs` — Edit **BLOCKED**, same hook.

The blocks are confirmed dead: zero `makeStyles`/`@griffel` usage remains in either package's `src/` or `scripts/` (grep-proven), and both packages' `*.styles.ts` files are gone. `packages/docsite/eslint.config.mjs`'s griffel block must **stay** (docsite authors Griffel styles in stories via published `@fluentui/react-components`), which is also why `@griffel/eslint-plugin` and the `griffel()` base helper survive at the root. **Remaining action for the user:** temporarily disable the config-protection hook and remove the two dead `griffel({...})` blocks + the now-unused `griffel` import in those two files (docsite untouched).

## Findings fixed vs reported

**Fixed — commit `f677e69de4` in the icons repo (`docs: retire stale pre-promotion references in comments and guides`), all render-inert by construction (comments and doc prose only; no statement, selector, export, or test change; shipped CSS untouched):**

1. `packages/react-icons/docs/build-transforms.md` — still taught `/headless/svg/*` deep paths and `headless: true` as a live distinct "Headless API" with no deprecation note (this doc ships via the `files` allowlist). Now labeled as deprecated aliases.
2. `packages/react-icons-file-type/src/common/useFileTypeIcon.tsx` — three stale comments: "opt-in `.../headless/styles.css`… harmless for the default (Griffel-styled) entry point", "shared core used by both the headless and the Griffel-styled components", and a cite of the deleted `useFileTypeIconStyles` hook.
3. `packages/react-icons/src/core/useBaseIconState.ts` — "shared by the Griffel and headless APIs" (Griffel API deleted).
4. `packages/react-icons/scripts/copy-base-fonts.js` — comment pointed font binaries at deleted `createFluentFontIcon.styles.ts`; the `@font-face` rules live in `src/utils/fonts/styles.css`.
5. `.github/workflows/pr.yml` — Playwright-install comment referenced pre-rename `src/parity/render-parity.test.tsx` and the two-API comparison (CI comment; the workflow edit was not hook-blocked).

Stale copies of these comments persist only in `lib/`/`lib-cjs/` build output (gitignored, regenerated from fixed source on next build).

**Reported only (no change):**

- The two dead eslint `griffel({...})` blocks (hook-blocked; see above).
- Single-consumer core-layer observation (runtime restructure, VR-gated).
- Icons-repo graphify graph was stale during the audit (still indexed deleted files); `graphify update .` kicked off at audit end.

## Commit hashes

- **Icons repo** (`fluentui-system-icons`, branch `main`): `f677e69de4` — stale-reference cleanup (5 files, +13/−16). HEAD is now `f677e69de4`, 15 ahead of upstream base. Not pushed.
- **Fluentui repo** (`fluentui`, branch `styling/tailwind-css-modules`): this report's commit — see git log. Not pushed.
