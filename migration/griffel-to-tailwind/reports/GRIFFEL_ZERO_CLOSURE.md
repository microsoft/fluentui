# Griffel Zero — campaign closure

**Date:** 2026-08-01 · **Branch:** `styling/tailwind-css-modules` · Summarizes the campaign;
the per-stage reports carry the detail. Plan: `griffel-zero-plan.md`.

## 1. Stage table

| stage                 | scope                                                                                                  | gate result                                                                             | key commits / report                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| S-A free wins         | stale deps, test/fixture files, generator templates                                                    | build + affected tests green                                                            | folded into early batches (plan §3)                         |
| S-B–S-D charts        | D17 VR extension + C1–C7 conversion + plumbing                                                         | 19 sets 187/187 clean; jest 912/86/998; 0 `.styles.raw.js`                              | `charts-c3.md`…`charts-c6-c7.md`                            |
| S-E harness           | 28 VR story files, scripts/test-ssr, perf scenario                                                     | full VR run clean                                                                       | `harness-se.md`                                             |
| S-F stories & docs    | 498 stories + 42 doc pages, 7 batches                                                                  | docsite renders; story-count assertion                                                  | `sf-batch1..7.md`                                           |
| S-G core specials     | provider nonce (D20.1), TextDirectionProvider removal (D20.2), tabster/positioning                     | full VR + SSR green                                                                     | `sg-core-specials.md`                                       |
| S-H the break         | umbrella re-export removal (D19), conformance-griffel retirement, wyw-in-js, root-devdep trim          | full sweep + API review; Griffel-zero import grep first passes                          | `sh-the-break.md`                                           |
| S-I sweep             | 2,787 mention lines worked by class; CONVERSION_GUIDE/DECISIONS close-out                              | comment-only word-level audit PASS                                                      | `si-sweep.md`                                               |
| I0–I7 (icons fork)    | headless promotion to default: wrapIcon/sprites, parity, promote, fonts, file-type, purge, docs, 3.0.0 | icons repo `rg "@griffel"` → 0; fixtures −41.6%/−68.2%; build-verify 139 passed         | `icons-pr-description.md`                                   |
| Icons integration     | LOCAL-ONLY tarball override + `styles.css` @import at `fui.components.l1` (D27)                        | 73/73 sets / 4,654 shots (127-shot upstream-glyph-drift adjudication); SSR green        | `icons-integration-1.md`; `c5d6a9b932`                      |
| S-J batch 1           | button family, 16 lines → l1/l2                                                                        | VR 492/492 zero-tolerance; CDP 15 cases pre=post                                        | `sj-batch1.md`; `fff0a4c298` `7fb3a06dec`                   |
| S-J batches 2+3       | remaining 42 lines, 10 modules → l1 (breadcrumb l2)                                                    | VR 511/511 zero-tolerance (2 NEW sets); CDP 22 cases pre=post                           | `sj-batches-2-3.md`; `c467f6d6b0` `aba145371a` `a09c73a4cd` |
| Serializer retirement | `@griffel/jest-serializer` out of 71 configs, generator, root devDep                                   | probe: 1 pure-churn snapshot (C7 sentinel); charts 912/86 + 5 icon-heavy packages green | `5cc993350a` `98a7a77d81`                                   |

## 2. Final Griffel-zero assertion (rerun at closure)

- `rg ":global(.fui-Icon-"` over `*.module.css`: **58 selector lines, 0 unlayered**
  (script-verified layer-brace walk; 16 button-family + 42 batches 2+3, all inside
  `@layer fui.components.l1`/`l2`). D2a5 is fully retired.
- Import-position grep (`from|require '@griffel/…'`) outside `deprecated/` — survivors,
  identical to the sh-the-break §5 list, all D11-sanctioned:
  - `apps/vr-tests-react-components`: `MakeStyles/MakeStyles.stories.tsx`,
    `MakeStyles/MakeStylesPseudo.stories.tsx`, `CustomStyleHooks.stories.tsx` (D11 survivor
    VR stories), `ShadowDOM/ShadowDOMDefault.stories.tsx` + `ShadowDOM/utils.tsx`
    (shadow-DOM survivors)
  - rule/executor FIXTURE strings (not executed imports): `eslint-plugin` no-restricted-imports
    test, `eslint-plugin-react-components` enforce-use-client spec/README,
    `workspace-plugin` build-executor AOT fixtures + `babel.ts` comment
- Manifests: zero `@griffel/*` in any non-deprecated `package.json` except
  `apps/vr-tests-react-components` (`@griffel/react`, serving the D11 stories) and 3 root
  devDeps (`@griffel/babel-preset` — deprecated AOT; `@griffel/shadow-dom` +
  `@griffel/webpack-loader` — D11 revisit; sh-the-break §2). `@griffel/jest-serializer` now
  resolves ONLY via the 3 `deprecated/` packages' own devDependencies.
- `yarn why @griffel/core`: resolves via `@griffel/react` (deprecated pkgs + vr-tests D11
  stories) and the 2 remaining root dev tools — the D11 carve-out, exactly as scoped. The
  icons repo's own grep is 0 (its `@griffel/core` edge exists only through the published
  `@fluentui/react-components` its docsite renders).

## 3. LOCAL-ONLY commits — REVERT BEFORE PR

Two commits (D24: contribute-back model; the PR must behave against published packages):

1. `90d1096404` `LOCAL-ONLY(revert-before-PR): point @fluentui/react-icons at the headless fork via yarn portal`
2. `b0248a57f1` `LOCAL-ONLY(revert-before-PR): consume the icons fork as a packed tarball, not a portal`

Revert procedure: `git revert b0248a57f1 90d1096404` (order matters — tarball supersedes
portal), then `yarn install` to restore the lockfile to the published `@fluentui/react-icons`
resolution. Note the sequencing dependency below — do this only ONCE the upstream icons 3.0
is published, otherwise the repo consumes 2.x and every S-J/S-K gate premise is void.

## 4. Remaining manual actions (user)

1. **Icons fork**: `git push origin main` on `fluentui-system-icons`, open the upstream PR
   (title/body per `icons-pr-description.md`, "What is left for the user").
2. **2 hook-blocked eslint edits in the icons fork** (config-protection hook): drop the dead
   `griffel` import + `griffel({...})` blocks from `packages/react-icons/eslint.config.mjs`
   and `packages/react-icons-file-type/eslint.config.mjs` (details in
   `icons-pr-description.md` "Two edits deliberately left for a maintainer").
3. **`git rm` the 3 D11 VR MakeStyles stories** (`MakeStyles.stories.tsx`,
   `MakeStylesPseudo.stories.tsx`, `CustomStyleHooks.stories.tsx`) when D11's survivor
   carve-out is retired — they are the last live `@griffel/react` imports outside
   `deprecated/` (plus the ShadowDOM pair riding `@griffel/shadow-dom`).
4. **Fast-forward the UI fork's `main`** to `styling/tailwind-css-modules` at PR time
   (user amendment 2: the PR originates from main; no history surgery mid-execution).

## 5. Sequencing note (for the UI PR body)

**The icons upstream merge is a dependency of the UI merge.** The UI branch's correctness
rests on `@fluentui/react-icons` 3.0 (headless): the retired D2a5 rules, the D27 layer
import, the jest-serializer retirement, and the regenerated snapshots all assume no Griffel
atomics and the `[data-fui-icon-hidden]` contract. The UI PR must state that it lands only
after (or together with) the icons 3.0 release, and the LOCAL-ONLY override must be reverted
against the published package (§3).
