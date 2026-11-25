# @fluentui/workspace-plugin

nx private monorepo plugin which contains:

- generators
- executors
- migrations
- other things...

## Usage

Run following to get all plugin functionality:

`yarn nx list @fluentui/workspace-plugin`

## React Compiler builds

The `build` executor uses SWC's native React Compiler when `reactCompiler: true`
is set in the target options/configuration or passed as `--reactCompiler=true`.
It is disabled by default; `false` or an omitted flag overrides compiler
enablement in `.swcrc`.

Additional compiler options belong in the project's `.swcrc`, for example:

```json
{
  "jsc": {
    "transform": {
      "reactCompiler": {
        "target": "19",
        "compilationMode": "infer"
      }
    }
  }
}
```

Without an options object, enabled builds use SWC's compiler defaults, including
the React 19 runtime target. Consumers must provide the matching compiler runtime;
compiler enablement does not change package peer dependencies.

SWC compiles the original source before Babel's Griffel AOT pass. Other module
outputs derived from Griffel's ESM output do not run the compiler a second time.
Packages without styles compile each module output directly with SWC. Unlike the
previous Babel preprocessing path, compiler-enabled CommonJS-only builds are
supported. No React Compiler intermediate directory is created.
