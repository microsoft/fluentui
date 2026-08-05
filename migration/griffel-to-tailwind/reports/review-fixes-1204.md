# Review-fix verification: microsoft/fluentui-system-icons PR #1204

External review doc: `C:/Users/ArrayKnight/Code/fluentui-system-icons-pr-1204-review.md` (reviewed head `f677e69de4`).
Work performed on branch `main` of `C:/Users/ArrayKnight/Code/fluentui-system-icons`; fix commit `5c3e817823` (not pushed).

## Item 1 — "Normal builds never generate advertised SVG-sprite entrypoints" (MEDIUM)

**Verdict: NOT CONFIRMED as a defect — pre-existing, intentional opt-in alpha design. No change made.**

The reviewer's mechanics are correct but the conclusion is wrong: nothing in a normal
build _advertises_ sprites, so nothing is broken.

Evidence:

- The gate is real: `scripts/convert.js:286-287` sets `SPRITE_DEST` only when
  `--sprites` is truthy, and `package.json:19` (`convert:svg`) passes `--spriteDest`
  without `--sprites`. Confirmed no caller anywhere in the repo passes `--sprites`.
- **Pre-existing upstream, unchanged by the PR**: at the PR base (`c0cf403abf`,
  "migrate the repo to yarn 4 (#1189)"), `convert.js:306-307` has the identical
  `SPRITES_ENABLED = Boolean(args.sprites)` gate and `convert:svg` likewise passes
  `--spriteDest` without `--sprites`.
- **The export map does not advertise `./svg-sprite/*` in normal builds.** The
  committed `package.json` has no `./svg-sprite/*` entry; `scripts/build.js`
  (`addSpriteExportMap`, lines 85-112) adds it dynamically _only when_
  `src/atoms/svg-sprite` exists, with an explicit NOTE that it becomes static
  "once svg-sprite is stable". Same mechanism existed pre-PR (base `build.js:164-181`).
- **Docs advertise it as alpha/prerelease-only**: `docs/preview-features/svg-sprites.md`
  opens with "⚠️ Alpha — available as an alpha prerelease only. Install via
  `npm i @fluentui/react-icons@prerelease`".
- **build-verify accounts for both modes** — it does not assert sprite existence in
  normal builds: `build-verify.test.js:1988-1990` skips the entire sprite suite when
  `lib/atoms/svg-sprite` is absent (the "8 skipped" in every run), and
  `build-verify-contract.test.js:95-104` asserts the `./headless/svg-sprite/*` alias
  must NOT exist when the target is absent. Baseline run on the untouched tree:
  4 files, **140 passed | 8 skipped**.
- Last full build output (7/31) confirms: `lib/atoms/` contains `fonts` and `svg`
  only — no sprite atoms, consistent with the above.
- **Scoped gate-proof** (37 SVGs — access-time/add/add-circle incl. color variants —
  copied to `fluentui/.scratch/pr1204/`, `convert.js` run twice with identical inputs):
  - without `--sprites`: "sprites disabled", sprite dir not created;
  - with `--sprites`: "3 sprite pair(s)" written (`access-time.svg/.tsx`,
    `add.svg/.tsx`, `add-circle.svg/.tsx`).
    The sprite pipeline is functional when enabled; the prerelease flow is what enables it.

No fix applied: adding `--sprites` to the normal build would _change_ the published
surface of stable releases (ship alpha entrypoints), contradicting the documented
alpha status; asserting sprite existence in build-verify would break every normal build.

## Item 2 — "Root barrel exports cx/constants the atomic-import transform can't resolve" (MEDIUM)

**Verdict: CONFIRMED (partially new in the PR, partially pre-existing). Fixed in `5c3e817823`.**

Evidence:

- Generated root barrel (`scripts/convert.js:126-136` → `src/index.tsx`) exports
  `cx` (new in this PR) plus `export * from './utils/constants'`, and the PR grew
  `constants.tsx` with `DATA_FUI_ICON_RTL`, `DATA_FUI_ICON_HIDDEN`,
  `DATA_FUI_ICON_FONT` (new). `fontIconClassName` and `DATA_FUI_ICON` were already
  root-exported at the PR base while missing from `/utils` — that half of the gap is
  a pre-existing upstream defect the PR inherited.
- All three documented transform flavors route every non-icon, non-provider root
  import to `@fluentui/react-icons/utils`: `fluent-icons-transform.js:60-63`
  (Babel/SWC snippet source of truth) and
  `react-icons-atomic-webpack-loader/src/modules.ts:88-90`.
- `src/utils.ts` exported only the 4 factories + 5 `icon*ClassName` constants.
- **Constructed failing consumer case** (`fluentui/.scratch/pr1204/consumer-transform-proof.js`:
  applies `resolveFluentIconImport` to each named import of a consumer file, resolves
  the rewritten specifier against the built `lib-cjs` output, checks binding presence).
  Pre-fix: **6 unresolvable** — `cx`, `fontIconClassName`, `DATA_FUI_ICON`,
  `DATA_FUI_ICON_RTL`, `DATA_FUI_ICON_HIDDEN`, `DATA_FUI_ICON_FONT`.

Fix (additive, root exports kept — consumer semantics identical):

- `src/utils.ts`: re-export `cx` and the six missing constants. `./headless/utils`
  follows automatically (`export * from '../utils'`), and the existing alias-identity
  tests keep it honest.
- `src/contract/entrypoint-api.test.ts`: pinned `/utils` surface extended with the new
  bindings; new test asserts `/utils` stays a **superset** of the root barrel's
  utility exports (enumerated independently of `/utils` itself).
- `build-transforms.test.js`: 14 new cases — every root utility binding (factories,
  class names, cx, DATA\_\* constants) resolves to `@fluentui/react-icons/utils`.
- `build-verify-contract.test.js`: new published-surface check — built `utils.d.ts`
  re-exports every root barrel utility binding (regression guard at the artifact level).

## Gate results (all on `5c3e817823`)

| Gate                                                     | Result                                         |
| -------------------------------------------------------- | ---------------------------------------------- | --------------------------- | ---------------------- |
| `vitest run src` (unit + contract, incl. entrypoint-api) | 4 files, 93 passed                             |
| `build-transforms.test.js`                               | 86 passed (was 72)                             |
| `yarn build:js` (full tsc rebuild, lib + lib-cjs)        | exit 0                                         |
| Consumer transform proof vs built output                 | PASS — all 11 imports resolve (was 6 failures) |
| `yarn build-verify`                                      | 4 files, \*\*155 passed                        | 8 skipped\*\* (baseline 140 | 8; +15 new assertions) |
| `yarn lint` (package) / `yarn type-check:infra`          | clean                                          |
| Working tree after commit                                | clean                                          |

The 8 skips are the sprite suite, by design (see Item 1).

No fluentui-side VR integration gates were re-run: the change is additive to the
`/utils` entrypoint and touches no rendering path, stylesheet, or icon output.

## Commits

- `fluentui-system-icons` @ `main`: `5c3e817823`
  `fix(react-icons): re-export cx and data-attribute constants from /utils` (not pushed)
- Head before fix: `f677e69de4` (matches review doc)
