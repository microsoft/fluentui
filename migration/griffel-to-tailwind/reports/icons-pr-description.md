# Upstream PR body — `microsoft/fluentui-system-icons`

> **Where this lives and why.** `PR_DESCRIPTION.md` at the icons repo root is **not** gitignored
> (`git check-ignore -v PR_DESCRIPTION.md` → exit 1), so writing it there would put a
> process artifact into the upstream diff. It lives here instead. Copy the body below into the
> PR description; nothing in it needs to be committed to the icons repo.

**Suggested PR title** (validated by CI against Conventional Commits):

```
feat(react-icons)!: promote the headless API to the package default
```

---

## Remove Griffel: make the headless implementation the only one

### Motivation

`packages/react-icons/scripts/build.js` has carried this note for a long time:

> `NOTE: will be part of package.json once headless is stable. then we can remove this dynamic
addition and the related build logic that copies headless assets.`

This PR is that removal. It is not a new design — the headless implementation was already
complete, already shipped behind `./headless*`, already documented, already covered by tests and
by four `monosize` fixtures, and the atomic webpack loader already had a `headless: boolean`
option for it. What was missing was the decision to stop shipping two implementations of the
same six CSS rules.

Three things follow from making it the default:

1. **`@griffel/react` leaves `dependencies` in both publishable packages**, and the whole
   `@griffel/*` tooling chain (`babel-preset`, `webpack-loader`, `webpack-extraction-plugin`)
   leaves the root `devDependencies`. Consumers stop installing a CSS-in-JS runtime to render an
   SVG.
2. **`docs/single-version-policy.md`'s install-time override is retired.** That document pinned
   `@griffel/core` / `@griffel/react` for the whole repo and closed with _"Remove these overrides
   once the packages move off TypeScript 4.1.6 and the bundle cost has been re-measured."_ Both
   stated reasons expire at once here, in the stronger form of there being no Griffel left to pin.
   The `typescript@4.1.6` allowlist entry stays — it is about the declarations `react-icons`
   _emits_ for legacy consumers, a separate contract — but it no longer constrains a dependency.
3. **Server and client markup become identical.** Nothing is inserted at runtime, so there is no
   `<style>` ordering to reason about, no hydration step and no CSP nonce to thread through.

### Commit walk

Fourteen commits, in dependency order. Each stage is independently green against `pr.yml`'s gate
set; the sequence is meaningful (nothing is promoted before its parity evidence exists).

**Close the headless gaps** — a default API cannot have holes an alternate entrypoint was allowed
to have.

