# Validation Harness

Screenshot-diff validation against the VR storybook (`apps/vr-tests-react-components`,
StoryWright, 1578 stories incl. RTL/dark/high-contrast variants). Fully local — no cloud.

## Per-package workflow (what conversion workers run)

```bash
# 0. once per code state: build the VR storybook (from TS source, ~1.5 min cold)
yarn nx run vr-tests-react-components:build-storybook

# 1. BEFORE converting (on unmodified code): capture baseline
node migration/griffel-to-tailwind/validation/capture.mjs \
  --filter "Divider Converged" \
  --out migration/griffel-to-tailwind/validation/baseline/divider --expect 20

# 2. convert the package, rebuild the storybook

# 3. capture candidate + diff (exit 0 = pixel-clean)
node migration/griffel-to-tailwind/validation/capture.mjs \
  --filter "Divider Converged" \
  --out migration/griffel-to-tailwind/validation/candidate/divider --expect 20
node migration/griffel-to-tailwind/validation/diff.mjs \
  --baseline migration/griffel-to-tailwind/validation/baseline/divider \
  --candidate migration/griffel-to-tailwind/validation/candidate/divider
```

`--filter` is a regex prefix on StoryWright's `kind.name` (e.g. `"Divider Converged"`
matches both `Divider Converged - Horizontal` and `- Vertical`). Find a package's story
kinds in `apps/vr-tests-react-components/src/stories/<Component>/`.

## Rules

- **Same machine, same code-state discipline**: baseline must be captured from the
  storybook built at the pre-conversion commit; candidate from post-conversion. Never mix
  local and CI captures (font/GPU rendering differs).
- **Tolerance starts at zero** (`--maxDiffPixels 0`): same browser + same machine +
  deterministic viewport (1920×964, animations frozen) means CSS-identical ⇒
  pixel-identical. If a diff is pure antialiasing noise, the adjudicating agent may pass
  it with an explicit note and a raised `--maxDiffPixels`, recorded in the ledger.
- **Counts are contract**: `--expect` guards StoryWright's silent-zero failure mode;
  `missing`/`extra` files in the diff are failures (renamed stories must be intentional).
- Diff artifacts land in `<candidate>-diff/` with `summary.json` + per-failure diff PNGs.
- Baseline/candidate PNG directories are **gitignored** (large, reproducible); only
  `summary.json` results get quoted in ledger notes / reports.

## Known caveats (from reports/storybook-vr-infra.md)

- 'ProgressBar converged / Indeterminate + thickness - High Contrast' is occasionally
  flaky (~1 anomalous capture observed in 4 runs, 95px at the animated-gradient tail;
  double-capture comparison proves nondeterminism). On failure: recapture before
  investigating CSS.

- Chromium for Playwright must be installed (`npx playwright install chromium`) — a
  missing browser produces zero screenshots with exit 0; `--expect` catches this.
- The public docsite storybooks do not build on Windows (POSIX-path regex bug in
  react-storybook-addon-export-to-sandbox); the VR storybook is unaffected.
- Griffel-specific VR stories (`MakeStyles*`, `CustomStyleHooks`) are retired by this
  migration (DECISIONS D11) — expected `missing` entries once those land, nothing else.
