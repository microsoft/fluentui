# How it works

[Documentation contents](README.md) | [CLI and JSON reference](../README.md)

## Processing pipeline

```text
scan paths -> discover TypeScript files -> attribute package -> compile files
                               |
                 Oxc parser + in-memory client transform
                               |
               source-function index + reconstructed events
                                                           |
                                   canonical function/directive results
                                                           |
                                      summaries and formatted reports
```

The production analyzer parses with `oxc-parser` and runs the exact-pinned
`oxc-transform-react` React Compiler port. The client transform runs in memory with JSX preserved,
source maps enabled, explicit target and diagnostic settings, and a synthetic feature gate used to
identify accepted function implementations. It does not write the generated JavaScript or source
maps to the scanned repository. Workers process files concurrently and consume compact results as
they finish rather than retaining every source file or AST.

The backend maps each generated gate's original-function branch back to a source function using
verified source-map provenance. Only unique mappings produce compiler success events; ambiguous or
missing mappings fail closed instead of guessing by function name or ordinal. The in-memory gate is
an analysis device, not a consumer-build integration.

JSX is preserved and enabled by extension (`.tsx`); `.ts` retains angle-bracket assertions.
TypeScript auto-accessors, decorators, import attributes, and explicit resource management use
Oxc's native parser support. Flow and unsupported proposal syntax cannot be added through Babel
parser plugins; those files are reported as unparseable. Parsing a file does not establish React
Compiler acceptance.

Generated output is reparsed in the original file's TypeScript/TSX dialect, including parameter
decorators. An output-reparse failure is a backend failure (`RCA_OUTPUT_PARSE_ERROR`), not evidence
that the original input is unparseable (`RCA_PARSE_ERROR`). Cross-file resolution failures are
likewise reported separately from input parse errors.

