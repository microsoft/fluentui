# Griffel → Tailwind v4 + CSS Modules — Final Migration Report

**Branch:** `styling/tailwind-css-modules` · **Baseline commit:** `8924bef0a5` (2026-07-27) ·
**Phase-4 metrics commit:** `27411c780a` (2026-07-30) · **Original report date:** 2026-07-30 ·
**Metrics restated at:** `7cc30e35fb` (2026-08-07)

Every number in this report is quoted from an artifact committed on this branch:
`migration/griffel-to-tailwind/metrics/{baseline,batch1,batch2,batch3,phase4,head-7cc30e35}`,
`reports/perf-eval.md`, `reports/DECISIONS.md`, `reports/phase2-batch*.md`,
`reports/revalidation-sweep-2026-07-27.md`, `reports/specials-triage.md`,
`reports/phase3-worklist.md`, `ledger.json`, and commit messages. Nothing is estimated. Where a
metric got worse or a capability was traded, it is stated in the same table as the wins.

> ## ⚠ SCOPE OF THESE METRICS — read before quoting any number
>
> §§3–7 of this report, and every figure originally published in §§1–2, were captured at
> **`27411c780a` (2026-07-30)** and are preserved here as the **Phase-4 record**. They predate
> everything that landed afterwards: the Griffel-zero campaign (charts, harness, the stories and docs sweep,
> the umbrella break), the `@fluentui/react-icons` 3.0 fork adoption, the `@property` perf remedy,
> the Prettier 3 + `prettier-plugin-tailwindcss` pass, and theming Phases 1 / 2a / 2b.
>
> **Do not quote a Phase-4 figure as current state.** §2.0 below lists exactly which metrics were
> re-measured at `7cc30e35fb`, which of those are safe to publish, and which are blocked and why.
> Every Phase-4 table below carries a restatement pointer.
>
> Nothing in §§3–7 has been re-measured since `27411c780a`.

---

## 1. Executive summary

The styling mechanism of every Fluent UI v9 react-component was converted from Griffel
(`makeStyles` / `mergeClasses` CSS-in-JS) to Tailwind v4 + CSS Modules compiled at package build
time into a shipped `dist/styles.css`. Cascade arbitration moved from a JavaScript runtime
(`mergeClasses` sequence hashes and per-property class deletion) to explicit CSS cascade layers
(`@layer fui.*`). Component identity moved from BEM statics (`fui-Button__icon`) to a single
Tailwind named-group marker (`group/fui-button`) plus per-slot `className` props.

**Scope closed:** 88 packages accounted for in `ledger.json` — **60 validated**, **4 done**
(no conversion needed; retired-in-place), **24 no-styles**. 247 `*.styles.ts` files converted.

`*.module.css` authored under `packages/react-components`: **49** at the baseline commit, **283** at
Phase 4, **722** today; **838** repo-wide today. (`git ls-tree -r --name-only <ref> -- packages/react-components | grep -c '\.module\.css$'`
for the historical legs, `git ls-files` for HEAD. The figure originally published here, 282, was off
by one against its own method, and is now 2.6× stale — the Griffel-zero campaign converted the
stories and docs.)

Packages emitting a `dist/styles.css`, measured today by a disk walk of `packages/`
(build-tree measurement — `dist` is gitignored, so rebuild to reproduce):

| Window                                                              | Files |   Bytes |
| ------------------------------------------------------------------- | ----: | ------: |
| Under `packages/react-components`, excluding `react-tailwind-theme` |    61 | 674,585 |
| Under `packages/react-components`, including it                     |    62 | 850,223 |
| All of `packages/` (adds `charts/react-charts`, 44,046 B)           |    63 | 894,269 |

The first row is the window `metrics/capture.sh` measures and matches its `cssBytes` exactly. The
second and third are the honest ones: `react-tailwind-theme/dist/styles.css` (175,638 B) is the
largest emitted stylesheet in the repo and is **mandatory for every consumer**, and charts emits CSS
today where it was still on Griffel at Phase 4.

### 2.0 What is publishable today — restatement at `7cc30e35fb`

`metrics/capture.sh` was re-run unmodified on `7cc30e35fb` into
`metrics/head-7cc30e35/`, and its outputs were independently re-derived. Four metrics survive; the
rest are blocked or need reframing, each for a stated reason.

**Publishable now** — none of these depends on the icons fork, on the theme relocation, or on
build timing:

| Metric                                              | Baseline (`8924bef0a5`) | HEAD (`7cc30e35fb`) |           Δ |
| --------------------------------------------------- | ----------------------: | ------------------: | ----------: |
| Griffel AOT: packages / `*.styles.js` files         |                62 / 277 |           **3 / 6** |  −59 / −271 |
| Dead `*.styles.raw.js` shipped in every tarball (B) |                 700,829 |               **0** |       −100% |
| Shipped `lib/` JS across react-components (B)       |             4,556,347 † |           3,846,978 | **−15.57%** |
| `@fluentui/react-button` tarball, packed (B)        |                 124,354 |          **81,896** | **−34.14%** |
| `@fluentui/react-button` tarball, unpacked (B)      |               1,050,635 |         **617,951** | **−41.18%** |
| `@fluentui/react-button` tarball, files             |                     185 |             **176** |          −9 |

† Like-for-like: the baseline restricted to HEAD's 84-package set. `react-conformance-griffel` left
the measured set when it moved to `deprecated/`. Unrestricted, baseline is 4,563,422 B and the delta
is −15.70%. **This is a shipped-`lib/` aggregate, not a bundle figure** — the PR body previously
labelled it "JS portion" next to a bundle number, which reads as a bundle claim.

The three remaining AOT packages are `deprecated/react-alert` (1 file),
`deprecated/react-infobutton` (2) and `deprecated/react-virtualizer` (3); an independent disk walk
finds 12 built `*.styles.raw.js` totalling 44,304 B, **all 12 under `deprecated/`, zero outside**.

**Blocked — do not publish any bundle-size number from this branch yet.** Every monosize figure at
HEAD is measured against the LOCAL-ONLY `@fluentui/react-icons` fork tarball pinned in the root
`package.json` `resolutions`. Reverting it (`git revert b0248a57f1 90d1096404`) is _not_ sufficient:
measured across every tracked `package.json`, there are 42 `@fluentui/react-icons` range
declarations — 36 × `^2.0.245`, 2 × `^2.0.306`, 1 each of `^2.0.311` / `^2.0.239` / `^2.0.237`, and
the one `file:` resolution — and **zero declarations of `^3.0.0`**; the installed fork itself
self-reports `version 2.0.334`. So a bare revert resolves to published, Griffel-based icons 2.x,
which `GRIFFEL_ZERO_CLOSURE.md` §3 says voids every S-J/S-K gate premise. The bundle set must be
re-captured after the revert **plus** a range bump **plus** `yarn install`.

**Blocked — build time.** See §2.2. Five cold, identical-scope runs on one unchanged tree do not
support any percentage.

**Needs reframing when re-captured** — the entire-library gzip pair (§2.5) and the VR storybook
output (§2.7); both denominators changed. The storybook figure is additionally subject to the icons
block above — it is a bundled artifact and 105 of its 505 files reference the icons package (§2.7).
Details in place.

**Not re-measured by anything in this workflow** — every client-runtime figure in §3 and every VR
gate count in §5. They stand as dated records of their own runs; they are not current-state claims.

### Headline numbers — PHASE-4 RECORD (baseline `8924bef0a5` → `27411c780a`)

Restated where noted; see §2.0 for what is publishable today.

| Metric                                                         |            Baseline |          Phase 4 |               Δ | Status today               |
| -------------------------------------------------------------- | ------------------: | ---------------: | --------------: | -------------------------- |
| Cold `tag:vNext` build, 91 projects (s)                        |                 182 |              163 |          −10.4% | **RETRACTED** — §2.2       |
| Packages running Griffel AOT / `*.styles.js` files transformed |            62 / 277 |           4 / 30 |      −58 / −247 | superseded → **3 / 6**     |
| monosize `react-components` entire library — **gzip** (B)      |             326,152 |          275,289 |          −15.6% | **BLOCKED** — §2.5         |
| monosize `react-components` entire library — minified (B)      |           1,294,729 |        1,379,033 |           +6.5% | **BLOCKED** — §2.5         |
| Shipped `lib/` JS across react-components (B)                  |           4,563,422 |        3,859,265 |          −15.4% | restated **−15.57%**       |
| Dead `*.styles.raw.js` shipped in every tarball (B)            |             700,829 |                0 |           −100% | holds                      |
| Emitted CSS across react-components (B)                        |              14,419 |          669,405 |               — | **REFRAMED** — §2.4        |
| `@fluentui/react-button` npm tarball, packed / unpacked (B)    | 124,354 / 1,050,635 | 81,893 / 617,198 | −34.1% / −41.3% | restated −34.14% / −41.18% |
| VR storybook build (s) / static output (B)                     |     76 / 34,569,262 |  70 / 36,170,831 |   −7.9% / +4.6% | **REFRAMED** — §2.7        |

### Client runtime, in one line each

> **Dated `27411c780a` / `e6fa6e476b`; NOT re-measured at HEAD.** These come from the Chrome-trace
> harness in `metrics/perf-eval/`, not from `capture.sh`, and nothing in the 2026-08-07 restatement
> re-ran them. They predate theming 2b (which deleted the runtime theme style tag and changed
> provider mount entirely) and the `@property` remedy. Treat every figure below as a record of its
> own run. **Do not lift any of them into a PR body as a current measurement** — re-run the harness
> first, or cite `reports/perf-eval.md` and `reports/perf-*.md` directly with their dates.

- **Commit time (React render + styles hook + DOM mutation) is faster in all 25 measured cells,
  median −45.1%** — Button mounting 100 instances is −74.8%.
- **Style recalculation is slower in every traced cell, median +28.7% on mount.**
- **On mount the win dominates:** 18 of 25 cells net faster (≥5%), 3 flat, 4 slower.
- **On re-render there is a cliff:** Button +147.9%, Switch +157.3% end-to-end. Three subsequent
  experiments (selector policy, named groups, transition-property tightening) each moved it by less
  than noise. Suppressing transitions removes it entirely — and with transitions suppressed the
  migrated Button is **41.8% faster** than Griffel on the same re-render. **~8 ms of transition
  processing per 100 toggles remains unexplained and is flagged, not guessed at.**

### What was traded, stated plainly

