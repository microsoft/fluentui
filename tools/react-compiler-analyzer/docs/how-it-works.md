# How it works

[Documentation contents](README.md) | [CLI and JSON reference](../README.md)

## Processing pipeline

```text
scan paths -> discover TypeScript files -> attribute package -> compile files
                                                           |
                                 source-function index + compiler events
                                                           |
                                   canonical function/directive results
                                                           |
                                      summaries and formatted reports
```

The analyzer uses Babel with TypeScript parser syntax and `babel-plugin-react-compiler`, configured
with `noEmit: true` and a custom logger. Workers process files concurrently and consume compact
results as they finish rather than retaining every source file or AST.

The analyzer does not erase or lower TypeScript. React Compiler consumes TypeScript-bearing ASTs;
its compilation runs from `Program.enter`. Removing the unnecessary TypeScript transform prevents
its namespace and CommonJS-emission limitations from failing otherwise parseable modules.
`noEmit: true` and Babel's `code: false` alone would not disable those transform visitors.
Ambient fields remain parsed without adding React Compiler support for class components.
JSX is enabled by default only for `.tsx`; `.ts` files retain angle-bracket assertions.
Compilation, directive probes, and wrapper resolution share one parser configuration factory.
TypeScript auto-accessors are supported; decorators still require explicit parser plugins.

This is Babel analysis, not native Rust/OXC/SWC compiler execution. Valid syntax need not be
accepted by React Compiler, and Babel outcomes do not prove native candidate, cache, or export
parity. Verbose human reports identify the installed compiler versions; JSON has no provenance.
Unavailable compiler version metadata produces a warning and an `unavailable` label, not an
analysis failure. Actual compiler failures remain errors.

Directories apply exclusion globs; explicit files bypass them. Results are deduplicated by absolute
path and attributed to the nearest package where possible. Files without an attributable package
use `package: null` in JSON.

## Canonical function outcomes

All result producers use the same source-function index and span resolver. Compiler events are
normalized into one result per source function rather than one row per event or retry.

Events are reduced in their original order:

- An error followed by success ends as `compiled`.
- Success followed by an error ends as `error`.
- A final skip ends as `skipped`.
- Consecutive duplicate events do not create duplicate rows.

Function declaration locations remain distinct from optional diagnostic locations. Unattributed
compiler errors and non-parse transform errors are fatal rather than being silently dropped from
coverage. Parse failures are listed as `unparseable`, count toward failure, and contribute no
functions to the normal totals.

## Directive probing

To decide whether `'use no memo'` is active or redundant, directive lint needs to know what the
compiler would do without the opt-out. It runs a second probe that neutralizes the directive in
place while preserving parser settings, line/column locations, and source offsets.

`lint --revalidate-justified` explicitly rechecks justified opt-ins and opt-outs, neutralizing
one directive per probe while retaining all others. Accepted outcomes with and without the
directive determine whether it affects acceptance in the selected Babel mode. Probe failures
remain broken results, not evidence of redundancy. File-level directives are preserved with
an explicit limitation. Revalidated rows carry `justified: true` and `revalidated: true`.
Justified source is protected inside the fixer as well as the CLI. Redundant, broken, and
conflicting revalidated directives fail lint even alongside `--fix`.

Revalidation can add one whole-file compilation per justified function directive, performed
sequentially within that file. This is additional work beyond the initial pass and ordinary opt-out probes, so files
with many justified directives can take longer. File-level and conflicting directives are not probed.
If the initial pass has unattributed compiler errors, lint reports the file as not analyzed before
evaluating either ordinary or justified directives. New unattributed errors in a probe remain failed
revalidation evidence rather than being ignored.

Coverage analysis uses the selected discovery mode. Directive health uses the mode assumed for the
build. The same function can therefore be relevant to an infer-mode assessment but redundant as an
opt-out in an annotation-mode build.

Fixing and annotating are separate operations. `lint --fix` edits directive health issues;
`analyze --annotate` writes opt-ins or risk-driven opt-outs for accepted functions. Both operate on
explicit requests rather than persistent configuration.

`analyze --annotate <mode> --dry-run` builds and validates the same edit plan but never invokes
the writer. It lists proposed targets in human output. JSON keeps actual write counters at zero
and adds only `dryRun: true` and `planned` counters; normal output shapes are unchanged.
Planned insertion targets are intentionally omitted from JSON to keep the contract compact.
Use human output to inspect target locations, rendered relative to the workspace.

