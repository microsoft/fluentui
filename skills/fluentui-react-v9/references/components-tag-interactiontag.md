# Components/Tag/InteractionTag

A InteractionTag follows the same characteristics as a Tag, but with the added functionality of having a primary and secondary action. This is mostly used in scenarios where gaining more context for a InteractionTag is available for the user, an example would be clicking into a persona to expand their profile page.

## Best practices

### Do

- To group multiple tags together, use `TagGroup`. `TagGroup` can handle dismiss of multiple `InteractionTag`.

- `InteractionTagSecondary` should provide information to screen readers about the secondary action using `aria-label` or `aria-labelledby`.

  - Recommended: use a brief `aria-label`, such as 'remove'. By default, the InteractionTagSecondary component includes an `aria-labelledby` attribute. This attribute combines the id values from both the InteractionTagPrimary and InteractionTagSecondary components, allowing for a complete accessible name for InteractionTagSecondary.

    ⚠️ If you assign a custom id to InteractionTagPrimary, you'll need to also specify a custom aria-labelledby for InteractionTagSecondary.

  - Another option: If you want to provide a custom accessible name on InteractionTagSecondary that already contains the necessary information from InteractionTagPrimary, you can use the `aria-label` attribute and set `aria-labelledby` to `null`.

### Don't

- Don't use `InteractionTag` for tags without a primary action. Use `Tag` in such cases.

- Don't use `media` together with `icon` on one InteractionTag.

## Props

| Name         | Type                             | Required | Default  | Description                                                                                                                                                  |
| ------------ | -------------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `as`         | `"div"`                          | No       |          |                                                                                                                                                              |
| `appearance` | `"brand" "filled" "outline"`     | No       | 'filled' | An InteractionTag can have filled, outlined or brand experience.                                                                                             |
| `disabled`   | `boolean`                        | No       | false    | An InteractionTag can show that it cannot be interacted with.                                                                                                |
| `selected`   | `boolean`                        | No       | false    | An InteractionTag can be selected. Note: This prop only changes the appearance of the tag at the moment. A future PR will add the integration with TagGroup. |
| `shape`      | `"circular" "rounded"`           | No       | 'round'  | An InteractionTag can have rounded or circular shape.                                                                                                        |
| `size`       | `"small" "medium" "extra-small"` | No       | 'medium' | An InteractionTag has three sizes.                                                                                                                           |
| `value`      | `string`                         | No       |          | Unique value identifying the tag within a TagGroup                                                                                                           |
| `ref`        | `Ref<HTMLDivElement>`            | No       |          |                                                                                                                                                              |

## Subcomponents

### InteractionTagPrimary

InteractionTagPrimary component - used as the first child of the `InteractionTag` component.
Provides visual attributes such as media, icon, primary and secondary text, as well as the ability to attach a primary action.

#### Props

| Name                 | Type                                                                                                                                         | Required | Default | Description                                                                                                                                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `icon`               | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                                                                                                                                         | Slot for an icon                                                                                          |
| `media`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                                                                                                                                         | Slot for a visual element, usually an avatar                                                              |
| `primaryText`        | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                                                                                                                                         | Main text for the InteractionTagPrimary button. Children of the root slot are automatically rendered here |
| `secondaryText`      | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                                                                                                                                         | Secondary text that describes or complements the main text                                                |
| `as`                 | `"button"`                                                                                                                                   | No       |         |                                                                                                                                                                                                                         |
| `hasSecondaryAction` | `boolean`                                                                                                                                    | No       | false   | Whether the `InteractionTag` component has a `Secondary` component that provides an secondary action. If `true`, the `InteractionTagPrimary` component will adjust its styles to accommodate the `Secondary` component. |
| `ref`                | `Ref<HTMLButtonElement>`                                                                                                                     | No       |         |                                                                                                                                                                                                                         |

### InteractionTagSecondary

InteractionTagSecondary component - used as the second child of the `InteractionTag` component and provides the secondary action, which is dismiss by default.