1. ~~Raw minified bytes of the whole-library bundle **increased 6.5%**~~ — **WITHDRAWN, not
   replaced.** The +6.5% pair (1,294,729 → 1,379,033 B minified) is the Phase-4 measurement and is
   no longer the current state; but the current pair cannot be published either, because every
   bundle figure on this branch rides on the LOCAL-ONLY icons fork (§2.0). This trade will be
   restated — in whichever direction it lands — from the post-revert capture. Publishing a number
   here now would be publishing one that does not reproduce on the tree a maintainer clones.
2. Single-component consumers pay their package's whole stylesheet: every `react-button` fixture
   carries the same 48,126 B / 4,536 B gz of CSS, so `PresenceBadge` is **+27.0% gz** and
   `MenuButton` only −3.2%, against Divider's −50.1%.
3. The VR storybook's static output grew **+4.6%** at Phase 4 — **restated: +12.95% today**
   (34,569,262 → 39,045,618 B, independently re-walked). It got worse, and it is stated here rather
   than dropped. It is not a like-for-like artifact: the storybook also gained 24 story files
   (137 → 161) **and** — unlike the baseline and Phase-4 legs — this leg bundled the LOCAL-ONLY icons
   fork rather than published Griffel-based icons. Neither confounder is netted out, because neither
   can be without a post-revert re-capture; §2.7.
4. Public class-name targeting of component internals is **removed** (D16). 184 BEM statics across
   33 packages no longer render; 87 `*ClassNames` exports are narrowed to `{ root }`. The 17
   typography presets lose public identity entirely (D16.7).
5. Iframe / shadow-DOM style injection is out of scope (D11).
   - ~~CSP nonces for component styles are out of scope; the theme `<style>` tag keeps its existing
     nonce path~~ — **SUPERSEDED by theming 2b (D28).** There is no runtime style element left to
     sign: `useFluentProviderThemeStyleTag*` and `createCSSRuleFromTheme*` no longer exist anywhere
     outside `node_modules` (both `find` probes return empty), and `nonce` appears neither in
     `FluentProvider.types.ts` nor in the `react-provider` API report. Consumers cover the static
     `.css` assets with a CSP `style-src` source list.
   - ~~`@fluentui/react-icons` remains a Griffel package, so converted rules that style its glyphs
     must be authored **unlayered** (D2 amendment 5)~~ — **RETIRED.** Icons 3.0 is headless; its
     rules are imported at `@layer fui.components.l1` (D27) and D2 amendment 5 is fully retired.
     See `GRIFFEL_ZERO_CLOSURE.md` §2 and `icons-integration-1.md`. The _version contract_ is still
     open — see the blocker in §2.0.

---

## 2. Metrics

### 2.1 Methodology (D10)

- Same machine for every leg: Windows 11, 32 CPUs, Node v22.12.0, yarn 4.12.0
  (`metrics/*/env.txt`). Baseline `8924bef0a5` @ 2026-07-27T04:46:27Z; Phase-4 leg `27411c780a`
  @ 2026-07-30T08:22:36Z; restatement leg `7cc30e35fb` @ 2026-08-07T16:16:58Z.
- Identical command per leg, captured by `metrics/capture.sh`:
  `nx run-many -t build --projects=tag:vNext --skip-nx-cache --parallel=3`.
- Cold builds only (`--skip-nx-cache`), committed clean tree, machine-exclusive (no concurrent
  installs or builds). "Cold" means nx-cache-skipped, not a wiped `lib/`: `capture.sh` never
  deletes build output. Cache-freeness is verified per leg —
  `grep -c -iE 'from cache|existing outputs|cache hit' <leg>/build-vnext.log` returns **0** on
  baseline, Phase 4 and HEAD.
- **Scope is NOT identical across legs, contrary to what this section said before.** The
  "91 projects" substring matches on all three, but the dependent-task count does not:
  `grep -o 'Successfully ran target build for [0-9]* projects and [0-9]* tasks they depend on'`
  gives _91 projects and 19 tasks_ at baseline and _91 projects and 20 tasks_ at both Phase 4 and
  HEAD. The after side runs one more task, so the direction of the bias is conservative — but the
  identity claim was false as written.