## Memo-cache statistics

Compiler acceptance is not itself an optimization signal. Human summaries separate accepted
functions with an emitted memo cache, with no emitted cache, and with unavailable statistics.
Skips and errors complete the partition; package percentages use the package's total function count.

The compact JSON counter `summary.memoCacheEmitted` counts accepted functions whose reported
`memoStats.memoSlots` is greater than zero. Other compiler counters describe memo blocks, values,
and pruned work. Unreported counters stay `null`; a real reported zero remains `0`.

These counters describe emitted compiler behavior, not saved render time. Use application tests and
profiling to establish whether a migration preserves behavior and improves relevant workflows.

## Manual-memo candidates

A candidate must have a canonical `compiled` outcome, no `'use no memo'` directive, and a detected
`useMemo`, `useCallback`, or `React.memo` site. Nested `memo(forwardRef(...))` and identifier-based
forwardRef wrappers are included. Custom comparators remain separate behavior-review items.

The candidate count overlaps the accepted-function count. Its percentage uses accepted functions
as the denominator, not every analyzed function. Counts and compiler memo statistics do not rank
candidates by performance value.

Verbose human reports expose these review labels:

| Column    | Value                      | Meaning                                                                          |
| --------- | -------------------------- | -------------------------------------------------------------------------------- |
| Action    | `hook-lowering-review`     | Review detected `useMemo`/`useCallback` behavior before removing or lowering it. |
| Action    | `default-wrapper-review`   | Review comparator-free `React.memo` separately from its accepted inner function. |
| Action    | `custom-comparator-retain` | Retain a custom comparator unless behavior proves it redundant.                  |
| Readiness | `reviewable`               | Risk analysis ran, no configured risk was found, and the function kind is known. |
| Readiness | `risk-unassessed`          | Runtime-risk analysis was not configured.                                        |
| Readiness | `needs-kind-review`        | Function kind needs manual classification.                                       |
| Readiness | `blocked-known-risk`       | A configured risk blocks migration until addressed.                              |

Candidate actions and readiness labels are review guidance, not a stable machine-ranking API.
JSON intentionally omits them; it retains function outcomes, optional manual-memo counts, findings,
summary counters, parse failures, and annotation outcomes.

## Rendering and JSON boundaries

The formatter supports terminal text, Markdown, HTML, and JSON. Non-verbose human analysis shows
package summaries and the aggregate summary. Verbose output adds compiler details, candidates,
risks, and parse-failure details. HTML package navigation remains available even if a package has
no expandable sections; candidate headings expose the review labels as tooltips.

JSON writes one versioned document to stdout and sends scan diagnostics to stderr. It preserves
canonical terminal reasons and locations without embedding source ASTs, code frames, compiler
event streams, Git provenance, or resolver statistics. This keeps reports suitable for automation
without retaining large diagnostic payloads.

`analyze` JSON is validated by the shipped `rca.analyze.schema.json`; config validation uses
`rca.config.schema.json`. These contracts are separate from the package's release version.
The [version migration guide](../MIGRATION.md) records the experimental JSON v1-to-v2 transition.

## Source map

| Area                      | Modules                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| CLI and configuration     | `cli.ts`, `config.ts`, `prompts.ts`, `commands/init.ts`, `commands/shared.ts`, `commands/analyze.ts`, `commands/lint.ts` |
| Discovery and compilation | `discovery.ts`, `concurrency.ts`, `compiler.ts`, `source-functions.ts`, `compiler-events.ts`                             |
| Coverage and directives   | `coverage-analyzer.ts`, `analyzer.ts`, `manual-memo-plugin.ts`, `memo-cache-outcome.ts`                                  |
| Runtime-risk detection    | `risk-patterns.ts`, `risk-plugin.ts`, `module-resolver.ts`, `call-graph.ts`                                              |
| Source edits              | `fixer.ts`, `coverage-fixer.ts`                                                                                          |
| Reporting                 | `reporter.ts`, `coverage-reporter.ts`, `candidates.ts`, `serializer.ts`, `formatter.ts`                                  |
| Shared contracts          | `types.ts`, `patterns.ts`, `stable-json.ts`, `ordering.ts`                                                               |

The package entry point does not expose these internals as a public JavaScript API. Optional agent
guidance lives in `skills/react-compiler-analyzer`, independently of the implementation.
