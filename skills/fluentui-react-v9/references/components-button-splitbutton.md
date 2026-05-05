# Components/Button/SplitButton

A split button is a button with a primary action and a secondary action primarily used for opening a menu.

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

| Name                  | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Required            | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `menuButton`          | `WithSlotShorthandValue<MenuButtonProps & RefAttributes<HTMLAnchorElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | HTMLButtonElement>> | null`       | No                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                  | Button that opens menu with secondary actions in SplitButton. |
| `primaryActionButton` | `WithSlotShorthandValue<ButtonProps & RefAttributes<HTMLAnchorElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | HTMLButtonElement>> | null`       | No                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                  | Button to perform primary action in SplitButton.              |
| `as`                  | `"div"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No                  |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `size`                | `"small" "medium" "large"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | No                  | 'medium'    | A button supports different sizes.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `icon`                | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | null`               | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Icon that renders either before or after the `children` as specified by the `iconPosition` prop. |
| `shape`               | `"circular" "square" "rounded"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No                  | 'rounded'   | A button can be rounded, circular, or square.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `appearance`          | `"subtle" "outline" "secondary" "primary" "transparent"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No                  | 'secondary' | A button can have its content and borders styled for greater emphasis or to be subtle. - 'secondary' (default): Gives emphasis to the button in such a way that it indicates a secondary action. - 'primary': Emphasizes the button as a primary action. - 'outline': Removes background styling. - 'subtle': Minimizes emphasis to blend into the background until hovered or focused. - 'transparent': Removes background and border styling. |
| `iconPosition`        | `"before" "after"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | No                  | 'before'    | A button can format its icon to appear before or after its content.                                                                                                                                                                                                                                                                                                                                                                             |
| `disabledFocusable`   | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No                  | false       |
| false                 | When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. |
| `menuIcon`            | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | null`               | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Menu icon that indicates that this button has a menu that can be expanded.                       |
| `ref`                 | `Ref<HTMLAnchorElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | HTMLButtonElement>` | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                  |

## Examples

### Appearance

- `(undefined)`: the split button appears with the default style
- `primary`: emphasizes the split button as a primary action.
- `outline`: removes background styling.
- `subtle`: minimizes emphasis to blend into the background until hovered or focused
- `transparent`: removes background and border styling.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
} from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

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
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Default</SplitButton>}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} appearance="primary">
              Primary
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} appearance="outline">
              Outline
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} appearance="subtle">
              Subtle
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} appearance="transparent">
              Transparent
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, SplitButton } from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

const onClick = () => alert('Primary action button clicked.');

const primaryActionButtonProps = {
  onClick,
};

export const Default = (): JSXElement => (
  <Menu positioning="below-end">
    <MenuTrigger disableButtonEnhancement>
      {(triggerProps: MenuButtonProps) => (
        <SplitButton menuButton={triggerProps} primaryActionButton={primaryActionButtonProps}>
          Example
        </SplitButton>
      )}
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>Item a</MenuItem>
        <MenuItem>Item b</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
```

### Disabled

A split button can be `disabled` or `disabledFocusable`.
`disabledFocusable` is used in scenarios where it is important to keep a consistent tab order
for screen reader and keyboard users. The primary example of this pattern is when
the disabled split button is in a menu or a commandbar and is seldom used for standalone buttons.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
} from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Disabled = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Enabled state</SplitButton>}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} disabled>
              Disabled state
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} disabledFocusable>
              Disabled focusable state
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
```

### Icon

SplitButton has an `icon` slot that renders before the text, and `menuIcon` slot that renders after the text.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Tooltip,
} from '@fluentui/react-components';
import { CalendarMonthRegular, FilterRegular } from '@fluentui/react-icons';
import type { MenuButtonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Icon = (): JSXElement => {
  const [primaryActionButtonRef, setPrimaryActionButtonRef] = React.useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);

  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonthRegular />}>
              With calendar icon before contents
            </SplitButton>
          )}
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonthRegular />} iconPosition="after">
              With calendar icon after contents
            </SplitButton>
          )}
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonthRegular />} menuIcon={<FilterRegular />}>
              With calendar icon and custom filter menu icon
            </SplitButton>
          )}
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <Tooltip
              content="With calendar icon only"
              positioning={{ target: primaryActionButtonRef }}
              relationship="inaccessible"
            >
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{
                  ref: setPrimaryActionButtonRef,
                  'aria-label': 'With calendar icon only',
                }}
                icon={<CalendarMonthRegular />}
              />
            </Tooltip>
          )}
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
```

### Shape

A split button can be rounded, circular, or square.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
} from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

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
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Rounded</SplitButton>}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} shape="circular">
              Circular
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} shape="square">
              Square
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
```

### Size

SplitButton supports `small`, `medium` and `large` size. Default size is `medium`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
} from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

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
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} size="small">
              Size: small
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} size="medium">
              Size: medium
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} size="large">
              Size: large
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
```

### Size: large

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Tooltip,
} from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import type { MenuButtonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const SizeLarge = (): JSXElement => {
  const [primaryActionButtonRef, setPrimaryActionButtonRef] = React.useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);

  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} size="large">
              Large
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonthRegular />} size="large">
              Large with calendar icon
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <Tooltip
              content="Large with calendar icon only"
              positioning={{ target: primaryActionButtonRef }}
              relationship="inaccessible"
            >
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{
                  ref: setPrimaryActionButtonRef,
                  'aria-label': 'Large with calendar icon only',
                }}
                icon={<CalendarMonthRegular />}
                size="large"
              />
            </Tooltip>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
```

### Size: medium

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Tooltip,
} from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import type { MenuButtonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const SizeMedium = (): JSXElement => {
  const [primaryActionButtonRef, setPrimaryActionButtonRef] = React.useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);

  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} size="medium">
              Medium
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonthRegular />} size="medium">
              Medium with calendar icon
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <Tooltip
              content="Medium with calendar icon only"
              positioning={{ target: primaryActionButtonRef }}
              relationship="inaccessible"
            >
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{
                  ref: setPrimaryActionButtonRef,
                  'aria-label': 'Medium with calendar icon only',
                }}
                icon={<CalendarMonthRegular />}
                size="medium"
              />
            </Tooltip>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
```

### Size: small

WARNING: the small SplitButton does not meet WCAG target size requirements. Only use this variant if there is an equally accessible alternative way to perform the same action, or if it is part of a user-selected compact theme.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Tooltip,
} from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import type { MenuButtonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const SizeSmall = (): JSXElement => {
  const [primaryActionButtonRef, setPrimaryActionButtonRef] = React.useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);

  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} size="small">
              Small
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonthRegular />} size="small">
              Small with calendar icon
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <Tooltip
              content="Small with calendar icon only"
              positioning={{ target: primaryActionButtonRef }}
              relationship="inaccessible"
            >
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{
                  ref: setPrimaryActionButtonRef,
                  'aria-label': 'Small with calendar icon only',
                }}
                icon={<CalendarMonthRegular />}
                size="small"
              />
            </Tooltip>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
```

### With Long Text

Text wraps after it hits the max width of the component.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
} from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

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
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Short text</SplitButton>}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton primaryActionButton={{ className: styles.longText }} menuButton={triggerProps}>
              Long text wraps after it hits the max width of the component
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
```
