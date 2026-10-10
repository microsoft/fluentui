# Evidence-based configuration discovery

Keep first-time `init` simple. Add advanced settings only after inspecting the repository.

## Compiler mode

Identify the requested TypeScript scan paths first. Search those paths for existing `'use memo'`
and `'use no memo'` directives, and inspect the repository's `babel-plugin-react-compiler`, SWC, or
framework integration for explicit compilation-mode evidence.

- If the user already selected `infer` or `annotation`, use that mode.
- If at least one compiler directive exists and the user has not selected a mode, ask which mode to
  use. Offer `infer` as the recommended default and `annotation` as the alternative. Include the
  directive count, representative paths, and any explicit build-mode evidence in the question.
- Do not choose `annotation` merely because directives exist. `'use memo'` can force compilation
  and `'use no memo'` can opt out while the surrounding build remains in `infer` mode.
- If no directives exist and no explicit build configuration requires `annotation`, use `infer`
  without asking.
- Use `annotation` without a mode question only when the user explicitly requested it or an
  unambiguous build configuration requires it and the scanned source contains no directives that
  trigger the choice above.
- Do not configure `all`.
- If build evidence conflicts across scan roots, ask the user or use separate configs/runs rather
  than guessing.

## Parser plugins

Start without `parserPlugins`. Add a plugin only when the build uses that syntax and RCA reports a
parse failure that the plugin addresses. Match the exact Babel parser plugin name; RCA rejects
unknown names.

## Risk rules

Search source paths before enabling a rule:

- Enable `detectGetStateReads` when imperative `.getState()` snapshot reads exist.
- Set `storeAccessorPattern` to a narrow regex supported by actual non-hook accessor names, such as
  `Store$` only when functions like `getAppStore()` exist.
- Add `selectorHookProperties` only for observed hidden selector APIs such as
  `store.use.field()`.
- Enable `resolveWrappers` only when components/hooks reach those risky leaves through first-party
  plain-function wrappers or re-export barrels.

Do not enable a broad rule merely because a state-management library is installed.

## Dependency aliases for wrapper resolution

`pathAliases` must cover first-party TypeScript dependencies that wrapper resolution may enter, not
only application-local shorthand imports. External dependencies whose implementation is only in
`node_modules` remain package boundaries and must not be mapped to declarations or built output.

Prefer tsconfig metadata over traversing every source file:

1. Identify the tsconfig that applies to the requested scan paths.
2. Follow its `extends` chain and determine the effective `compilerOptions.baseUrl` and
   `compilerOptions.paths`.
3. Read the owning `package.json` and identify declared dependencies that are first-party workspace
   packages. Treat these as the dependency-alias candidate set; do not map external packages.
4. Traverse the applicable config's `references` recursively, resolving directory references to
   their tsconfig and deduplicating configs to avoid cycles.
5. Reconcile the first-party dependency candidates with effective `paths` entries and referenced
   projects. A declared first-party dependency absent from both sources requires focused import and
   package inspection before it can be omitted or mapped.
6. For every referenced first-party project, read the nearest `package.json` for its package name
   and resolve its analyzable source root from explicit metadata: an existing `paths` mapping,
   `compilerOptions.rootDir`, or an unambiguous source entry/include. Do not infer a source layout
   from the package name alone.
7. Add an exact package alias for a verified source entry and a wildcard alias when verified source
   subpaths exist. For example, a referenced package named `@scope/state` with source root
   `../state/src` may contribute `"@scope/state": ["../state/src/index.ts"]` and
   `"@scope/state/*": ["../state/src/*"]`.
8. Resolve the effective base URL to an absolute directory. If `paths` is configured without
   `baseUrl`, use the directory containing the tsconfig that defines the effective paths. Normalize
   project-reference targets so every target is relative to this one base URL.
9. Write `analyze.risks.pathAliases.baseUrl` relative to the directory containing
   `rca.config.json`, and write all targets relative to that base URL.
10. Include application aliases and verified referenced-project aliases needed by the intended scan
    roots. Do not copy unrelated monorepo aliases or map third-party package dependencies.

If tsconfig `paths` and project references do not describe a first-party bare import reported by
wrapper resolution, inspect that import and its owning package directly as a fallback. A focused
scan of unresolved bare import specifiers is sufficient; do not traverse the entire repository
unless the package metadata is genuinely incomplete.

Example:

```json
{
  "analyze": {
    "risks": {
      "detectGetStateReads": true,
      "resolveWrappers": true,
      "pathAliases": {
        "baseUrl": ".",
        "paths": {
          "@app/*": ["src/app/*"]
        }
      }
    }
  }
}
```

If different scan roots use incompatible tsconfig alias maps, do not merge them into one invented
mapping. Use a common root config when valid, or separate RCA configs/runs.

## Validation

Run JSON analysis and inspect stderr diagnostics from wrapper resolution.

- Every generated target must exist and resolve to `.ts` or `.tsx` source.
- At least one configured alias should match imports when aliased wrappers exist. Remove aliases
  for referenced projects that are not reachable from the intended scan roots.
- Dead alias targets and zero-hit aliases for imports that are present in the scan must be fixed.
- Bare first-party imports stopping at package boundaries mean dependency wrappers were not
  analyzed. Add a verified alias or report the unresolved dependency explicitly.
- A zero-risk result is trustworthy only after the relevant imports resolve.