- Bundle size: monosize. **The instrument changed between the before and after legs and this was
  not disclosed originally.** `git show 8924bef0a5:monosize.config.mjs` has **no** `assetTypes` key
  (monosize's default is `['js']` only) and **no** `config.experiments`; `27411c780a` and HEAD both
  add `assetTypes: ['js','css']` and `config.experiments = { …, css: true }`, with an inline comment
  reading _"previously CSS was invisible to monosize"_. Accordingly all four baseline fixtures carry
  `assets: { js: … }` only. The effect is benign — the baseline's entire 14,419 B of
  react-components CSS is two packages, `react-storybook-addon` (12,729 B) and
  `react-storybook-addon-export-to-sandbox` (1,690 B), neither reachable from any fixture, and
  webpack 5 hard-fails on a `.css` import without `experiments.css`, which the baseline build did
  not — **but the pair must not be presented as one tool at one setting.** State this wherever a
  baseline-to-now bundle pair appears.
  **Primary metric is combined JS+CSS gzip.** gzip is not additive across the JS/CSS split
  (measured at baseline: Button 6,051 + 2,776 vs 8,499 combined) — no saving in this report is
  derived by subtraction.
- **Every compressed size states its compressor and level.** monosize gzips at **zlib level 6**,
  established by reproducing its exact outputs: `gzipSync(index.js, {level:6})` = 199,195 and
  `gzipSync(index.css, {level:6})` = 54,436, both identical to the values in
  `monosize-react-components.json`; level 9 gives different numbers. A bare "gzip" figure is not
  reproducible — the theme stylesheet alone measures 14,603 B at level 9 and 15,530 B at level 6.
- **`capture.sh`'s `lib-sizes` walk anchors on each package's `lib/` directory.**
  `react-tailwind-theme` has no `lib/` (`ls .../react-tailwind-theme/lib` → _No such file or
  directory_; `'react-tailwind-theme' in perPackage` → `false`), so its 175,638 B
  `dist/styles.css` — the largest emitted stylesheet in the repo — appears in **no** leg's
  `cssBytes`. It did not exist at baseline (`git cat-file -e 8924bef0a5:…/react-tailwind-theme/package.json`
  → absent), so the gap opens at Phase 4 and only becomes material at HEAD. Without this note the
  +0.77% Phase-4→HEAD CSS delta reads as a null result for a phase that shipped 175 KB of new CSS.
- Griffel AOT elimination is read directly out of the build log
  (`grep 'Processing griffel AOT with babel'`).
- Local A/B only; never compared against CI (macos-14-xlarge, `NX_PARALLEL: 6`).
- **Single run per leg — and that is now known to be insufficient for build time.** The claim this
  bullet used to make, that "182 → 178 → 183 across three unchanged-methodology legs" is a
  run-to-run noise band, is **retracted**: per this report's own table at §2.2 those are three
  _different trees_ (baseline, batch 1 at 13/87 converted, batch 2 at 23/87), not repeat runs of
  one tree. It was never a variance estimate. See §2.2 for what repeat runs actually show. The AOT
  counts, byte counts and file counts are exact and are unaffected.

### 2.2 Build time — RETRACTED as a percentage; raw record only

**No build-time percentage from this branch is defensible, and the −10.4% headline is withdrawn.**

The committed record, one cold run per leg (`cat metrics/<leg>/build-time.txt`, exit code 0 on every
leg, `--skip-nx-cache` present in each recorded `command:` line):

| Leg                           | Commit / report                        | Elapsed (s) |
| ----------------------------- | -------------------------------------- | ----------: |
| Baseline (all Griffel)        | `8924bef0a5`                           |         182 |
| Batch 1 (13/87 converted)     | `metrics/batch1-build-time.txt`        |         178 |
| Batch 2 (23/87 converted)     | `reports/phase2-batch3.md` table       |         183 |
| Stroke-widths / spacing sweep | `reports/phase2-batch3.md` note        |         196 |
| Batch 3 (33/87 converted)     | `metrics/batch3/build-time.txt`        |         174 |
| Phase 4                       | `metrics/phase4/build-time.txt`        |         163 |
| HEAD `7cc30e35fb`             | `metrics/head-7cc30e35/build-time.txt` |         167 |

**Why the percentage is retracted.** Four additional cold runs of the identical command were
captured on the **unchanged HEAD tree** during this workflow's measurement and verification passes
(logs retained at `.scratch/build-rerun-2.log`, `.scratch/build-rerun-3.log`,
`.scratch/verify-build-A.log`, `.scratch/verify-build-B.log`); those passes recorded **163, 161,
158 and 156 s** respectively. Together with `capture.sh`'s 167 s that is **five samples on one
unchanged tree — 167, 163, 161, 158, 156 s, monotone decreasing in the order they were run**, all
five reporting _91 projects and 20 tasks_ with zero cache-hit lines. That is a systematic
machine-warming trend, not a spread: the number keeps falling the more builds precede it. Its span
is 11 s, 6.8% of the 161 s median.

Against a **single-observation** 182 s baseline whose own machine-warmth state is unrecorded, the
implied delta ranges from −8.24% to −14.29% purely as a function of how many builds preceded the
sample you pick. And on protocol-matched first-runs — the `capture.sh` run of each leg, which is the
only apples-to-apples comparison available — Phase 4 is 163 s and HEAD is 167 s, i.e. **HEAD is
+2.45% slower**, not the 0.00% a median-of-three would suggest.

Baseline variance is **unmeasurable** from the committed record (n=1, prior machine state
unrecorded), so no confidence interval can be constructed for the pair at all. No `*.tsbuildinfo`
exists anywhere outside `node_modules`, so tsc incremental state is not the mechanism.

**What to say instead**, if the PR needs to speak to build cost — the exact, exact-countable thing:
_Griffel AOT transformation is removed from 59 of 62 packages; 277 source files were transformed at
baseline, 6 today, all in `deprecated/` packages._ The mechanism claim below still holds and does
not depend on a stopwatch: the build is transpile-only (SWC per file, no bundling), so the trade is
the Griffel Babel AOT pass and its parallel `*.styles.raw.js` emission going away against a new
PostCSS/Tailwind CSS-Modules compile arriving.

### 2.3 Griffel AOT footprint

| Leg                   | Packages running AOT | `*.styles.js` files transformed |
| --------------------- | -------------------: | ------------------------------: |
| Baseline              |               **62** |                         **277** |
| Batch 1               |                   50 |                               — |
| Batch 2               |                   42 |                               — |
| Batch 3               |                   33 |                             176 |
| Phase 4               |                    4 |                              30 |
| **HEAD `7cc30e35fb`** |                **3** |                           **6** |

At Phase 4 the four remaining were `deprecated/react-infobutton` (2 files),
`deprecated/react-alert` (1), `deprecated/react-virtualizer` (3), and `charts/react-charts` (24).
**The Griffel-zero campaign converted charts**, so at HEAD the AOT pass runs in exactly three
packages, **all under `packages/react-components/deprecated/`** — verified by re-running the
per-package attribution over each leg's build log:

```
awk '/^> nx run /{p=$4} /Processing griffel AOT with babel: [0-9]+ files/{…}' <leg>/build-vnext.log
  phase4 → react-alert 1, react-charts 24, react-infobutton 2, react-virtualizer 3
  HEAD   → react-alert 1,                  react-infobutton 2, react-virtualizer 3
```

Confirmed from the other side by an independent disk walk of `packages/`: **12 built
`*.styles.raw.js` files totalling 44,304 B, all 12 under `deprecated/`, zero outside.** This metric
is publishable today (§2.0).

### 2.4 Build output — shipped `lib/` across `packages/react-components`

Sums over every package's built `lib/` tree plus `dist/styles.css` (`metrics/*/lib-sizes.json`).

| Bytes                        |  Baseline |   Batch 1 |   Batch 2 |   Batch 3 |   Phase 4 |          HEAD | Δ base→HEAD |
| ---------------------------- | --------: | --------: | --------: | --------: | --------: | ------------: | ----------: |
| `lib/` JS total              | 4,563,422 | 4,367,446 | 4,240,833 | 4,061,456 | 3,859,265 | **3,846,978** | **−15.70%** |
| — of which `*.styles.js`     | 1,000,959 |   894,954 |   829,830 |   741,297 |   718,711 |       717,178 |     −28.35% |
| — of which `*.styles.raw.js` |   700,829 |   591,050 |   507,242 |   385,997 |     **0** |         **0** |   **−100%** |
| Emitted CSS (lib-anchored ‡) |    14,419 |   128,392 |   213,018 |   328,538 |   669,405 |       674,585 |           — |
| JS + CSS combined            | 4,577,841 |         — |         — |         — | 4,528,670 |     4,521,563 |      −1.23% |
| Files in `lib/`              |     3,440 |     3,426 |     3,411 |     3,408 |     3,426 |         3,407 |      −0.96% |

**Denominator drift, measured:** the walk covers 85 packages at baseline and Phase 4 but 84 at HEAD.
The single difference is `react-conformance-griffel`, which moved to `deprecated/`. Restricting the
baseline to HEAD's 84-package set gives **4,556,347 B / 3,435 files**, and the **like-for-like
shipped-`lib/` JS delta is −15.57%** — that is the figure to publish (§2.0), not the −15.70%
unrestricted value and not the −15.43% baseline→Phase-4 value the PR body was quoting as "−15.4%".

Read the last two rows honestly: **as a whole-repo aggregate, bytes on disk barely moved** — 716,444
B of JS left and 660,166 B of CSS arrived (baseline → HEAD). The wins are (a) the 700,829 B of
`*.styles.raw.js` that were shipped to every consumer and imported by nothing, now gone, and (b) what
a consumer actually downloads — which §2.5 can no longer quantify on this branch, see there.

‡ **The "Emitted CSS" row is a lib-anchored window and it hides the largest stylesheet in the repo.**
Taken at face value it reads 669,405 → 674,585 B, **+0.77%**, across a phase (theming 2b) that moved
an entire theme out of a runtime `<style>` tag and into a **175,638 B shipped stylesheet**. That is a
false negative, and its cause is mechanical: `capture.sh` walks packages that have a `lib/` dir, and
`react-tailwind-theme` has none. Stated with the window named:

> **61** packages under `packages/react-components` emit a `dist/styles.css` totalling **674,585 B**;
> including `@fluentui/react-tailwind-theme` (**175,638 B**) it is **850,223 B across 62 packages**;
> across all of `packages/` it is **894,269 B across 63**, the 63rd being `charts/react-charts`
> (**44,046 B**), which was still on Griffel at Phase 4 and emits CSS today.

The baseline side of the row should also be read as what it is: the 14,419 B is **entirely**
`react-storybook-addon` (12,729 B) plus `react-storybook-addon-export-to-sandbox` (1,690 B). The
component-CSS baseline was **zero**, so "14,419 → 669,405" implies a starting point that never
existed. `dist` is gitignored, so all of the above are build-tree measurements; rebuild to reproduce.

Largest emitted stylesheets today (disk walk, HEAD): react-tailwind-theme 175,638 B,
react-button 48,974, charts/react-charts 44,046, react-avatar 34,193, react-combobox 31,656,
react-tags 29,060, react-nav 28,148, react-calendar-compat 25,361, react-card 24,242,
react-tabs 23,421. (The list previously published here — react-button 48,125, react-avatar 33,829,
react-combobox 31,352, react-tags 28,859, react-nav 28,373, react-calendar-compat 25,065 — is the
Phase-4 lib-anchored set; note react-nav went **down**.)

### 2.5 Bundle size (monosize, JS+CSS, minified and gzip)

> ## ⛔ EVERY NUMBER IN §2.5 IS BLOCKED FROM PUBLICATION
>
> The tables below are the **Phase-4 record** (`8924bef0a5` → `27411c780a`) and remain valid as a
> historical measurement of the original migration. They are **not** current state, and the current
> state **cannot be published from this branch** for two independent reasons:
>
> **(a) The icons fork.** Every monosize figure at HEAD is measured against a LOCAL-ONLY
> `@fluentui/react-icons` fork tarball. `require.resolve('@fluentui/react-icons')` from
> `react-button/library` lands in the fork. The isolation is proven, not assumed: grepping icon
> markers in the **built** per-component bundles finds markers in exactly three fixtures —
> PresenceBadge, MenuButton, SplitButton — and those are exactly the three that moved between Phase 4
> and HEAD (−17.35% / −18.13% / −17.11%); the other six fixtures have zero markers and moved between
> −0.05% and −0.33%. The entire-library fixture's exposure is **unmeasured, not small**: its
> `index.js` has 0 hits for `react-icons`, `createFluentIcon` and `bundleIcon`, but it does carry SVG
> payload (`viewBox` ×1, `"svg"` ×4) with the identifiers minified away. Re-capture is required after
> `git revert b0248a57f1 90d1096404` **+ a dependency-range bump across all 42 declaration sites
> (zero of which declare `^3.0.0` today) + `yarn install`**.
>
> **(b) The theme left the measured bundle, so the denominator changed.** At baseline and Phase 4,
> `packages/react-components/react-theme/library/src/index.ts` exported **seven theme objects**
> (`webLightTheme`, `webDarkTheme`, `teamsLight/Dark/HighContrast/LightV21/DarkV21`), and the
> `import * as rc; console.log(rc)` fixture retained all seven inside the measured bundle. At HEAD it
> exports only `*ClassName` **string** constants. Verified on HEAD's built bundle: `index.css` has
> **0** `--color-neutral-background-1:` definitions and **0** `.fui-theme-*` class matches, while
> carrying **45** exact `var(--color-neutral-background-1)` references (matching
> `/var\(--color-neutral-background-1[,)]/`, i.e. excluding longer names sharing the prefix); the JS
> asset likewise defines 0 token values. Without a separate stylesheet nothing in the bundle has a
> token value. That stylesheet is `@fluentui/react-tailwind-theme/dist/styles.css`
> (175,638 B raw; 15,530 B gzip at zlib level 6, 14,603 B at level 9), a **separate package a consumer
> must import**, and **no monosize fixture imports it**. Any restated pair must therefore lead with a
> theme-inclusive figure and name the method in the same sentence, with the raw monosize total second
> and never alone.
>
> **(c) Two of the four fixtures are no longer the same fixture.** `git diff 27411c780a..HEAD --stat`
> over `react-components/bundle-size/` shows `ProviderAndTheme.fixture.js` and
> `ButtonProviderAndTheme.fixture.js` each changed 6 lines, swapping `webLightTheme` (an object) for
> `webLightThemeClassName` (a string) — monosize's own `name` field records the swap. Their
> before/after deltas measure a **different import** and must be dropped, not restated. The
> entire-library and MultipleComponents fixtures are byte-identical across all three legs.
>
> **(d) The instrument changed.** See §2.1 — the baseline was measured by a monosize configuration
> that could not see CSS at all.

`@fluentui/react-components` fixtures — **Phase-4 record**:

| Fixture                                           | min before | min after |  Δ min | **gz before** | **gz after** |   **Δ gz** |
| ------------------------------------------------- | ---------: | --------: | -----: | ------------: | -----------: | ---------: |
| entire library                                    |  1,294,729 | 1,379,033 |  +6.5% |       326,152 |  **275,289** | **−15.6%** |
| Accordion, Button, Provider, Image, Menu, Popover |    226,026 |   262,945 | +16.3% |        68,049 |       65,223 |      −4.2% |
| Button, FluentProvider & webLightTheme ✱          |     66,281 |    89,860 | +35.6% |        19,002 |       18,189 |      −4.3% |
| FluentProvider & webLightTheme ✱                  |     39,504 |    38,557 |  −2.4% |        13,112 |       12,773 |      −2.6% |

✱ **Source-changed by theming 2b — these two rows cannot be carried forward.** Both fixtures now
import `webLightThemeClassName` instead of `webLightTheme`; any HEAD number for them measures a
different program. Their deltas are dropped rather than restated.

Entire-library asset split after: JS 792,780 min / 220,889 gz + CSS 586,253 min / 54,400 gz.
Before: 1,294,729 min / 326,152 gz, all JS.

Entire-library gzip trajectory: 326,152 → 319,145 (batch 1) → 314,949 (batch 2) → 304,432
(batch 3) → **275,289**.

Per-component fixtures — **Phase-4 record; all nine are icons-confounded at HEAD and none may be
restated before the revert** (three carry icon payload directly; the other six are unmoved but their
absolute values still ride on the same install):

| Fixture           | gz before | gz after |       Δ gz | after CSS gz (shared per package) |
| ----------------- | --------: | -------: | ---------: | --------------------------------: |
| Divider           |     5,398 |    2,693 | **−50.1%** |                             1,247 |
| ToggleButton      |    10,633 |    7,343 |     −30.9% |                             4,536 |
| CompoundButton    |     9,853 |    7,178 |     −27.1% |                             4,536 |
| Button            |     8,499 |    6,542 |     −23.0% |                             4,536 |
| Badge             |     7,352 |    5,742 |     −21.9% |                             2,580 |
| CounterBadge      |     7,610 |    5,946 |     −21.9% |                             2,580 |
| SplitButton       |    11,521 |   10,281 |     −10.8% |                             4,536 |
| MenuButton        |     9,890 |    9,575 |      −3.2% |                             4,536 |
| **PresenceBadge** |     8,292 |   10,534 | **+27.0%** |                             2,580 |

The regression and the two weak results have one cause, recorded as a packaging finding in batch 1:
**per-package CSS aggregation (D1)** means every fixture importing one component pays the whole
package stylesheet. Button's JS collapsed to 4,944 B min / 2,006 B gz while its CSS is a flat
48,126 B / 4,536 B on all five button fixtures. PresenceBadge's own JS share is small
(`@fluentui/react-icons` dominates and is external), so the flat CSS charge outweighs its saving.
Suite-level usage washes this out — the entire-library fixture is −15.6%. Per-component CSS emission
is a recorded, un-taken option (§6.3).

**The packaging finding itself survives and is the durable part of this section.** The per-package
CSS charge is flat and essentially unchanged between Phase 4 and HEAD — react-button 4,536 → 4,532 B
gz identical across all five button fixtures, react-badge 2,580 → 2,563 across all three,
react-divider 1,247 → 1,238 — so D1's aggregation cost is intact regardless of what happens to the
JS side. What is _not_ durable is the narrative built on the Phase-4 numbers (PresenceBadge as a
+27.0% regression, MenuButton as a weak −3.2%): those rows are precisely the icon-consuming
fixtures, so they are the ones that will move most on re-capture, in an unknown direction until the
revert lands.

### 2.6 Install size (`npm pack --dry-run`)

Restated at HEAD; this metric is publishable today (§2.0). Unlike §2.5 it does not depend on the
icons install — `npm pack` measures what the package itself ships, and `@fluentui/react-icons` is a
dependency, not a bundled file.

| Package         | Files (base → p4 → HEAD) |   Packed B (base → p4 → HEAD) | Δ base→HEAD |     Unpacked B (base → p4 → HEAD) | Δ base→HEAD |
| --------------- | -----------------------: | ----------------------------: | ----------: | --------------------------------: | ----------: |
| `react-button`  |          185 → 176 → 176 | 124,354 → 81,893 → **81,896** | **−34.14%** | 1,050,635 → 617,198 → **617,951** | **−41.18%** |
| `react-badge`   |            101 → 96 → 96 |  60,008 → 52,899 → **52,831** |     −11.96% |   493,197 → 390,418 → **390,396** |     −20.84% |
| `react-divider` |             41 → 40 → 40 |  32,081 → 27,996 → **27,973** |     −12.81% |   257,293 → 199,252 → **199,157** |     −22.60% |

Essentially unchanged since Phase 4 — the largest packed move is react-button at +3 B. The Phase-4
figures published here previously (−34.1% / −41.3% for react-button) still reproduce to two
significant figures; the values above are the exact HEAD ones.

Badge and Divider were _smaller_ at batch 3 (49,214 / 26,052 packed) than at Phase 4
(52,899 / 27,996): the full settled contract — markers, data-attribute variants, the shared variant
catalog — adds CSS text after batch 3. The direction against baseline is still down for all three.

### 2.7 Storybook (VR harness) — the one size regression

| Leg                   | Build (s) | Static output (B) | Story files in `src` |
| --------------------- | --------: | ----------------: | -------------------: |
| Baseline              |        76 |        34,569,262 |                  137 |
| Batch 3               |        72 |        35,066,816 |                    — |
| Phase 4               |        70 |        36,170,831 |                  137 |
| **HEAD `7cc30e35fb`** |    **74** |    **39,045,618** |              **161** |

**Restated: static output is +12.95% vs baseline** (was +4.6% at Phase 4), and +7.95% since Phase 4.
This is the largest adverse number in the whole metric set and it got materially worse; it is stated
here rather than dropped. The 39,045,618 B / 505 files figure was independently re-walked from
`apps/vr-tests-react-components/dist/storybook` and matches the captured `dist_bytes` exactly.

**It is not the same artifact on both sides.** The storybook gained 24 story files
(`git ls-tree -r --name-only <ref> -- apps/vr-tests-react-components/src | grep -cE '\.stories\.tsx?$'`
→ 137 / 137 / 161, +17.5%) — VR coverage that was _added_ by the campaign, largely to baseline states
that had none. Print the story count next to the byte delta or the growth reads as pure bloat.

**It also carries the icons-fork contamination that §2.0 blocks every other bundle figure for.**
This is a bundled artifact, not a source measurement: a walk of
`apps/vr-tests-react-components/dist/storybook` finds 505 files / 39,045,618 B, of which **105 `.js`
/ `.css` files reference the icons package**. `apps/vr-tests-react-components/package.json` declares
`@fluentui/react-icons: ^2.0.306`, but the root `resolutions` override redirects it to the LOCAL-ONLY
fork tarball, and the installed package self-reports `version 2.0.334` with a `styles.css` export and
`tslib` as its only dependency — i.e. the headless build, not the Griffel-based published 2.x. The
override landed in `90d1096404` / `b0248a57f1` (both 2026-07-31), **after** the baseline leg
(`8924bef0a5`, 2026-07-27) and the Phase-4 leg (`27411c780a`, 2026-07-30) were captured and **before**
this leg (2026-08-07). So the baseline and Phase-4 legs bundled published Griffel-based icons and this
leg bundled the headless fork. The +12.95% therefore spans a dependency swap as well as +24 stories.
**The direction and size of the icons component of that delta are not measured and are not estimated
here** — the headless build removes Griffel from icons and adds a stylesheet, and which dominates is
unknown until the post-revert re-capture (§6.3 item 0a). Treat +12.95% as the measured difference
between two artifacts that differ in three ways, not as a migration cost.

**The build-time delta is withdrawn.** The Phase-4 report's −7.9% is superseded by −2.63%
(76 → 74 s), but neither is publishable: these are single runs per leg on a machine that showed a
6.8%-of-median monotone drift across five repeats of the sibling `tag:vNext` build (§2.2). One
observation per leg cannot resolve a 2.6% difference.

Note this artifact is not comparable to the monosize numbers:
storybooks build from TS source with **runtime** Griffel (`makeStyles`, a 35,711 B min floor) on the
before leg, while monosize measures the AOT'd `lib/` (`__styles`, 4,326 B min floor) — see
`reports/build-metrics.md` §4. The public docsite storybook could not be measured on this machine at
all (Windows path-separator defect, §6.4).

---

## 3. Client runtime performance

> **⚠ NOT RE-MEASURED. Everything in §3 is dated `838ce80485` → `e6fa6e476b` and was captured by the
> Chrome-trace harness in `metrics/perf-eval/`, which nothing in the 2026-08-07 restatement re-ran.**
> Two later phases plausibly moved these numbers and neither was measured against them: the
> `@property` perf remedy (`reports/perf-property-remedy.md`) and theming Phase 2b, which deleted the
> provider's runtime rule building and injection entirely. **No figure in §3 may be published as a
> current measurement.** Either re-run the harness, or cite `reports/perf-eval.md` and
> `reports/perf-*.md` with their own dates and let them speak for themselves.

Full method, raw data and caveats: `reports/perf-eval.md` (+ its CORRECTION and post-tightening
sections); per-cell JSON in `metrics/perf-eval/`. BEFORE = `838ce80485` built in a dedicated
worktree with Griffel AOT confirmed; AFTER = `e6fa6e476b`. 5 components × 5 scenarios; the 13
packages in the dependency closure that did not change between the commits are byte-identical and
shared, so tokens, focus outlines and the JSX runtime are held constant **by construction**.

Validity checks that ran before any timing was believed: zero computed-style/geometry mismatches in
15/15 cells; identical `elementCount` recalculated on both legs in all 15 traced cells; wall-clock
and Chrome-trace attribution agree; the BEFORE leg was forced to pre-inject the same stylesheet
breadth so the surfaces are comparable.

### 3.1 The win — `mergeClasses` really was expensive

Commit time (React reconciliation + the styles hook + DOM mutation) is faster on the migrated leg in
**all 25 cells, median −45.1%**, range −74.8% to −12.0%.

| Component | Mount 100 plain (Δ commit) | Mount 100 overridden (Δ commit) |
| --------- | -------------------------: | ------------------------------: |
| Button    |                 **−74.8%** |                          −69.8% |
| Badge     |                     −54.4% |                          −63.3% |
| Avatar    |                     −42.0% |                          −58.0% |
| Divider   |                     −26.3% |                          −45.1% |
| Switch    |                     −19.8% |                          −22.8% |

The win scales with how much `mergeClasses` had to do: Button's root was a **16-argument
`mergeClasses` fed by 7 `useStyles` hooks**, replaced by `clsx` with 5 arguments and 6 `data-*`
writes. For four of five components the win is _larger_ when consumer overrides are present.

A methodological finding worth carrying into any future comparison: React's `<Profiler>` column is
much flatter than the commit column, because Griffel's per-instance insertion bookkeeping runs in
`useInsertionEffect` — the **commit** phase, not the render phase `actualDuration` measures. Anyone
who profiled Griffel with `<Profiler>` alone was measuring the wrong phase.

### 3.2 The cost — selector matching

Style recalculation is slower on the migrated leg in **every traced cell**, median **+28.7%** on the
mount scenarios (range +15.1% to +40.3%), with an identical number of elements recalculated.

|                                 | before |  after |
| ------------------------------- | -----: | -----: |
| style rules                     |    653 |    454 |
| selectors                       |    716 |    637 |
| selectors containing `[data-*]` |     26 |    128 |
| selectors containing `:where()` |      0 |    205 |
| total selector characters       | 12,925 | 22,903 |

Fewer rules and fewer selectors, but each is heavier. Layout moves both directions by small amounts
and never explains a result — every regression here is style _recalculation_.

### 3.3 Net verdict by scenario

| Sc  | Scenario              | Verdict                                                                                               |
| --- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| A   | Mount 1, plain        | Faster on all 5 (−5.2% Switch … −35.1% Button)                                                        |
| B   | Mount 1, overridden   | Faster on all 5 (−7.4% … −29.9%)                                                                      |
| C   | Mount 100, plain      | Faster on 3, flat on 2 (−51.5% Button … +2.7% Divider)                                                |
| D   | Mount 100, overridden | **Faster on all 5** (−5.9% … −46.3%) — the at-scale worst case is the migration's best showing        |
| E   | Re-render 100         | Slower on 4, flat on 1: Badge +3.0%, Divider +7.4%, Avatar +15.0%, **Button +147.9%, Switch +157.3%** |

18 of 25 cells net faster (≥5%), 3 flat, 4 slower — and all four slower cells are scenario E.

### 3.4 The scenario-E cliff — three hypotheses tested, three refuted

The original report attributed the cliff to selector shape (`:where([data-checked], :checked)` in
place of a bare `:checked`), reasoning from Switch, which writes **no** `data-*` attribute on toggle
and is still +204.3% on style recalculation. **That attribution was refuted by direct experiment**
and the report says so in place:

1. **Selector policy** — a six-leg, equivalence-verified CSS variant matrix on Switch scenario E
   (pooled n=93/leg): removing every `[data-*]` alternative, every sibling combinator and 36% of
   selector text moved the median between −0.2% and −3.8%, against a within-leg IQR of 0.625–0.830 ms
   and a between-leg spread of 0.440 ms. Inside noise.
2. **Named groups** — measured at −0.2%, and _worse_ on trace attribution: root-anchored
   `data-checked` widens invalidation from 11,000 to 12,000 elements. Adopted for capability
   (D15.1), explicitly **not** for performance.
3. **Transition-property tightening** — cutting declared longhands by 71% (Switch 22 → 7,
   Button 21 → 6) changed transition-attributable cost by **+0.8% / +0.6%**, both upward, both
   inside noise. Kept as hygiene; booked as zero performance.

**The cliff is transition processing.** Re-running both shipped bundles with
`transition-property: none` forced:

| Component | Leg                       | As shipped (ms) | Suppressed (ms) | Attributable to transitions |
| --------- | ------------------------- | --------------: | --------------: | --------------------------: |
| Switch    | before                    |           4.480 |           2.345 |          2.135 ms _(47.7%)_ |
| Switch    | after-2                   |          11.895 |           2.705 |      **9.190 ms** _(77.3%)_ |
| Button    | before                    |           3.410 |           1.255 |          2.155 ms _(63.2%)_ |
| Button    | after-2                   |           8.365 |           0.730 |      **7.635 ms** _(91.3%)_ |
| Divider   | (control, no transitions) |           1.310 |           1.460 |                   −0.150 ms |

The declared transitions are byte-identical across legs and cost 4.3–4.4× more in the migrated CSS.
**With transitions suppressed the migration is +15.4% on Switch and −41.8% on Button** — i.e. the
entire Button scenario-E regression, and ~92% of Switch's, is transition processing, and without it
the migrated Button re-renders _faster_ than Griffel.

One contributor is isolated and equivalence-verified: Griffel emitted literal `translateX(20px)`
where the migration emits `translateX(calc(20px * var(--base-scale)))`; collapsing that indirection
recovers ~1 ms of the ~9 ms (measured at −9.1% on the `diag-literal-geometry` leg). **The remaining
~8 ms is unexplained.** The report's own recommendation is followed here: the next step is a
diagnostic experiment to identify the mechanism, not another speculative code change.

Divider's control row is also a validity check on the method — it declares no transitions, so
suppression should be free, yet costs ~0.15 ms because the injected universal rule is itself work.
Every "attributable" figure above is therefore an **under**-estimate by about that much.

### 3.5 DOM accounting and harness bundle

The migrated leg adds **1–4 `data-*` attributes per instance** and removes class tokens. In the
realistic overridden case the class string is shorter for every component (Button 215 → 81 chars,
25 → 6 tokens); in the plain-defaults case it is longer for 4 of 5, because Griffel collapsed
defaults into a single `makeResetStyles` class. None of it shows as cost — the writes happen during
commit, and commit is faster in every cell.

Harness bundle for an app importing all five components plus FluentProvider: 366,641 B JS →
275,693 B JS + 71,646 B CSS = 347,339 B, **−5.26%** (secondary; `metrics/` owns the authoritative
bundle numbers).

---

## 4. Architecture — the styling contract that ships

Full rationale and evidence: `reports/DECISIONS.md` D1–D16.

### 4.1 Layers (D2, amendments 3–4)

```css
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2,
       fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;
```

A name-for-name mirror of the nyt-games family under an `fui` root. `fui.base` is levelless and
hosts `makeResetStyles` output, reproducing Griffel's reset-bucket subordination. `l1` = base
library components, `l2` = library compositions (a component styling an element whose base styles
come from another component's hook), `l3`–`l5` = consumer space, `fui.utilities` on top.
**Unlayered consumer CSS beats every `fui.*` layer**, which is what preserves the
"consumer overrides win" contract `mergeClasses` used to provide. Within a level, the winner is
in-file source order, and modules author their blocks in the original `mergeClasses` **argument**
order — the only record of which slice won each property conflict.

Accepted new failure modes, documented for the PR: unlayered third-party resets now beat Fluent
styles; `!important` inside a layer inverts strength (one file: `usePresenceBadgeStyles`); v8
`merge-styles` (unlayered) wins ties in mixed v8/v9 apps; layer names are public API.

**The direction D2 did not originally consider is a real hazard and is now a rule (amendment 5):**
when a converted component styles an element owned by a package still on Griffel, the _converted_
rule loses, because the cascade compares layer origin before specificity. Such rules are authored
**unlayered** at the bottom of the module. It was found broken at runtime in 12 react-button rules
and 6 react-infolabel rules — invisible to VR, caught by CDP matched-rules inspection.

> **RETIRED for `@fluentui/react-icons` (post-Phase-4).** This section originally called the
> unlayered rule "permanent for `@fluentui/react-icons` (`bundleIcon`'s `.fjseox{display:none}`
> atomics)". Icons 3.0 is headless: it ships its own stylesheet, which is imported at
> `@layer fui.components.l1` (D27), so icon-targeting rules are layered like everything else and
> D2 amendment 5 is **fully retired** — no unlayered authoring survives. See
> `GRIFFEL_ZERO_CLOSURE.md` §2 and `icons-integration-1.md`. Amendment 5 remains on the record only
> as the general rule for a Griffel-authored dependency, of which there are now none in scope.

### 4.2 Props → classes and attributes (D3, D15.6)

Look props (`appearance`, `shape`, `color`) become module-class lookups. State props become `data-*`
attributes matched by `@custom-variant` selectors defined once in the shared theme, all
`:where()`-wrapped so specificity stays flat. **D15.6, as settled: data attributes are a fallback,
not a requirement.** Native selectors are used wherever they express the state at the element that
needs it; a `data-*` mirror is added only where the styling target (typically a group element)
cannot reach the native state. Mirrors are written `value || undefined` — never `|| false`, since
`data-checked="false"` still matches `[data-checked]`.

### 4.3 Identity: group markers, no statics (D15, D16)

Every converted component stamps `group/fui-<component-kebab>` on its outermost slot as the sole
public identity class. All 184 BEM statics across 33 packages stopped rendering; the 87
`*ClassNames` exports are kept but narrowed from `SlotClassNames<XSlots>` to `{ root: string }`,
with `root` re-pointed to the marker — so `buttonClassNames.icon` becomes a TypeScript error on the
exact line that would otherwise have gone silently dead. `fuiSelector()` ships from
`@fluentui/react-utilities` because `.` + `group/fui-button` is an invalid _selector_.

Two invariants are enforced mechanically, because both failures are invisible:

- **The marker must never be `classList[0]`.** jsdom's `:scope` polyfill (nwsapi) escapes
  `classList[0]` into a synthesised anchor, and the `/` produces an invalid selector that throws at
  render time. Enforced by the `component-has-group-marker` conformance test across 83 call sites.
- **The marker must survive CSS-Modules scoping.** `postcss-modules` and `css-loader` both scope
  every class selector; left alone, `.group\/fui-switch` compiles to a hashed local the DOM never
  matches — no error, no warning, VR green. A local PostCSS plugin `:global()`-wraps the marker, the
  build **throws** if a `group/`-keyed entry appears in the class map, and a compile test asserts the
  output shape.

One accepted loss: the 17 typography presets share `group/fui-text`, so removing `fui-Body1` …
`fui-Title3` leaves them with no public identity class (D16.7).

### 4.4 Theming, RTL, focus (D4, D5, D6)

> ## ⚠ THIS SUBSECTION IS SUPERSEDED IN FULL BY THEMING PHASES 1 / 2a / 2b
>
> It describes the Phase-4 state and is retained for the record. Three of its claims are now
> **false**, and the paragraph below is exactly the text a reader would otherwise carry forward:
>
> 1. **"theming is Griffel-independent and unchanged"** — true about Griffel, false about
>    _unchanged_. Phase 2a renamed all 467 token custom properties from camelCase to kebab-case
>    (`--colorNeutralForeground1` → `--color-neutral-foreground-1`); Phase 2b deleted the runtime
>    theme `<style>` tag, the `theme` prop, `createCSSRuleFromTheme`, `ThemeContext_unstable` and the
>    `nonce` prop, and made themes static CSS classes. `FluentProvider` no longer writes any token
>    value. This is the single largest consumer-facing break in the PR.
> 2. **"registered via `@theme inline`"** — it is `@theme inline reference` since Phase 2a (D4 2a
>    amendment §4). Plain `inline` would emit a self-referential alias per token now that runtime names
>    equal theme keys.
> 3. **"the only _emitted_ Tailwind theme values are `--base-scale`, `--spacing`, plus the four
>    `--spacing-thin|thick|thicker|thickest`"** — measured today, `css/tokens.css` carries **930**
>    `--x:` declarations and `css/themes.css` (152,729 B) ships **7 theme classes of exactly 433
>    declarations each** (`.fui-theme-web-light` … `.fui-theme-teams-dark-v21`). 467 tokens − 26
>    theme-invariant spacing/stroke − 8 theme-absent zIndex = 433, verified against the theme objects
>    themselves (`createLightTheme()` returns 459 keys; 22 are `spacingHorizontal*`/`spacingVertical*`,
>    4 are `strokeWidth*`, and all 8 `zIndex*` tokens are absent).
>
> Current state lives in `reports/theming-css-native.md`, `reports/token-rename-map.md` and
> `reports/theme-api-migration-map.md`. Consumer-facing version: the docsite upgrade guide at
> `apps/public-docsite-v9/src/Concepts/Migration/FromV9/`.

Tokens were already plain CSS custom properties written by `FluentProvider`, so theming is
Griffel-independent and unchanged, including nested providers and portals. All 467 tokens are
registered via `@theme inline` (which substitutes `var(--fluentToken)` rather than emitting a
`:root` variable, preserving per-provider scoping). The only _emitted_ Tailwind theme values are
`--base-scale: calc(1rem / 16px)` and `--spacing: calc(1px * var(--base-scale))`, plus the four
`--spacing-thin|thick|thicker|thickest` variables. Priced-in and measured before committing: a
provider `theme` override of a spacing or stroke-width token no longer reaches utility-sourced
values — all 7 shipped themes carry byte-identical values for all 22 spacing and 4 stroke-width
tokens, so no shipped theme is affected.

RTL: property-level flips become logical properties; value-level flips (gradients, `translateX`,
keyframe bodies) use `@custom-variant rtl (&:where(:dir(rtl)))`. Documented semantic change:
direction now follows the DOM rather than React context.

Focus: keyborg/tabster attributes are untouched; the shared `fui-focus-outline` utility reproduces
`createFocusOutlineStyle`'s compiled output byte-for-byte, including its hardcoded `2px`.

### 4.5 `mergeClasses` is removed, not emulated (D7 revision)

The Griffel runtime winner-selection machinery — sequence hashes, `DEFINITION_LOOKUP_TABLE`,
property-map merge, per-property class deletion — is gone. Class names are inert identifiers; there
is no dedup; elements may carry several classes setting the same property and the layer order
decides. Griffel symbol re-exports and `mergeClasses`-defined extension contracts are part of this
migration's breaking change.

### 4.6 Before / after sketch

**Before** (`useDividerStyles.styles.ts`, Griffel):

```ts
const useStyles = makeStyles({ base: { … }, horizontal: { … }, brand: { … } });
export const useDividerStyles_unstable = (state: DividerState): DividerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    dividerClassNames.root,            // 'fui-Divider'
    useBaseClassName(),                // makeResetStyles output
    styles.base,
    state.vertical ? styles.vertical : styles.horizontal,
    state.appearance && styles[state.appearance],
    state.root.className,              // consumer last; property conflicts resolved at runtime
  );
  // …and 'fui-Divider__wrapper' on the wrapper slot
  return state;
};
```

**After** (shipped today):

```ts
import { clsx } from 'clsx';
import styles from './Divider.module.css';

export const dividerClassNames: { root: string } = { root: 'group/fui-divider' };

export const useDividerStyles_unstable = (state: DividerState): DividerState => {
  const root = state.root as DividerState['root'] & DividerRootDataAttributes;
  root['data-orientation'] = state.vertical ? 'vertical' : 'horizontal';
  root['data-align-content'] = state.alignContent;
  root['data-inset'] = state.inset || undefined; // presence selector: never `|| false`
  root['data-empty'] = isEmpty || undefined;

  state.root.className = clsx(
    styles.root, // hashed module class — guarantees classList[0] is safe
    'group/fui-divider', // sole public identity class
    state.appearance && styles[state.appearance],
    state.root.className, // consumer last
  );
  // the wrapper slot carries no library class at all — the static was its only token
  return state;
};
```

```css
/* Divider.module.css — blocks written in the old mergeClasses argument order */
@reference '#theme';
@layer fui.base { .root { … } }
@layer fui.components.l1 {
  .root { … @variant vertical { … } @variant inset { … } }
  .brand { … }
}
```

Call sites are re-threaded functionally per D14 — `state = useDividerStyles_unstable(state);`
rather than a discarded call on a mutated object.

---

## 5. Validation

> **⚠ Every count in §5 is dated.** The gate results below were recorded at the time each gate ran,
> against the tree that existed then, and none was re-run in the 2026-08-07 restatement. The later
> phases ran their own gates, recorded in their own reports (`GRIFFEL_ZERO_CLOSURE.md`,
> `theming-css-native.md` — whose 2b sweep is the most recent full-VR record). Cite the gate that
> covers the tree you are talking about; do not present a §5 number as the current gate status.

### 5.1 The system

Zero-tolerance screenshot diffing against `apps/vr-tests-react-components` (StoryWright, 1,578
stories across themes, RTL and high-contrast), fully local: `validation/capture.mjs` +
`validation/diff.mjs` (in-repo pixelmatch), `--maxDiffPixels 0` by default. Rules that make the
verdicts trustworthy:

- **Same machine, same code-state.** Baselines captured from the storybook built at the
  pre-conversion commit; never mixed with CI captures.
- **Counts are contract.** `--expect` guards StoryWright's silent-zero failure mode (a missing
  Playwright browser produces zero screenshots and exit 0); `missing`/`extra` files are failures.