Oxc outcomes are specific to this experimental compiler port and need not match Babel, SWC, or a
consumer build. The bounded measured divergences and syntax gaps are documented in the
[migration guide](../MIGRATION.md#measured-compiler-differences-that-cannot-be-ported). Human reports
identify compiler and parser versions; JSON records the full backend profile. Neither includes Git
provenance.
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
compiler errors and non-parse transform errors are retained as file diagnostics rather than
silently dropped from coverage. They make the report explicitly incomplete and the command exits
nonzero, but valid results from other files remain available in schema-valid JSON. Repeated
unowned header diagnostics remain repeated; nearby declarations and opt-out probes do not prove
ownership. Parse failures alone are listed as `unparseable`.

## Directive probing

To decide whether `'use no memo'` is active or redundant, directive lint needs to know what the
compiler would do without the opt-out. It runs a second probe that neutralizes the directive in
place while preserving parser settings, line/column locations, and source offsets.

`lint --revalidate-justified` explicitly rechecks justified opt-ins and opt-outs, neutralizing
one directive per probe while retaining all others. Accepted outcomes with and without the
directive determine whether it affects acceptance in the selected Oxc mode. Probe failures
remain broken results, not evidence of redundancy. File-level directives are preserved with
an explicit limitation. Revalidated rows carry `justified: true` and `revalidated: true`.
Their `evidence` separates before/after outcomes and memo statistics, acceptance changes,
and reported-statistics changes. Missing events/counters and failed probes are unavailable,
not evidence of equivalence. Emitted optimization is `not-measured`: even identical counters
do not establish identical output. The recorded profile qualifies every redundancy conclusion.
Justified source is protected inside the fixer as well as the CLI. Redundant, broken, and
conflicting revalidated directives fail lint even alongside `--fix`.

Revalidation can add one whole-file compilation per justified function directive, performed
sequentially within that file. This is additional work beyond the initial pass and ordinary opt-out probes, so files
with many justified directives can take longer. File-level and conflicting directives are not probed.
If the initial pass has unattributed compiler errors, lint retains directive inventory without
claiming redundancy or permitting fixes. New unattributed errors in a probe remain failed
revalidation evidence rather than being ignored.

Coverage analysis uses the selected discovery mode. Directive health uses the mode assumed for the
build. The same function can therefore be relevant to an infer-mode assessment but redundant as an
opt-out in an annotation-mode build.

Fixing and annotating are separate operations. `lint --fix` edits directive health issues;
`analyze --annotate` writes opt-ins or risk-driven opt-outs for accepted functions. Both operate on
explicit requests rather than persistent configuration.

`analyze --protect-suppressions` is a separate explicit module opt-out operation with its own
dry-run plan and source-hash preflights. It cannot be combined with `--annotate`. See
[suppression protection](runtime-risks.md#protect-react-eslint-suppressions-explicitly) for its
conservative scope and cross-backend limitations.

`analyze --annotate <mode> --dry-run` builds and validates the same edit plan but never invokes
the writer. It lists proposed targets in human output. JSON keeps actual write counters at zero
and adds `dryRun: true` and `planned` counters. Both preview and write JSON include `targets`
with relative paths, directive, preventive/opt-in rationale, reported-statistics classification,
and risk rules. Zero slots never disqualify a preventive opt-out. Rejected functions remain
report-only, including those rejected because of a suppression.

## Wrapper resolution

Cross-file risk analysis is demand-driven and only runs when at least one leaf risk rule is
configured. `resolveWrappers` defaults to `true` in that case; explicit `false` limits detection
to scanned source. The Oxc resolver uses the nearest tsconfig for each importer, follows first-party
realpath targets outside `node_modules`, and understands ESM `.ts`, `.tsx`, `.mts`, `.js`, and
`.mjs` implementations. It does not redirect an unbuilt `dist` target to source, follow CommonJS
or declaration files, or model TypeScript types.

The default conditional-export activation set is `import`, `node`, and `default`. Additional
conditions such as `source` are opt-in and do not reorder the keys in a package's `exports` map.
`resolver.mainFields` is an explicit ordered replacement for the `module`, `main` defaults and only
applies when package exports do not select a target. A source condition or custom field may resolve
to a different implementation from the consumer build; verbose resolver output records both policy
and resolved file. Unresolved first-party imports are reported because they leave risk scope unknown.

## Memory ownership and local profiling

AST traversal uses Oxc's public `visitorKeys`, with callback state local to each walk. The pinned
parser's `Visitor` constructor retains callbacks in a module-global visitor cache, which can retain
source ASTs, scopes, and generated-source-map closures after a file finishes. The analyzer avoids
that registry instead of patching dependencies or changing compiler versions. A child-process GC
regression checks that discarded per-file callbacks do not retain their captured payloads.
This is a JavaScript callback-lifetime defect, not evidence of a Rust/native compiler leak.

On a frozen private consumer corpus of 13,609 files across 181 roots, the original bundle
exhausted the default V8 heap on Node 22.23.4 after 8,830 transforms, with sampled peaks of
4.21 GB JS heap and 4.86 GB RSS and no JSON report. Three repaired whole-scope runs, with
the same risk rules, wrapper resolution, source export condition, and concurrency 1, completed
in 113-166 seconds. Their sampled peaks were 1.13-1.21 GB JS heap, 2.7-2.9 MB external memory,
and 1.48-1.63 GB RSS (decimal units). All three produced identical function, finding, and
file-diagnostic fingerprints: 4,248 accepted functions and 1,328 findings.

These reports remain explicitly incomplete and exit nonzero: five files have unowned
suppression diagnostics, with 13,604 cleanly processed files and zero input-parse failures.
That is a reporting limitation, not resource exhaustion or silently skipped coverage.
Source hashes were unchanged. Timings vary on the shared host; an OOM baseline has no
completion time, so these measurements do not establish a completion-time speedup.

For private whole-scope measurements, build first and run the noncached Nx `profile` target:

```bash
yarn nx run react-compiler-analyzer:build
yarn nx run react-compiler-analyzer:profile \
  --request=/absolute/path/request.json --output=/absolute/path/local-evidence \
  --node=/absolute/path/supported/node --timeout-seconds=600
```

The local request is `{ "cwd": "/absolute/consumer", "roots": ["/absolute/consumer/src"],
"command": "analyze", "config": { "analyze": { "risks": { "detectGetStateReads": true } } } }`.
Use `"command": "lint", "args": ["--revalidate-justified"]` for the justified directive lane;
optional `args: ["--verbose"]` measures verbose reporting. The harness forces concurrency 1,
clears inherited `NODE_OPTIONS`, and permits no
source-edit arguments. It records source content hashes before and after the run, exact config,
JSON/stderr, sampled JS heap, external/array-buffer memory, RSS, heap limit, parse/transform counts,
and bounded termination status. A valid partial report's nonzero exit is distinct from a timeout,
signal, or missing JSON. Peaks are sampled rather than exact process high-water marks.

Add `--heap-profile` only for local allocation attribution. Sampling changes runtime overhead;
do not compare its elapsed time with an unprofiled run. Source manifests, paths, heap profiles,
and consumer reports can contain private information and must stay outside the repository.

## Memo-cache statistics

Compiler acceptance is not itself an optimization signal. Human summaries separate accepted
functions with positive reported memo slots, zero reported slots, and unavailable statistics.
Skips and errors complete the partition; package percentages use the package's total function count.

JSON counters `summary.reportedMemoCachePositive`, `reportedMemoCacheZero`, and
`reportedMemoCacheUnavailable` partition accepted functions using `memoStats.memoSlots`. Oxc does
not expose Babel's memo-block/value/pruned-work counters; schema v4 removes them rather than
inventing replacements. `memoSlots` is reconstructed from `_c(N)` allocations in the generated
compiled branch, including accepted functions with zero slots.

The profile's `noEmit: false` describes the in-memory transform that supplies this evidence; RCA
does not write generated source files. These counters do not verify the consumer build's emitted
caching, identify whether a particular risky operation was cached, or measure performance.
`emittedCaching: "unverified"` makes this boundary explicit. Use application tests and profiling to
establish behavior and performance.

Oxc `Warning` and `Advice` diagnostics are reported visibly to stderr and in the human scan log.
They do not alone count as compiler rejection or fail lint; acceptance still requires a uniquely
attributed synthetic gate. Fatal or unknown-severity diagnostics, an unmappable error, or
inconsistent error-plus-success evidence fails closed.

## Suppression-related rejection

Compiler suppression categories (or a narrowly recognized compiler reason) classify
`rejectionKind: "suppression-related"`. Comment presence alone is not evidence. Raw diagnostic
reasons/categories and risk findings survive normalization, including mixed-cause rejection.
The focused human section reports affected functions, those with risks, and the analyzed denominator.
Another compiler/profile may optimize these functions, but RCA does not annotate them automatically.

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

Schema v3 `analyze` JSON is validated by the shipped `rca.analyze.schema.json`; `lint` uses
`rca.lint.schema.json` (register the analyze schema for its shared definitions). Config validation uses
`rca.config.schema.json`. These contracts are separate from the package's release version.
The [version migration guide](../MIGRATION.md) describes the required JSON consumer updates.

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
