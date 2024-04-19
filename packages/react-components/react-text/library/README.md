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