- **Freshness is verified independently of nx.** `capture.mjs` compares component source mtimes
  against the built bundle and aborts if sources are newer.
- Adjudicated tolerance raises are recorded in the ledger with the pixel count and the reason.

### 5.2 Every regression class that was actually caught

**Stale-bundle false passes (the worst one).** `vr-tests-react-components:build-storybook` declared
nx `inputs` that did not include component package sources, so a change confined to `packages/**`
hit the cache and the capture screenshotted a **previously built bundle**. Green runs were green
because they were not exercising the change. Fixed twice over in `b27bf13985` — correct the hash
inputs _and_ refuse to trust them (the mtime guard) — then **every** verdict predating the fix was
re-earned: the 2026-07-27 re-validation sweep re-captured all 24 baseline sets against one
`--skip-nx-cache` build and passed **24/24 with zero retries**, including the historically flaky
ProgressBar high-contrast story. Recorded as a decision, not a bug note: a cache key that omits an
input is a correctness hazard, and a validation suite reading a cached artifact must verify that
artifact's freshness itself.

**Layer-origin inversions invisible to VR.** react-button's 12 icon-swap rules and react-infolabel's
6 were losing at runtime to unlayered `@fluentui/react-icons` atomics. No VR story pairs a subtle
appearance with an icon, so VR _cannot_ see that defect class; it was found by grepping every module
for `fui-Icon-filled` after the InfoButton root-cause, and proven with CDP
`CSS.getMatchedStylesForNode` A/B evidence at both layer positions.

