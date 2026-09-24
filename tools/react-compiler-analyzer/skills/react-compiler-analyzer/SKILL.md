---
name: react-compiler-analyzer
description: Configure and run @fluentui/react-compiler-analyzer, interpret compiler acceptance and memo-cache results, assess manual memo migration candidates, and maintain use memo directives. Use when enabling React Compiler, auditing compiler coverage or runtime risks, or working with rca.config.json.
---

# React Compiler Analyzer

Use the analyzer version installed in the current repository. Do not substitute a global or newer
package version.

## First-time setup

1. Locate `rca.config.json`. If it is missing, run the local analyzer's
   `init --yes --no-skill` command because this repository skill is already installed.
2. Read [references/config-discovery.md](references/config-discovery.md).
3. Identify the TypeScript source paths in scope and inspect them for existing `'use memo'` and
   `'use no memo'` directives before choosing a compiler mode. If any directives exist and the user
   did not already choose a mode, ask whether RCA should use `infer` or `annotation`; make `infer`
   the recommended default. Directives can be used in either mode and do not prove that the build
   uses `annotation`.
4. Inspect the repository before adding parser plugins, risk rules, wrapper resolution, or path
   aliases. Configure only behavior supported by code or build configuration evidence. When
   wrapper resolution is enabled, include aliases for first-party TypeScript dependencies exposed
   by the applicable tsconfig's `compilerOptions.paths` or project-reference graph.
5. Validate the resulting config with an analysis run. Treat unresolved wrapper imports, missing
   first-party dependency aliases, or aliases that never match as incomplete configuration, not as
   a clean risk result.

## Analysis workflow

1. Identify the TypeScript source paths relevant to the user's request. Paths are intentionally not
   stored in `rca.config.json`.
2. Run `analyze` with an explicit `--format json` for machine-readable results.
3. Use the JSON summary and function records to distinguish:
   - compiler acceptance;
   - accepted functions with an emitted memo cache;
   - accepted functions without an emitted memo cache;
   - manual memo migration candidates.
4. Use human `--format cli --verbose` output only when detailed diagnostics or candidate evidence
   is needed.
5. Read [references/cli-reference.md](references/cli-reference.md) before using annotation or lint
   fixes.

## Safety rules

- Never use `analyze --annotate` or `lint --fix` unless the user explicitly requests source
  changes.
- Never interpret compiler acceptance or memo-slot counts as a performance-value ranking.
- Do not enable `all` compilation mode. Use `infer` by default. If source directives are already
  present and the user has not chosen a mode, ask before selecting `infer` or `annotation` and show
  any explicit build-mode evidence in the question.
- Do not report risk analysis as clean when wrapper resolution stopped at package boundaries or
  path aliases resolved nothing.
- Do not commit generated JSON, Markdown, or HTML reports unless the user requests them.
