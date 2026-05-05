# Components/Button/CompoundButton

A compound button is a button with an additional slot for secondary textual content.

Since both primary and secondary textual contents are part of a compound button's name they should be kept concise.

## Best practices

### Layout

- For dialog boxes and panels, where people are moving through a sequence of screens, right-align buttons with the
  container.
- For single-page forms and focused tasks, left-align buttons with the container.
- Always place the primary button on the left, the secondary button just to the right of it.
- Show only one primary button that inherits theme color at rest state. If there are more than two buttons with
  equal priority, all buttons should have neutral backgrounds.
- Don't use a button to navigate to another place; use a link instead. The exception is in a wizard where "Back" and
  "Next" buttons may be used.
- Don't place the default focus on a button that destroys data. Instead, place the default focus on the button that
  performs the "safe act" and retains the content (such as "Save") or cancels the action (such as "Cancel").
- When overriding layout styles, ensure buttons are always at least 24px by 24px to meet [WCAG target size requirements](https://w3c.github.io/wcag/understanding/target-size-minimum.html). This is already covered by our default styles for all buttons but SplitButton for all size variants if no style customizations are used.
- Only use a small SplitButton if the user has specifically chosen a compact layout, or if there is an equally efficient alternative method to perform the same action.

### Content

- Use sentence-style capitalization—only capitalize the first word. For more info, see
  [Capitalization](https://docs.microsoft.com/en-us/style-guide/capitalization) in the Microsoft Writing Style Guide.
- Make sure it's clear what will happen when people interact with the button. Be concise; usually a single verb
  is best. Include a noun if there is any room for interpretation about what the verb means.
  For example, "Delete folder" or "Create account".

## Props

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Required            | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `icon`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | null`               | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Icon that renders either before or after the `children` as specified by the `iconPosition` prop. |
| `secondaryContent`  | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | null`               | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Second line of text that describes the action this button takes.                                 |
| `contentContainer`  | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | null>`              | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Container that wraps the children and the secondaryContent slot.                                 |
| `as`                | `"a" "button"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | No                  |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `disabledFocusable` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No                  | false       |
| false               | When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. |
| `size`              | `"small" "medium" "large"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | No                  | 'medium'    | A button supports different sizes.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `shape`             | `"circular" "square" "rounded"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No                  | 'rounded'   | A button can be rounded, circular, or square.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `appearance`        | `"subtle" "outline" "secondary" "primary" "transparent"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No                  | 'secondary' | A button can have its content and borders styled for greater emphasis or to be subtle. - 'secondary' (default): Gives emphasis to the button in such a way that it indicates a secondary action. - 'primary': Emphasizes the button as a primary action. - 'outline': Removes background styling. - 'subtle': Minimizes emphasis to blend into the background until hovered or focused. - 'transparent': Removes background and border styling. |
| `iconPosition`      | `"before" "after"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | No                  | 'before'    | A button can format its icon to appear before or after its content.                                                                                                                                                                                                                                                                                                                                                                             |
| `ref`               | `Ref<HTMLAnchorElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | HTMLButtonElement>` | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                  |

## Examples

### Appearance

- `(undefined)`: the compound button appears with the default style
- `primary`: emphasizes the compound button as a primary action.
- `outline`: removes background styling.
- `subtle`: minimizes emphasis to blend into the background until hovered or focused
- `transparent`: removes background and border styling.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, CompoundButton } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />}>
        Default
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" appearance="primary" icon={<CalendarMonthRegular />}>
        Primary
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" appearance="outline" icon={<CalendarMonth />}>
        Outline
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" appearance="subtle" icon={<CalendarMonth />}>
        Subtle
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" appearance="transparent" icon={<CalendarMonth />}>
        Transparent
      </CompoundButton>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CompoundButton } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import type { CompoundButtonProps } from '@fluentui/react-components';

export const Default = (props: CompoundButtonProps): JSXElement => (
  <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" {...props}>
    Example
  </CompoundButton>
);
```

### Disabled

A compound button can be `disabled` or `disabledFocusable`.
`disabledFocusable` is used in scenarios where it is important to keep a consistent tab order
for screen reader and keyboard users. The primary example of this pattern is when
the disabled compound button is in a menu or a commandbar and is seldom used for standalone buttons.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, CompoundButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  innerWrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
});

export const Disabled = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <CompoundButton secondaryContent="Secondary content">Enabled state</CompoundButton>
        <CompoundButton disabled secondaryContent="Secondary content">
          Disabled state
        </CompoundButton>
        <CompoundButton disabledFocusable secondaryContent="Secondary content">
          Disabled focusable state
        </CompoundButton>
      </div>
      <div className={styles.innerWrapper}>
        <CompoundButton appearance="primary" secondaryContent="Secondary content">
          Enabled state
        </CompoundButton>
        <CompoundButton appearance="primary" disabled secondaryContent="Secondary content">
          Disabled state
        </CompoundButton>
        <CompoundButton appearance="primary" disabledFocusable secondaryContent="Secondary content">
          Disabled focusable state
        </CompoundButton>
      </div>
    </div>
  );
};
```

### Icon

The CompoundButton has an `icon` slot that, if specified, renders an icon either `before` or `after` the children, as specified by the `iconPosition` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, CompoundButton, Tooltip } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Icon = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />}>
        With calendar icon before contents
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />} iconPosition="after">
        With calendar icon after contents
      </CompoundButton>
      <Tooltip content="With calendar icon only" relationship="label">
        <CompoundButton icon={<CalendarMonthRegular />} />
      </Tooltip>
    </div>
  );
};
```

### Shape

A compound button can be rounded, circular, or square.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, CompoundButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Shape = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content">Rounded</CompoundButton>
      <CompoundButton secondaryContent="Secondary content" shape="circular">
        Circular
      </CompoundButton>
      <CompoundButton secondaryContent="Secondary content" shape="square">
        Square
      </CompoundButton>
    </div>
  );
};
```

### Size

A compound button supports `small`, `medium` and `large` size. Default size is `medium`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, CompoundButton } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Size = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="small">
        Size: small
      </CompoundButton>
      <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="medium">
        Size: medium
      </CompoundButton>
      <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="large">
        Size: large
      </CompoundButton>
    </div>
  );
};
```

### With Long Text

Text wraps after it hits the max width of the component.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, CompoundButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const WithLongText = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CompoundButton secondaryContent="Secondary content">Short text</CompoundButton>
      <CompoundButton className={styles.longText} secondaryContent="Secondary content">
        Long text wraps after it hits the max width of the component
      </CompoundButton>
    </div>
  );
};
```