**Mixed-mode inversions during the transition (D12).** Two found, both fixed in-batch:
ToolbarDivider's still-Griffel unlayered `display:inline-flex` beat converted Divider's layered
`display:flex` (a live regression on the tree); and `TagPickerGroup`'s `columnGap`, which had always
lost to converted `react-tags` as the last `mergeClasses` argument, would have inverted
(8px → 4px at medium) on a surface with **no VR baseline** — caught by a conformance failure and
fixed in `6cad216c17`. The delegation-seam audit ("who calls a converted package's style hook from
outside") is now a standing cookbook step.

**Selector non-equivalence in the tests themselves.** The batch-4 seam audit found 11 selector sites
in `react-charts` pointed at `react-popover`, **4 of which were regex-matched assertions passing
vacuously against nothing**. Repaired, then charts 912/912 and nav 280/280. Separately, D16.4:
`BreadcrumbButton` compounds its own static onto its module class inside an unlayered rule to win a
0-2-0 tie that `@layer` cannot arbitrate; deleting the static silently drops it to a load-order tie,
so it compounds the **marker** instead, with a gate (`\.[a-z-]+:global\(\.fui-` must have zero hits).

**Date-dependent fixtures.** The Batch-E gate closed 52/53 genuine plus one proven-environmental:
`CalendarCompat`'s VR fixture rendered `<Calendar>` with no `today`, so the old baselines encoded
the capture day. The sweep established that **48 of 53 sets straddled the day boundary and only this
fixture fired**; it is now pinned to 3/15/2023 with provenance (Griffel equivalence from the batch-5
same-day 8/8 gate) and re-captured 8/8 clean at an adjudicated 26 px ceiling (max observed 21 px,
sub-pixel-vs-grayscale text antialiasing on day-number glyphs). The same class produced the
excluded `react-timepicker-compat` DST test (fixed 2023-dated inputs, 3 hourly steps expected across
the 2023-11-05 fall-back, deterministically 2 on this machine).

### 5.3 Gate history

| Gate                                 | Result                                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| Pilot — Divider / Button / provider  | 31/31 · 129/129 · mixed-mode family 342/342                         |
| Re-validation sweep (post cache fix) | **24/24 sets, zero retries**                                        |
| Batch 3                              | **34/34 sets, zero retries** (845 new + 24 collateral)              |
| Statics removal (phase boundary)     | **34/34, zero retries**                                             |
| Batch 4 (scoped)                     | **44/44** (10 new sets, zero retries)                               |
| Batch 5 (scoped)                     | **48/48** (mass conversion complete)                                |
| Specials S1                          | **51/51**                                                           |
| Specials S2                          | **53/53** (baselines recovered from pre-change bundle)              |
| Phase 3 Batch E                      | **52/53 genuine + 1 proven-environmental**, then re-baselined clean |

### 5.4 Test parity

The Phase-3 → 4 gate triage proved **all 23 remaining test failures byte-identical at the base
commit via a detached worktree — zero Phase-3 regressions** (recorded in `29de7954d0`). That triage
also surfaced a genuine pre-existing defect it then fixed: `@fluentui/react-tailwind-theme` was the
only project of 256 with a scoped nx name, so `scripts/monorepo`'s `getDependencies` (which strips
`@fluentui/`) returned undefined for 60+ dependents.

