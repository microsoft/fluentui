# @fluentui/react-text

**React Text component and wrappers for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

Typography and styling abstraction component used to ensure consistency of text.

## STATUS: WIP 🚧

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Usage

### Text component

Default Text component:

```tsx
import { Text } from '@fluentui/react-text';

const Test = () => (
  <Text weight="semibold" size={1000}>
    This text is semibold and huge.
  </Text>
);
```

### Text wrappers

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
