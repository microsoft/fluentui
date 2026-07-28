# Client Performance Evaluation — Spec (user-directed 2026-07-27)

Runs AFTER Phase 2 batch 3. Purpose: determine whether the migration produces a
noticeable client-side performance change vs Griffel, with honest accounting in both
directions — the hypothesized win (eliminating mergeClasses' class-name
sorting/dedup/lookup work) and the hypothesized cost (added data-attributes may hurt
render/DOM performance).

## Components (5 — simple → complex spread; Button mandatory per user)

1. **Divider** — simplest (baseline of baselines)
2. **Badge** — enum-heavy, small
3. **Switch** — mid-complexity stateful (interaction states, label positions)
4. **Button** — the user's designated benchmark ("really good benchmark")
5. **Avatar** — most complex (imperative class builder on the Griffel side, numeric
   size buckets, badge composition)

## Sides

- **BEFORE**: Griffel predecessors — build from the pre-pilot commit
  (`git worktree` at the commit before `ffd84a7b36`), npm pack the packages.
- **AFTER**: converted packages — npm pack from HEAD.
- Identical harness app for both; identical React version; same machine, same run.

## Scenarios (per component, per side)

| #   | Scenario                                                 | What it isolates                                                                                                                                                                                                                                                                                                                                                                                             |
| --- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A   | Mount 1, plain (defaults only)                           | Fixed per-component overhead                                                                                                                                                                                                                                                                                                                                                                                 |
| B   | Mount 1, heavily overridden                              | mergeClasses doing real work vs cascade arbitration. BEFORE side: consumer `makeStyles` classes passed via className (forces sequence parsing + property-map merge + dedup). AFTER side: equivalent overrides expressed at multiple altitudes — consumer unlayered CSS + `fui.components.l3` app-global + `fui.components.l4` page rules + a utility-class override — so the cascade does equivalent "work". |
| C   | Mount 100 (grid), plain                                  | At-scale mount cost — "one is always lightning fast"                                                                                                                                                                                                                                                                                                                                                         |
| D   | Mount 100, overridden                                    | At-scale worst case                                                                                                                                                                                                                                                                                                                                                                                          |
| E   | Re-render 100 (toggle a state prop across all instances) | Update path: mergeClasses cache-hit path vs clsx re-concat; data-attribute mutation cost                                                                                                                                                                                                                                                                                                                     |

## Metrics (per scenario: N runs, report median + p75; discard first warm-up run)

- React commit time (React Profiler `actualDuration` via `<Profiler>` wrapper)
- Script time + Style/Layout time (Chrome tracing: `performance_start_trace` /
  `performance_stop_trace` via chrome-devtools MCP, or CDP through Playwright)
- Style-recalculation count + duration (the selector-matching cost side: our
  `:where()`-flat layered selectors + data-attribute selectors vs Griffel's flat
  atomic classes)
- DOM stats: node count, attribute count, className string length (data-attribute
  overhead accounting, per user's concern)
- First-render memory delta if cheaply available (heap snapshot delta)

## Method requirements

- Investigate `apps/perf-test-react-components` FIRST — the repo has an existing perf
  harness; reuse its patterns/scenarios if serviceable, otherwise a dedicated vite
  harness in `.scratch/perf-eval/` importing packed tarballs (consumer-real, no repo
  toolchain).
- Both sides load their real shipped CSS mechanism: Griffel runtime injection BEFORE
  vs `<link>` dist/styles.css + theme artifact AFTER.
- Pin CPU where possible (Playwright CDP `Emulation.setCPUThrottlingRate` 4x for
  stable relative numbers); report raw unthrottled too.
- Output: `migration/griffel-to-tailwind/metrics/perf-eval/{component}-{scenario}.json`
  (fields: component, side, scenario, runs, medianMs, p75Ms, traceSummary, domStats,
  date ISO) + a human report `reports/perf-eval.md` with tables and an honest
  narrative: where we win, where we lose, and whether the data-attribute cost is
  measurable.

## Interpretation guardrails

- Same-machine, same-session pairs only; never compare across machines/sessions.
- No cherry-picking: report all 5 components × 5 scenarios × both sides, even
  unflattering cells.
- The mergeClasses-work hypothesis is tested by the B/D vs A/C deltas BETWEEN sides —
  if Griffel's override scenarios degrade more than ours, the sorting-overhead claim
  is supported; if ours degrade more (selector matching on data-attributes), report
  that with equal prominence.
