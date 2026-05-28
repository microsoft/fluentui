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
- **CSS module support** (opt-in via `cssModules` option): when enabled, reads `*.module.css` files from disk and injects `context.parameters.cssModuleSources` with `{ cssModules, tokensSource }` entries for the sandbox addon and docs panel. Set `cssModules: true` to enable, or `cssModules: { tokensFilePath: '...' }` to also inject a tokens CSS file as `tokensSource`.

## Note

This package is designed for Fluent UI usage only and may not be suitable for general use.

## License

This project is licensed under the MIT License.