#### Props

| Name  | Type                     | Required | Default | Description |
| ----- | ------------------------ | -------- | ------- | ----------- |
| `as`  | `"button"`               | No       |         |             |
| `ref` | `Ref<HTMLButtonElement>` | No       |         |             |

## Examples

### Appearance

An InteractionTag can have a `filled`, `outline` or `brand` appearance. The default is `filled`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary, makeStyles } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
  },
});
export const Appearance = (): JSXElement => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <InteractionTag>
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
          filled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag appearance="outline">
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
          outline
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag appearance="brand">
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
          brand
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InteractionTag, InteractionTagProps, InteractionTagPrimary } from '@fluentui/react-components';

export const Default = (props: Partial<InteractionTagProps>): JSXElement => (
  <InteractionTag {...props}>
    <InteractionTagPrimary>Primary text</InteractionTagPrimary>
  </InteractionTag>
);
```

### Disabled

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  container: {
    columnGap: '10px',
    display: 'flex',
  },
});
export const Disabled = (): JSXElement => {
  const styles = useContainerStyles();
  return (
    <div className={styles.container}>
      <InteractionTag disabled>
        <InteractionTagPrimary secondaryText="appearance=filled" icon={<CalendarMonthRegular />} hasSecondaryAction>
          Disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag disabled appearance="outline">
        <InteractionTagPrimary secondaryText="appearance=outline" icon={<CalendarMonthRegular />} hasSecondaryAction>
          Disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag disabled appearance="brand">
        <InteractionTagPrimary secondaryText="appearance=brand" icon={<CalendarMonthRegular />} hasSecondaryAction>
          Disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
    </div>
  );
};
```

### Dismiss

An InteractionTag can have a secondary action that is usually dismiss. TagGroup can handle dismiss for a collection of tags. Ensure that focus is properly managed when all tags have been dismissed.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup,
  TagGroupProps,
  Button,
  makeStyles,
} from '@fluentui/react-components';

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
            <InteractionTag value={tag.value} key={tag.value}>
              <InteractionTagPrimary hasSecondaryAction ref={index === 0 ? firstTagRef : null}>
                {tag.children}
              </InteractionTagPrimary>
              <InteractionTagSecondary aria-label="remove" />
            </InteractionTag>
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

### Has Primary Action

An InteractionTag can have a primary action. This example shows an Interaction Tag that opens a popover as Primary Action.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  makeStyles,
  Tooltip,
  Link,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  popover: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },
});

export const HasPrimaryAction = (): JSXElement => {
  const styles = useStyles();
  return (
    <InteractionTag>
      <Popover trapFocus>
        <PopoverTrigger>
          <InteractionTagPrimary hasSecondaryAction>Golden retriever</InteractionTagPrimary>
        </PopoverTrigger>
        <PopoverSurface className={styles.popover}>
          <Link href="https://en.wikipedia.org/wiki/Golden_Retriever">Find out more on wiki</Link>
          <ul>
            <li>Size: Medium to large-sized dog breed. </li>
            <li>Coat: Luxurious double coat with a dense, water-repellent outer layer and a soft, dense undercoat.</li>
            <li>Color: Typically a luscious golden or cream color, with variations in shade.</li>
            <li>Build: Sturdy and well-proportioned body with a friendly and intelligent expression.</li>
          </ul>
        </PopoverSurface>
      </Popover>
      <Tooltip content="dismiss" relationship="label">
        <InteractionTagSecondary />
      </Tooltip>
    </InteractionTag>
  );
};
```

### Icon

An InteractionTag can render a custom icon if provided.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-components';

export const Icon = (): JSXElement => (
  <InteractionTag>
    <InteractionTagPrimary icon={<CalendarMonthRegular />}>Primary text</InteractionTagPrimary>
  </InteractionTag>
);
```

### Media

An InteractionTag can render a media, for example an Avatar.