Unit and conformance suites were run per package on every batch. Conformance changed shape with the
contract: Griffel's `make-styles-overrides-win` (57 wrappers / 243 call sites) is replaced by
`classname-overrides-win`, and `component-has-static-classnames-object` — whose sub-tests hard-code
the `fui-<Component>__<slot>` format — is deleted from the default set and re-exported as an opt-in
`hasStaticClassNames` so unconverted packages keep their coverage; `component-has-group-marker` is
the default-set replacement.

### 5.5 Where VR could not reach

Packages with no capturable VR stories were validated by unit tests, delegation-seam audits and
targeted probes rather than pixels, and this is recorded per package in the ledger:
`react-carousel` (compiled-Griffel-atomic fidelity comparison + two `mergeClasses` probes),
`react-overflow` (charts Legend-Overflow jest coverage), `react-nav`, `react-teaching-popover`,
`react-menu-grid-preview`, `react-migration-v0-v9` (tests 230/230 + seams + probes),
`react-migration-v8-v9`, `recipes`, `theme-designer` (tests / probes / CDP). Where a probe stood in
for pixels it was a real comparison — e.g. react-popover's fidelity probe checked all 47 compiled
Griffel declarations across 10 slices against the emitted `dist/styles.css`, and react-image's
matrix probe checked 960/960 prop combinations for class identity against `mergeClasses` argument
order.

