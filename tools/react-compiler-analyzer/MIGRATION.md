# Version migration guide

Use this guide when upgrading between package versions. Entries are ordered by target version,
newest first; dates within an entry identify changes made during its development, not release dates.

## 0.0.3 to 0.1.0

| Upgrade            | Release date | Guide updated |
| ------------------ | ------------ | ------------- |
| `0.0.3` to `0.1.0` | Unreleased   | 2026-10-30    |

`0.1.0` replaces the production Babel backend with the exact-pinned Oxc React Compiler port and
changes JSON output from schema v2/v3 to strict schema v4. This is a breaking compiler and JSON
contract migration, released as a minor version. Babel and native SWC remain test-only comparison
oracles; the published CLI does not load either.

### Required changes for JSON consumers and configuration

1. Accept `schemaVersion: 4` and update strict validators to the shipped
   [analyze schema](rca.analyze.schema.json) and [lint schema](rca.lint.schema.json).
   Register the analyze schema when validating lint because it supplies shared definitions.
   Strict validators must reject v3 profiles and removed counters rather than relabeling them.
2. Replace `memoStats.memoBlocks`, `memoValues`, `prunedMemoBlocks`, and `prunedMemoValues` with
   the retained `memoSlots` observation. The `summary.reportedMemoCachePositive`,
   `reportedMemoCacheZero`, and `reportedMemoCacheUnavailable` counters still partition accepted
   functions. The slot count is reconstructed from Oxc's gated in-memory output; none of these
   fields proves that a consumer build emitted a cache or cached a particular operation.
3. Update consumers for the truthful `profile` (`backend: "oxc"`, exact compiler-port and parser
   versions, mode and transform options), synthetic gating descriptor, `emittedCaching:
"unverified"`, optional diagnostics/suppression classification, annotation `targets`, and
   justified-lint `evidence`. See the schemas for the complete structures.
4. Remove `parserPlugins` / `--parser-plugin` and `analyze.risks.pathAliases`. Old config keys and
   flags are rejected with migration guidance. The Oxc parser uses native syntax support; Flow and
   unsupported proposal syntax cannot be enabled through plugins.
5. Wrapper resolution now uses the nearest tsconfig for each importer and package metadata.
   `resolveWrappers` defaults on only while a leaf risk rule is configured; set it to `false` to
   disable cross-file traversal. Defaults activate ESM `import`, `node`, and `default` conditions.
   `resolver.additionalConditionNames` opts into conditions such as `source`; this does not reorder
   package export keys. `resolver.mainFields` is an explicit ordered replacement for `["module",
"main"]`, and does not bypass package export restrictions.

If you only use the CLI interactively, re-run reports and review compiler-dependent status changes.
The profile's `noEmit: false` describes the in-memory transform used for analysis, not a source
write. Synthetic gate output does not establish consumer-build output, runtime safety, or
performance gains.

### Measured compiler differences that cannot be ported

The exploratory comparison covered 3,554 TypeScript/TSX files using Babel core `7.28.5` plus
`babel-plugin-react-compiler@1.0.0` versus `oxc-transform-react@0.156.0`. It was a bounded probe,
not a completed whole-tool parity run or a guarantee about another consumer build. The live
integration harness separately records the exact merged-baseline Babel version, Oxc/parser
versions, native binding target, source hash, transform options, diagnostics, output inspection,
and runtime checks for each fixture.

| Observation                 | Measured difference                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accepted/rejected functions | About 3,463 files had matching statuses and messages. Oxc compiled 8 files where Babel bailed on unsupported HIR cases; Oxc rejected one file (`DirSwitch.tsx`) that Babel accepted due to exhaustive manual-memo dependency validation.                                                                                                                                                                                                                       |
| Diagnostics                 | About 77 files retained the same outcome with different diagnostic wording; 5 had a different number of errors. Oxc labels use UTF-8 byte offsets and have different descriptions/code frames.                                                                                                                                                                                                                                                                 |
| Reported memo statistics    | Oxc has no equivalent for Babel's `memoBlocks`, `memoValues`, `prunedMemoBlocks`, or `prunedMemoValues`. Schema v4 removes them. Oxc `memoSlots` are reconstructed from generated `_c(N)` calls.                                                                                                                                                                                                                                                               |
| Success and skip telemetry  | Oxc has no compiler logger. Accepted functions are reconstructed from the synthetic gate; candidate opt-outs require a supplemental probe. Ambiguous source mappings are backend failures, not guessed attribution.                                                                                                                                                                                                                                            |
| Grammar                     | Decorators, auto-accessors, import attributes, explicit resource management, TypeScript namespaces/enums, and `.ts` angle assertions are natively parsed. Flow and unsupported stage-0/2 proposals are not configurable and become unparseable.                                                                                                                                                                                                                |
| Outlined closure runtime    | In the bounded arrow-function fixture, Babel 7.29.7, native SWC 1.15.47, and Oxc 0.156.0 each emitted output that raised `ReferenceError: factory is not defined` in the stubbed runtime. The function-declaration control did not throw. Babel/Oxc reported analyzer success; SWC has no acceptance telemetry. This is a fixture-level observation, not a runtime-safety guarantee. See [the reproduction](docs/upstream-react-compiler-outlined-closure.md). |
| Lint and edits              | Directive statuses, justified-probe outcomes, CI exits, and proposed source edits are compiler-dependent. Oxc differences must be reviewed against the live lint fixtures; aggregate acceptance results are not a lint-parity measurement.                                                                                                                                                                                                                     |

