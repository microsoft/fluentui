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

This README documents the prepared `0.0.1` release, which is not yet published. For differences
from published experimental builds, see the [version migration guide](MIGRATION.md).

## Quick start

Requires Node.js 22 or 24. Install the published package as a development dependency:

```bash
npm install --save-dev @fluentui/react-compiler-analyzer
```

Until `0.0.1` is published, this installs a published experimental version. To try the prepared
version in this repository, see [local development](#local-development).

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
- [Shared options](#shared-options): paths, compilation modes, exclusions, parser settings, and formats.
- [Configuration](#configuration): stable defaults and optional risk rules.
- [JSON output](#--format-json): machine-readable fields and schemas.
- [Documentation contents](docs/README.md): migration workflows, runtime risks, and implementation details.

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
primary workflow. It also persists the analyzer's current default excludes, including Cypress and
E2E files and directories. It does not offer `all`. Re-running it preserves custom excludes and other valid
advanced settings already present in the file. An invalid existing config requires confirmation,
or `--yes --force` in a non-interactive environment.

```jsonc
{
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json",
  "mode": "infer",
  "concurrency": 10,
  "exclude": ["**/__tests__/**", "**/*.test.*"],
  "parserPlugins": ["decorators-legacy"],
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
fail at config load before scanning. Explicit CLI options override
config values. JSON uses camelCase (`strictPaths`, `parserPlugins`), while CLI flags retain
kebab-case (`--strict-paths`, `--parser-plugin`).

Scan paths remain required positional arguments. Source-writing operations are intentionally not
persistent configuration: use `--annotate` and `--fix` explicitly on each run.

| Config key                             | Type       | Default or meaning                                                                 |
| -------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| `$schema`                              | `string`   | Optional schema reference for editors.                                             |
| `mode`                                 | `string`   | `infer`; also accepts `annotation`, `all`.                                         |
| `format`                               | `string`   | `cli`; also accepts `md`, `html`, `json`.                                          |
| `verbose`                              | `boolean`  | `false`.                                                                           |
| `concurrency`                          | `integer`  | `10`; minimum 1.                                                                   |
| `exclude`                              | `string[]` | Replaces the default directory-scan exclusions.                                    |
| `strictPaths`                          | `boolean`  | `false`.                                                                           |
| `parserPlugins`                        | `string[]` | `[]`; extra Babel parser plugins.                                                  |
| `analyze.quote`                        | `string`   | `single`; also accepts `double`.                                                   |
| `analyze.risks.detectGetStateReads`    | `boolean`  | `false`; detect imperative `.getState()` snapshots.                                |
| `analyze.risks.storeAccessorPattern`   | `string`   | Unset; regex matching non-hook store-accessor names.                               |
| `analyze.risks.selectorHookProperties` | `string[]` | `[]`; property names identifying hidden selector hooks.                            |
| `analyze.risks.resolveWrappers`        | `boolean`  | `false`; follow first-party wrapper calls and re-exports.                          |
| `analyze.risks.pathAliases.baseUrl`    | `string`   | Required with `pathAliases`; relative to the config file.                          |
| `analyze.risks.pathAliases.paths`      | `object`   | Required with `baseUrl`; alias patterns map to nonempty arrays of target patterns. |

If you previously used `--risk-config`, see the [experimental-to-0.0.1 migration](MIGRATION.md).

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
| `broken`      | `'use memo'` requests compilation that errors              | **1**     |
| `conflicting` | Both `'use no memo'` and `'use memo'` on same function     | **1**     |
| `skipped`     | Has `// justified:` comment                                | 0         |

Files that cannot be parsed or compiled are reported separately and fail the lint gate,
even if no directive status could be derived. `--fix` does not modify these files.

#### Options and fixes

| Flag    | Type      | Default | Description                                                                |
| ------- | --------- | ------- | -------------------------------------------------------------------------- |
| `--fix` | `boolean` | `false` | Remove redundant opt-outs, justify active opt-outs, and resolve conflicts. |

All shared options apply. `--fix` removes redundant `'use no memo'` directives, adds
`// justified: <reason>` to active ones, and resolves conflicts by keeping `'use memo'`.
It does not repair broken opt-ins. JSON output describes the post-fix statuses and failures.

| Directive and scenario                          | `infer`       | `annotation`  |
| ----------------------------------------------- | ------------- | ------------- |
| `'use no memo'` on a compilable named component | `active`      | `redundant`   |
| `'use no memo'` on a non-compilable function    | `redundant`   | `redundant`   |
| Both directives on one function                 | `conflicting` | `conflicting` |
| `'use memo'` on a compilable named component    | `active`      | `active`      |
| `'use memo'` on a non-compilable function       | `broken`      | `broken`      |

```bash
react-compiler-analyzer lint ./src --mode annotation
react-compiler-analyzer lint packages/button/src packages/menu/src --mode infer
react-compiler-analyzer lint ./src/Widget.tsx --verbose
react-compiler-analyzer lint ./src --fix
```

An empty risk report does not prove an opt-out is safe to remove. Review `suppressed: true` findings
with the same risk config used when adding the opt-out. See the
[opt-out review workflow](docs/migration-workflow.md#review-existing-opt-outs).

### analyze

```bash
react-compiler-analyzer analyze <paths..> [options]
```

Reports accepted, skipped, and errored functions. Accepted functions are separated by emitted memo
caches, no emitted cache, or unavailable statistics. Acceptance alone is not an optimization signal.
The default report shows package and aggregate summaries; `--verbose` adds per-function results,
candidate review details, risk findings, parse failures, and full code-framed diagnostics.

Completed scans exit 0 even with attributed per-function compiler errors or advisory risks. Parse
failures produce a report but exit 1. Unattributed compiler errors and non-parse transform errors
abort with code 1 before a JSON document or annotation writes are produced.

| Flag         | Type     | Default  | Description                                               |
| ------------ | -------- | -------- | --------------------------------------------------------- |
| `--annotate` | `string` | Not set  | Write directives using a mode below.                      |
| `--quote`    | `string` | `single` | Quote style for written directives: `single` or `double`. |

All shared options apply.

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

Optional chaining is supported. `resolveWrappers` follows first-party helpers and re-exports;
`pathAliases` supplies config-relative aliases. Resolution is syntactic and stops at package
boundaries and dynamic/inferred dispatch. Inspect stderr resolution diagnostics rather than
assuming no findings means every import was resolved.

Reports distinguish compiled risks, risks suppressed by `'use no memo'`, and risks in functions not
compiled. See [runtime-risk detection](docs/runtime-risks.md) for examples and limitations.

## Shared options

| Argument / Flag   | Type       | Default | Description                                                                                                                        |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `<paths..>`       | `string[]` | —       | **Required.** One or more files or directories to scan for `.ts`/`.tsx` files. Excludes are not applied to explicitly passed files |
| `--mode`          | `string`   | `infer` | Compilation strategy: `infer`, `annotation`, or `all`.                                                                             |
| `--format`        | `string`   | `"cli"` | Output format: `cli`, `md`, `html`, or `json` (machine-readable)                                                                   |
| `--verbose`       | `boolean`  | `false` | Print detailed compiler events and full code-framed diagnostics                                                                    |
| `--concurrency`   | `number`   | `10`    | Max parallel file processing                                                                                                       |
| `--exclude`       | `string[]` | _(1)_   | Glob patterns to exclude                                                                                                           |
| `--strict-paths`  | `boolean`  | `false` | Fail instead of warning when a given path does not exist                                                                           |
| `--parser-plugin` | `string[]` | `[]`    | Extra Babel parser plugins, e.g. `decorators-legacy`. Match your build's parser config — see **Not Analyzed**                      |
| `--config`        | `string`   | —       | Use this RCA config instead of an optional `./rca.config.json`                                                                     |

_(1)_ Default excludes: `**/__tests__/**`, `**/testing/**`, `**/__mocks__/**`, `**/*.spec.*`, `**/*.test.*`, `**/*.stories.*`, `**/*.cy.*`, `**/*.e2e.*`, `**/e2e/**`

`--help` displays command help, and `--version` displays the CLI version. `--config` is global and
can precede the command. Table defaults are built-in values; config values override them, and
explicit CLI options take precedence over the config.

### Parser settings

The analyzer parses with `typescript` + `jsx`. If your build's loader enables more, pass the same
plugins here so the analyzed scope matches the compiled scope:

```bash
react-compiler-analyzer analyze ./src --parser-plugin decorators-legacy
```

Unknown names are rejected. Babel ignores unrecognized parser plugins silently, so a typo would
otherwise produce a run that looks successful and analyzed nothing extra.

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

`summary.memoCacheEmitted` is the direct machine-readable equivalent of the human
**Compiler accepted (memo cache emitted)** metric. It counts only canonical `compiled` function
rows whose reported `memoStats.memoSlots` is greater than zero.

| Collection               | Fields and meaning                                                                                                                                                                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `functions[]`            | `file`, `package` (string or `null`), `line`, `column`, `function`, `status` (`compiled`, `skipped`, `error`), and `compilerEvent`. Optional `reason`, `errorLine`, and `errorColumn` identify the terminal diagnostic separately from the function declaration. |
| `functions[].memoStats`  | Optional `memoSlots`, `memoBlocks`, `memoValues`, `prunedMemoBlocks`, and `prunedMemoValues` counters; an unreported counter is `null`, not `0`.                                                                                                                 |
| `functions[].manualMemo` | Optional `useMemo`, `useCallback`, and `reactMemo` counts, plus `reactMemoHasComparator` boolean.                                                                                                                                                                |
| `findings[]`             | `file`, `package`, `line`, `column`, `function`, `ruleId`, `severity` (`high` or `medium`), `symbol`, `message`, and `compiled`. Optional `suppressed` is `true` for risks held back by an opt-out and omitted otherwise.                                        |
| `unparseable[]`          | `file` and `error` for each file the parser rejected.                                                                                                                                                                                                            |
| `annotate`               | Present after annotation: `mode`, `filesModified`, `functionsAnnotated`, and `functionsBailedOut`.                                                                                                                                                               |

The envelope is `schemaVersion`, `tool`, `command`, `mode`, `summary`, `functions`, `findings`,
`unparseable`, and optional `annotate`. Summary counters are `functions`, `compiled`,
`memoCacheEmitted`, `skipped`, `errors`, `findings`, `findingsOnCompiled`, `findingsSuppressed`,
and `unparseableFiles`; `findingsOnCompiled` excludes suppressed findings.

```bash
react-compiler-analyzer analyze ./src --format json \
  | jq '.findings[] | select(.compiled and (.suppressed != true)) | {file, line, rule: .ruleId, severity}'
```

```jsonc
{
  "schemaVersion": 2,
  "tool": "react-compiler-analyzer",
  "command": "analyze",
  "mode": "infer",
  "summary": {
    "functions": 1,
    "compiled": 1,
    "memoCacheEmitted": 1,
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
        "memoSlots": 2,
        "memoBlocks": null,
        "memoValues": 1,
        "prunedMemoBlocks": null,
        "prunedMemoValues": null
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
  failed/skipped functions. `suppressed: true` marks risks held back by `'use no memo'`; the key is
  omitted for other findings.
- Memo counters preserve compiler absence as `null`; a reported zero remains `0`.
- `unparseable` lists files the parser rejected outright. They contribute nothing to the other
  counts, so a shrinking `functions` total is never silently caused by a parse failure; a nonempty
  array also sets exit code 1.
- Paths are workspace-relative and POSIX-separated.
- Output is deterministically ordered, so equivalent runs produce byte-identical documents.
- `lint --format json` emits the directive equivalent (`command: "lint"`, a `directives` array,
  `summary.unparseableFiles`, and an `unparseable` array) and keeps its usual exit code.
  `lint --format json --fix` reports the post-fix directive statuses and failures.
- Full code-framed compiler diagnostics remain available in human reports with `--verbose`; JSON
  stays compact and includes the terminal reason and location only.
- `--annotate` still writes directives to disk under `--format json` when processing completes
  without a fatal compiler/transform error; the outcome is reported in an `annotate` key
  (`{ mode, filesModified, functionsAnnotated, functionsBailedOut }`).
- [`rca.analyze.schema.json`](rca.analyze.schema.json) validates the compact `analyze` document.
  It is a package artifact only and adds nothing to the emitted payload or analyzer hot path. See
  [MIGRATION.md](MIGRATION.md) for the v1-to-v2 field and behavior changes.

For `lint`, the envelope is `schemaVersion`, `tool`, `command: "lint"`, `mode`, `summary`,
`directives`, and `unparseable`. Each directive row has `file`, `package` (possibly `null`), `line`,
`column`, `directive` (`use memo` or `use no memo`), `status`, `compilerEvent`, `function`, and
optional `reason`. Summary counters are `directives`, `active`, `redundant`, `broken`,
`conflicting`, `skipped`, and `unparseableFiles`. Unparseable entries contain `file` and `error`.

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

Defects found during rollout that live in the React Compiler toolchain rather than in this analyzer.
Each write-up carries a minimal reproduction and the exact versions it was verified against.

| Issue                                                                                                                                                                                                                | Affects                             | Write-up                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| A `useState` initializer is outlined to module scope while still referencing the enclosing function's parameter, emitting an unbound identifier. Compiles as `CompileSuccess`; fails with `ReferenceError` at mount. | `babel-plugin-react-compiler@1.0.0` | [docs/upstream-react-compiler-outlined-closure.md](docs/upstream-react-compiler-outlined-closure.md)             |
| The loader appends its own parser plugins after the user's, so `jsx` cannot be disabled and a `.ts` angle-bracket cast (`<Foo>bar`) fails the build.                                                                 | `react-compiler-webpack@1.0.0`      | [docs/upstream-react-compiler-webpack-parser-plugins.md](docs/upstream-react-compiler-webpack-parser-plugins.md) |

## Further reading

- [Documentation contents](docs/README.md).
- [Migration workflow](docs/migration-workflow.md): assess candidates, choose annotations, and review opt-outs.
- [Runtime-risk detection](docs/runtime-risks.md): configure patterns, wrappers, and aliases.
- [How it works](docs/how-it-works.md): compiler probes, canonical outcomes, memo counters, and report interpretation.
- [Version migration guide](MIGRATION.md): upgrade from experimental builds to the prepared `0.0.1` release.

## Local development

From the Fluent UI repository root, build the workspace CLI before invoking its binary directly:

```bash
yarn nx run react-compiler-analyzer:build
yarn run -T react-compiler-analyzer analyze ./packages/react-components/react-button/library/src --verbose
```

The root dependency resolves to the workspace package rather than a published experimental build.
Generated Nx analyzer targets build it automatically. The package version remains `0.0.0` until
release tooling applies the patch changes for the planned `0.0.1` release.
