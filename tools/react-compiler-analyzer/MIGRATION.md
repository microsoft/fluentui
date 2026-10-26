# Version migration guide

Use this guide when upgrading between package versions. Entries are ordered by target version,
newest first; dates within an entry identify changes made during its development, not release dates.

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