The frozen directive fixture run (Babel core `7.29.7` with compiler `1.0.0` versus Oxc
`0.156.0`) records these reviewed status changes in
`src/__tests__/__fixtures__/lint-baseline/reviewed-oxc-deltas.json`:

- In `infer`, `annotation`, and `all` modes, a module-level `'use no memo'` causes an explicit
  function-level `'use memo'` (`FileOptIn`) to move from active under Babel to broken under Oxc.
  The opt-in remains unchanged, so lint exits nonzero, including with `--fix`.
- In `all` mode, the same module guard makes the ordinary function-level `FileOptOut` move from
  active under Babel to redundant under Oxc. Fixing removes only that function directive and
  preserves the module guard.
- In `all` mode, a justified `Protected` opt-out moves from active under Babel to redundant under
  Oxc because revalidation preserves the module guard. It remains report-only: `--fix` preserves
  the directive and its exact justification.
- In `all` mode, the native TypeScript angle assertion in `native.ts` moves from redundant under
  Babel (BuildHIR rejection) to active under Oxc. `--fix` adds justification to the ordinary
  opt-out instead of removing it; revalidation remains report-only after the fix.
- The fixture's `lint --fix` cases now exit 1 when the still-broken `FileOptIn` remains. The Babel
  baseline exited 0 after its fix pass without that remaining Oxc failure.

Warning and Advice diagnostics are visible on stderr and in human reports but do not alone reject
functions or fail lint. Acceptance still requires independently verified gate attribution. Fatal,
unknown-severity, unmappable, or inconsistent error-plus-success evidence fails closed.

Suppression-related rejections retain diagnostics and risk findings but stay ineligible for
automatic annotation. Annotation `targets` retain rationale, reported-slot state, emitted-caching
uncertainty, and risk rules. Zero or unavailable slots do not disqualify preventive opt-outs.
Justified revalidation reports before/after outcomes and slot statistics; `emittedOptimization:
"not-measured"` is not evidence that a guard is universally redundant.

Do not blanket-refresh Babel or SWC baselines to match Oxc. Existing Babel/SWC observations remain
frozen; Oxc output is recorded separately and each changed outcome, cache layout, export, diagnostic,
or runtime result needs an explicit explanation. Review all source edits against the consumer build,
then run application behavior tests.

### Whole-command benchmark and attribution audit

The final audit used 3,216 frozen v9 production files, three runs per workload, and concurrency 1.
The corpus manifest SHA-256 was
`f6e2c03a712333b79521c17d41bd0eb367088e4f0600e4fb89688bb5b7b7739d`.

| Workload                      | Babel median (ms) | Oxc median (ms) | Babel/Oxc ratio |
| ----------------------------- | ----------------- | --------------- | --------------- |
| Analyze, risks off            | 16,093            | 10,474          | 1.54×           |
| Analyze, risks on             | 32,600            | 11,361          | 2.87×           |
| Lint                          | 2,961             | 1,437           | 2.06×           |
| Lint `--fix`, isolated copies | 3,159             | 2,164           | 1.46×           |
| Justified revalidation        | 3,391             | 2,048           | 1.66×           |

Median peak RSS showed a native memory tradeoff: plain analyze increased from 467,184 to
673,712 KiB (+44%), analyze with risks from 931,088 to 1,028,144 KiB (+10%), while lint decreased
from 243,504 to 173,872 KiB (-29%). These shared-host timings describe this workload, not promised
speedups, memory bounds, or runtime safety.

