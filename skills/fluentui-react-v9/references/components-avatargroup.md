# Components/AvatarGroup

An AvatarGroup is a graphical representation of multiple people associated with a given entity. AvatarGroup leverages the Avatar component, with each Avatar representing a person and containing their image, initials, or an icon. An AvatarGroup can be represented
in a spread, stack, or pie layout.

## Best practices

### Do

- Use `partitionAvatarGroupItems` when possible.

- Display all items, including inline `AvatarGroupItems`, inside `AvatarGroupPopover` when using a `pie` layout.

- Use the last `AvatarGroupItems` in the `AvatarGroup` as the inline items when using a `spread` or `stack` layout.

### Don't

- Use more than 3 `AvatarGroupItems` inside an `AvatarGroup` with `pie` layout.

## Props

| Name     | Type                                          | Required | Default | Description                                         |
| -------- | --------------------------------------------- | -------- | ------- | --------------------------------------------------- |
| `as`     | `"div"`                                       | No       |         |                                                     |
| `layout` | `"spread" "stack" "pie"`                      | No       | spread  | Layout the AvatarGroupItems should be displayed as. |
| `size`   | `16 20 24 28 32 36 40 48 56 64 72 96 120 128` | No       | 32      | Size of the AvatarGroupItems.                       |
| `ref`    | `Ref<HTMLDivElement>`                         | No       |         |                                                     |

## Subcomponents

### AvatarGroupItem

The AvatarGroupItem component represents a single person or entity.
AvatarGroupItem should only be used in an AvatarGroup component.

#### Props

| Name               | Type                                                                                                                                                                                                                                                                                                               | Required                                                                                                                       | Default                            | Description                                                                                                                                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------- | ---------- | --- | --- | ------------------------------------------ |
| `root`             | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>                                                                                                                                                              | ({ ...; } & ... 1 more ... & { ...; })                                                                                         | null>`                             | No                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                       |                                    |
| `image`            | `({ as?: "img"; } & Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "children"> & { ...; })                                                                                                                                                                                         | null`                                                                                                                          | No                                 |                                                                                                                                                                                                                                                                                                 | The Avatar's image. Usage e.g.: `image={{ src: '...' }}`                                                                                                                                                                                                              |
| `color`            | `"anchor" "neutral" "brand" "colorful" "dark-red" "cranberry" "red" "pumpkin" "peach" "marigold" "gold" "brass" "brown" "forest" "seafoam" "dark-green" "light-teal" "teal" "steel" "blue" "royal-blue" "cornflower" "navy" "lavender" "purple" "grape" "lilac" "pink" "magenta" "plum" "beige" "mink" "platinum"` | No                                                                                                                             | neutral                            | The color when displaying either an icon or initials. _ neutral (default): gray _ brand: color from the brand palette _ colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or idForColor if provided) _ [AvatarNamedColor]: a specific color from the theme |
| `as`               | `"span"`                                                                                                                                                                                                                                                                                                           | No                                                                                                                             |                                    |                                                                                                                                                                                                                                                                                                 |
| `avatar`           | `NonNullable<WithSlotShorthandValue<Omit<ComponentProps<AvatarSlots>, "color"> & { active?: "active"                                                                                                                                                                                                               | "inactive"                                                                                                                     | "unset"; activeAppearance?: "ring" | "shadow"                                                                                                                                                                                                                                                                                        | "ring-shadow"; ... 4 more ...; size?: AvatarSize                                                                                                                                                                                                                      | undefined; } & RefAttributes<...>> | null>                                       | undefined` | No  |     | Avatar that represents a person or entity. |
| `overflowLabel`    | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                           | null>`                                                                                                                         | No                                 |                                                                                                                                                                                                                                                                                                 | Label used for the name of the AvatarGroupItem when rendered as an overflow item. The content of the label, by default, is the `name` prop from the `avatar` slot.                                                                                                    |
| `initials`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                       | null`                                                                                                                          | No                                 |                                                                                                                                                                                                                                                                                                 | (optional) Custom initials. It is usually not necessary to specify custom initials; by default they will be derived from the `name` prop, using the `getInitials` function. The initials are displayed when there is no image (including while the image is loading). |
| `icon`             | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                       | null`                                                                                                                          | No                                 | `PersonRegular` (the default icon's size depends on the Avatar's size)                                                                                                                                                                                                                          | Icon to be displayed when the avatar doesn't have an image or initials.                                                                                                                                                                                               |
| `badge`            | `WithSlotShorthandValue<Omit<ComponentProps<Pick<BadgeSlots, "root"                                                                                                                                                                                                                                                | "icon">>, "color"> & Pick<BadgeProps, "size"> & { status?: PresenceBadgeStatus; outOfOffice?: boolean; } & RefAttributes<...>> | null                               | undefined`                                                                                                                                                                                                                                                                                      | No                                                                                                                                                                                                                                                                    |                                    | Badge to show the avatar's presence status. |
| `active`           | `"active" "inactive" "unset"`                                                                                                                                                                                                                                                                                      | No                                                                                                                             | unset                              | Optional activity indicator _ active: the avatar will be decorated according to activeAppearance _ inactive: the avatar will be reduced in size and partially transparent \* unset: normal display                                                                                              |
| `activeAppearance` | `"ring" "shadow" "ring-shadow"`                                                                                                                                                                                                                                                                                    | No                                                                                                                             | ring                               | The appearance when `active="active"`                                                                                                                                                                                                                                                           |
| `idForColor`       | `string`                                                                                                                                                                                                                                                                                                           | No                                                                                                                             |                                    | Specify a string to be used instead of the name, to determine which color to use when color="colorful". Use this when a name is not available, but there is another unique identifier that can be used instead.                                                                                 |
| `name`             | `string`                                                                                                                                                                                                                                                                                                           | No                                                                                                                             |                                    | The name of the person or entity represented by this Avatar. This should always be provided if it is available. The name is used to determine the initials displayed when there is no image. It is also provided to accessibility tools.                                                        |
| `ref`              | `Ref<HTMLSpanElement>`                                                                                                                                                                                                                                                                                             | No                                                                                                                             |                                    |                                                                                                                                                                                                                                                                                                 |