> When using VoiceOver, if you focus on the InteractionTag with media, Chrome will announce it as a "button group", whereas Safari will describe it simply as a "button". This discrepancy is acceptable since Chrome users can navigate within the button, while Safari users cannot.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary, Avatar } from '@fluentui/react-components';

export const Media = (): JSXElement => (
  <InteractionTag>
    <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
      Primary text
    </InteractionTagPrimary>
  </InteractionTag>
);
```

### SecondaryText

An InteractionTag can have a secondary text.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-components';

export const SecondaryText = (): JSXElement => (
  <InteractionTag>
    <InteractionTagPrimary secondaryText="Secondary text">Primary text</InteractionTagPrimary>
  </InteractionTag>
);
```

### Selected

InteractionTag that can be selected. Note: This prop only changes the appearance of the tag at the moment. A future PR will add the integration with TagGroup.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  makeResetStyles,
} from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useContainerStyles = makeResetStyles({
  columnGap: '10px',
  display: 'flex',
});

export const Selected = (): JSXElement => {
  const containerStyles = useContainerStyles();

  return (
    <div className={containerStyles}>
      <InteractionTag selected>
        <InteractionTagPrimary secondaryText="appearance=filled" icon={<CalendarMonth />} hasSecondaryAction>
          Selected
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected appearance="outline">
        <InteractionTagPrimary secondaryText="appearance=outline" icon={<CalendarMonth />} hasSecondaryAction>
          Selected
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected appearance="brand">
        <InteractionTagPrimary secondaryText="appearance=brand" icon={<CalendarMonth />} hasSecondaryAction>
          Selected
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
    </div>
  );
};
```

### Shape

An InteractionTag can be rounded or circular,

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Avatar,
  makeStyles,
} from '@fluentui/react-components';
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
        <InteractionTag>
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
            Rounded
          </InteractionTagPrimary>
        </InteractionTag>
        <InteractionTag shape="circular">
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
            Circular
          </InteractionTagPrimary>
        </InteractionTag>
      </div>

      <div className={containerStyles.innerWrapper}>
        <InteractionTag>
          <InteractionTagPrimary icon={<CalendarMonthRegular />} secondaryText="Secondary text" hasSecondaryAction>
            Rounded
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="remove" />
        </InteractionTag>
        <InteractionTag shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />} secondaryText="Secondary text" hasSecondaryAction>
            Circular
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="remove" />
        </InteractionTag>
      </div>
    </div>
  );
};
```

### Size

An InteractionTag supports `medium`, `small` and `extra-small` size. Default size is `medium`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Avatar,
  makeStyles,
} from '@fluentui/react-components';
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
        <InteractionTag>
          <InteractionTagPrimary>Medium</InteractionTagPrimary>
        </InteractionTag>

        <InteractionTag>
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} hasSecondaryAction>
            Medium dismissible
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>

        <InteractionTag shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />}>Medium circular</InteractionTagPrimary>
        </InteractionTag>
      </div>

      {/* small */}
      <div className={styles.innerWrapper}>
        <InteractionTag size="small">
          <InteractionTagPrimary>Small</InteractionTagPrimary>
        </InteractionTag>

        <InteractionTag size="small">
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} hasSecondaryAction>
            Small dismissible
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>

        <InteractionTag size="small" shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />}>Small circular</InteractionTagPrimary>
        </InteractionTag>
      </div>

      {/* extra-small */}
      <div className={styles.innerWrapper}>
        <InteractionTag size="extra-small">
          <InteractionTagPrimary>Extra small</InteractionTagPrimary>
        </InteractionTag>

        <InteractionTag size="extra-small">
          <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} hasSecondaryAction>
            Extra small dismissible
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>

        <InteractionTag size="extra-small" shape="circular">
          <InteractionTagPrimary icon={<CalendarMonthRegular />}>Extra small circular</InteractionTagPrimary>
        </InteractionTag>
      </div>
    </div>
  );
};
```
