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
- **Adds `context.parameters.docs.source.code` / `originalSource`**: the cleaned raw file contents (with colocated `*.module.css` paths rewritten to the `./styles/<basename>` layout used by the Stackblitz sandbox), so Storybook's "Show code" panel and any custom docs page render the file the author wrote without per-story plumbing.

## Note

This package is designed for Fluent UI usage only and may not be suitable for general use.

## License

This project is licensed under the MIT License.