### Avatar

#### Props

| Name               | Type                                                                                                                                                                                                                                                                                                               | Required                                                                                                                       | Default  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------- |
| `image`            | `({ as?: "img"; } & Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "children"> & { ...; })                                                                                                                                                                                         | null`                                                                                                                          | No       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | The Avatar's image. Usage e.g.: `image={{ src: '...' }}`                                                                                                                                                                                                              |
| `as`               | `"span"`                                                                                                                                                                                                                                                                                                           | No                                                                                                                             |          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `initials`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                       | null`                                                                                                                          | No       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | (optional) Custom initials. It is usually not necessary to specify custom initials; by default they will be derived from the `name` prop, using the `getInitials` function. The initials are displayed when there is no image (including while the image is loading). |
| `icon`             | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                       | null`                                                                                                                          | No       | `PersonRegular` (the default icon's size depends on the Avatar's size)                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Icon to be displayed when the avatar doesn't have an image or initials.                                                                                                                                                                                               |
| `badge`            | `WithSlotShorthandValue<Omit<ComponentProps<Pick<BadgeSlots, "root"                                                                                                                                                                                                                                                | "icon">>, "color"> & Pick<BadgeProps, "size"> & { status?: PresenceBadgeStatus; outOfOffice?: boolean; } & RefAttributes<...>> | null     | undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No                                                                                                                                                                                                                                                                    |     | Badge to show the avatar's presence status. |
| `active`           | `"active" "inactive" "unset"`                                                                                                                                                                                                                                                                                      | No                                                                                                                             | unset    | Optional activity indicator _ active: the avatar will be decorated according to activeAppearance _ inactive: the avatar will be reduced in size and partially transparent \* unset: normal display                                                                                                                                                                                                                                                                                                                                                  |
| `activeAppearance` | `"ring" "shadow" "ring-shadow"`                                                                                                                                                                                                                                                                                    | No                                                                                                                             | ring     | The appearance when `active="active"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `color`            | `"anchor" "neutral" "brand" "colorful" "dark-red" "cranberry" "red" "pumpkin" "peach" "marigold" "gold" "brass" "brown" "forest" "seafoam" "dark-green" "light-teal" "teal" "steel" "blue" "royal-blue" "cornflower" "navy" "lavender" "purple" "grape" "lilac" "pink" "magenta" "plum" "beige" "mink" "platinum"` | No                                                                                                                             | neutral  | The color when displaying either an icon or initials. _ neutral (default): gray _ brand: color from the brand palette _ colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or idForColor if provided) _ [AvatarNamedColor]: a specific color from the theme                                                                                                                                                                                                                                                     |
| `idForColor`       | `string`                                                                                                                                                                                                                                                                                                           | No                                                                                                                             |          | Specify a string to be used instead of the name, to determine which color to use when color="colorful". Use this when a name is not available, but there is another unique identifier that can be used instead.                                                                                                                                                                                                                                                                                                                                     |
| `name`             | `string`                                                                                                                                                                                                                                                                                                           | No                                                                                                                             |          | The name of the person or entity represented by this Avatar. This should always be provided if it is available. The name is used to determine the initials displayed when there is no image. It is also provided to accessibility tools.                                                                                                                                                                                                                                                                                                            |
| `shape`            | `"circular" "square"`                                                                                                                                                                                                                                                                                              | No                                                                                                                             | circular | The avatar can have a circular or square shape.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `size`             | `16 20 24 28 32 36 40 48 56 64 72 96 120 128`                                                                                                                                                                                                                                                                      | No                                                                                                                             | 32       | Size of the avatar in pixels. Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`) and based on design guidelines for the Avatar control. Note: At size 16, if initials are displayed, only the first initial will be rendered. If a non-supported size is needed, set `size` to the next-smaller supported size, and set `width` and `height` to override the rendered size. For example, to set the avatar to 45px in size: `<Avatar size={40} style={{ width: '45px', height: '45px' }} />` |
| `ref`              | `Ref<HTMLSpanElement>`                                                                                                                                                                                                                                                                                             | No                                                                                                                             |          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';
import type { AvatarGroupProps } from '@fluentui/react-components';

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

export const Default = (props: Partial<AvatarGroupProps>): JSXElement => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({
    items: names,
  });

  return (
    <AvatarGroup {...props}>
      {inlineItems.map(name => (
        <AvatarGroupItem name={name} key={name} />
      ))}
      {overflowItems && (
        <AvatarGroupPopover>
          {overflowItems.map(name => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  );
};
```

