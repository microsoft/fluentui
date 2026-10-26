# Change Log - @fluentui/react-compiler-analyzer

<!-- This log was last generated on Thu, 22 Oct 2026 15:40:41 GMT and should not be manually modified. -->

<!-- Start content -->

## [0.0.3](https://github.com/microsoft/fluentui/tree/@fluentui/react-compiler-analyzer_v0.0.3)

Thu, 22 Oct 2026 15:40:41 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compiler-analyzer_v0.0.2..@fluentui/react-compiler-analyzer_v0.0.3)

### Patches

- Support syntax-only TypeScript analysis, protected directive revalidation, and annotation previews. ([PR #36969](https://github.com/microsoft/fluentui/pull/36969) by martinhochel@microsoft.com)

## [0.0.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-compiler-analyzer_v0.0.2)

Tue, 20 Oct 2026 13:39:53 GMT 
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-compiler-analyzer_v0.0.1..@fluentui/react-compiler-analyzer_v0.0.2)

### Patches

- fix: handle TypeScript declare class fields without aborting analysis ([PR #36934](https://github.com/microsoft/fluentui/pull/36934) by martinhochel@microsoft.com)

## [0.0.1](https://github.com/microsoft/fluentui/tree/@fluentui/react-compiler-analyzer_v0.0.1)

Fri, 16 Oct 2026 14:21:29 GMT

### Patches

- Prepare the first 0.0.1 release of React Compiler Analyzer: analyze and lint workflows, guided initialization with an optional repository Agent Skill, schema-validated shared configuration, opt-in runtime-risk detection, first-party wrapper and wildcard path-alias resolution, directive fixes and risk-aware annotations, and CLI/Markdown/HTML reports with foldable HTML navigation. Harden parse, configuration, and compiler failure handling, including unattributed lint diagnostics; keep generated bailout comments on one line without swallowing compact function bodies; preserve file-level opt-outs and directives whose probes fail; resolve default exports, imported exports, and lexical call bindings; recognize all JavaScript line endings and actual directive comments; exclude dependencies and declarations by default; validate integer concurrency; escape Markdown table cells and normalize JSON diagnostic paths; require Node.js ^22.14.0 or ^24.0.0; emit canonical JSON v2 results; and detect nested memo/forwardRef migration candidates while preserving custom comparators. Include a human-facing CLI reference, packaged technical guides, and versioned migration notes from experimental builds. ([PR #36819](https://github.com/microsoft/fluentui/pull/36819) by martinhochel@microsoft.com)
