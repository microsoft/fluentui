# Components/Button/Button

A button triggers an action or event when activated.

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
| `ref`               | `Ref<HTMLAnchorElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | HTMLButtonElement>` | No          |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                  |

## Examples

### Appearance

- `(undefined)`: the button appears with the default style
- `primary`: emphasizes the button as a primary action.
- `outline`: removes background styling.
- `subtle`: minimizes emphasis to blend into the background until hovered or focused
- `transparent`: removes background and border styling.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Button icon={<CalendarMonthRegular />}>Default</Button>
      <Button appearance="primary" icon={<CalendarMonthRegular />}>
        Primary
      </Button>
      <Button appearance="outline" icon={<CalendarMonth />}>
        Outline
      </Button>
      <Button appearance="subtle" icon={<CalendarMonth />}>
        Subtle
      </Button>
      <Button appearance="transparent" icon={<CalendarMonth />}>
        Transparent
      </Button>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';
import type { ButtonProps } from '@fluentui/react-components';

export const Default = (props: ButtonProps): JSXElement => <Button {...props}>Example</Button>;
```

### Disabled

A button can be `disabled` or `disabledFocusable`.
`disabledFocusable` is used in scenarios where it is important to keep a consistent tab order
for screen reader and keyboard users. The primary example of this pattern is when
the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button } from '@fluentui/react-components';

const useStyles = makeStyles({
  innerWrapper: {
    columnGap: '15px',
    display: 'flex',
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
        <Button>Enabled state</Button>
        <Button disabled>Disabled state</Button>
        <Button disabledFocusable>Disabled focusable state</Button>
      </div>
      <div className={styles.innerWrapper}>
        <Button appearance="primary">Enabled state</Button>
        <Button appearance="primary" disabled>
          Disabled state
        </Button>
        <Button appearance="primary" disabledFocusable>
          Disabled focusable state
        </Button>
      </div>
    </div>
  );
};
```

### Icon

Button has an `icon` slot that, if specified, renders an icon either `before` or `after` the children, as specified by the `iconPosition` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Tooltip } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
});

export const Icon = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Button icon={<CalendarMonthRegular />}>With calendar icon before contents</Button>
      <Button icon={<CalendarMonthRegular />} iconPosition="after">
        With calendar icon after contents
      </Button>
      <Tooltip content="With calendar icon only" relationship="label">
        <Button icon={<CalendarMonthRegular />} />
      </Tooltip>
    </div>
  );
};
```

### Loading

You can customize a Button's contents and styles to simulate a convincing loading state.

```tsx
import { useTimeout } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { buttonClassNames, makeStyles, tokens, Button, Spinner } from '@fluentui/react-components';
import { CheckmarkFilled } from '@fluentui/react-icons';
// eslint-disable-next-line @fluentui/no-restricted-imports

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
  buttonNonInteractive: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    cursor: 'default',
    pointerEvents: 'none',

    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorStatusSuccessForeground1,
    },
  },
});

type LoadingState = 'initial' | 'loading' | 'loaded';

export const Loading = (): JSXElement => {
  const styles = useStyles();

  const [loadingState, setLoadingState] = React.useState<LoadingState>('initial');

  const [setTimeout, cancelTimeout] = useTimeout();

  const onButtonClick = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('loaded'), 5000);
  };

  const buttonContent = loadingState === 'loading' ? 'Loading' : loadingState === 'loaded' ? 'Loaded' : 'Start loading';

  const buttonIcon =
    loadingState === 'loading' ? <Spinner size="tiny" /> : loadingState === 'loaded' ? <CheckmarkFilled /> : null;

  const buttonClassName = loadingState === 'initial' ? undefined : styles.buttonNonInteractive;

  const onResetButtonClick = () => {
    cancelTimeout();
    setLoadingState('initial');
  };

  return (
    <div className={styles.wrapper}>
      <Button
        className={buttonClassName}
        disabledFocusable={loadingState !== 'initial'}
        icon={buttonIcon}
        onClick={onButtonClick}
      >
        {buttonContent}
      </Button>
      <Button onClick={onResetButtonClick}>Reset loading state</Button>
    </div>
  );
};
```

### Shape

A button can be rounded, circular, or square.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button } from '@fluentui/react-components';

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
      <Button>Rounded</Button>
      <Button shape="circular">Circular</Button>
      <Button shape="square">Square</Button>
    </div>
  );
};
```

### Size

A button supports `small`, `medium` and `large` size. Default size is `medium`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Tooltip } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  innerWrapper: {
    alignItems: 'start',
    columnGap: '15px',
    display: 'flex',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
    minWidth: 'min-content',
  },
});

export const Size = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <Button size="small">Small</Button>
        <Button size="small" icon={<CalendarMonthRegular />}>
          Small with calendar icon
        </Button>
        <Tooltip content="Small with calendar icon only" relationship="label">
          <Button size="small" icon={<CalendarMonthRegular />} />
        </Tooltip>
      </div>
      <div className={styles.innerWrapper}>
        <Button>Medium</Button>
        <Button icon={<CalendarMonthRegular />}>Medium with calendar icon</Button>
        <Tooltip content="Medium with calendar icon only" relationship="label">
          <Button icon={<CalendarMonthRegular />} />
        </Tooltip>
      </div>
      <div className={styles.innerWrapper}>
        <Button size="large">Large</Button>
        <Button size="large" icon={<CalendarMonthRegular />}>
          Large with calendar icon
        </Button>
        <Tooltip content="Large with calendar icon only" relationship="label">
          <Button size="large" icon={<CalendarMonthRegular />} />
        </Tooltip>
      </div>
    </div>
  );
};
```

### With Long Text

Text wraps after it hits the max width of the component.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button } from '@fluentui/react-components';

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
      <Button>Short text</Button>
      <Button className={styles.longText}>Long text wraps after it hits the max width of the component</Button>
    </div>
  );
};
```