---

## 6. Scope

### 6.1 Accounted for — 88 packages

| Ledger status | Count | Meaning                                                    |
| ------------- | ----: | ---------------------------------------------------------- |
| `validated`   |    60 | Converted and validated (VR and/or tests + seams + probes) |
| `done`        |     4 | No conversion needed; retired in place                     |
| `no-styles`   |    24 | No `*.styles.ts`; verified free of stray Griffel imports   |

247 `*.styles.ts` files converted. The four `done` packages are the Class-C retire items from the
specials triage: `react-tabster` (defines the focus factories — the D6 blocker, discharged: zero
converted-package consumers remain), `react-components` (suite; Griffel re-exports stay, marked
deprecated per D7), `react-conformance-griffel` (replacement shipped; only deprecated packages still
consume it), `react-portal-compat` (Griffel-free already; its provider-class regex carries the
D16.1/D16.5 adaptations).

~~Residual Griffel in shipped `src` across `packages/react-components` is now 9 import lines, all
deliberate: `react-provider` (`TextDirectionProvider`, `useRenderer_unstable`), `react-positioning`
(two type-only `GriffelStyle` imports in the retained factories), `react-tabster` (factories kept for
unconverted consumers), plus the suite's re-exports and `react-conformance-griffel`'s matchers.
Everything else is test/cypress files.~~

**SUPERSEDED — that was the Phase-4 count. Today it is zero executed imports.** Grepping `@griffel`
across `packages/react-components` excluding `deprecated/`, `lib/` and `lib-commonjs/` returns
**12 textual occurrences**, and every one was read: 3 are eslint-rule _fixture strings_ in
`enforce-use-client.spec.ts`, and the other 9 are prose comments documenting the removal
(`useAccordionStyles.styles.ts`, `useAccordionItemStyles.styles.ts`,
`react-components/src/index.ts` ×2, `useMessageBarGroupStyles.styles.ts`,
`react-positioning/src/types.ts` and its generated `dist/index.d.ts`,
`renderFluentProvider.tsx`, `useTabList.test.tsx`). **None is an import.** `TextDirectionProvider` is
gone from `renderFluentProvider.tsx` (S-G, D20.2), and `react-conformance-griffel` moved to
`deprecated/`. The only live `@griffel/react` importers anywhere outside `deprecated/` are **5 files
under `apps/vr-tests-react-components`** — the D11 survivor stories (`MakeStyles`,
`MakeStylesPseudo`, `CustomStyleHooks`, `ShadowDOMDefault`, `ShadowDOM/utils`) — plus the eslint
fixture file.

### 6.2 Deliberately out of scope

- **`packages/react-components/deprecated/*`** — react-infobutton, react-alert, react-virtualizer;
  6 `*.styles.js` files still AOT-compiled.
- ~~**`packages/charts/react-charts`** — 24 `*.styles.js` files, still on Griffel.~~
  **SUPERSEDED: charts was fully converted in stages S-B–S-D.** Zero `*.styles.raw.js` remain in it
  (the AOT attribution over HEAD's build log lists only the three `deprecated/` packages), and it
  emits its own `dist/styles.css` — **44,046 B**, the third-largest stylesheet in the repo. It was
  in scope as a _consumer_ before that: its snapshots and selectors were repaired when converted
  packages changed their DOM; the pilot's charts fallout was additive only (`data-*` attribute
  additions, script-verified — counts in the pilot report).
- ~~**`@fluentui/react-icons`** — external package using Griffel internally (D11); its unlayered
  atomics are a permanent authoring constraint (§4.1).~~
  **SUPERSEDED: icons 3.0 is headless and in scope**, imported at `@layer fui.components.l1` (D27).
  The open item is now the _version contract_, not the styling system — see the blocker in §2.0.
- **Iframe and shadow-DOM style injection** (`createDOMRenderer(contentDocument)`,
  `@griffel/shadow-dom`): static stylesheets do not cross document boundaries; affected stories are
  marked known-changed and the replacement (stylesheet cloning / `adoptedStyleSheets`) is deferred.
- **CSP nonce for component styles** — static CSS needs none (an improvement).
  ~~the theme `<style>` tag keeps its existing nonce path.~~ **SUPERSEDED by theming 2b (D28): there
  is no theme `<style>` tag and no `nonce` prop.** Verified — `nonce` appears in neither
  `FluentProvider.types.ts` nor the `react-provider` API report, and neither
  `useFluentProviderThemeStyleTag*` nor `createCSSRuleFromTheme*` exists outside `node_modules`.
  Consumers cover the static `.css` assets with a CSP `style-src` source list instead.
- **Griffel-specific VR stories** (`MakeStyles*`, `CustomStyleHooks`, 11 stories) — retired with
  their baselines.

### 6.3 Open items for post-PR

> **Items 0a–0f were added or reclassified in the 2026-08-07 restatement and are the ones that
> block the PR going ready.** Items 1–10 are the Phase-4 list, annotated where later work closed
> them.

0a. **BLOCKER — the icons version contract does not close, and every bundle metric waits on it.**
`git revert b0248a57f1 90d1096404` is necessary but **not sufficient**: measured across every
tracked `package.json` there are 42 `@fluentui/react-icons` range declarations and **zero**
declare `^3.0.0` (36 × `^2.0.245`, 2 × `^2.0.306`, 1 each `^2.0.311` / `^2.0.239` / `^2.0.237`,
plus the one `file:` resolution), while the installed fork self-reports `2.0.334`. A bare revert
therefore resolves to published **Griffel-based icons 2.x**, which `GRIFFEL_ZERO_CLOSURE.md` §3
itself says voids every S-J/S-K gate premise. Required sequence: revert → bump all declaring
`package.json` files to the published 3.0 range → `yarn install` → re-run the icon-integration VR
gate → `bash migration/griffel-to-tailwind/metrics/capture.sh <leg>` → restate §2.5 and §1.

0b. **Re-capture the bundle set after 0a, and lead with the theme-inclusive figure.** The restated
sentence must name its method inline, e.g. _"entire library, gzip of the emitted JS + CSS + the
required `@fluentui/react-tailwind-theme` stylesheet: 326,152 B → ⟨new⟩ B (zlib level 6)"_,
followed by one sentence explaining that theming 2b moved theme token values out of the JS bundle
into `react-tailwind-theme/dist/styles.css` (175,638 B raw / 15,530 B gzip at level 6) which no
monosize fixture imports. Report the raw monosize total second, never alone. Carry the
instrument-change disclosure from §2.1 alongside it.

0c. ~~**Commit the metrics legs.**~~ **DONE.** `metrics/head-7cc30e35/` is committed: 12 of the 15
files on disk, the other three being the `*.log` captures that
`migration/griffel-to-tailwind/.gitignore` excludes from every leg. The restated figures now carry
the same provenance as `baseline/` and `phase4/`. The leg is labelled in its own directory
(`metrics/head-7cc30e35/README.md`) as a **superseded, icons-fork-contaminated leg**. What remains
open is the re-capture itself, tracked under 0a.

0d. **Theme Designer's exported recipe emits 26 tokens it should skip.** `createThemeClassRule` in
`theme-designer/src/components/Export/{ExportPanel,ExportLink}.tsx` (and
`src/utils/applyThemeAsClass.ts`) walks every key of the theme object. Measured:
`createLightTheme()` returns 459 keys of which **22 `spacingHorizontal*`/`spacingVertical*` and 4
`strokeWidth*` carry literal values** (`spacingHorizontalM = '12px'`, `strokeWidthThin = '1px'`),
whereas `css/tokens.css` defines them as `calc(var(--spacing) * 12)` (line 479) and
`calc(1px * var(--base-scale))` (line 565). Emitting the literals into a theme class **severs the
density knob and the base-scale multiplier for that subtree** — which is exactly why each shipped
`.fui-theme-*` class carries 433 declarations, not 459. The generator should skip those 26 keys.
_Not fixed here: this restatement pass was scoped to documentation and deliberately made no source
change._ The docsite recipe documents the exclusion explicitly in the meantime.

0e. **`@fluentui/react-tailwind-theme` has no releasable identity.** It is mandatory for every
consumer, yet `version` is `9.0.0-alpha.0`, `beachball.disallowedChangeTypes` is
`["major","minor","patch"]` (so it can only ever publish as a prerelease), and it declares no
`dependencies` or `peerDependencies` — including none on `@fluentui/react-icons`, whose stylesheet
`css/emit.css` inlines at build time. Decide the release identity before the PR goes ready, and
make the install instruction state the exact specifier.

0f. **The umbrella exposes no `./styles.css` subpath.** `@fluentui/react-components`'s `exports` map
is `{".", "./package.json", "./unstable"}`. The ESM output side-effect-imports each package's CSS,
but the `lib-commonjs` class maps deliberately do not — their generated header says _"Consumers of
this output load the `./styles.css` export subpath"_. A CommonJS/SSR consumer importing only the
umbrella therefore has no single stylesheet import. Either add the subpath or document the
per-package list; the docsite currently documents the per-package path as the supported route.

1. **The ~8 ms transition diagnostic.** Identify what Blink does differently per transitioned
   property between a Griffel-injected flat atomic rule and a layered CSS-Modules rule. A _research_
   task; the evaluation explicitly recommends no further code change justified by predicted
   scenario-E gains. The one lever with a measured positive is collapsing
   `calc(Npx * var(--base-scale))` inside transitioned values (−9.1% on Switch E,
   ~1 ms of ~9 ms) — worth doing on its own terms, not as a fix.
2. **Add an update-path scenario to the perf gate.** Every regression found in the whole evaluation
   is on the update path, and all four mount scenarios would have passed a mount-only gate. Still
   unaddressed.
3. **Re-run the perf evaluation after D14.** The harness and BEFORE worktree are retained at
   `.scratch/perf-eval/`; the `data-*` writes measured were via direct mutation of `state.root` and
   the functional rewrite changes that path.
