# @fluentui/react-text

**React Text components for [Fluent UI React](https://react.fluentui.dev/)**

The Text component exists to ensure consistency in your application's content by setting fixed sizes and other styles.
This package also exports wrappers which ensure your text follows the Fluent design standards of typography.

## Usage

To use the Text components in your application, you can start by installing the main package of Fluent UI components:

<!-- TODO: Validate if FluentProvider works without theme. If not, which theme should we refer to -->

```sh
npm install @fluentui/react-components
```

```jsx
import { FluentProvider, Text } from '@fluentui/react-components';

const App = () => (
  <FluentProvider>
    <Text>Fluent UI Text!</Text>
  </FluentProvider>
);
```

Or by installing only the `@fluentui/react-text` package. Keep in mind you'll need to install the FluentProvider package as well:

```sh
npm install @fluentui/react-text
npm install @fluentui/react-provider
```

```jsx
import { FluentProvider } from '@fluentui/react-provider';
import { Text } from '@fluentui/react-text';

const App = () => (
  <FluentProvider>
    <Text>Fluent UI Text!</Text>
  </FluentProvider>
);
```

## Typography wrappers

![List of typography variants by sorted descending by size](./docs/assets/typography-examples.gif 'Typography wrapper list')

Wrappers offer an easy way to use text according to the Fluent Design System while also providing semantic code readability.

Below is an example of the Display wrapper vs using the Text component:

```tsx
import { Text, Display } from '@fluentui/react-text';

const Example = () => (
  <>
    <Text size={1000} weight="semibold">
      This text is styled like a Display variant.
    </Text>
    <Display>This text is also styled like a Display variant.</Display>
  </>
);
```

As you can see, using the `Display` wrapper is a lot easier to read and provides a clearer visual of the page's layout.

## Semantic elements

By default, Text and all the typography wrappers render a `<span>` element. You should use the `as` property to ensure your page has proper semantic elements such as heading or paragraph elements.

```html
<div>
  <Subtitle1 as="h1">Subtitle1</Subtitle1>
  <Subtitle2 as="h2">Subtitle2</Subtitle2>
  <Text as="p">This is simple example</Text>
</div>
```

This will result in the following DOM structure:

```html
<div>
  <h1>Subtitle1</h1>
  <h2>Subtitle2</h2>
  <p>This is simple example</p>
</div>
```

## API

For more information about the components, please refer to the [API documentation](https://react.fluentui.dev/).

## Migration

For migration information, have a look at the [migration guide](./MIGRATION.md).

## Dependency lint pilot

From the repository root, run `yarn nx run react-text:lint-dependencies` to check that production source dependencies
are declared in this package's `dependencies`, `peerDependencies`, or `optionalDependencies`. This opt-in Nx
manifest check does not build component packages. Run it through Nx so that its source dependency graph and file map
are refreshed first; missing graph data is an error, not a successful check.

The pilot excludes test files through the build's production inputs, and excludes configuration and `src/testing`
helpers explicitly. It accounts for generated external SWC helpers, but Nx does not infer the workspace JSX runtime
dependency from `@jsxImportSource` pragmas. Obsolete dependencies and version ranges are not checked. Nx source
analysis also includes type-only imports, so this is not yet a drop-in replacement for
`import/no-extraneous-dependencies`. Keep the JSX runtime declaration when using the corresponding pragma.

This check only covers imports represented in Nx's dependency graph; it does not validate unresolved imports.
The shared `import/no-unresolved` rule is disabled, so retain normal type-check validation rather than relying
on this manifest check to catch unresolved imports.

The existing source lint rule and workspace build prerequisites are unchanged. This pilot builds on
[#32338](https://github.com/microsoft/fluentui/pull/32338); v8 support and broader rollout for
[#27727](https://github.com/microsoft/fluentui/issues/27727) remain separate work.

Run the focused regression suite with
`yarn nx run react-text:test --runInBand --runTestsByPath config/dependency-lint.test.js`.
