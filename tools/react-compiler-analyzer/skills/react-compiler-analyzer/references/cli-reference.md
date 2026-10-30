# CLI reference

## Resolve the local command

Use the repository's package manager and its installed binary:

```bash
# Yarn
yarn exec react-compiler-analyzer --help

# pnpm
pnpm exec react-compiler-analyzer --help

# npm
npx --no-install react-compiler-analyzer --help
```

If the binary is unavailable, ask the user to add `@fluentui/react-compiler-analyzer` to the
repository rather than installing another version globally.

## Initialize

```bash
react-compiler-analyzer init
react-compiler-analyzer init --yes
react-compiler-analyzer init --config ./path/to/rca.config.json
```

`init` creates a config with `infer`, human-friendly CLI output, and the analyzer's test/story/E2E
file and directory exclude defaults. It also installs this skill into the repository's
`.agents/skills/react-compiler-analyzer` directory.
When this repository skill is already active and only the config is missing, use
`init --yes --no-skill` to avoid an unrelated skill-update decision.

## Analyze

Prefer JSON when an agent consumes the result:

```bash
react-compiler-analyzer analyze <paths...> --format json
```

Use verbose human output to investigate specific diagnostics:

```bash
react-compiler-analyzer analyze <paths...> --format cli --verbose
```

Important JSON fields:

The Oxc-backed release emits schema v4. For scripts written against the Babel-backed v0.0.3
contract, update strict validators to the shipped schemas; v3 documents are not valid v4 input.

- `summary.compiled`: functions accepted by the compiler.
- `summary.reportedMemoCachePositive`, `reportedMemoCacheZero`, `reportedMemoCacheUnavailable`:
  accepted functions partitioned by reconstructed Oxc `memoSlots`, not consumer emitted-code
  evidence (schema v4).
- `profile`: exact Oxc compiler-port/parser versions and settings, including source maps and the
  synthetic gate used for source-function attribution. `compilerVersion` identifies the
  `oxc-transform-react` package, not an independently verified upstream compiler version.
- `emittedCaching: "unverified"`: normal analysis does not inspect emitted code.
- `functions[].status`: canonical compiler outcome.
- `functions[].memoStats.memoSlots`: positive or zero reported slots; absent/null means unavailable.
  These statistics do not establish actual emission or that the risky operation was cached.
- `functions[].rejectionKind: "suppression-related"`: compiler-backed suppression rejection.
  Another compiler/profile may optimize it; do not automatically annotate rejected functions.
- `functions[].manualMemo`: evidence for manual `useMemo`, `useCallback`, or `React.memo`.
- `findings[]`: configured runtime-risk findings.

A Manual Memo Migration Candidate is a compiled function with `manualMemo` evidence and no
`'use no memo'` bailout. It is a migration-review signal, not a performance guarantee.

## Lint directives

```bash
react-compiler-analyzer lint <paths...> --format json
```

Use lint as a CI health gate for `'use memo'` and `'use no memo'`. A nonzero exit reports redundant,
broken, or conflicting directives according to the configured compiler mode.
Use `--revalidate-justified` to compare acceptance and reported statistics for justified directives.
JSON `evidence` records before/after observations, not emitted optimization. A redundant result
applies only to the analyzed profile. Justified guards stay protected even with `--fix`;
unjustified redundant guards retain existing removal eligibility.

## Source mutations

Only run these after explicit user approval:

```bash
react-compiler-analyzer analyze <paths...> --annotate manual-memo
react-compiler-analyzer lint <paths...> --fix
```

After any mutation, review the diff and rerun the matching command without mutation flags.
Use `--annotate <mode> --dry-run` to preview edits and their rationale without writing source.
Preventive opt-outs remain eligible with zero or unavailable statistics. Run application
behavior tests before accepting guard changes.
