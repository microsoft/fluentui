# Components/Button/ToggleButton

A toggle button is a button that can be checked on and off.

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
| `as`                | `"a" "button"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | No                  |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `disabledFocusable` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No                  | false       |
| false               | When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. |
| `appearance`        | `"subtle" "outline" "secondary" "primary" "transparent"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No                  | 'secondary' | A button can have its content and borders styled for greater emphasis or to be subtle. - 'secondary' (default): Gives emphasis to the button in such a way that it indicates a secondary action. - 'primary': Emphasizes the button as a primary action. - 'outline': Removes background styling. - 'subtle': Minimizes emphasis to blend into the background until hovered or focused. - 'transparent': Removes background and border styling. |
| `iconPosition`      | `"before" "after"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | No                  | 'before'    | A button can format its icon to appear before or after its content.                                                                                                                                                                                                                                                                                                                                                                             |
| `shape`             | `"circular" "square" "rounded"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No                  | 'rounded'   | A button can be rounded, circular, or square.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `size`              | `"small" "medium" "large"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | No                  | 'medium'    | A button supports different sizes.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `checked`           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No                  | false       | Defines the controlled checked state of the `ToggleButton`. If passed, `ToggleButton` ignores the `defaultChecked` property. This should only be used if the checked state is to be controlled at a higher level and there is a plan to pass the correct value based on handling `onClick` events and re-rendering.                                                                                                                             |
| `ref`               | `Ref<HTMLAnchorElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | HTMLButtonElement>` | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                  |

## Examples

### Appearance

- `(undefined)`: the toggle button appears with the default style
- `primary`: emphasizes the toggle button as a primary action.
- `outline`: removes background styling.
- `subtle`: minimizes emphasis to blend into the background until hovered or focused
- `transparent`: removes background and border styling.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, ToggleButton } from '@fluentui/react-components';
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
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const styles = useStyles();

  const toggleChecked = React.useCallback(
    (buttonIndex: number) => {
      switch (buttonIndex) {
        case 1:
          setChecked1(!checked1);
          break;
        case 2:
          setChecked2(!checked2);
          break;
      }
    },
    [checked1, checked2],
  );

  return (
    <div className={styles.wrapper}>
      <ToggleButton
        checked={checked1}
        icon={checked1 ? <CalendarMonth /> : <CalendarMonthRegular />}
        onClick={() => toggleChecked(1)}
      >
        Default
      </ToggleButton>
      <ToggleButton
        appearance="primary"
        checked={checked2}
        icon={checked2 ? <CalendarMonth /> : <CalendarMonthRegular />}
        onClick={() => toggleChecked(2)}
      >
        Primary
      </ToggleButton>
      <ToggleButton appearance="outline" icon={<CalendarMonth />} onClick={() => toggleChecked(3)}>
        Outline
      </ToggleButton>
      <ToggleButton appearance="subtle" icon={<CalendarMonth />}>
        Subtle
      </ToggleButton>
      <ToggleButton appearance="transparent" icon={<CalendarMonth />}>
        Transparent
      </ToggleButton>
    </div>
  );
};
```

### Checked

A toggle button can be checked or unchecked. Unchecked is default.
If a checked value is given, the button is 'controlled' and will only change state when the
props value changes.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Checked = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <ToggleButton checked={true}>Controlled checked state</ToggleButton>
      <ToggleButton checked={false}>Controlled unchecked state</ToggleButton>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ToggleButton } from '@fluentui/react-components';
import type { ToggleButtonProps } from '@fluentui/react-components';

export const Default = (props: ToggleButtonProps): JSXElement => <ToggleButton {...props}>Example</ToggleButton>;
```

### Disabled

A toggle button can be `disabled` or `disabledFocusable`.
`disabledFocusable` is used in scenarios where it is important to keep a consistent tab order
for screen reader and keyboard users. The primary example of this pattern is when
the disabled toggle button is in a menu or a commandbar and is seldom used for standalone buttons.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

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
        <ToggleButton>Enabled state</ToggleButton>
        <ToggleButton disabled>Disabled state</ToggleButton>
        <ToggleButton disabledFocusable>Disabled focusable state</ToggleButton>
      </div>
      <div className={styles.innerWrapper}>
        <ToggleButton appearance="primary">Enabled state</ToggleButton>
        <ToggleButton appearance="primary" disabled>
          Disabled state
        </ToggleButton>
        <ToggleButton appearance="primary" disabledFocusable>
          Disabled focusable state
        </ToggleButton>
      </div>
    </div>
  );
};
```

### Icon

The ToggleButton has an `icon` slot that, if specified, renders an icon either `before` or `after` the children, as specified by the `iconPosition` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, ToggleButton, Tooltip } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Icon = (): JSXElement => {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const styles = useStyles();

  const toggleChecked = React.useCallback(
    (buttonIndex: number) => {
      switch (buttonIndex) {
        case 1:
          setChecked1(!checked1);
          break;
        case 2:
          setChecked2(!checked2);
          break;
        case 3:
          setChecked3(!checked3);
          break;
      }
    },
    [checked1, checked2, checked3],
  );

  return (
    <div className={styles.wrapper}>
      <ToggleButton
        checked={checked1}
        icon={checked1 ? <CalendarMonth /> : <CalendarMonthRegular />}
        onClick={() => toggleChecked(1)}
      >
        With calendar icon before contents
      </ToggleButton>
      <ToggleButton
        checked={checked2}
        icon={checked2 ? <CalendarMonth /> : <CalendarMonthRegular />}
        iconPosition="after"
        onClick={() => toggleChecked(2)}
      >
        With calendar icon after contents
      </ToggleButton>
      <Tooltip content="With calendar icon only" relationship="label">
        <ToggleButton
          checked={checked3}
          icon={checked3 ? <CalendarMonth /> : <CalendarMonthRegular />}
          onClick={() => toggleChecked(3)}
        />
      </Tooltip>
    </div>
  );
};
```

### Shape

A toggle button can be rounded, circular, or square.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

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
      <ToggleButton>Rounded</ToggleButton>
      <ToggleButton shape="circular">Circular</ToggleButton>
      <ToggleButton shape="square">Square</ToggleButton>
    </div>
  );
};
```

### Size

A toggle button supports `small`, `medium` and `large` size. Default size is `medium`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

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
      <ToggleButton size="small">Size: small</ToggleButton>
      <ToggleButton size="medium">Size: medium</ToggleButton>
      <ToggleButton size="large">Size: large</ToggleButton>
    </div>
  );
};
```

### With Long Text

Text wraps after it hits the max width of the component.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

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
      <ToggleButton>Short text</ToggleButton>
      <ToggleButton className={styles.longText}>
        Long text wraps after it hits the max width of the component
      </ToggleButton>
    </div>
  );
};
```
