# @fluentui/react-compiler-analyzer

Understand how React Compiler handles your TypeScript components and hooks before changing your
build. Inspect compiler coverage, review existing memoization, and check that compiler directives
still do what you intended.

| Command   | Use it to                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| `analyze` | Inspect coverage and manual-memo migration candidates; optionally detect runtime risks or insert directives. |
| `lint`    | Validate `'use memo'` and `'use no memo'` directives, locally or in CI.                                      |
| `init`    | Create a repository configuration, with an optional Agent Skill installation.                                |

This is a command-line tool, not a React runtime dependency. There is no public JavaScript API.
Compiler acceptance is not a guarantee of runtime safety or a prediction of performance gains.
Outcomes come from the exact-pinned Oxc React Compiler port, not from Babel, SWC, or your
application's native compiler integration. Parsing the same syntax does not establish equal
eligibility, bailouts, emitted caches, runtime exports, performance, or runtime safety. Babel and
native SWC are retained only as test oracles for the bounded integration harness.

## Quick start

Requires Node.js 22.14.0 or newer within 22.x, or Node.js 24.x. Install the published package as a development dependency:

```bash
npm install --save-dev @fluentui/react-compiler-analyzer
```

To run the CLI from this repository, see [local development](#local-development).

Create a config without installing agent tooling, then inspect your source:

```bash
npx react-compiler-analyzer init --yes --no-skill
npx react-compiler-analyzer analyze ./src --mode infer --verbose
```

For directive lint, select the mode your build actually uses:

```bash
npx react-compiler-analyzer lint ./src --mode annotation
```

Neither scan command modifies source unless you explicitly pass `analyze --annotate` or
`lint --fix`. Review the diff and run your application's tests after either operation.

## Reference and guides

- [Commands](#commands): every command and command-specific option.
- [Shared options](#shared-options): paths, compilation modes, exclusions, syntax support, and formats.
- [Configuration](#configuration): stable defaults and optional risk rules.
- [JSON output](#--format-json): machine-readable fields and schemas.
- [Upgrading](#upgrading): compatibility notes and migration instructions.
- [Documentation contents](docs/README.md): migration workflows, runtime risks, and implementation details.

## Upgrading

See the [version migration guide](MIGRATION.md) for release-specific changes, compatibility
considerations, and upgrade instructions.

## Configuration

`analyze` and `lint` read stable defaults from an optional `rca.config.json` in the current working
directory. Use `--config <path>` to select a different file. RCA does not search parent
directories. When no implicit config exists, the built-in defaults apply.

Use `init` for the minimal first-time config:

```json
{
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json",
  "mode": "infer",
  "format": "cli",
  "exclude": [
    "**/node_modules/**",
    "**/*.d.ts",
    "**/__tests__/**",
    "**/testing/**",
    "**/__mocks__/**",
    "**/*.spec.*",
    "**/*.test.*",
    "**/*.stories.*",
    "**/*.cy.*",
    "**/*.e2e.*",
    "**/e2e/**"
  ]
}
```

`init` offers `infer` and `annotation`, with `infer` selected by default because `analyze` is the
primary workflow. It also persists the analyzer's current default excludes, including dependency
directories, declarations, Cypress, and E2E files and directories. It does not offer `all`. Re-running it preserves custom excludes and other valid
advanced settings already present in the file. An invalid existing config requires confirmation,
or `--yes --force` in a non-interactive environment.

```jsonc
{
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json",
  "mode": "infer",
  "concurrency": 10,
  "exclude": ["**/__tests__/**", "**/*.test.*"],
  "analyze": {
    "quote": "single",
    "risks": {
      "detectGetStateReads": true,
      "storeAccessorPattern": "Store$",
      "selectorHookProperties": ["use"]
    }
  }
}
```

The shipped `rca.config.schema.json` provides editor validation and is also used for runtime
validation. Unknown keys, invalid nested values, and malformed `storeAccessorPattern` regexes
fail at config load before scanning. Explicit CLI options override config values. Removed Babel-only
settings such as `parserPlugins` and `analyze.risks.pathAliases` are rejected with migration guidance;
they are not silently ignored.

Scan paths remain required positional arguments. Source-writing operations are intentionally not
persistent configuration: use `--annotate` and `--fix` explicitly on each run.

| Config key                                        | Type       | Default or meaning                                                                     |
| ------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| `$schema`                                         | `string`   | Optional schema reference for editors.                                                 |
| `mode`                                            | `string`   | `infer`; also accepts `annotation`, `all`.                                             |
| `format`                                          | `string`   | `cli`; also accepts `md`, `html`, `json`.                                              |
| `verbose`                                         | `boolean`  | `false`.                                                                               |
| `concurrency`                                     | `integer`  | `10`; minimum 1.                                                                       |
| `exclude`                                         | `string[]` | Replaces the default directory-scan exclusions.                                        |
| `strictPaths`                                     | `boolean`  | `false`.                                                                               |
| `analyze.quote`                                   | `string`   | `single`; also accepts `double`.                                                       |
| `analyze.risks.detectGetStateReads`               | `boolean`  | `false`; detect imperative `.getState()` snapshots.                                    |
| `analyze.risks.storeAccessorPattern`              | `string`   | Unset; regex matching non-hook store-accessor names.                                   |
| `analyze.risks.selectorHookProperties`            | `string[]` | `[]`; property names identifying hidden selector hooks.                                |
| `analyze.risks.resolveWrappers`                   | `boolean`  | `true` when any leaf risk rule is enabled; `false` opts out.                           |
| `analyze.risks.resolver.additionalConditionNames` | `string[]` | Extra package `exports` conditions; defaults remain ESM (`import`, `node`, `default`). |
| `analyze.risks.resolver.mainFields`               | `string[]` | Ordered replacement for the default `module`, `main` entry fields.                     |

Wrapper resolution runs only while risk analysis has at least one leaf rule configured. It follows
first-party `.ts`, `.tsx`, `.mts`, `.js`, and `.mjs` targets resolved from each importing file's
tsconfig or package metadata. It does not follow `node_modules`, CommonJS implementations, type
declarations, or redirect unbuilt `dist` paths to source. Unresolved first-party imports are reported;
they are not proof that no additional risk exists.

The resolver uses normal ESM conditions (`import`, `node`, `default`) by default. To opt into a
package's source export condition, configure it explicitly; `additionalConditionNames` activates a
condition but does not reorder the package's `exports` keys:

```jsonc
{
  "analyze": {
    "risks": {
      "detectGetStateReads": true,
      "resolver": {
        "additionalConditionNames": ["source"],
        "mainFields": ["source", "module", "main"]
      }
    }
  }
}
```

`mainFields` is an ordered replacement for the default `["module", "main"]` and applies only when
package `exports`/`imports` do not select a target. Opting into `source` can inspect a different
implementation from the consumer's build; verbose resolver diagnostics identify the active policy
and resolved file. It is not build-output parity or a `dist`-to-source redirect.

### Optional agent integration

The npm package ships the canonical skill at `skills/react-compiler-analyzer`. By default, `init`
copies it to the consuming repository's `.agents/skills/react-compiler-analyzer` directory.
Copilot and other Agent Skills-compatible tools can then discover it from the repository rather
than from `node_modules`.

The skill is not required to use the CLI. The persisted output default remains human-friendly
`cli`; automation can select `--format json` explicitly.

The repository copy is never silently overwritten. Identical content is a no-op; a different copy
requires interactive confirmation or `--force`. Use `--no-skill` to initialize only the config:

```bash
react-compiler-analyzer init --no-skill
```

After adding or updating the skill, reload active agent sessions (for GitHub Copilot CLI,
`/skills reload`).

## Commands

### init

```bash
react-compiler-analyzer init [options]
```

| Flag          | Type      | Default | Description                                                               |
| ------------- | --------- | ------- | ------------------------------------------------------------------------- |
| `--config`    | `string`  | _(1)_   | Config file to create or update                                           |
| `--yes`, `-y` | `boolean` | `false` | Accept recommended defaults without prompting                             |
| `--force`     | `boolean` | `false` | Replace an invalid config or a differing installed skill                  |
| `--skill`     | `boolean` | `true`  | Copy the packaged skill to the repository; use `--no-skill` to disable it |

_(1)_ Defaults to `./rca.config.json`.

Without `--yes`, init requires an interactive terminal. The config is replaced atomically, and
cancelling the final confirmation leaves both config and skill unchanged.

### lint

```bash
react-compiler-analyzer lint <paths..> [options]
```

Scans one or more files or directories for both `'use no memo'` and `'use memo'` directives. `--mode` controls what compilation strategy is assumed.

#### Status categories

| Status        | Meaning                                                    | Exit code |
| ------------- | ---------------------------------------------------------- | --------- |
| `redundant`   | Directive has no effect                                    | **1**     |
| `active`      | Directive is valid (compilable or intentionally opted out) | 0         |
| `broken`      | Opt-in compilation or an opt-out probe fails               | **1**     |
| `conflicting` | Both `'use no memo'` and `'use memo'` on same function     | **1**     |
| `skipped`     | Has a justification comment, or is a file-level opt-out    | 0         |

Files that cannot be parsed or compiled are reported separately and fail the lint gate,
even if no directive status could be derived. `--fix` does not modify these files.

#### Options and fixes

| Flag                     | Type      | Default | Description                                                                                     |
| ------------------------ | --------- | ------- | ----------------------------------------------------------------------------------------------- |
| `--fix`                  | `boolean` | `false` | Remove redundant opt-outs, justify active opt-outs, and resolve conflicts.                      |
| `--revalidate-justified` | `boolean` | `false` | Recheck both kinds of justified function directive against Oxc; never fix justified directives. |

All shared options apply. `--fix` removes redundant `'use no memo'` directives, adds
`// justified: <reason>` to active ones, and resolves conflicts by keeping `'use memo'`.
It does not repair broken opt-ins, remove file-level opt-outs, or change directives whose probes
fail. JSON output describes the post-fix statuses and failures.

By default, directives with a `// justified:` comment are skipped. Use `--revalidate-justified`
to recheck both directive kinds in the selected compiler mode. Redundant, broken, or conflicting
results fail lint, but justified directives and their comments remain untouched even with `--fix`.
File-level directives remain preserved. Results describe Oxc acceptance, not runtime safety or
removability in another build. See [directive probing](docs/how-it-works.md#directive-probing)
for implementation details.

| Directive and scenario                          | `infer`       | `annotation`  |
| ----------------------------------------------- | ------------- | ------------- |
| `'use no memo'` on a compilable named component | `active`      | `redundant`   |
| `'use no memo'` on a non-compilable function    | `redundant`   | `redundant`   |
| File-level `'use no memo'`                      | `skipped`     | `skipped`     |
| Opt-out probe fails                             | `broken`      | `broken`      |
| Both directives on one function                 | `conflicting` | `conflicting` |
| `'use memo'` on a compilable named component    | `active`      | `active`      |
| `'use memo'` on a non-compilable function       | `broken`      | `broken`      |

```bash
react-compiler-analyzer lint ./src --mode annotation
react-compiler-analyzer lint packages/button/src packages/menu/src --mode infer
react-compiler-analyzer lint ./src/Widget.tsx --verbose
react-compiler-analyzer lint ./src --fix
react-compiler-analyzer lint ./src --revalidate-justified
```

An empty risk report does not prove an opt-out is safe to remove. Review `suppressed: true` findings
with the same risk config used when adding the opt-out. See the
[opt-out review workflow](docs/migration-workflow.md#review-existing-opt-outs).

### analyze

```bash
react-compiler-analyzer analyze <paths..> [options]
```

Reports accepted, skipped, and errored functions. Accepted functions are separated by positive,
zero, or unavailable reported memo-slot statistics. Actual emitted caching is unverified:
analysis inspects Oxc's in-memory client transform and never writes transformed source files.
Acceptance alone is not an optimization signal.
The default report shows package and aggregate summaries; `--verbose` adds per-function results,
candidate review details, risk findings, parse failures, and full code-framed diagnostics.

Completed scans exit 0 even with attributed per-function compiler errors or advisory risks. Parse
failures produce a report but exit 1. Unattributed compiler errors and non-parse transform errors
abort with code 1 before a JSON document or annotation writes are produced.

| Flag         | Type      | Default  | Description                                                                      |
| ------------ | --------- | -------- | -------------------------------------------------------------------------------- |
| `--annotate` | `string`  | Not set  | Write directives using a mode below.                                             |
| `--quote`    | `string`  | `single` | Quote style for written directives: `single` or `double`.                        |
| `--dry-run`  | `boolean` | `false`  | Preview `--annotate` insertions without modifying source; requires `--annotate`. |

All shared options apply.

Use `analyze --annotate <mode> --dry-run` to list proposed insertion targets and counts without
modifying source. Ordinary `analyze` is already read-only. Dry-run is not a persistent config setting.

| Annotation mode | Writes `'use memo'` on                                                      | Writes `'use no memo'` on                 |
| --------------- | --------------------------------------------------------------------------- | ----------------------------------------- |
| `manual-memo`   | Accepted functions with detected `useMemo`, `useCallback`, or `React.memo`. | Nothing.                                  |
| `all`           | Every accepted function.                                                    | Nothing.                                  |
| `all-safe`      | Accepted functions without configured risks.                                | Accepted functions with configured risks. |
| `bailout-only`  | Nothing.                                                                    | Accepted functions with configured risks. |

Annotations are inserted at the start of the function body. Existing directives are left unchanged;
repeating the operation does not insert duplicates. Without risk rules, `all-safe` behaves like
`all`, and `bailout-only` writes nothing. Neither is a runtime-safety proof.

Discover new candidates with `--mode infer` or `--mode all`; `annotation` considers only functions
already carrying `'use memo'`. The scan mode does not change your build configuration. For choosing
annotations for your build mode, see the [migration workflow](docs/migration-workflow.md).

Candidates are accepted functions with detected manual memoization and no opt-out. Detection
includes nested memo/forwardRef wrappers and anonymous inner components. Custom comparators need
separate review; the analyzer does not remove hooks or wrappers. Human-review candidate labels are
not a performance ranking or part of the JSON API. See [report interpretation](docs/how-it-works.md).

```bash
react-compiler-analyzer analyze ./src --verbose
react-compiler-analyzer analyze packages/button/src packages/menu/src --mode infer
react-compiler-analyzer analyze ./src --mode infer --annotate manual-memo
react-compiler-analyzer analyze ./src --mode infer --annotate all-safe --quote double
```

#### Runtime-risk rules

Rules are disabled by default, advisory, and never change the exit code. Configure only patterns
that match your application under `analyze.risks`.

| Rule                     | Pattern                                                                      | Severity                                                     |
| ------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `nonreactive-store-read` | Imperative `.getState()` snapshots or configured non-hook accessor reads.    | `high` for `.getState()`, `medium` for configured accessors. |
| `hidden-selector-hook`   | Hidden hooks behind configured property chains, such as `store.use.field()`. | `high`.                                                      |

Optional chaining is supported. Wrapper resolution is enabled by default when a leaf risk rule is
configured; set `resolveWrappers: false` to limit detection to the scanned source. The Oxc resolver
uses the nearest tsconfig for each importer, follows first-party ESM package exports, and stops at
third-party packages, CommonJS, declarations, and dynamic/inferred dispatch. Inspect resolver
diagnostics rather than assuming no findings means every import was resolved.

Reports distinguish compiled risks, risks suppressed by `'use no memo'`, and risks in functions not
compiled. See [runtime-risk detection](docs/runtime-risks.md) for examples and limitations.

## Shared options

| Argument / Flag  | Type       | Default | Description                                                                                                                        |
| ---------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `<paths..>`      | `string[]` | —       | **Required.** One or more files or directories to scan for `.ts`/`.tsx` files. Excludes are not applied to explicitly passed files |
| `--mode`         | `string`   | `infer` | Compilation strategy: `infer`, `annotation`, or `all`.                                                                             |
| `--format`       | `string`   | `"cli"` | Output format: `cli`, `md`, `html`, or `json` (machine-readable)                                                                   |
| `--verbose`      | `boolean`  | `false` | Print detailed compiler events and full code-framed diagnostics                                                                    |
| `--concurrency`  | `number`   | `10`    | Max parallel file processing                                                                                                       |
| `--exclude`      | `string[]` | _(1)_   | Glob patterns to exclude                                                                                                           |
| `--strict-paths` | `boolean`  | `false` | Fail instead of warning when a given path does not exist                                                                           |
| `--config`       | `string`   | —       | Use this RCA config instead of an optional `./rca.config.json`                                                                     |

_(1)_ Default excludes: `**/node_modules/**`, `**/*.d.ts`, `**/__tests__/**`, `**/testing/**`, `**/__mocks__/**`, `**/*.spec.*`, `**/*.test.*`, `**/*.stories.*`, `**/*.cy.*`, `**/*.e2e.*`, `**/e2e/**`

`--help` displays command help, and `--version` displays the CLI version. `--config` is global and
can precede the command. Table defaults are built-in values; config values override them, and
explicit CLI options take precedence over the config.

### Syntax support

JSX is enabled by default only for `.tsx`. The analyzer also accepts `.ts` angle-bracket
assertions and TypeScript auto-accessors; decorators, import attributes, and explicit resource
management use Oxc's native parser support. Parsing a file does not guarantee React Compiler
acceptance. Flow and unsupported stage-0/1/2 proposal syntax cannot be enabled with parser plugins;
such inputs are reported as unparseable.

The Babel-only `--parser-plugin` flag and `parserPlugins` config key have been removed. Passing
either produces an actionable migration error. There is no parser-plugin setting to mirror in
RCA; the accepted grammar is determined by Oxc and the source extension.

Verbose human reports identify the Oxc React Compiler port and parser versions. JSON records the
same exact versions and compiler settings in `profile`.

### Missing paths

A path that does not exist is **skipped with a warning** rather than aborting the run, so a sparse
checkout does not need a pre-filter step. The run only fails if _no_ given path exists. A path that
exists but is not a `.ts`/`.tsx` file is always fatal — that is a typo, not a missing checkout.
Pass `--strict-paths` to fail on the first missing path instead.

### Path resolution

`<paths..>` accepts any mix of directories and files, resolved **independently per path**:

| Path kind         | Behavior                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Directory**     | Recursively scanned for `.ts`/`.tsx` files. `--exclude` globs **are** applied.                            |
| **Explicit file** | Analyzed as-is. `--exclude` globs are **bypassed** — naming a file selects it even if a glob excludes it. |

Files discovered across all paths are **de-duplicated by absolute path**, so overlapping arguments are safe — e.g. passing a directory together with a file inside it analyzes that file once, not twice. This also means a file explicitly named alongside its containing directory is never double-processed (or double-annotated/fixed).

```bash
# Directory (excludes apply) + two explicit files (excludes bypassed), all analyzed once
react-compiler-analyzer analyze \
  src/components/Foo/ \
  src/components/Bar.styles.ts \
  src/components/Baz.test.tsx   # explicitly named — analyzed despite the default *.test.* exclude
```

### `--format`

Controls how reports are rendered:

| Value  | Output                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------- |
| `cli`  | **Default.** Terminal-friendly plain text — aligned columns, plain headings, no markdown/HTML noise.    |
| `md`   | GitHub-flavored markdown — pipe tables, `##` headings, and `<details>` blocks suitable for PR comments. |
| `html` | Self-contained styled HTML document — embedded CSS, real tables, and a collapsible scan log.            |
| `json` | Machine-readable document on stdout; every diagnostic goes to stderr.                                   |

Pass `--format md` when capturing output for a markdown destination (e.g. posting to a PR), or `--format html`
for a shareable report you can open in a browser:

```bash
react-compiler-analyzer analyze ./library/src --format md > coverage-report.md
react-compiler-analyzer analyze ./library/src --format html > coverage-report.html
```

#### `--format json`

Emits a versioned document so results can be diffed, tracked, or fed to a dashboard without
scraping text. When a report is produced, **stdout carries only the document** — the scan log and
per-file diagnostics are redirected to stderr — so it pipes straight into a parser. A parse error
is still represented in the document but exits 1; a fatal compiler/transform error emits no JSON:

Schema v4 replaces the Babel profile with the exact Oxc compiler-port and parser versions and
explicit transform settings. The three `reportedMemoCache*` counters partition accepted functions
by reconstructed `memoSlots`, not consumer-build output. Positive counts do not prove a risky
operation was cached; zero counts do not invalidate a preventive bailout. JSON consumers upgrading
from `0.0.3` must follow the [migration guide](MIGRATION.md#003-to-010).

Both commands record `profile` (Oxc backend/version, parser version, mode, JSX/output mode,
source-map setting, diagnostics, target, suppression policy, synthetic gating descriptor, and
`noEmit: false`) and `emittedCaching: "unverified"`. The transform runs in memory: `noEmit: false`
describes the backend operation, not a source write or proof of consumer-build caches. Suppression-related rejection is identified by
`functions[].rejectionKind: "suppression-related"`, with retained diagnostics and risk findings.
Another compiler/profile may optimize these functions; RCA does not automatically annotate them.

| Collection               | Fields and meaning                                                                                                                                                                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `functions[]`            | `file`, `package` (string or `null`), `line`, `column`, `function`, `status` (`compiled`, `skipped`, `error`), and `compilerEvent`. Optional `reason`, `errorLine`, and `errorColumn` identify the terminal diagnostic separately from the function declaration. |
| `functions[].memoStats`  | Optional `memoSlots` reconstructed from the gated transform; unavailable statistics remain unavailable rather than being guessed.                                                                                                                                |
| `functions[].manualMemo` | Optional `useMemo`, `useCallback`, and `reactMemo` counts, plus `reactMemoHasComparator` boolean.                                                                                                                                                                |
| `findings[]`             | `file`, `package`, `line`, `column`, `function`, `ruleId`, `severity`, `symbol`, `message`, and `compiled`. Optional `suppressed: true` marks an opted-out function, not proof that its guard is load-bearing.                                                   |
| `unparseable[]`          | `file` and `error` for each file the parser rejected.                                                                                                                                                                                                            |
| `annotate`               | Present after annotation: `mode`, `filesModified`, `functionsAnnotated`, and `functionsBailedOut`.                                                                                                                                                               |

With `--annotate <mode> --dry-run`, actual annotation counters remain
zero. The `annotate` object additionally contains `dryRun: true` and `planned`, whose
`filesModified`, `functionsAnnotated`, and `functionsBailedOut` counters describe proposed changes.
No planned counters are emitted for ordinary analysis or actual writes. Both preview and write
JSON contain `annotate.targets`: relative file, line, function name, directive, rationale
(`preventive-risk-opt-out` or `compiler-accepted-opt-in`), `reportedMemoCache`,
`emittedCaching: "unverified"`, and configured `riskRules`. Preview and write use the same planner.

The envelope is `schemaVersion`, `tool`, `command`, `mode`, `profile`, `emittedCaching`, `summary`, `functions`, `findings`,
`unparseable`, and optional `annotate`. Summary counters are `functions`, `compiled`,
`reportedMemoCachePositive`, `reportedMemoCacheZero`, `reportedMemoCacheUnavailable`,
`suppressionRejected`, `suppressionRejectedWithRisks`, `skipped`, `errors`, `findings`, `findingsOnCompiled`, `findingsSuppressed`,
and `unparseableFiles`; `findingsOnCompiled` excludes suppressed findings.

```bash
react-compiler-analyzer analyze ./src --format json \
  | jq '.findings[] | select(.compiled and (.suppressed != true)) | {file, line, rule: .ruleId, severity}'
```

```jsonc
{
  "schemaVersion": 4,
  "tool": "react-compiler-analyzer",
  "command": "analyze",
  "mode": "infer",
  "profile": {
    "backend": "oxc",
    "compilerVersion": "0.156.0",
    "parserVersion": "0.156.0",
    "mode": "infer",
    "jsx": "preserve",
    "outputMode": "client",
    "sourcemap": true,
    "noEmit": false,
    "panicThreshold": "none",
    "reportDiagnostics": true,
    "target": "19",
    "suppressionRules": "compiler-default",
    "gating": {
      "source": "__rca_gate__",
      "importSpecifierName": "__rcaGate"
    }
  },
  "emittedCaching": "unverified",
  "summary": {
    "functions": 1,
    "compiled": 1,
    "reportedMemoCachePositive": 1,
    "reportedMemoCacheZero": 0,
    "reportedMemoCacheUnavailable": 0,
    "suppressionRejected": 0,
    "suppressionRejectedWithRisks": 0,
    "skipped": 0,
    "errors": 0,
    "findings": 1,
    "findingsOnCompiled": 1,
    "findingsSuppressed": 0,
    "unparseableFiles": 0
  },
  "functions": [
    {
      "file": "src/Widget.tsx",
      "package": "app",
      "line": 6,
      "column": 7,
      "function": "Widget",
      "status": "compiled",
      "compilerEvent": "CompileSuccess",
      "memoStats": {
        "memoSlots": 2
      }
    }
  ],
  "findings": [
    {
      "file": "src/Widget.tsx",
      "package": "app",
      "line": 7,
      "column": 13,
      "function": "Widget",
      "ruleId": "nonreactive-store-read",
      "severity": "medium",
      "symbol": "getAppStore",
      "message": "...",
      "compiled": true
    }
  ],
  "unparseable": []
}
```

- Findings use `compiled` to distinguish risks on compiler-accepted functions from latent risks on
  failed/skipped functions. `suppressed: true` marks risks in functions with `'use no memo'`; the key is
  omitted for other findings.
- `memoStats.memoSlots` is reconstructed from Oxc's in-memory gated transform. The profile's
  `noEmit: false` describes that transform output; RCA does not write transformed source files.
  `emittedCaching: "unverified"` remains explicit because synthetic analysis output is not evidence
  about a consumer build or cache ownership for a particular operation.
- Oxc exposes no equivalent for Babel's memo-block/value/pruned-work counters; schema v4 removes
  those counters rather than filling them with guesses. Acceptance and `memoSlots` remain separate
  observations; zero or unavailable slots do not disqualify preventive opt-outs.
- `profile.compilerVersion` identifies the exact `oxc-transform-react` port package, not an
  independently verified upstream React Compiler version. The profile records the parser, mode,
  target, output mode, source-map setting, diagnostics, suppression policy, and synthetic gate.
- Oxc `Warning` and `Advice` diagnostics are visible on stderr and in human reports but do not alone
  reject a function or fail lint. Acceptance requires a uniquely mapped synthetic gate; fatal,
  unknown-severity, unmappable, or inconsistent error-plus-success evidence fails closed.
- `unparseable` lists files the parser rejected outright. They contribute nothing to the other
  counts, so a shrinking `functions` total is never silently caused by a parse failure; a nonempty
  array also sets exit code 1. Unsupported grammar is reported rather than extended with Babel
  parser plugins.
- Paths are workspace-relative and POSIX-separated.
- Output is deterministically ordered, so equivalent runs produce byte-identical documents.
- `lint --format json` emits the directive equivalent (`command: "lint"`, a `directives` array,
  `summary.unparseableFiles`, and an `unparseable` array) and keeps its usual exit code.
  `lint --format json --fix` reports the post-fix directive statuses and failures. Both commands
  use the same Oxc profile; schema v3 Babel profiles and removed counters are not valid v4 documents.
- Full code-framed compiler diagnostics remain available in human reports with `--verbose`; JSON
  stays compact and includes terminal reason/location plus diagnostic reasons and categories.
- `--annotate` still writes directives to disk under `--format json` when processing completes
  without a fatal compiler/transform error; the outcome is reported in an `annotate` key
  (`{ mode, filesModified, functionsAnnotated, functionsBailedOut, targets }`).
- [`rca.analyze.schema.json`](rca.analyze.schema.json) validates the compact `analyze` document.

For `lint`, the envelope is `schemaVersion`, `tool`, `command: "lint"`, `mode`, `profile`, `emittedCaching`, `summary`,
`directives`, and `unparseable`. Each directive row has `file`, `package` (possibly `null`), `line`,
`column`, `directive` (`use-memo` or `use-no-memo`), `status`, `compilerEvent`, `function`, and
optional `reason`. Summary counters are `directives`, `active`, `redundant`, `broken`,
`conflicting`, `skipped`, and `unparseableFiles`. Unparseable entries contain `file` and `error`.
Explicitly revalidated justified directives additionally include `justified: true` and
`revalidated: true`, plus `evidence` with before/after outcomes and statistics, acceptance/statistics
effects, and `emittedOptimization: "not-measured"`. No observed effect is profile-specific,
not universal redundancy or a refutation of preventive justification. Justified directives
remain protected with `--fix`; un-justified removal policy and exit codes are unchanged.
The shipped [`rca.lint.schema.json`](rca.lint.schema.json) references shared analyze definitions.

To enumerate suppression exceptions:

```bash
react-compiler-analyzer analyze ./src --format json \
  | jq '.functions[] | select(.rejectionKind == "suppression-related") | {file, line, function, diagnostics}'
```

Terminal colors honor `NO_COLOR` and `FORCE_COLOR`; Markdown is plain and HTML embeds its styles.
HTML package navigation remains available even for packages without detailed sections. For
compiler probes and rendering internals, see [how it works](docs/how-it-works.md).

## Exit codes

| Command   | Code 0                                                                                                     | Code 1                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `init`    | Successful initialization.                                                                                 | Invalid input, non-interactive use without `--yes`, or an operation failure.                |
| `lint`    | No failing directives or file failures remain.                                                             | Redundant, broken, or conflicting directives; parse/compiler failures; invalid input.       |
| `analyze` | Completed scan without parse failures; attributed function errors and advisory risks may still be present. | Parse failures, unattributed compiler errors, non-parse transform errors, or invalid input. |

## Nx integration

```jsonc
// project.json
{
  "targets": {
    "lint-compiler": {
      "command": "react-compiler-analyzer lint ./library/src --mode annotation"
    },
    "analyze-compiler": {
      "command": "react-compiler-analyzer analyze ./library/src --mode infer"
    },
    "analyze-compiler-multi": {
      "command": "react-compiler-analyzer analyze packages/pkg-a/src packages/pkg-b/src --mode infer"
    }
  }
}
```

## Known upstream issues

Historical defects found during rollout that live in the React Compiler toolchain rather than in
this analyzer. Each write-up carries a minimal reproduction and the exact versions it was verified
against; neither establishes that the Oxc port or a consumer build behaves the same way.

| Issue                                                                                                                                                                                                                | Affects                             | Write-up                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| A `useState` initializer is outlined to module scope while still referencing the enclosing function's parameter, emitting an unbound identifier. Compiles as `CompileSuccess`; fails with `ReferenceError` at mount. | `babel-plugin-react-compiler@1.0.0` | [docs/upstream-react-compiler-outlined-closure.md](docs/upstream-react-compiler-outlined-closure.md)             |
| The loader appends its own parser plugins after the user's, so `jsx` cannot be disabled and a `.ts` angle-bracket cast (`<Foo>bar`) fails the build.                                                                 | `react-compiler-webpack@1.0.0`      | [docs/upstream-react-compiler-webpack-parser-plugins.md](docs/upstream-react-compiler-webpack-parser-plugins.md) |

## Further reading

- [Documentation contents](docs/README.md).
- [Migration workflow](docs/migration-workflow.md): assess candidates, choose annotations, and review opt-outs.
- [Runtime-risk detection](docs/runtime-risks.md): configure patterns, wrappers, and resolver conditions.
- [How it works](docs/how-it-works.md): compiler probes, canonical outcomes, memo counters, and report interpretation.
- [Version migration guide](MIGRATION.md): release-specific changes and upgrade instructions.

## Local development

From the Fluent UI repository root, build the workspace CLI before invoking its binary directly:

```bash
yarn nx run react-compiler-analyzer:build
yarn run -T react-compiler-analyzer analyze ./packages/react-components/react-button/library/src --verbose
```

The root dependency resolves to the workspace package rather than the published package.
Generated Nx analyzer targets build it automatically.

Validate the analyzer and its test-only compiler baselines through Nx:

```bash
yarn nx run react-compiler-analyzer:test --runInBand
yarn nx run react-compiler-analyzer:test-integration
yarn nx run react-compiler-analyzer:type-check
```

The integration target builds the CLI, preserves bounded Babel and native-SWC observations, adds
direct Oxc emitted-output observations separately from analyzer acceptance telemetry, and validates
the packaged command's JSON and dry-run behavior. Babel and SWC are test-only oracles; the CLI
runtime must not load either. Review Oxc deltas before adding its baselines; these checks do not
replace application behavior tests.

Compare whole-command behavior against a pre-migration binary:

```bash
yarn nx run react-compiler-analyzer:benchmark --baseline=/absolute/pre-migration/bin/react-compiler-analyzer.js --runs=3 --output=/absolute/results
```

The benchmark freezes a SHA manifest of the v9 production corpus and exercises analyze with risks
off/on, lint, actual `--fix` on disposable full-input copies, and justified revalidation. Artifacts
record timings, RSS, transform counts, and row differences. Measurements are workload-specific,
not runtime-safety or performance guarantees.

Verify an already-created, clean production-only tarball installation:

```bash
yarn nx run react-compiler-analyzer:verify-installed --package-root=/absolute/clean/node_modules/@fluentui/react-compiler-analyzer
```

Unlike the in-repository load guard, this checks the installed package's dependency isolation:
Babel core/types/compiler and SWC must not resolve. It also checks native loaders, analyze/lint
schema-v4 JSON, fixes, dry-run behavior, and help output.