| commit       | what                                                                                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dbb3aed907` | `feat(react-icons): add wrapIcon to the headless API` — it was documented as "accepted breakage"; not acceptable for a default                                       |
| `9ef27802ff` | `feat(react-icons): generate headless SVG sprite atoms with the standard ones` — sprites were one of three advertised rendering approaches and had no headless build |
| `b95953793c` | `feat(webpack-plugin): subset headless SVG sprite entrypoints`                                                                                                       |
| `a1abc53493` | `docs(react-icons): document headless sprites, wrapIcon and the unlayered stylesheet`                                                                                |

**Prove equivalence before promoting** — the promotion is only defensible if the two APIs are
demonstrably interchangeable, and the places they are not are written down.

| commit       | what                                                                                                                                                                                      |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `b6176ea60e` | `test(react-icons): prove headless/standard API parity` — export names, runtime shapes, constant values, context identity, DOM diff, computed styles in Chromium, RTL, override behaviour |
| `236af7d7f7` | `test(react-icons): pair every headless bundle-size fixture with a standard twin`                                                                                                         |
| `f53a63ca45` | `docs(react-icons): record the headless parity evidence` → `packages/react-icons/docs/headless-parity.md`                                                                                 |

**Promote.**

| commit       | what                                                                                                                                                                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `9679d24fb6` | `feat(react-icons)!: promote the headless API to the package default` — `.`, `./svg`, `./svg/*`, `./fonts`, `./fonts/*`, `./utils` now serve the attribute-driven implementation; the CSS-in-JS one is deleted; `./headless*` becomes a deprecated alias |
| `76fa48b728` | `docs(react-icons): rewrite the bundle-size guidance against the fixtures` — the old guidance's conclusion was "prefer the Griffel variant", which cannot survive Griffel's deletion                                                                     |
| `bc38b98892` | `feat(react-icons-file-type)!: promote the headless API to the package default`                                                                                                                                                                          |

**Purge and document.**

| commit       | what                                                                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `e443bfc13e` | `chore: remove the last first-party Griffel dependencies` — both packages' `dependencies`, four root devDeps, the `resolutions` pin, `icon-app`'s two `makeStyles` files |
| `3550c4fdfa` | `docs(react-icons): describe the styling contract as the default, not an alternative` — `README.md`, `docs/headless.md`, the API contract                                |
| `9d75dc5972` | `docs(docsite): teach the styling contract as the default, not an alternative` — ten pages; `Icons/Headless API` becomes `Icons/Styling`                                 |
| `d435375837` | `chore: declare style-loader at the root` — used by three webpack configs, previously resolved only by hoisting                                                          |

### Breaking changes

#### 1. A stylesheet import is now required

This is the one that matters. It **fails silently and application-wide**.

```js
import '@fluentui/react-icons/styles.css';
// …and additionally, if you use the font icons:
import '@fluentui/react-icons/fonts/styles.css';

// for @fluentui/react-icons-file-type:
import '@fluentui/react-icons-file-type/styles.css';
```

Without it every icon loses `display`, the RTL flip and the high-contrast handling — and a
`bundleIcon` pair renders **both** variants at once. Nothing throws. It type-checks, compiles and
ships.

The stylesheet is **unlayered**, deliberately. Cascade layers are compared _before_ specificity, so
a layered rule of yours loses to an unlayered rule here no matter how specific it is —
`[data-fui-icon-hidden]` in particular is not `:where()`-wrapped, because it has to beat the base
rule. Applications organising CSS with `@layer` must assign the stylesheet a layer at import time:

```css
@import '@fluentui/react-icons/styles.css' layer(your-base-layer);
```

Shipping the layer inside the package would impose a layer name on the whole ecosystem, so the file
stays unlayered and the obligation is documented instead. This is called out in `README.md`,
`docs/headless.md`, the CHANGELOG and the docsite's `Icons/Styling` page.

#### 2. `./headless*` subpaths are deprecated aliases

Kept for one release as aliases of the default entrypoints — the very same modules and files — so
existing headless adopters upgrade without a code change. `src/contract/entrypoint-api.test.ts`
asserts the alias forwards binding for binding and fails on any _new_ `./headless` subpath.

| Deprecated                                            | Use                                          |
| ----------------------------------------------------- | -------------------------------------------- |
| `@fluentui/react-icons/headless`                      | `@fluentui/react-icons`                      |
| `@fluentui/react-icons/headless/utils`                | `@fluentui/react-icons/utils`                |
| `@fluentui/react-icons/headless/svg/*`                | `@fluentui/react-icons/svg/*`                |
| `@fluentui/react-icons/headless/svg-sprite/*`         | `@fluentui/react-icons/svg-sprite/*`         |
| `@fluentui/react-icons/headless/fonts`                | `@fluentui/react-icons/fonts`                |
| `@fluentui/react-icons/headless/fonts/*`              | `@fluentui/react-icons/fonts/*`              |
| `@fluentui/react-icons/headless/styles.css`           | `@fluentui/react-icons/styles.css`           |
| `@fluentui/react-icons/headless/fonts/styles.css`     | `@fluentui/react-icons/fonts/styles.css`     |
| `@fluentui/react-icons-file-type/headless`            | `@fluentui/react-icons-file-type`            |
| `@fluentui/react-icons-file-type/headless/styles.css` | `@fluentui/react-icons-file-type/styles.css` |

The atomic webpack loader's `headless: true` option is likewise deprecated **for these packages** —
it now only selects which spelling of the same modules gets emitted. It remains meaningful for
modules that still ship two builds, such as `@fluentui/react-brand-icons`.

#### 3. Class-attribute changes

- **`wrapIcon` no longer emits a `class` attribute** when the caller passes no `className`. Every
  other factory contributes a `fui-*` contract class, so `class` survives there; `wrapIcon`
  contributes none and there are no generated class names left to fill it. Code doing
  `element.className.split(' ')` on a wrapped icon is the one pattern this breaks.
- **`FileTypeIcon` no longer emits generated class names.** `class` is now exactly what the caller
  passed in `className`, and the attribute is absent entirely when no `className` is given.

The `fui-Icon`, `fui-Icon-filled`, `fui-Icon-regular`, `fui-Icon-light`, `fui-Icon-color` and
`fui-Icon-font` class names are **unchanged** and remain the supported targeting contract.

#### 4. Generation flags

The `--headless` flags on `convert.js` / `convert-font.js` are gone, and the duplicated
`atoms/headless-*` directories are no longer published. The default atoms _are_ the headless atoms.

### Versioning: this needs a major, and an amendment to the contract that says so

`packages/docsite/stories/Icons/IconsAPIContract.mdx` (and its copy in `README.md`) sanctioned
exactly two non-major breaking changes — icon removal and icon renaming — and justified them with:

> _"a failing build pipeline is preferable to silently shipping invalid UI with blank icons"_

A styling-mechanism change is the case that principle does not cover, because it **cannot fail a
build**. So the version number has to carry the warning the compiler cannot. Both documents now
name a third category:

> A change to **how** icons are styled — the required stylesheet, the attribute or class contract
> it targets, or its layering — takes a **major version bump**.

That amendment is written down in this PR because this PR is the change that makes it necessary,
not after someone else makes it.

**Requested release: `@fluentui/react-icons@3.0.0`.**

`packages/react-icons/package.json` is deliberately **left at `2.0.334`** in this PR.
`docs/releases.md` states the React packages' version is _"parsed from
packages/react-icons/package.json and auto-incremented patch version"_, so hand-editing the version
here would either be overwritten or produce `3.0.1`. Choosing the number and adjusting the publish
workflow is a maintainer action; this PR's job is to make the case for it and to make sure the
contract document backs it up. **Please do not release this on the normal patch cadence.**

`@fluentui/react-icons-file-type` is at `0.0.1` and is not in either `publish.yml` package list, so
its breaking changes carry no semver obligation yet.

### Parity evidence

`packages/react-icons/docs/headless-parity.md` is the report the promotion rested on. It is marked
superseded (the two APIs it compares no longer coexist) and kept as evidence. Its claims are
produced by checked-in suites, so they stay true or the build goes red:

| suite                                   | target         | proves                                                           |
| --------------------------------------- | -------------- | ---------------------------------------------------------------- |
| `src/contract/entrypoint-api.test.ts`   | `test`         | export names, runtime shapes, constant values, context identity  |
| `src/contract/rendered-styles.test.tsx` | `test`         | DOM diff, computed styles in Chromium, RTL, override behaviour   |
| `build-verify-contract.test.js`         | `build-verify` | published `exports` map, emitted `.d.ts` signatures, shipped CSS |
| `bundle-size/*.fixture.js`              | `bundle-size`  | per-entrypoint cost, in both webpack CSS modes                   |

Verdict summary: API surface PASS (headless is a strict superset — 4 additional value exports);
DOM output PASS with one class of difference (generated class names vs data attributes; the `fui-*`
contract is byte-identical); computed styles PASS with one recorded difference; RTL PASS; bundle
PASS under CSS extraction, REGRESSES under `style-loader` — see below.

One behaviour **improved** and is worth flagging as a fix rather than a break: `wrapIcon` now gets
the high-contrast handling. The removed implementation scoped `forced-color-adjust: auto` to the two
factories that called `useRootStyles()`, so a wrapped custom SVG kept Chromium's forced-colors
default of `preserve-parent-color`. The stylesheet targets `[data-fui-icon]`, which `wrapIcon` also
sets. Verified in Chromium by `src/contract/rendered-styles.test.tsx`.

### Bundle size — both modes, including the one where this is a regression

Measured on this repository's own `monosize` fixtures, which run in CI against a 1 kB absolute
per-fixture threshold. `before` is the last build with the CSS-in-JS implementation.

**With CSS extraction — everything drops.**

| Fixture                 |   Before |    After |        Δ Minified |            Δ GZIP |
| ----------------------- | -------: | -------: | ----------------: | ----------------: |
| `Atomic Fonts`          |  4,574 B |  1,149 B | −3,425 B (−74.9%) | −1,568 B (−70.9%) |
| `Atomic Imports`        |  5,641 B |  2,353 B | −3,288 B (−58.3%) | −1,458 B (−52.4%) |
| `Bundle Icon`           |  6,428 B |  3,091 B | −3,337 B (−51.9%) | −1,484 B (−47.9%) |
| `Dynamic - Bundle Icon` |  4,272 B |  3,074 B | −1,198 B (−28.0%) |   −437 B (−21.7%) |
| `35 Icons`              | 18,331 B | 15,031 B | −3,300 B (−18.0%) | −1,609 B (−22.3%) |
| `Provider`              |    728 B |    728 B |                 — |                 — |

The absolute saving is roughly constant at ~3.2–3.4 kB because what was removed is a **fixed
runtime**, not a per-icon cost. It reads as −74.9% against a font atom and −18.0% against 35 inline
SVG icons, but it is the same ~3.3 kB in both. `Provider` renders no icon and never touched the
styling runtime.

The extracted CSS is not counted above (monosize reports `Asset types: js`). Measured directly,
`styles.css` is 2,173 B raw / 950 B gzip and `fonts/styles.css` is 1,526 B / 441 B. Add them back
and the 35-icon case is still ahead by 1,127 B minified.

**Without CSS extraction (`style-loader`, webpack's default) — this is a regression, and it is not
limited to font icons.** `before` needed no stylesheet import; `after` is the corresponding `+ CSS`
fixture, because an icon without its stylesheet is not a working icon.

| Fixture                    |   Before |    After |        Δ Minified |            Δ GZIP |
| -------------------------- | -------: | -------: | ----------------: | ----------------: |
| `Atomic Imports` → `+ CSS` |  7,479 B |  8,984 B | +1,505 B (+20.1%) |   +612 B (+17.8%) |
| `Atomic Fonts` → `+ CSS`   |  8,332 B | 11,240 B | +2,908 B (+34.9%) | +1,056 B (+29.2%) |
| `35 Icons` → `+ CSS`       | 20,193 B | 21,676 B |  +1,483 B (+7.3%) |    +631 B (+8.0%) |

Isolating the stylesheet import by subtracting each bare fixture from its `+ CSS` twin:

| Stylesheet import                                                         | Cost under `style-loader` |
| ------------------------------------------------------------------------- | ------------------------: |
| `styles.css`, 1 icon (`Atomic Imports + CSS` − `Atomic Imports`)          |                   6,631 B |
| `styles.css`, 35 icons (`35 Icons + CSS` − `35 Icons`)                    |                   6,645 B |
| `styles.css` + `fonts/styles.css` (`Atomic Fonts + CSS` − `Atomic Fonts`) |                  10,091 B |

6,631 B versus 6,645 B is the whole argument: **the cost is fixed at ~6.6 kB per application, not
per icon.** Two consequences, pointing in opposite directions:

- It is **shared.** An application that already imports any `.css` anywhere has paid the loader
  runtime already; the icon stylesheets then add only their own text. Such an application is
  _smaller_ after this PR even without extraction (`Atomic Imports`, style-loader: 7,479 B →
  2,353 B, with ~2.2 kB of CSS text replacing a ~5.1 kB runtime).
- It is **unavoidable for a `style-loader`-only application whose sole CSS is the icons'.** That
  population pays +1.5 kB (SVG) or +2.9 kB (fonts) in full. There is no remedy in the package; the
  documentation now says "enable CSS extraction" instead of the old "prefer the Griffel variant",
  because the thing it used to recommend no longer exists.

`@fluentui/react-icons-file-type` gets smaller in **both** modes, which is worth stating because
its sibling does not — its fixture never ran the AOT transform, so its `style-loader` baseline
carried the full CSS-in-JS runtime rather than a pre-resolved one:

| `FileTypeIcon` fixture, minified | before   | after    |                  Δ |
| -------------------------------- | -------- | -------- | -----------------: |
| CSS extracted                    | 8,119 B  | 4,744 B  |  −3,375 B (−41.6%) |
| CSS in bundle (`style-loader`)   | 33,202 B | 10,574 B | −22,628 B (−68.2%) |

Earlier guidance in `docs/bundle-size-rendering-approaches-comparison.md` read SVG inline as
break-even under `style-loader`. That came from a harness that is not in this repository and did not
reproduce against these fixtures; the fixtures supersede it and the document now says so.

### Two edits deliberately left for a maintainer

`packages/react-icons/eslint.config.mjs` and `packages/react-icons-file-type/eslint.config.mjs`
still register the Griffel ESLint rules for packages that no longer author Griffel styles. In each,
two edits:

1. drop `griffel` from the import on line 2;
2. delete the `griffel({ '@griffel/no-shorthands': 'error', '@griffel/styles-file': 'error' })`
   block (lines 22–25 in `react-icons`, lines 9–12 in `react-icons-file-type`).

Both rule sets are now unreachable — neither package has a `makeStyles` call site left. Removing
them is trivial and behaviour-neutral, but it is the kind of change that is better made by someone
with commit rights to the lint configuration than smuggled into a large PR.

**`@griffel/eslint-plugin` and the `griffel()` helper in `eslint.config.base.mjs` should stay.**
`packages/docsite` authors Griffel styles in 14 files because it is a Storybook site built on the
published `@fluentui/react-components`. That is also the only remaining install edge:
`yarn why @griffel/core` resolves entirely through `@fluentui/react-provider@9.22.18` and
`@griffel/react@1.7.6`, both pulled in by `@fluentui/react-components` — with **no first-party
`@griffel/*` runtime declaration anywhere in the repository.**

### Reviewer notes — two local environment issues, neither caused by this PR

Both reproduce on a clean checkout of `main` at `7f1e931e2e` (the last commit before this work) and
neither should appear on the Linux CI runners.

**1. `docsite:build` fails on Windows.**
`@fluentui/react-storybook-addon-export-to-sandbox@0.3.0`'s `getAddonOptions` locates its own preset
registration with a POSIX-only pattern:

```js
const addonFilePattern = /react-storybook-addon-export-to-sandbox\/[a-z/]+.[jt]s$/;
```

On Windows the resolved preset path uses backslashes, the match fails, `importMappings` never
reaches `@fluentui/babel-preset-storybook-full-source`, and its `modifyImports` plugin throws
`Object.keys(undefined)` — for 14 of the 19 `*.stories.tsx` files (the ones the full-source plugin
processes). Verified pre-existing: the identical 14 failures occur with `packages/docsite` checked
out at `7f1e931e2e`. Making the character class
separator-agnostic in `node_modules` produces a green build, which is how this PR's docsite changes
were validated — 26 entries, `icons-styling--docs` present, `icons-headless-api--docs` gone with no
dangling references. Nothing about this is committed; it is a third-party bug worth an upstream
issue against that addon.

**2. `EMFILE` on the SVG optimize step.**
`svg-icons`, `svg-sprites` and `react-native-icons` all run
`svgo --folder=./icons --recursive`, which reads ~21.5k files in a single `Promise.all` and exceeds
the Windows process file-handle limit. `svg-icons:build` was completed locally by driving svgo's JS
API over the same config and file set in chunks of 256 — same plugins, same `path` info, same
precision, only the concurrency differs — after which `svg-icons:build-verify` passes.
`svg-sprites` and `react-native-icons` remain blocked by it locally; both are **untouched by this
PR** (`git diff 7f1e931e2e..HEAD -- packages/react-native-icons packages/svg-sprites` is empty).

**3. `metadata.json` reorders on a rebuild outside CI's locale.**
`react-icons:build-verify` asserts `packages/react-icons/metadata.json` has no uncommitted changes
after a build. A local rebuild produces a 7,171-line reorder — `AccessTimeFilled` sorts before
`AccessibilityFilled` in the committed file (byte order: `T` < `i`) and after it locally
(case-folded: `i` < `T`). Verified pure ordering: the key set is identical (26,443 entries both
sides) and the objects are identical when compared order-insensitively. The committed file is the
CI ordering and is left untouched.

---

## Pre-push checklist

Run fresh on `main` at `d435375837`, after `yarn install`.

### Gate matrix

| gate                                   | scope                                                           | result                                                                          |
| -------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `yarn nx run-many -t lint`             | 8 projects incl. react-icons, file-type, all 3 plugins, docsite | ✅ pass                                                                         |
| `yarn nx run-many -t test`             | 6 projects + 6 dependency builds                                | ✅ pass                                                                         |
| `yarn nx run-many -t build`            | react-icons, file-type, all 3 plugins, icon-app, svg-icons      | ✅ pass                                                                         |
| `yarn nx run-many -t build`            | `react-native-icons`, `@fluentui/svg-sprites`                   | ⚠️ EMFILE (env; both untouched by the PR)                                       |
| `docsite:build`                        | storybook, 26 entries                                           | ⚠️ Windows addon bug; ✅ green with the separator fix applied to `node_modules` |
| `yarn nx run-many -t build-verify`     | svg-icons                                                       | ✅ pass                                                                         |
| `yarn nx run-many -t build-verify`     | react-icons                                                     | ⚠️ metadata.json locale reorder only (verified content-identical)               |
| `yarn nx run-many -t type-check:infra` | 3 projects                                                      | ✅ pass                                                                         |
| `yarn deps:check` (syncpack)           | single version policy — 90 valid, 0 mismatches                  | ✅ pass                                                                         |
| `yarn scripts:check`                   | 12 workspace manifests                                          | ✅ pass                                                                         |
| `yarn nx format:check`                 | whole repo                                                      | ✅ pass                                                                         |

Not run: `bundle-size` / `monosize compare-reports`, which needs a base-branch baseline artifact
from the GitHub API and is meaningful only once the PR is open. The numbers quoted above come from
the fixture runs recorded during the promotion commits.

### Commit stream

```
d435375837 chore: declare style-loader at the root
9d75dc5972 docs(docsite): teach the styling contract as the default, not an alternative
3550c4fdfa docs(react-icons): describe the styling contract as the default, not an alternative
e443bfc13e chore: remove the last first-party Griffel dependencies
bc38b98892 feat(react-icons-file-type)!: promote the headless API to the package default
76fa48b728 docs(react-icons): rewrite the bundle-size guidance against the fixtures
9679d24fb6 feat(react-icons)!: promote the headless API to the package default
f53a63ca45 docs(react-icons): record the headless parity evidence
236af7d7f7 test(react-icons): pair every headless bundle-size fixture with a standard twin
b6176ea60e test(react-icons): prove headless/standard API parity
a1abc53493 docs(react-icons): document headless sprites, wrapIcon and the unlayered stylesheet
b95953793c feat(webpack-plugin): subset headless SVG sprite entrypoints
9ef27802ff feat(react-icons): generate headless SVG sprite atoms with the standard ones
dbb3aed907 feat(react-icons): add wrapIcon to the headless API
```

Base: `7f1e931e2e chore(eslint-plugin-react-icons): prepare for release (#1194)`.

### Working tree

`git status --short` reports one untracked path, `graphify-out/` — a local knowledge-graph tool
artifact that predates this session, is **not** gitignored, and must not be committed. Remove it or
ignore it locally before `git add -A` is ever run in this repository.

### Fork / local-reference scan

```
git grep -n -i -E "arrayknight|C:[\\/]Users|griffel-to-tailwind|tailwind-css-modules|fluentui-fork|portal:|link:\.\.|file:\.\." -- . ':!*.lock'
```

→ **no matches.** No `resolutions` alias, no `portal:`/`link:`/`file:` dependency, no absolute path,
no reference to the fluentui fork or to the migration workstream anywhere in tracked files. Both
`package.json` `resolutions` blocks that existed for Griffel are gone; the only remaining root
`resolutions` entry is the pre-existing `@linaria/shaker/@babel/plugin-transform-runtime`.

### Remaining `@griffel` references (all intentional)

| file                                                                          |  count | why it stays                                                               |
| ----------------------------------------------------------------------------- | -----: | -------------------------------------------------------------------------- |
| `yarn.lock`                                                                   |     69 | transitive, via the docsite's `@fluentui/react-components`                 |
| `docs/single-version-policy.md`                                               |      5 | narrates the override's retirement                                         |
| `packages/docsite/eslint.config.mjs`                                          |      5 | the docsite genuinely authors Griffel styles                               |
| `eslint.config.base.mjs`                                                      |      2 | the `griffel()` helper the docsite uses                                    |
| `packages/react-icons/eslint.config.mjs`                                      |      2 | **dead — the maintainer edit above**                                       |
| `packages/react-icons-file-type/eslint.config.mjs`                            |      2 | **dead — the maintainer edit above**                                       |
| `package.json`                                                                |      1 | `@griffel/eslint-plugin`, for the docsite                                  |
| `.../react-icons-font-subsetting-webpack-plugin/test/webpack.config.js`       |      3 | the `assertNoGriffel` guard — kept precisely because it can no longer fire |
| `packages/react-icons/build-verify.test.js`, `build-verify-contract.test.js`  | 1 each | assertions that Griffel is absent from the published output                |
| `packages/react-icons/CHANGELOG.md`, `.../react-icons-file-type/CHANGELOG.md` | 1 each | historical                                                                 |

**Zero `@griffel/*` runtime dependencies declared in any manifest in the repository.**

---

## What is left for the user

1. `git push origin main` on the icons fork.
2. Open the PR against `microsoft/fluentui-system-icons`, title
   `feat(react-icons)!: promote the headless API to the package default`, body = everything above
   the "Pre-push checklist" heading (the checklist is for you, not for reviewers — though the
   "Reviewer notes" section above it should stay in).
3. Optionally make the two `eslint.config.mjs` edits described above, if the local
   config-protection hook is not in play for you.
