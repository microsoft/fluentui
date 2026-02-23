# Components/Tag/Tag

A Tag provides a visual representation of an attribute, person, or asset.

## Best practices

### Do

- To group multiple tags together, use `TagGroup`. `TagGroup` can handle dismiss of multiple `Tag`.

- Dismissible `Tag` should provide information to screen readers about the dismiss action. There are two ways to label the tag:
  - option 1 - add aria-label on dismiss icon, for example `dismissIcon={{ 'aria-label': 'remove' }}`. The accessible name of the Tag will be computed.
  - option 2 - add aria-label with the information about dismiss on Tag itself, and the dismiss icon should be hidden from accessibility tree using `dismissIcon={{ role: 'presentation' }}`

### Don't

- Don't change the interaction on a `Tag` because it should only be dismissible. Instead, use `InteractionTag` if you need a different type of interaction.

- Don't use `media` together with `icon` on one Tag.

## Props

| Name            | Type                                                                                                                                         | Required | Default  | Description                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `icon`          | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No       |                                                                                                                                                              | Slot for an icon                                                                 |
| `media`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No       |                                                                                                                                                              | Slot for a visual element, usually an avatar                                     |
| `primaryText`   | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No       |                                                                                                                                                              | Main text for the Tag. Children of the root slot are automatically rendered here |
| `secondaryText` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No       |                                                                                                                                                              | Secondary text that describes or complements the main text                       |
| `dismissIcon`   | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No       |                                                                                                                                                              | Slot for the dismiss icon                                                        |
| `as`            | `"button" "span"`                                                                                                                            | No       |          |                                                                                                                                                              |
| `appearance`    | `"brand" "filled" "outline"`                                                                                                                 | No       | 'filled' | A Tag can have filled, outlined or brand experience.                                                                                                         |
| `dismissible`   | `boolean`                                                                                                                                    | No       | false    | A Tag can be dismissible                                                                                                                                     |
| `selected`      | `boolean`                                                                                                                                    | No       | false    | An InteractionTag can be selected. Note: This prop only changes the appearance of the tag at the moment. A future PR will add the integration with TagGroup. |
| `shape`         | `"circular" "rounded"`                                                                                                                       | No       | 'round'  | A Tag can have rounded or circular shape.                                                                                                                    |
| `size`          | `"small" "medium" "extra-small"`                                                                                                             | No       | 'medium' | A Tag has three sizes.                                                                                                                                       |
| `ref`           | `Ref<HTMLSpanElement>`                                                                                                                       | No       |          |                                                                                                                                                              |

## Examples

### Appearance

A tag can have a `filled`, `outline` or `brand` appearance. The default is `filled`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
});
export const Appearance = (): JSXElement => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <Tag icon={<CalendarMonthRegular />} dismissible dismissIcon={{ 'aria-label': 'remove' }}>
        filled
      </Tag>
      <Tag appearance="outline" icon={<CalendarMonthRegular />} dismissible dismissIcon={{ 'aria-label': 'remove' }}>
        outline
      </Tag>
      <Tag appearance="brand" icon={<CalendarMonthRegular />} dismissible dismissIcon={{ 'aria-label': 'remove' }}>
        brand
      </Tag>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, TagProps } from '@fluentui/react-components';

export const Default = (props: Partial<TagProps>): JSXElement => <Tag {...props}>Primary text</Tag>;
```

### Disabled

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
});
export const Disabled = (): JSXElement => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <Tag
        disabled
        secondaryText="appearance=filled"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Disabled
      </Tag>
      <Tag
        disabled
        secondaryText="appearance=outline"
        appearance="outline"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Disabled
      </Tag>
      <Tag
        disabled
        secondaryText="appearance=brand"
        appearance="brand"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Disabled
      </Tag>
    </div>
  );
};
```

### Dismiss

A tag can have a dismiss icon and become focusable. TagGroup can handle dismiss for a collection of tags. Ensure that focus is properly managed when all tags have been dismissed.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, TagGroup, TagGroupProps, Button, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
  tagGroup: {
    flexWrap: 'wrap',
  },
  resetButton: {
    width: 'fit-content',
  },
});

const initialTags = [
  { value: '1', children: 'Tag 1' },
  { value: '2', children: 'Tag 2' },
  { value: '3', children: 'Tag 3' },
];

/**
 * focus management for the reset button
 */
const useResetExample = (visibleTagsLength: number) => {
  const resetButtonRef = React.useRef<HTMLButtonElement>(null);
  const firstTagRef = React.useRef<HTMLButtonElement>(null);

  const prevVisibleTagsLengthRef = React.useRef<number>(visibleTagsLength);
  React.useEffect(() => {
    if (visibleTagsLength === 0) {
      resetButtonRef.current?.focus();
    } else if (prevVisibleTagsLengthRef.current === 0) {
      firstTagRef.current?.focus();
    }

    prevVisibleTagsLengthRef.current = visibleTagsLength;
  }, [visibleTagsLength]);

  return { firstTagRef, resetButtonRef };
};

