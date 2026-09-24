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

- `summary.compiled`: functions accepted by the compiler.
- `summary.memoCacheEmitted`: accepted functions with retained memo caching.
- `functions[].status`: canonical compiler outcome.
- `functions[].memoStats.memoSlots`: positive means a memo cache was emitted; zero means accepted
  without one; absent means not reported.
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

## Source mutations

Only run these after explicit user approval:

```bash
react-compiler-analyzer analyze <paths...> --annotate manual-memo
react-compiler-analyzer lint <paths...> --fix
```

After any mutation, review the diff and rerun the matching command without mutation flags.
