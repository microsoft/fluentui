# @fluentui/babel-preset-storybook-full-source

**Babel Preset Storybook Full Source for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

This Babel preset makes the full source code of stories available by adding the `context.parameters.fullSource` property to Storybook stories. This property contains the source of the file where the story is present.

## Usage

To use this Babel preset, add it to your Babel configuration:

```json
{
  "presets": ["@fluentui/babel-preset-storybook-full-source"]
}
```

## Features

- **Removes Storybook specific assignments**: Avoids issues with undefined stories and unnecessary clutter.
- **Collects and modifies import declarations**: Ensures valid single-file code examples.
- **Adds the `context.parameters.fullSource` property**: post-processed, single-file source for the "Open in Sandbox" flow.
- **Per-story source** (opt-in via `storyGranularity: 'story'`): when a story file contains multiple story exports (the standard Component Story Format convention), each story gets its **own** sliced `fullSource` containing only the imports and helper declarations it references, plus that single story converted to a renderable function. CSF3 object stories (`{ render }`, or `args`-only stories rendered via the meta `component`) and spread stories (`{ ...Base }`) are supported. Capitalized non-story exports (e.g. shared data objects) are ignored — only genuine story-shaped exports are emitted. `play`/`parameters` are omitted from the generated sample (source files are never modified). Defaults to `'file'`, which attaches the whole file to the last story export (suited to the one-story-per-file convention).
- **CSS module support** (opt-in via `cssModules` option): when enabled, reads `*.module.css` files from disk and injects `context.parameters.cssModuleSources` with `{ cssModules, tokensSource }` entries for the sandbox addon and docs panel. Set `cssModules: true` to enable, or `cssModules: { tokensFilePath: '...' }` to also inject a tokens CSS file as `tokensSource`.

## Source-extraction contract

Every extracted story receives both `parameters.fullSource` (the displayable source string) and
`parameters.fullSourceIsRunnable` (a boolean). Source display and execution are separate capabilities:

- `fullSourceIsRunnable: true` means extraction did not remove unsupported relative imports. The execution consumer
  must still validate package availability and its own runtime requirements.
- `fullSourceIsRunnable: false` means the source is incomplete. It can still be shown in Docs, but execution and sandbox
  export actions should not be offered.
- `fullSourceUnsupportedImports` retains the removed specifiers for diagnostics. Consumers should use the explicit
  boolean for execution decisions rather than infer the contract from the diagnostics array.

This metadata is emitted in both file and per-story modes, independently of the CSS module option. In per-story mode,
unsupported imports only affect stories that reference them. CSS imports preserved by the `cssModules` option are
supported and do not mark the source as incomplete.

Older preset versions and third-party source transforms may omit the boolean. The Fluent execution addons continue to
accept that legacy source, unless unsupported-import diagnostics are present. Third-party transforms should populate
the boolean explicitly when they can determine extraction completeness.

## Note

This package is designed for Fluent UI usage only and may not be suitable for general use.

## License

This project is licensed under the MIT License.
