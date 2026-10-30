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

## Syntax support

RCA parses with Oxc and has no Babel parser-plugin option. JSX is enabled by `.tsx`; `.ts` keeps
angle-bracket assertions. Decorators, auto-accessors, import attributes, and explicit resource
management use native parser support. Flow and unsupported proposal syntax are reported as
unparseable. Compare the analyzed input set with the consumer build when it accepts additional
syntax; do not add `parserPlugins` or `--parser-plugin`.

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

## Resolver policy for wrapper analysis

When any leaf risk rule is configured, first-party wrapper resolution defaults to enabled.
`resolveWrappers: false` is an explicit opt-out. The resolver discovers the nearest tsconfig for
each importer, follows `extends` and `paths`, and uses package `exports`/`imports` and workspace
symlinks. `node_modules`, CommonJS, declaration files, and missing unbuilt `dist` targets remain
boundaries. There is no `pathAliases` map and no outDir-to-rootDir source redirect.

The default conditional-export activation set is `import`, `node`, and `default`. Never opt into
`types` or `require` for runtime-risk traversal. Add a custom condition only when package metadata
proves that the source branch is the intended code to inspect:

```json
{
  "analyze": {
    "risks": {
      "detectGetStateReads": true,
      "resolver": {
        "additionalConditionNames": ["source"]
      }
    }
  }
}
```

Additional condition names do not reorder keys in a package's `exports` object. The first matching
key in package order wins, so inspect the actual resolved target in verbose output. A `source`
condition may deliberately select code different from the consumer build.

`resolver.mainFields` is an ordered replacement for the default `["module", "main"]` entry fields.
Use it only when the package has no applicable exports/imports target. Package export restrictions
take precedence; custom fields must not bypass an unexported subpath. Only executable string paths
are supported. Never follow `.d.ts`, `.d.mts`, or `.d.cts` as implementations.

## Validation

Run JSON analysis and inspect stderr diagnostics from wrapper resolution. Unresolved first-party
specifiers are always reported and must not be interpreted as a zero-risk result. Confirm that the
resolver selected the intended ESM implementation, especially when using custom conditions or
entry fields. A zero-risk result is trustworthy only within the set of imports actually followed.
