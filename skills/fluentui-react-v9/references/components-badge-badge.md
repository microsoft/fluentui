# Components/Badge/Badge

A badge is a visual decoration for UI elements.

Different badges can display different content.

- `Badge` displays text and/or an icon
- `CounterBadge` displays numerical values
- `PresenceBadge` displays status

## Best practices

### Badges should not receive focus

- Badge information should be surfaced as part of the control that it is associated with, because, badges themselves do not receive focus meaning they are not directly accessible by screen readers.
  If the combination of icon and badge communicates some meaningful information, that information should be surfaced in another way through screenreader or tooltip on the component the badge is associated with.

### Screen Readers

Badge content is exposed as text, and is treated by screen readers as if it were inline content of the control it is associated with. This should provide a reasonable default for most badges that contain plain text, such as the `CounterBadge`.

There are two actions authors should consider taking when using Badge to improve this experience:

1. If the badge contains a custom icon, that icon must be given alternative text with `aria-label`, unless it is purely presentational:

```jsx
<Badge icon={<PasteIcon aria-label="paste" />} />
```

2. If the text of the badge itself is not sufficient to convey its meaning, it can either be given additional hidden text, or the parent element given an explicit label:

```jsx
<button>
  Inbox
  <Badge>6<span class="visuallyHidden"> unread messages</span></Badge>
</button>

<button aria-label="Inbox, 6 unread messages">
  Inbox
  <Badge>6</Badge>
</button>
```

### Badge shouldn't rely only on color information

- Include meaningful descriptions when using color to represent meaning in a badge. If relying on color only [unread dot] ensure that non-visual information is included in the parent's label or description. Alternatively, mark up the Badge as an image with a label:

```jsx
<Badge role="img" aria-label="Active" appearance="filled" color="brand" />} />
```

### Text on Badge

- Badges are intented to have short text, small numerical values or status information. Long text is not supported and should not be used within a Badge.

## Props

| Name           | Type                                                                                                                                         | Required | Default | Description                                                                     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------- | --- |
| `as`           | `"div"`                                                                                                                                      | No       |         |                                                                                 |
| `icon`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                 |     |
| `appearance`   | `"filled" "ghost" "outline" "tint"`                                                                                                          | No       |         | A Badge can be filled, outline, ghost, inverted @defaultvalue filled            |
| `color`        | `"brand" "danger" "important" "informative" "severe" "subtle" "success" "warning"`                                                           | No       |         | A Badge can be one of preset colors @defaultvalue brand                         |
| `iconPosition` | `"before" "after"`                                                                                                                           | No       |         | A Badge can position the icon before or after the content. @defaultvalue before |
| `shape`        | `"circular" "square" "rounded"`                                                                                                              | No       |         | A Badge can be square, circular or rounded. @defaultvalue circular              |
| `size`         | `"small" "medium" "large" "tiny" "extra-small" "extra-large"`                                                                                | No       |         | A Badge can be on of several preset sizes. @defaultvalue medium                 |
| `ref`          | `Ref<HTMLDivElement>`                                                                                                                        | No       |         |                                                                                 |

## Examples

### Appearance

A badge can have a `filled`, `ghost`, `outline`, or `tint` appearance. The default is `filled`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Badge } from '@fluentui/react-components';

export const Appearance = (): JSXElement => {
  return (
    <>
      <Badge appearance="filled">999+</Badge>
      <Badge appearance="ghost">999+</Badge>
      <Badge appearance="outline">999+</Badge>
      <Badge appearance="tint">999+</Badge>
    </>
  );
};
```

### Color

A badge can have different colors. The available colors are `brand`, `danger`, `important`, `informative`, `severe`, `subtle`, `success` or `warning`. The default is `brand`. Information conveyed by color should also be communicated in another way to meet [accessibility requirements](https://w3c.github.io/wcag/guidelines/22/#use-of-color).

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Badge } from '@fluentui/react-components';

export const Color = (): JSXElement => {
  return (
    <>
      <Badge appearance="filled" color="brand">
        999+
      </Badge>
      <Badge appearance="filled" color="danger">
        999+
      </Badge>
      <Badge appearance="filled" color="important">
        999+
      </Badge>
      <Badge appearance="filled" color="informative">
        999+
      </Badge>
      <Badge appearance="filled" color="severe">
        999+
      </Badge>
      <Badge appearance="filled" color="subtle">
        999+
      </Badge>
      <Badge appearance="filled" color="success">
        999+
      </Badge>
      <Badge appearance="filled" color="warning">
        999+
      </Badge>
    </>
  );
};
```

### Color And Appearance

Note: `ghost-subtle` and `outline-subtle` are intended only for use on brand background.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Badge, makeStyles, tokens, BadgeProps } from '@fluentui/react-components';
import { ClipboardPasteRegular as PasteIcon } from '@fluentui/react-icons';

const useStyles = makeStyles({
  example: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  badge: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
  },
  brand: {
    display: 'flex',
    backgroundColor: tokens.colorBrandBackground,
    padding: tokens.spacingHorizontalXXS,
  },
});

const Badges = (props: BadgeProps) => {
  const styles = useStyles();
  const { appearance } = props;

  const colors: BadgeProps['color'][] = [
    'brand',
    'danger',
    'important',
    'informative',
    'severe',
    'subtle',
    'success',
    'warning',
  ];

  return (
    <div className={styles.badge}>
      {colors.map(color => {
        const BadgeWrapper =
          color === 'subtle' && (appearance === 'ghost' || appearance === 'outline')
            ? ({ children }: { children: React.ReactNode }) => <div className={styles.brand}>{children}</div>
            : React.Fragment;

        return (
          <BadgeWrapper key={`${appearance}-${color}`}>
            <Badge appearance={appearance} color={color} icon={<PasteIcon />}>
              999+
            </Badge>
          </BadgeWrapper>
        );
      })}
    </div>
  );
};

export const ColorAndAppearance = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.example}>
      <h3>Filled</h3>
      <Badges appearance="filled" />
      <h3>Ghost</h3>
      <Badges appearance="ghost" />
      <h3>Outline</h3>
      <Badges appearance="outline" />
      <h3>Tint</h3>
      <Badges appearance="tint" />
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Badge } from '@fluentui/react-components';
import type { BadgeProps } from '@fluentui/react-components';

export const Default = (props: BadgeProps): JSXElement => <Badge {...props} />;
```

### Icon

A badge can display an icon. If the icon is meaningful, then either the icon must have a label or the parent control's label must include the information conveyed by the icon.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Badge } from '@fluentui/react-components';
import { ClipboardPasteRegular as PasteIcon } from '@fluentui/react-icons';

export const Icon = (): JSXElement => {
  return <Badge size="medium" icon={<PasteIcon />} />;
};
```

### Shapes

A badge can have `square`, `rounded` or `circular` shape. The default is `circular`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Badge } from '@fluentui/react-components';

export const Shapes = (): JSXElement => {
  return (
    <>
      <Badge shape="square" />
      <Badge shape="rounded" />
      <Badge shape="circular" />
    </>
  );
};
```

### Sizes

A badge supports `tiny`, `extra-small`, `small`, `medium`, `large`, and `extra-large` sizes. The default is `medium`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Badge } from '@fluentui/react-components';

export const Sizes = (): JSXElement => {
  return (
    <>
      <Badge size="tiny" />
      <Badge size="extra-small" />
      <Badge size="small" />
      <Badge size="medium" />
      <Badge size="large" />
      <Badge size="extra-large" />
    </>
  );
};
```
