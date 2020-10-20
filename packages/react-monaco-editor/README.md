# @fluentui/react-monaco-editor

Monaco-based TypeScript+React live code editor with full typing support. It was primarily written for component examples on the [Fluent UI React website](https://developer.microsoft.com/en-us/fluentui#/controls/web) ([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)), but it can be configured to work with other libraries too.

**WARNING:** The editor component's API is still **highly unstable**, so it **should not** be used outside the Fluent UI React repo yet.

## Features

### Live updating as user types

As the user edits TypeScript+React example code, it will be transpiled and rendered onto the page.

### Typings support

By default, the editor will load types for React and Fluent UI React. It can also be configured to load types for any package.

### Delay loading

Monaco's code is very large and should be loaded after main page content is ready. When consumed with Webpack, this package takes care of delay loading Monaco.

### Read-only rendering in unsupported browsers

If the user's browser can't support the editor (mainly IE 11 and some mobile browsers), the code will be rendered read-only.

## Setup

Follow the Webpack and runtime configuration instructions from the [`@fluentui/monaco-editor` readme](https://github.com/microsoft/fluentui/blob/master/packages/monaco-editor/README.md). Note that the helpers used are re-exported from this package for convenience:

- `addMonacoWebpackConfig`: import from `@fluentui/react-monaco-editor/scripts/addMonacoWebpackConfig`
- `configureEnvironment` and `IMonacoConfig`: import from `@fluentui/react-monaco-editor`

Then choose one of the API options below for rendering the editor.

## API options

This package offers multiple options for rendering a Monaco editor and/or a TypeScript+React example.

Note that these are **still subject to change** until a major release.

### `EditorWrapper`: Full editor + example rendering

`EditorWrapper` renders a Monaco editor, a container where the example is rendered, and a message bar with errors (when applicable). As the user types, `EditorWrapper` transpiles the updated example component code, evals it, and re-renders the example component.

If the user's browser can't support the editor, the code will be rendered read-only.

TODO: add usage example

### `TsxEditor`: Editor + transpile/eval example

`TsxEditor` is like `EditorWrapper`, but without the example container, error bar, or read-only fallback. Instead of rendering the example itself, it takes in an `onTransformFinished` callback to pass the example component up to the parent for rendering.

Notes for this option:

- You should **delay load** the `TsxEditor` component to prevent Monaco from being pulled into your main bundle.
  - `TsxEditor` isn't included in `@fluentui/react-monaco-editor/lib/index` due to importing Monaco. It should be imported from `@fluentui/react-monaco-editor/lib/TsxEditor` instead.
- When rendering the example component, be sure to wrap it in an error boundary; otherwise **runtime errors in the example will crash the page**. (One option is using `EditorErrorBoundary`, which also handles displaying transform errors.)

TODO: add usage example

### `Editor`: Editor only

`Editor` renders only Monaco. It works with any language and doesn't do any extra TypeScript setup.

Note that if you choose this option, you should **delay load** the `Editor` component to prevent Monaco from being pulled into your main bundle. (`Editor` isn't included in `@fluentui/react-monaco-editor/lib/index` due to importing Monaco. It should be imported from `@fluentui/react-monaco-editor/lib/Editor` instead.)

TODO: add usage example

## Advanced usage

TODO: add example of customizing typings and globals, and info about example code requirements
