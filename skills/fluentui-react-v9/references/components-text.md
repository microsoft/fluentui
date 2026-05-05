# Components/Text

Typography and styling abstraction component used to ensure consistency and standardize text throughout your application.

## Best practices

### Do

- Use Text whenever you need to display stylized text
- Use Text to display read-only text
- Use the `as` prop to give the text a semantic meaning. By default, the Text component will result in a `span` element.

## Props

| Name            | Type                                                                   | Required | Default | Description                                                             |
| --------------- | ---------------------------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------- |
| `as`            | `"b" "em" "h1" "h2" "h3" "h4" "h5" "h6" "i" "p" "pre" "span" "strong"` | No       |         |                                                                         |
| `align`         | `"center" "start" "end" "justify"`                                     | No       | start   | Aligns text based on the parent container.                              |
| `block`         | `boolean`                                                              | No       | false   | Applies a block display for the content.                                |
| `font`          | `"base" "numeric" "monospace"`                                         | No       | base    | Applies the font family to the content.                                 |
| `italic`        | `boolean`                                                              | No       | false   | Applies the italic font style to the content.                           |
| `size`          | `100 200 300 400 500 600 700 800 900 1000`                             | No       | 300     | Applies font size and line height based on the theme typography tokens. |
| `strikethrough` | `boolean`                                                              | No       | false   | Applies the strikethrough text decoration to the content.               |
| `truncate`      | `boolean`                                                              | No       | false   | Truncate overflowing text for block displays.                           |
| `underline`     | `boolean`                                                              | No       | false   | Applies the underline text decoration to the content.                   |
| `weight`        | `"bold" "medium" "regular" "semibold"`                                 | No       | regular | Applies font weight to the content.                                     |
| `wrap`          | `boolean`                                                              | No       | true    | Wraps the text content on white spaces.                                 |
| `ref`           | `Ref<HTMLElement>`                                                     | No       |         |                                                                         |

## Subcomponents

### Presets

Text preset component for the Display typography variant

#### Props

| Name            | Type                                                                   | Required | Default | Description                                               |
| --------------- | ---------------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------- |
| `as`            | `"b" "em" "h1" "h2" "h3" "h4" "h5" "h6" "i" "p" "pre" "span" "strong"` | No       |         |                                                           |
| `block`         | `boolean`                                                              | No       | false   | Applies a block display for the content.                  |
| `underline`     | `boolean`                                                              | No       | false   | Applies the underline text decoration to the content.     |
| `wrap`          | `boolean`                                                              | No       | true    | Wraps the text content on white spaces.                   |
| `align`         | `"center" "start" "end" "justify"`                                     | No       | start   | Aligns text based on the parent container.                |
| `italic`        | `boolean`                                                              | No       | false   | Applies the italic font style to the content.             |
| `strikethrough` | `boolean`                                                              | No       | false   | Applies the strikethrough text decoration to the content. |
| `truncate`      | `boolean`                                                              | No       | false   | Truncate overflowing text for block displays.             |

## Examples

### Alignment

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    gap: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

export const Alignment = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text align="start">Aligned to start</Text>
      <Text align="center">Aligned to center</Text>
      <Text align="end">Aligned to end</Text>
      <Text align="justify">
        Justified text: Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium accusamus voluptate autem?
        Recusandae alias corporis dicta quisquam sequi molestias deleniti, libero necessitatibus, eligendi, omnis cumque
        enim asperiores quasi quidem sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus repellat
        consectetur, sed aperiam ex nulla repellendus tempora vero illo aliquam autem! Impedit ipsa praesentium vero
        veritatis unde eos, fuga magnam!
      </Text>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

export const Default = (): JSXElement => <Text>This is an example of the Text component's usage.</Text>;
```

### Font

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    gap: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const Font = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text font="base">This is the default font</Text>
      <Text font="numeric">This is numeric font</Text>
      <Text font="monospace">This is monospace font</Text>
    </div>
  );
};
```

### Italic

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

export const Italic = (): JSXElement => <Text italic>Italic text</Text>;
```

### Presets

**Presets** are a set of components with predefined styles for typography, based in our [Theme Tokens](./?path=/docs/theme-typography--docs). They are used to create and share a consistent look and feel.<br> All the base `Text` props can be used, except for `font`, `size` and `weight`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Body1,
  Body1Strong,
  Body1Stronger,
  Body2,
  Caption1,
  Caption1Strong,
  Caption1Stronger,
  Caption2,
  Caption2Strong,
  Display,
  LargeTitle,
  Subtitle1,
  Subtitle2,
  Subtitle2Stronger,
  Title1,
  Title2,
  Title3,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    gap: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
  },
});

export const Presets = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Caption2>Caption2</Caption2>
      <Caption2Strong>Caption2Strong</Caption2Strong>
      <Caption1>Caption1</Caption1>
      <Caption1Strong>Caption1Strong</Caption1Strong>
      <Caption1Stronger>Caption1Stronger</Caption1Stronger>
      <Body1>Body1</Body1>
      <Body1Strong>Body1Strong</Body1Strong>
      <Body1Stronger>Body1Stronger</Body1Stronger>
      <Body2>Body2</Body2>
      <Subtitle2>Subtitle2</Subtitle2>
      <Subtitle2Stronger>Subtitle2Stronger</Subtitle2Stronger>
      <Subtitle1>Subtitle1</Subtitle1>
      <Title3>Title3</Title3>
      <Title2>Title2</Title2>
      <Title1>Title1</Title1>
      <LargeTitle>LargeTitle</LargeTitle>
      <Display>Display</Display>
    </div>
  );
};
```

### Size

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    gap: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
  },
});

export const Size = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text size={100}>100</Text>
      <Text size={200}>200</Text>
      <Text size={300}>300</Text>
      <Text size={400}>400</Text>
      <Text size={500}>500</Text>
      <Text size={600}>600</Text>
      <Text size={700}>700</Text>
      <Text size={800}>800</Text>
      <Text size={900}>900</Text>
      <Text size={1000}>1000</Text>
    </div>
  );
};
```

### Strike Through

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

export const StrikeThrough = (): JSXElement => <Text strikethrough>Strikethrough text</Text>;
```

### Truncate

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  text: {
    overflow: 'hidden',
    width: '240px',
    display: 'block',
  },
});

export const Truncate = (): JSXElement => {
  const styles = useStyles();

  return (
    <Text truncate wrap={false} className={styles.text}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere aliquam nisi numquam, fugit recusandae eligendi
      aspernatur odio minus? Incidunt maxime ipsam dolorem quia quas aliquam, quasi consequatur! Ea, minus eaque.
    </Text>
  );
};
```

### Underline

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

export const Underline = (): JSXElement => <Text underline>Underlined text</Text>;
```

### Weight

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    gap: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const Weight = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  );
};
```