export const Dismiss = (): JSXElement => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setVisibleTags([...visibleTags].filter(tag => tag.value !== value));
  };
  const resetItems = () => setVisibleTags(initialTags);
  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags.length);

  const styles = useStyles();

  return (
    <div className={styles.container}>
      {visibleTags.length !== 0 && (
        <TagGroup className={styles.tagGroup} onDismiss={removeItem} aria-label="Dismiss example">
          {visibleTags.map((tag, index) => (
            <Tag
              dismissible
              dismissIcon={{ 'aria-label': 'remove' }}
              value={tag.value}
              key={tag.value}
              ref={index === 0 ? firstTagRef : null}
            >
              {tag.children}
            </Tag>
          ))}
        </TagGroup>
      )}

      <Button
        onClick={resetItems}
        ref={resetButtonRef}
        disabled={visibleTags.length !== 0}
        className={styles.resetButton}
        size="small"
      >
        Reset the example
      </Button>
    </div>
  );
};
```

### Icon

A Tag can render a custom icon if provided.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Tag } from '@fluentui/react-components';

export const Icon = (): JSXElement => <Tag icon={<CalendarMonthRegular />}>Primary text</Tag>;
```

### Media

A tag can render a media, for example an Avatar.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, Avatar } from '@fluentui/react-components';

export const Media = (): JSXElement => (
  <Tag media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Primary text</Tag>
);
```

### SecondaryText

A Tag can have a secondary text.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag } from '@fluentui/react-components';

export const SecondaryText = (): JSXElement => <Tag secondaryText="Secondary text">Primary text</Tag>;
```

### Selected

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, makeResetStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeResetStyles({
  columnGap: '10px',
  display: 'flex',
});

export const Selected = (): JSXElement => {
  const containerStyles = useContainerStyles();

  return (
    <div className={containerStyles}>
      <Tag
        selected
        secondaryText="appearance=filled"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Selected
      </Tag>
      <Tag
        selected
        secondaryText="appearance=outline"
        appearance="outline"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Selected
      </Tag>
      <Tag
        selected
        secondaryText="appearance=brand"
        appearance="brand"
        icon={<CalendarMonthRegular />}
        dismissible
        dismissIcon={{ 'aria-label': 'remove' }}
      >
        Selected
      </Tag>
    </div>
  );
};
```

### Shape

A tag can be rounded or circular,

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  innerWrapper: {
    alignItems: 'start',
    columnGap: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Shape = (): JSXElement => {
  const containerStyles = useContainerStyles();
  return (
    <div className={containerStyles.outerWrapper}>
      <div className={containerStyles.innerWrapper}>
        <Tag media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Rounded</Tag>
        <Tag shape="circular" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Circular
        </Tag>
      </div>

      <div className={containerStyles.innerWrapper}>
        <Tag
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          icon={<CalendarMonthRegular />}
          secondaryText="Secondary text"
        >
          Rounded
        </Tag>
        <Tag
          shape="circular"
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          icon={<CalendarMonthRegular />}
          secondaryText="Secondary text"
        >
          Circular
        </Tag>
      </div>
    </div>
  );
};
```

### Size

A tag supports `medium`, `small` and `extra-small` size. Default size is `medium`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  innerWrapper: {
    alignItems: 'start',
    columnGap: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});
export const Size = (): JSXElement => {
  const styles = useContainerStyles();
  return (
    <div className={styles.outerWrapper}>
      {/* medium */}
      <div className={styles.innerWrapper}>
        <Tag>Medium</Tag>
        <Tag
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
        >
          Medium dismissible
        </Tag>
        <Tag icon={<CalendarMonthRegular />} shape="circular">
          Medium circular
        </Tag>
      </div>

      {/* small */}
      <div className={styles.innerWrapper}>
        <Tag size="small">Small</Tag>
        <Tag
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          size="small"
          media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
        >
          Small dismissible
        </Tag>
        <Tag size="small" icon={<CalendarMonthRegular />} shape="circular">
          Small circular
        </Tag>
      </div>

      {/* extra-small */}
      <div className={styles.innerWrapper}>
        <Tag size="extra-small">Extra small</Tag>
        <Tag
          dismissible
          dismissIcon={{ 'aria-label': 'remove' }}
          size="extra-small"
          media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
        >
          Extra small dismissible
        </Tag>
        <Tag size="extra-small" icon={<CalendarMonthRegular />} shape="circular">
          Extra small circular
        </Tag>
      </div>
    </div>
  );
};
```