4. ~~**`prettier-plugin-tailwindcss`** (`@apply` class sorting) — blocked; the repo pins Prettier
   2.8.8 and the plugin requires Prettier 3.~~ **CLOSED post-Phase-4:** the repo was upgraded to
   Prettier 3 and the plugin adopted — see `reports/prettier3-tailwind-sort.md`, which is one of the
   two reports in this directory whose counts reproduce exactly at its stated base ref
   (`a6868ec088`: 837 tracked `*.module.css`, 1,771 stories — both re-verified).
5. **Per-component CSS packaging.** Evidence is complete: all three badge fixtures pay the same
   2,580 B gz of package CSS, which is what makes `PresenceBadge` +27.0%. The change is confined to
   the emission step (no authoring changes). Recommended as a follow-up, not this PR.
6. **D14 residue.** `react-hooks/immutability` suppressions measured today: **199 occurrences across
   97 `src` files, 19 of them `*.styles.ts`** — down from the 323 across 143 files (65 `*.styles.ts`)
   recorded when Phase 3 was planned. The finish line is self-enforcing: delete a suppression and
   lint reports any mutation that remains.
7. **INFRA-1c — docsite storybook build.** Blocked by 7 story files with a
   `/** @jsxRuntime automatic */` pragma conflict (react-motion ×6, react-tree ×1); root-caused to
   babel-loader lacking `configFile: false`, bisected independent of the storybook CSS wiring, and
   **pre-existing on master with an empty diff**. INFRA-1b (the Windows/POSIX regex in
   `react-storybook-addon-export-to-sandbox/src/webpack.ts:19`) is fixed with a spec but still wants
   a Windows docsite build to confirm.
8. **INFRA-1d — docs-view emotion reset.** In Storybook's DOCS view an unlayered emotion
   `div` margin beats layered module CSS; presentation-only, docs-mode-wide. Candidate fix is an
   `sb-unstyled` carve-out in the shared storybook stylesheet.
9. **Consumer-facing guidance.** (a) Non-Tailwind consumers need no setup — unlayered CSS beats all
   `fui.*` layers. (b) Tailwind-using consumers who want their own utilities to beat Fluent must
   declare the `fui` layer before importing Tailwind (layer order is first-appearance).
   (c) `` `.${x.root}` `` must become `fuiSelector(x.root)` — the one migration step the type system
   cannot force. **Addressed post-Phase-4:** all three now live on the docsite in
   `Concepts/Migration/FromV9/UpgradeGuide.mdx`, together with the theming break, the 467-token
   rename (`Concepts/Migration/FromV9/TokenRename.mdx`) and the CJS/SSR stylesheet contract. The
   changelog side is **not** done — see 0a/0e, and note that a scan of all `change/*.json` comment
   fields finds zero mentions of the token rename or of `react-icons`.
10. **Housekeeping before the PR:** `.scratch/` artifacts and the `git worktree` at
    `.scratch/perf-eval/before-tree`, plus the untracked `graphify-out/` and
    `packages/graphify-out/` directories, must not reach the PR.

---

## 7. Process appendix

### 7.1 Phases and batches

| Phase                | Content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 — Infrastructure   | 7 research reports, D1–D12, cookbook, shared theme layer, VR harness, **baseline metrics captured before any component change**                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1 — Pilot            | `react-divider` (user sign-off gate), then Button + FluentProvider root + mixed-mode proof                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.5 — Shipping infra | `dist/styles.css` emission, AOT + `*.styles.raw.js` gating, jest css-module mapper + serializer, token registration, monosize `assetTypes` fix                                                                                                                                                                                                                                                                                                                                                                                  |
| 2 — Mass conversion  | Batches 1–5 (leaf-first, ascending styles-file count, compound components later), then specials S1–S5                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 3 — Integration      | Batches A–H: `'use client'` sweep, lint/API/dependency closeout, packaging, storybook infra, variants catalog, D14, documentation audit, gate                                                                                                                                                                                                                                                                                                                                                                                   |
| 4 — Report           | Phase-4 metrics leg (`27411c780a`) + this report as originally written                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **5 — post-Phase-4** | Everything §§3–7 predate: Griffel-zero campaign (charts, harness, stories & docs, umbrella break — `GRIFFEL_ZERO_CLOSURE.md`); `@fluentui/react-icons` 3.0 fork adoption (`icons-integration-1.md`); `@property` perf remedy (`perf-property-remedy.md`); Prettier 2.8.8 → 3 + `prettier-plugin-tailwindcss` (`prettier3-tailwind-sort.md`); theming Phase 1 / 2a / 2b (`theming-css-native.md`, `token-rename-map.md`, `theme-api-migration-map.md`); consumer upgrade documentation; **metrics restatement leg `7cc30e35fb`** |

Two mid-flight contract changes rode the batch cycle rather than becoming retrofit phases: named
group markers + all-lowercase idents (D15) and BEM statics removal (D16). Batches 4–5 and every
specials batch applied the **full settled contract from birth**, in one pass.

### 7.2 The batch-scoped validation regime (user-directed, 2026-07-29)

Each batch applies its full contract in one pass and validates **only** its own VR sets plus the
dependents flagged by the delegation-seam audit. Full-suite sweeps are reserved for phase boundaries
and the final gate. The safety argument is ordering: conversion runs bottom-up, so completed
components sit below the batch and cannot be invalidated by it. One documented exception — the
`variants.css` catalog pass — touches a shared file, so its validation had to cover every affected
package rather than a nominal batch.

### 7.3 Orchestration and commit conventions

- One overseer session owns `ledger.json` and all commits; workers convert and analyse and return
  results. Batch size 3–6 packages, so a crash loses at most one batch. Ledger updated and committed
  after every completed unit of work.
- `ledger.json` is the single source of truth for progress; `RUNBOOK.md` is the resume protocol; the
  whole migration is designed to survive session loss with no reliance on conversation memory.
- Conventional-commit prefixes, scoped per package (`feat(react-button):`, `refactor(react-tree):`,
  `docs(migration):`, `chore(...)`). Migration bookkeeping is committed separately from code so those
  commits can be dropped before the PR.
- Hooks are never bypassed. A Windows-specific constraint shaped the commit granularity: the staged
  formatter passes every staged filename to one Prettier invocation, and above ~70 staged JS/TS files
  the command line overflows and the commit is rolled back — hence per-package commit chunks.

### 7.4 Where the evidence lives

| Path                                                                                                                       | Content                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metrics/{baseline,batch1,batch2,batch3,phase4,head-7cc30e35}`                                                             | The measurement legs: build time, AOT counts, `lib-sizes.json`, monosize, npm-pack, storybook. `head-7cc30e35` is the 2026-08-07 restatement leg — **icons-fork-contaminated for every bundle figure**, superseded once the revert in §6.3 item 0a lands |
| `metrics/perf-eval/`                                                                                                       | 25 per-cell JSONs, the variant matrix, the post-tightening re-measurement                                                                                                                                                                                |
| `reports/perf-eval.md`                                                                                                     | Client runtime evaluation, its CORRECTION, and the post-tightening re-run                                                                                                                                                                                |
| `reports/DECISIONS.md`                                                                                                     | D1–D16, amendments, postmortems                                                                                                                                                                                                                          |
| `reports/phase2-batch*.md`, `revalidation-sweep-2026-07-27.md`, `specials-triage.md`, `s4-*`, `s5-*`, `phase3-worklist.md` | The validation and process record                                                                                                                                                                                                                        |
| `validation/`                                                                                                              | Capture/diff harness + rules                                                                                                                                                                                                                             |
| `ledger.json`                                                                                                              | Per-package status, validation stamps, adjudications                                                                                                                                                                                                     |

---

## Clarifications (orchestrator, post-assembly)

1. **Post-D14 full-VR record exists.** The H-gate sweep ran on the tree with
   Batches F and G committed: 52/53 sets at zero tolerance + react-calendar-compat
   at its ledger-adjudicated 26px antialiasing ceiling (observed 21px, the
   documented bistable flake) = **53/53**. Driver results archived in session
   records; the adjudication and tolerance are recorded in `ledger.json` and the
   sweep driver.
2. **D14 scope precision.** D14's declared scope — the state-mutation pattern in
   _styles hooks_ — is complete: zero `react-hooks/immutability` suppressions
   remain in any converted package's `*.styles.ts`. The 199 suppressions across
   97 files counted above live in non-styles sources (state hooks, renderers)
   that were never in D14's scope; they are pre-existing repo debt, listed under
   open items.

---

## Measurement conventions (adopted 2026-08-07, binding on all future figures)

Three defect classes were found across this directory's reports and are now ruled out by
construction. The full adjudication, including the one figure that was **wrongly** retracted by an
earlier pass, is in `reports/theming-css-native.md` → _Measurement conventions_.

1. **Every byte figure names the ref it was measured at**, and prefers a git-reachable path so
   `git show <ref>:<path> | wc -c` reproduces it. A figure that matches no committed revision of the
   file it claims to measure is deleted, not adjusted — there is no correct substitute for an
   unsourceable number.
2. **Any figure for a gitignored artifact** (`dist/**`, `node_modules/**`, anything produced by a
   LOCAL-ONLY dependency override) is labelled _build-tree measurement, not reproducible from git_
   and names the build that produced it — or is omitted. `dist` is ignored at `.gitignore:64`.
3. **Every compressed size states its compressor and level.** On this repo's own theme stylesheet
   the same 175,638 B file measures 14,603 B (`zlib` level 9), 15,530 B (`zlib` level 6, the default
   and monosize's setting) and 15,714 B (the `gzip` CLI at its default, which also writes a filename
   header). A bare "gzip" number is not reproducible by anyone, and an earlier gate agent read
   exactly that ambiguity as a fabrication.

Additionally: **a timing figure needs repeat runs on one unchanged tree before it becomes a
percentage.** §2.2 is the worked example — five identical cold builds on one tree measured a
monotone decreasing series spanning 6.8% of the median, which is larger than most of the deltas this
report was quoting.

Two reports in this directory already met these rules before they were written down, and their
counts were re-verified to reproduce exactly: `prettier3-tailwind-sort.md` (837 tracked
`*.module.css` and 1,771 stories at `a6868ec088`) and `post-campaign-audit-fluentui.md` (837 and 238
`library/src` at `62402f4375`). Use them as the template.
