- [Migration from v0](#migration-from-v0)
  - [Card](#card)
    - [Property Mapping](#property-mapping)
    - [Props that remain as is](#props-that-remain-as-is)
    - [Props no longer supported with an equivalent functionality](#props-no-longer-supported-with-an-equivalent-functionality)
    - [Props no longer supported](#props-no-longer-supported)
  - [CardHeader](#cardheader)
    - [Property Mapping](#property-mapping-1)
    - [Props that remain as is](#props-that-remain-as-is-1)
    - [Props no longer supported with an equivalent functionality](#props-no-longer-supported-with-an-equivalent-functionality-1)
    - [Props no longer supported](#props-no-longer-supported-1)
  - [CardBody](#cardbody)
  - [CardPreview](#cardpreview)
    - [Property Mapping](#property-mapping-2)
    - [Props that remain as is](#props-that-remain-as-is-2)
    - [Props no longer supported with an equivalent functionality](#props-no-longer-supported-with-an-equivalent-functionality-2)
    - [Props no longer supported](#props-no-longer-supported-2)
    - [Example](#example)
      - [Before](#before)
      - [After](#after)
  - [CardColumn](#cardcolumn)
  - [CardExpandableBox](#cardexpandablebox)
  - [CardTopControls](#cardtopcontrols)
  - [CardFooter](#cardfooter)
    - [Property Mapping](#property-mapping-3)
    - [Props that remain as is](#props-that-remain-as-is-3)
    - [Props no longer supported with an equivalent functionality](#props-no-longer-supported-with-an-equivalent-functionality-3)
    - [Props no longer supported](#props-no-longer-supported-3)
- [Migration from v8](#migration-from-v8)

# Migration from v0

## Card

### Property Mapping

| v0 - `Card`    | v9 - `Card`   |
| -------------- | ------------- |
| `acessibility` | -             |
| -              | `appearance`  |
| `as`           | `as`          |
| `centered`     | -             |
| `className`    | `className`   |
| `compact`      | -             |
| `design`       | -             |
| `disabled`     | -             |
| `elevated`     | -             |
| `expandable`   | -             |
| `fluid`        | -             |
| -              | `focusMode`   |
| `ghost`        | -             |
| `inverted`     | -             |
| `key`          | -             |
| -              | `orientation` |
| `ref`          | -             |
| -              | `root` slot   |
| `selected`     | -             |
| `size`         | `size`        |
| `styles`       | -             |
| `variables`    | -             |

### Props that remain as is

- `as`
- `className`
- `key`
- `ref`
- `size` => The size options are now reduced: `'small' | 'medium' | 'large'`

### Props no longer supported with an equivalent functionality

- `accessibility` => Override accessibility behavior by composing the `Card` how you want
- `compact` => Instead, use `size="small"`
- `ghost` => Instead, use `appearance="subtle"`
- `inverted` => Instead, use `appearance="filled-alternative"`

### Props no longer supported

- `centered` => Can be achieved by overriding the styles of the Card component:

```jsx
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { Card } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  centeredCard: {
    justifyItems: 'center',
  },
});

export const CenteredCard = () => {
  const styles = useStyles();

  return (
    <Card className={styles.centeredCard}>
      <p>Lorem ipsum dolor sit amet.</p>
    </Card>
  );
};
```

- `disabled` => No equivalent functionality. Can be created by overriding the styles.
- `elevated` => All cards are now elevated by default. To change that, use the `appearance` property.
- `expandable` => No equivalent functionality.
- `fluid` => All cards are fluid by default. To change that, use a parent container with a defined size:

```jsx
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { Card } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  parent: {
    width: '500px',
  },
});

export const SizedCard = () => {
  const styles = useStyles();

  return (
    <div className={styles.parent}>
      <Card>
        <p>Lorem ipsum dolor sit amet.</p>
      </Card>
    </div>
  );
};
```

- `selected` => No equivalent functionality.

## CardHeader

### Property Mapping

| v0 - `Cardheader` | v9 - `Cardheader`  |
| ----------------- | ------------------ |
| `acessibility`    | -                  |
| -                 | `root` slot        |
| -                 | `image` slot       |
| -                 | `header` slot      |
| -                 | `description` slot |
| -                 | `action` slot      |
| `as`              | -                  |
| `className`       | -                  |
| `design`          | -                  |
| `fitted`          | -                  |
| `key`             | -                  |
| `ref`             | -                  |
| `styles`          | -                  |
| `variables`       | -                  |

### Props that remain as is

- `as`
- `className`
- `key`
- `ref`

### Props no longer supported with an equivalent functionality

- `accessibility` => Override accessibility behavior by composing the `CardHeader` how you want

### Props no longer supported

- `design`
- `fitted`
- `styles`
- `variables`

## CardBody

This component is no longer supported. Instead, pass any content under the main Card component.

Before:

```jsx
import * as React from 'react';
import { Card, CardBody } from '@fluentui/react-northstar';

export const CardBodyExample = () => (
  <Card elevated aria-roledescription="card with image and text">
    <CardBody fitted>
      <p>Lorem ipsum dolor sit amet.</p>
    </CardBody>
  </Card>
);
```

After:

```jsx
import * as React from 'react';
import { Card } from '@fluentui/react-components/unstable';

export const CardBodyExample = () => (
  <Card>
    <p>Lorem ipsum dolor sit amet.</p>
  </Card>
);
```

## CardPreview

### Property Mapping

| v0 - `CardPreview` | v9 - `CardPreview` |
| ------------------ | ------------------ |
| `acessibility`     | -                  |
| `as`               | -                  |
| `className`        | -                  |
| `design`           | -                  |
| `fitted`           | -                  |
| `horizontal`       | -                  |
| -                  | `logo` slot        |
| `key`              | -                  |
| `ref`              | -                  |
| -                  | `root` slot        |
| `styles`           | -                  |
| `variables`        | -                  |

### Props that remain as is

- `as`
- `className`
- `key`
- `ref`

### Props no longer supported with an equivalent functionality

- `accessibility` => Override accessibility behavior by composing the `CardPreview` how you want

### Props no longer supported

- `design`
- `fitted`
- `horizontal`
- `styles`
- `variables`

### Example

#### Before

```jsx
import * as React from 'react';
import { Card, CardPreview, Image } from '@fluentui/react-northstar';

export const CardPreviewExample = () => (
  <Card aria-roledescription="image card">
    <CardPreview>
      <Image fluid src="https://url-of.the/image.jpg" alt="Preview of a Word document" />
    </CardPreview>
  </Card>
);
```

#### After

```jsx
import * as React from 'react';
import { Card, CardPreview } from '@fluentui/react-components/unstable';

export const CardPreviewExample = () => (
  <Card>
    <CardPreview>
      <img src="https://url-of.the/image.jpg" alt="Preview of a Word document" />
    </CardPreview>
  </Card>
);
```

## CardColumn

This component is no longer supported.

## CardExpandableBox

This component is no longer supported.

## CardTopControls

This component is no longer supported.

## CardFooter

### Property Mapping

| v0 - `CardFooter` | v9 - `CardFooter` |
| ----------------- | ----------------- |
| `acessibility`    | -                 |
| `as`              | -                 |
| `className`       | -                 |
| `design`          | -                 |
| `fitted`          | -                 |
| `key`             | -                 |
| `ref`             | -                 |
| `styles`          | -                 |
| `variables`       | -                 |

### Props that remain as is

- `as`
- `className`
- `key`
- `ref`

### Props no longer supported with an equivalent functionality

- `accessibility` => Override accessibility behavior by composing the `CardFooter` how you want

### Props no longer supported

- `design`
- `fitted`
- `styles`
- `variables`

# Migration from v8

WIP
