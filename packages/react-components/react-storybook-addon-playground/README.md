# @fluentui/react-storybook-addon-playground

**Storybook TSX Playground for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

This Storybook addon ships an in-browser TSX playground (`playground.html`) and adds an **Open in Playground** button
next to "Show code" in Storybook Docs mode. Clicking the button opens the story source in the playground, where it can be
edited live against a pre-installed (allowlisted) set of dependencies.

## Features

- Monaco based TSX editor with TypeScript IntelliSense (auto-completion, quick info, type errors) for all
  pre-installed dependencies — their `.d.ts` files are collected at build time (`tools/collect-typings.js`) and loaded
  into the TypeScript worker
- Prettier formatting (`Format` toolbar button or Monaco's "Format Document" shortcut: `Shift+Alt+F`, `Ctrl+Shift+I`
  on Linux) using the repository Prettier settings
- TSX -> JS transpilation runs off the main thread in Monaco's TypeScript web worker
- Pre-installed dependency allowlist: `react`, `react-dom`, `@fluentui/react-components`,
  `@fluentui/react-components/unstable`, `@fluentui/react-icons`
- Live preview rendered inside `FluentProvider` with an error boundary; `Run` (`Ctrl+Enter` / `Cmd+Enter`) remounts
  the preview, compile and runtime errors are shown below it
- Theme switch (Web / Teams, light / dark) that also themes the code editor
- Resizable editor / preview split (drag the separator or use the arrow keys, `Enter` resets); the panes stack on
  narrow viewports
- Shareable URLs — the code lives in the URL hash (`playground.html#code=...`)

## Installation

```sh
yarn add @fluentui/react-storybook-addon-playground
```

## Usage

```js
// .storybook/main.js
module.exports = {
  addons: ['@fluentui/react-storybook-addon-playground'],
};
```

```js
// .storybook/preview.js
import '@fluentui/react-storybook-addon-playground/styles.css';
```

The addon preset registers:

- `previewAnnotations` — the `withOpenInPlaygroundButton` decorator (Docs mode only)
- `staticDirs` — serves the pre-built playground app (`dist/playground`) from the Storybook root, so it is available at
  `<storybook-url>/playground.html`

### Story source

The button reads the story source from `parameters.fullSource`, which is injected at build time by
`@fluentui/babel-preset-storybook-full-source` (registered by `@fluentui/react-storybook-addon-export-to-sandbox`).
Make sure that addon is enabled as well, otherwise the button is not rendered.

### Disabling per story

```ts
export const MyStory = () => <Button />;
MyStory.parameters = { playground: { disable: true } };
```

## Development (monorepo)

The playground app is a separate webpack bundle. Build it before starting Storybook so the static folder exists:

```sh
yarn nx run react-storybook-addon-playground:build-playground
```

Rerun the command after editing files in `src/playground`.

The type declarations are collected from the built workspace packages (`dist/*.d.ts`), which is why the
`build-playground` target depends on `^build`. The allowlist for typings (`TYPINGS_ENTRIES` in
`webpack.playground.config.js`) must match the runtime allowlist in `src/playground/modules.ts`.

## Limitations

- Only allowlisted packages can be imported. Relative imports, CSS/SCSS and other packages fail with an explicit error.
- Type errors are shown in the editor but do not block running the code.
