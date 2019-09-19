# @uifabric/tsx-editor

Monaco-based TypeScript+React live code editor with full typing support. It was primarily written for component examples on the [UI Fabric website](https://developer.microsoft.com/en-us/fabric#/controls/web), but it can be configured to work with other libraries too.

**WARNING:** The editor component's API is still **highly unstable**, so it **should not** be used outside the UI Fabric repo yet.

## Features

### Live updating as user types

As the user edits TypeScript+React example code, it will be transpiled and rendered onto the page.

### Typings support

By default, the editor will load types for React and UI Fabric. It can also be configured to load types for any package.

### Delay loading

Monaco's code is very large and should be loaded after main page content is ready. When consumed with Webpack, this package takes care of delay loading Monaco.

### Read-only rendering in unsupported browsers

If the user's browser can't support the editor (mainly IE 11 and some mobile browsers), the code will be rendered read-only.

## Setup

Any project consuming `@uifabric/tsx-editor` should follow the Webpack and runtime configuration instructions from the [`@uifabric/monaco-editor` readme](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/monaco-editor/README.md). Note that the helpers used are re-exported from this package for convenience:

- `addMonacoWebpackConfig`: import from `@uifabric/tsx-editor/scripts/addMonacoWebpackConfig`
- `configureEnvironment` and `IMonacoConfig`: import from `@uifabric/tsx-editor`

The editor code also assumes that React is available on the page as a global.

To use the editor, choose one of the API options below.

## API options

This package offers multiple options for rendering a Monaco editor and/or a TypeScript+React example.

Note that these are **still subject to change** until a major release.

### `EditorWrapper`: Full editor + example rendering

`EditorWrapper` renders a Monaco editor, a container where the example is rendered, and a message bar with errors (when applicable). As the user types, the component transpiles and evals the code to update the rendered example.

If the user's browser can't support the editor, the code will be rendered read-only.

TODO: add usage example

### `TsxEditor`: Editor + transpile/eval example

`TsxEditor` is like `EditorWrapper`, but without the example container, error bar, or read-only fallback. It takes in the ID of a pre-existing div to render the example into and provides a callback to inform the consumer of transpile/eval errors.

TODO: add usage example

### `Editor`: Editor only

`Editor` renders only Monaco. It works with any language and doesn't do any extra TypeScript setup.

TODO: add usage example

## Advanced usage

TODO: add example of customizing typings and globals, and info about example code requirements