### Indicator

An AvatarGroup supports an icon and a count indicator.
When size is less than 24, then icon will be used by default.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  makeStyles,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

export const Indicator = (): JSXElement => {
  const styles = useStyles();
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({
    items: names,
  });

  return (
    <div className={styles.root}>
      <AvatarGroup>
        {inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {overflowItems && (
          <AvatarGroupPopover indicator="count">
            {overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
      <AvatarGroup>
        {inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {overflowItems && (
          <AvatarGroupPopover indicator="icon">
            {overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
    </div>
  );
};
```

### Layout

An AvatarGroup supports three layouts: spread, stack, and pie. The default is spread.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  makeStyles,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

export const Layout = (): JSXElement => {
  const styles = useStyles();
  const partitionedItems = partitionAvatarGroupItems({ items: names });
  const piePartitionedItems = partitionAvatarGroupItems({
    items: names,
    layout: 'pie',
  });

  return (
    <div className={styles.root}>
      <AvatarGroup layout="spread">
        {partitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {partitionedItems.overflowItems && (
          <AvatarGroupPopover>
            {partitionedItems.overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
      <AvatarGroup layout="stack">
        {partitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {partitionedItems.overflowItems && (
          <AvatarGroupPopover>
            {partitionedItems.overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
      <AvatarGroup layout="pie">
        {piePartitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {piePartitionedItems.overflowItems && (
          <AvatarGroupPopover>
            {piePartitionedItems.overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
    </div>
  );
};
```

### Size Pie

An AvatarGroup with `pie` layout supports a range of sizes from 16 to 128. The default is 32.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  makeStyles,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';
import type { AvatarSize } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

const sizes: AvatarSize[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const SizePie = (): JSXElement => {
  const styles = useStyles();
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({
    items: names,
    layout: 'pie',
  });

  return (
    <div className={styles.root}>
      {sizes.map(size => {
        return (
          <AvatarGroup layout="pie" size={size} key={size}>
            {inlineItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
            {overflowItems && (
              <AvatarGroupPopover>
                {overflowItems.map(name => (
                  <AvatarGroupItem name={name} key={name} />
                ))}
              </AvatarGroupPopover>
            )}
          </AvatarGroup>
        );
      })}
    </div>
  );
};
```

### Size Spread

An AvatarGroup with `spread` layout supports a range of sizes from 16 to 128. The default is 32.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  makeStyles,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';
import type { AvatarSize } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

const sizes: AvatarSize[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const SizeSpread = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {sizes.map(size => {
        const { inlineItems, overflowItems } = partitionAvatarGroupItems({
          items: names,
        });

        return (
          <AvatarGroup layout="spread" size={size} key={size}>
            {inlineItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
            {overflowItems && (
              <AvatarGroupPopover>
                {overflowItems.map(name => (
                  <AvatarGroupItem name={name} key={name} />
                ))}
              </AvatarGroupPopover>
            )}
          </AvatarGroup>
        );
      })}
    </div>
  );
};
```

### Size Stack

An AvatarGroup with `stack` layout supports a range of sizes from 16 to 128. The default is 32.

WARNING: do not make multiple avatars in a stack interactive unless the size is at least 28. Smaller sizes with overlapping click targets will fail to meet the WCAG target size requirement.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  makeStyles,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';
import type { AvatarSize } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

const sizes: AvatarSize[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const SizeStack = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {sizes.map(size => {
        const { inlineItems, overflowItems } = partitionAvatarGroupItems({
          items: names,
          layout: 'stack',
        });

        return (
          <AvatarGroup layout="stack" size={size} key={size}>
            {inlineItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
            {overflowItems && (
              <AvatarGroupPopover>
                {overflowItems.map(name => (
                  <AvatarGroupItem name={name} key={name} />
                ))}
              </AvatarGroupPopover>
            )}
          </AvatarGroup>
        );
      })}
    </div>
  );
};
```

### Tooltip

You can customize the tooltip of the AvatarGroupPopover, for example for translations.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';
import type { AvatarGroupProps } from '@fluentui/react-components';

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

export const Tooltip = (props: Partial<AvatarGroupProps>): JSXElement => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({
    items: names,
  });

  return (
    <AvatarGroup {...props}>
      {inlineItems.map(name => (
        <AvatarGroupItem name={name} key={name} />
      ))}
      {overflowItems && (
        <AvatarGroupPopover tooltip={{ content: 'My custom tooltip', relationship: 'label' }}>
          {overflowItems.map(name => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  );
};
```
