# Re-validation sweep — 2026-07-27

## Why

The nx cache hole (DECISIONS.md postmortem, fixed in `b27bf13985`) meant
`vr-tests-react-components:build-storybook` could silently replay a stale cached
bundle whenever a change touched only component packages. Any VR verdict recorded
under those conditions could be a **false pass** (candidate ≡ previous build ≡
baseline). Every verdict predating the fix was therefore suspect, and the
conversion pipeline was gated on a full re-validation.

## How

`sweep-driver` (session scratch) re-captured **every** baseline set — all 24
directories under `validation/baseline/`, filters and expected counts taken from
each set's own `manifest.json` — against a single `--skip-nx-cache` storybook
build of `0367fcc2a3` (which includes the react-infolabel and react-button
unlayered icon-swap fixes). Zero-tolerance diff via `validation/diff.mjs`
(missing/extra = failure). One automatic recapture on failure, both attempts
recorded, so a deterministic failure would show as failed-twice. The capture-side
staleness guard verified the bundle postdated all component sources.

## Result: 24/24 PASS — zero retries needed

| Set                                        | Pairs | Result |
| ------------------------------------------ | ----: | ------ |
| button                                     |   129 | PASS   |
| button-family (Toggle/Compound/Menu/Split) |   342 | PASS   |
| divider                                    |    31 | PASS   |
| menu (mixed-mode probe, unconverted)       |    64 | PASS   |
| react-avatar                               |    49 | PASS   |
| react-badge                                |    36 | PASS   |
| react-checkbox                             |    36 | PASS   |
| react-image                                |     7 | PASS   |
| react-infolabel                            |    10 | PASS   |
| react-input                                |    47 | PASS   |
| react-label                                |    17 | PASS   |
| react-link                                 |   212 | PASS   |
| react-persona                              |     9 | PASS   |
| react-progress                             |    11 | PASS   |
| react-radio                                |    52 | PASS   |
| react-search                               |    49 | PASS   |
| react-select                               |    30 | PASS   |
| react-skeleton                             |    21 | PASS   |
| react-spinner                              |    17 | PASS   |
| react-switch                               |    87 | PASS   |
| react-text / text                          | 6 / 6 | PASS   |
| react-textarea                             |    28 | PASS   |
| react-tooltip                              |    20 | PASS   |

Every set passed on its **first** attempt — including the historically flaky
ProgressBar "Indeterminate + thickness — High Contrast" story.

## Conclusions

- All 23 converted packages plus FluentProvider root styles are genuinely
  pixel-identical to their Griffel baselines on a build that provably contains
  all current sources. The false-pass era is closed.
- The Button icon-swap fix (`0367fcc2a3`) introduced no VR regressions across
  button (129) or the mixed-mode family (342). The fix itself is validated by
  CDP matched-rules evidence (no VR story pairs a subtle appearance with an
  icon, so VR cannot see that defect class — see D2 amendment 5).
- Conversion gate lifted; batch 3 may proceed.