Compiled functions increased from 797 to 803 (six newly accepted). Thirty-six former Babel errors
became native Advice/Warning-only diagnostics; each diagnostic label was matched to its exact
original function. Fifteen `memoSlots` observations changed. The audit found no unexplained
attribution or candidate losses.

All 26 production lint directives retained their statuses, IDs, and exit behavior. Both backends
made the same single source edit on isolated full-input copies. This production-corpus result
does not supersede the four synthetic-fixture native deltas documented above.

The reusable [benchmark target](README.md#local-development) records timings, memory, transform
counts, and row differences. Its `--audit-only` option rechecks an existing report using the
recorded manifest and native diagnostics without repeating the timed workloads.

## 0.0.2 to 0.0.3

| Upgrade            | Release date | Guide updated |
| ------------------ | ------------ | ------------- |
| `0.0.2` to `0.0.3` | Unreleased   | 2026-10-21    |

`0.0.3` is a non-breaking patch release. Removing TypeScript lowering fixes unnecessary
transform failures: previously rejected files can now contribute functions, findings, and
annotation targets, and analysis observes original TypeScript nodes rather than lowered nodes.
Re-run saved coverage/risk baselines and preview source-writing operations before applying them.
Verbose human output also changes; scripts that consume it should use JSON instead.

This is not a JSON schema-version migration. Default CLI options, default JSON shapes, and
existing field meanings remain compatible with schema version 2. The new workflow flags are
opt-in, and their optional JSON fields require the updated schema for strict validation.

### Changes and migration actions

- TypeScript is parsed without the TypeScript-to-JavaScript preset. Mutable namespace exports,
  `import = require(...)`, and `export =` no longer fail solely because of Babel lowering
  limitations. JSX remains extension-sensitive, auto-accessors are accepted, and decorators
  remain explicitly configured. This does not establish native React Compiler parity.
- `lint --revalidate-justified` rechecks both memo directive kinds against the selected Babel
  mode. Justified directives remain report-only even with `--fix`; redundant, broken, and
  conflicting results cause a nonzero exit. Explicitly revalidated justified JSON rows add
  `justified: true` and `revalidated: true`. Default justified skipping is unchanged.
- `analyze --annotate <mode> --dry-run` previews the same edits as write mode without writing.
  JSON actual write counters stay zero, with `annotate.dryRun: true` and `annotate.planned`
  containing projected counters. `--dry-run` without `--annotate` is an error.
- JSON remains schema version 2; default shapes and existing field meanings are unchanged.
  Consumers validating the new opt-in fields against an older strict schema must use the
  updated schema. No backend or version provenance is added to JSON.
- Verbose human output now identifies the Babel and Babel React Compiler versions.

Before applying new annotations, review the proposed targets:

```bash
react-compiler-analyzer analyze ./src --mode infer --annotate all-safe --dry-run
```

To reassess historical justifications explicitly, use the mode assumed by your build:

```bash
react-compiler-analyzer lint ./src --mode infer --revalidate-justified
```

Neither command above modifies source. Justified directives remain protected even if a later
lint invocation includes `--fix`. Babel-specific conclusions do not establish that a directive
is redundant for a native compiler or for another consumer build.

## Experimental builds to 0.0.1

| Upgrade                                  | Release date | Guide updated |
| ---------------------------------------- | ------------ | ------------- |
| Published experimental builds to `0.0.1` | Unreleased   | 2026-10-08    |

`0.0.1` is the prepared first release, not a published version yet. The changes below apply when
migrating from the experimental CLI to that release. The JSON `schemaVersion` is a separate
contract version; it does not identify the installed package version.

### JSON output: schema v1 to v2 (2026-09-17)

The machine-readable output remains compact, but `schemaVersion` is now `2` because the analyzer
normalizes compiler events into one canonical result per source function. The version bump is about
contract correctness, not a larger payload.

`analyze --format json` continues to emit the same top-level collections:

```text
summary
functions[]
findings[]
unparseable[]
annotate (only with --annotate)
```

The current document is validated by [`rca.analyze.schema.json`](rca.analyze.schema.json).

#### Analyze changes

| v1                                                            | v2                                                                                           | Migration                                                                                            |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `functions[].name`                                            | `functions[].function`                                                                       | Rename the property when reading function names.                                                     |
| `findings[].rule`                                             | `findings[].ruleId`                                                                          | Rename the property when reading risk rules.                                                         |
| `findings[].suppressed: "use no memo"`                        | `findings[].suppressed: true`                                                                | Test for `=== true`; the only supported suppression remains `'use no memo'`.                         |
| Missing compiler memo counters were emitted as `0`            | Missing counters are `null`; genuine zero remains `0`                                        | Treat `null` as “compiler did not report this counter.”                                              |
| Emitted memo caches had to be derived from function rows      | `summary.memoCacheEmitted` counts compiler-accepted functions with `memoStats.memoSlots > 0` | Use the summary counter when only the aggregate emitted-cache metric is needed.                      |
| A function could appear once per compiler event or diagnostic | A source function appears once with its final ordered status                                 | Do not infer attempt counts from `functions.length`.                                                 |
| Error locations were not projected separately                 | Error rows may include `errorLine` and `errorColumn`                                         | Use these fields for the diagnostic location; `line` and `column` identify the function declaration. |
| `package` was always typed as a string                        | `package` may be `null` when no package can be attributed                                    | Handle unattributed files explicitly.                                                                |

The following fields remain available with the same meaning:

- `file`, `package`, `line`, `column`, `status`, and `compilerEvent` on function rows.
- `file`, `package`, `line`, `column`, `severity`, `symbol`, `message`, `function`, and `compiled`
  on findings.
- `summary`, `unparseable`, and the optional `annotate` outcome.

#### Canonical terminal status

Compiler events are reduced in their original order:

- an error followed by success is `compiled`;
- success followed by an error is `error`;
- a final skip is `skipped`;
- consecutive duplicate events do not create duplicate function rows.

This makes function counts stable and prevents retries from being mistaken for separate functions.

#### Example consumer update

Before:

```bash
jq '.functions[] | {name, rule: null}'
jq '.findings[] | select(.rule == "nonreactive-store-read" and .suppressed == "use no memo")'
```

After:

```bash
jq '.functions[] | {name: .function}'
jq '.findings[] | select(.ruleId == "nonreactive-store-read" and .suppressed == true)'
```

#### Intentionally not included

The v2 document does not serialize the analyzer's complete AST inventory, source spans, raw compiler
event stream, code frames, Git provenance, resolver statistics, or human-review candidate lanes.
Those fields made large reports and peak memory materially worse without improving the normal
machine-readable workflow.

`lint --format json` also reports `schemaVersion: 2`. Its compact shape is unchanged except that
directive rows now include `column` for precise source locations and `package` may be `null`.

### Configuration: separate risk settings to rca.config.json (2026-09-03)

Risk detection previously used a separate `risk.config.json` (or another JSON file selected with
`--risk-config`). Its fields now live under `analyze.risks` in the shared `rca.config.json`.

#### Move the risk configuration

Before:

```jsonc
// risk.config.json
{
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/risk-config.schema.json",
  "detectGetStateReads": true,
  "storeAccessorPattern": "Store$",
  "selectorHookProperties": ["use"],
  "resolveWrappers": true,
  "pathAliases": {
    "baseUrl": "./src",
    "paths": {
      "@app/*": ["app/*"]
    }
  }
}
```

```bash
react-compiler-analyzer analyze ./src --risk-config ./risk.config.json
```

After:

```jsonc
// rca.config.json
{
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json",
  "analyze": {
    "risks": {
      "detectGetStateReads": true,
      "storeAccessorPattern": "Store$",
      "selectorHookProperties": ["use"],
      "resolveWrappers": true,
      "pathAliases": {
        "baseUrl": "./src",
        "paths": {
          "@app/*": ["app/*"]
        }
      }
    }
  }
}
```

```bash
# Uses ./rca.config.json from the current working directory.
react-compiler-analyzer analyze ./src

# Or select another unified config explicitly.
react-compiler-analyzer --config ./config/rca.config.json analyze ./src
```

The risk rule names and meanings did not change; only their location changed. Move these keys
unchanged under `analyze.risks`:

- `detectGetStateReads`
- `storeAccessorPattern`
- `selectorHookProperties`
- `resolveWrappers`
- `pathAliases`

#### Configuration behavior changes

- `--risk-config` was removed. Use the global `--config <path>` option.
- `risk-config.schema.json` was replaced by `rca.config.schema.json`.
- The optional default file is `./rca.config.json` in the current working directory. Parent
  directories are not searched.
- The unified file can also provide stable defaults shared by `lint` and `analyze`, including
  `mode`, `verbose`, `concurrency`, `exclude`, `format`, `strictPaths`, and `parserPlugins`.
- Analyze-specific settings live under `analyze`, including `quote` and `risks`.
- CLI arguments override values from the config file.
- `pathAliases.baseUrl` remains relative to the file containing the configuration. After migration,
  that means the selected `rca.config.json`, not the former risk config file.
- `--annotate` and `--fix` remain explicit command-line operations and cannot be persisted in the
  config.
