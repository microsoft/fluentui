# @fluentui/react-text

<!-- TODO: Add link to the new website -->

The Text component exists to ensure consistency in your application's content by setting fixed sizes and other styles.
This package also exports wrappers which ensure your text follows the Fluent design standards of typography.

## Usage

To use the Text components in your application, you can start by installing the main package of Fluent UI components:

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

Or by installing only the `react-text` package. Keep in mind you'll need to install the FluentProvider package as well:

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

### Text wrappers

<!-- TODO: Showcase the wrappers with the cool image -->

Wrappers offer an easy way to use text according to the FluentUI Design System while also improving code readability.
Wrappers types are: `Display`, `Title1`, `Title2` , `Title3`, `Headline`, `Subheadline`, `Body` and `Capton`.

```tsx
import { Display } from '@fluentui/react-text';

const Test = () => <Display bold>This text is a Display title.</Display>;
```

### TypographyStyles

Using FluentUI typography styles without using the text component:

```tsx
import { typogrpahyStyles } from '@fluentui/react-text';

const useStyles = makeStyles({
  root: typographyStyles.display,
});

const Test = () => {
  const styles = useStyles();

  return <p className={styles.root}>I am styled like a display title</p>;
};
```

<!-- TODO: Semantic elements / accessibility with as prop-->

<!-- TODO: Point people to Storybook/API page -->
<!-- TODO: Point people to MIGRATION.md -->

## WIP 🚧

These are not production-ready components as we are still in a Beta phase. This space is useful for testing new components whose APIs might change before final release.
