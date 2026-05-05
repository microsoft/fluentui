# Components/Badge/Counter Badge

A counter badge is a badge that displays a numerical count.

## Props

| Name            | Type                                                                                                                                         | Required | Default  | Description                                                                                                                                                                                                                                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `as`            | `"div"`                                                                                                                                      | No       |          |                                                                                                                                                                                                                                                                                                                                  |
| `size`          | `"small" "medium" "large" "tiny" "extra-small" "extra-large"`                                                                                | No       |          | A Badge can be on of several preset sizes. @defaultvalue medium                                                                                                                                                                                                                                                                  |
| `icon`          | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No       |                                                                                                                                                                                                                                                                                                                                  |     |
| `iconPosition`  | `"before" "after"`                                                                                                                           | No       |          | A Badge can position the icon before or after the content. @defaultvalue before                                                                                                                                                                                                                                                  |
| `appearance`    | `"filled" "ghost"`                                                                                                                           | No       | filled   | A Badge can have different appearances that emphasize certain parts of it: - filled: The default appearance if one is not specified. The badge background is filled with color with a contrasting foreground text to match. - ghost: The badge background is transparent, with the foreground text taking color to emphasize it. |
| `color`         | `"brand" "danger" "important" "informative"`                                                                                                 | No       | brand    | Semantic colors for a counter badge                                                                                                                                                                                                                                                                                              |
| `count`         | `number`                                                                                                                                     | No       | 0        | Value displayed by the Badge                                                                                                                                                                                                                                                                                                     |
| `dot`           | `boolean`                                                                                                                                    | No       | false    | If a dot should be displayed without the count                                                                                                                                                                                                                                                                                   |
| `overflowCount` | `number`                                                                                                                                     | No       | 99       | Max number to be displayed                                                                                                                                                                                                                                                                                                       |
| `shape`         | `"circular" "rounded"`                                                                                                                       | No       | circular | A Badge can be circular or rounded                                                                                                                                                                                                                                                                                               |
| `showZero`      | `boolean`                                                                                                                                    | No       | false    | If the badge should be shown when count is 0                                                                                                                                                                                                                                                                                     |
| `ref`           | `Ref<HTMLDivElement>`                                                                                                                        | No       |          |                                                                                                                                                                                                                                                                                                                                  |

## Examples

### Appearance

A counter badge can have a `ghost` or `filled` appearance. The default is `filled`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';

export const Appearance = (): JSXElement => {
  return (
    <>
      <CounterBadge count={5} appearance="filled" />
      <CounterBadge count={5} appearance="ghost" />
    </>
  );
};
```

### Color

A counter badge can be different colors. The available colors are `brand`, `danger`, `important`, `informative`, `severe`, `severe`, `success` or `warning`. The default is `brand`. Information conveyed by color should also be communicated in another way to meet [accessibility requirements](https://w3c.github.io/wcag/guidelines/22/#use-of-color).

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';
export const Color = (): JSXElement => {
  return (
    <>
      <CounterBadge appearance="filled" color="brand" count={5} />
      <CounterBadge appearance="filled" color="danger" count={5} />
      <CounterBadge appearance="filled" color="important" count={5} />
      <CounterBadge appearance="filled" color="informative" count={5} />
    </>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';
import type { CounterBadgeProps } from '@fluentui/react-components';

export const Default = (args: CounterBadgeProps): JSXElement => <CounterBadge {...args} />;
```

### Dot

A counter badge can display a small dot.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';

export const Dot = (): JSXElement => <CounterBadge count={0} dot />;
```

### Shapes

A counter badge can have a `rounded` or `circular` shape. The default is `circular`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';

export const Shapes = (): JSXElement => {
  return (
    <>
      <CounterBadge count={5} shape="circular" />
      <CounterBadge count={5} shape="rounded" />
    </>
  );
};
```

### Sizes

A counter badge supports `tiny`, `extra-small`, `small`, `medium`, `large`, and `extra-large` sizes. The default is `medium`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';

export const Sizes = (): JSXElement => {
  return (
    <>
      <CounterBadge count={5} size="tiny" />
      <CounterBadge count={5} size="extra-small" />
      <CounterBadge count={5} size="small" />
      <CounterBadge count={5} size="medium" />
      <CounterBadge count={5} size="large" />
      <CounterBadge count={5} size="extra-large" />
    </>
  );
};
```
