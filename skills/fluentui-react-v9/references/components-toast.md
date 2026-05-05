# Components/Toast

A Toasts displays temporary content to the user. Toasts are rendered as a separate surface that can be dismissed by
user action or a application timeout. Toasts are typically used in the following situations:

- Update the user on the status of a task
- Display the progress of a task
- Notify the user to take an action
- Notify the user of an application update
- Warn the user of an error

The Fluent UI Toast component uses an **imperative** API. Once a Toaster has been rendered, you can use the
`useToastController` hook to get access to imperative methods to dispatch a Toast. The Toast component itself
is simply a layout component.

> ⚠️ In order for notifications that use toast to be fully accessible, developers should make the notifications
> available on a permanent surface too. One of the ways to do this in an application is to implement a notification
> centre.

For live region debugging help, check our [Debugging Notifications](./?path=/docs/concepts-developer-accessibility-notification-debugging--docs) docs page.

## Best practices

### Do

- Configure defaults on the Toaster
- Use the toast for non-critical messages
- Let the user view the toast content in the application after the toast dismissed
- Create a keyboard shortcut to move focus to actionable toasts
- Use `politeness` setting to differentiate urgent and non-urgent messages

### Don't

- Render too many toasts at once
- Use different positions for toasts
- Use more than one Toaster in an application
- Make every toast have `assertive` politeness

## Props

| Name         | Type                  | Required | Default | Description |
| ------------ | --------------------- | -------- | ------- | ----------- |
| `as`         | `"div"`               | No       |         |             |
| `appearance` | `"brand" "inverted"`  | No       |         |             |
| `ref`        | `Ref<HTMLDivElement>` | No       |         |             |

## Subcomponents

### ToastTitle

ToastTitle component

#### Props

| Name     | Type                                                                                                                                      | Required | Default | Description |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | --- |
| `media`  | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`    | No      |             |     |
| `action` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`    | No      |             |     |
| `as`     | `"div"`                                                                                                                                   | No       |         |             |
| `ref`    | `Ref<HTMLDivElement>`                                                                                                                     | No       |         |             |

### ToastBody

ToastBody component

#### Props

| Name       | Type                                                                                                                                      | Required | Default | Description |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | --- |
| `subtitle` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`    | No      |             |     |
| `as`       | `"div"`                                                                                                                                   | No       |         |             |
| `ref`      | `Ref<HTMLDivElement>`                                                                                                                     | No       |         |             |

### ToastFooter

ToastFooter component

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

## Examples

### Custom Timeout

The timeout of toasts can be customized in milliseconds. Using a negative timeout value results in the toast
never being auto-dismissed.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Button,
  Link,
  SpinButton,
  Field,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
  ToastTrigger,
} from '@fluentui/react-components';

export const CustomTimeout = (): JSXElement => {
  const [timeout, setDismissTimeout] = React.useState(1000);
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          }
        >
          {timeout >= 0 ? `Custom timeout ${timeout}ms` : `Dismiss manually`}
        </ToastTitle>
      </Toast>,
      { timeout, intent: 'info' },
    );

  return (
    <>
      <Field label="Timeout" hint="Timeout is in milliseconds">
        <SpinButton
          value={timeout}
          onChange={(e, data) => {
            if (data.value) {
              setDismissTimeout(data.value);
            } else if (data.displayValue !== undefined) {
              const newValue = parseFloat(data.displayValue);
              if (!Number.isNaN(newValue)) {
                setDismissTimeout(newValue);
              }
            }
          }}
        />
      </Field>
      <br />
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Link,
  Button,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
} from '@fluentui/react-components';

export const Default = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle action={<Link>Undo</Link>}>Email sent</ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Default Toast Options

Default options for all toasts can be configured on the `Toaster`.
These options are only defaults and can be overriden using `dispatchToast

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const DefaultToastOptions = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Options configured in Toaster</ToastTitle>
      </Toast>,
      { intent: 'info' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} position="top-end" pauseOnHover pauseOnWindowBlur timeout={1000} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Dismiss All

The `dismissAllToasts imperative API will dismiss all rendered Toasts.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const DismissAll = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast, dismissAllToasts } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>This is a toast</ToastTitle>
      </Toast>,
      { intent: 'info' },
    );
  const dismissAll = () => dismissAllToasts();

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
      <Button onClick={dismissAll}>Dismiss all toasts</Button>
    </>
  );
};
```

### Dismiss Toast

Toasts can be dismissed imperatively using the `dismissToast` API. In order to imperatively dismiss a
Toast, it's necessary to dispatch it with a user provided id. You can use the id to dismiss the toast.
**Don't** use this API to dismiss toats when clicking on an action inside the toast, use the `ToastTrigger`
instead.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const DismissToast = (): JSXElement => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, dismissToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle>This is a toast</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: 'success',
        onStatusChange: (e, { status }) => setUnmounted(status === 'unmounted'),
      },
    );
    setUnmounted(false);
  };
  const dismiss = () => dismissToast(toastId);

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={unmounted ? notify : dismiss}>{unmounted ? 'Make' : 'Dismiss'} toast</Button>
    </>
  );
};
```

### Dismiss Toast With Action

By wrapping a button or link with a `ToastTrigger`, it's possible to make that actionable
element dismiss the toast with a click.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Link,
  Button,
  Toaster,
  useToastController,
  ToastTitle,
  ToastTrigger,
  Toast,
} from '@fluentui/react-components';

export const DismissToastWithAction = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          }
        >
          Dismiss me
        </ToastTitle>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Focus Keyboard Shortcut

Developers can be define a shortcut to focus on the most recent visible toast . This example
configures the shortcut to be `CTRL+M`. Once a toast is focused, all toasts belonging to that toaster
are paused and will not timeout.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Link,
  Button,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
  ToastTrigger,
} from '@fluentui/react-components';

export const FocusKeyboardShortcut = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          }
        >
          Email sent
        </ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Toaster limit={3} shortcuts={{ focus: e => e.ctrlKey && e.key === 'm' }} toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Inline

Setting the `inline` prop on a toaster will render toasts in DOM order, positioned relative to the closest
positioned ancestor. The simplest way to achieve this is to render the toaster inside an element
with `position: relative`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Link,
  Button,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  Text,
  makeStyles,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    border: '2px dashed green',

    height: '500px',
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: '20px',
  },
});

export const Inline = (): JSXElement => {
  const styles = useStyles();
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle action={<Link>Undo</Link>}>Email sent</ToastTitle>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Button onClick={notify}>Make toast</Button>
      <div className={styles.container}>
        <Text weight="bold">Toasts appear here</Text>

        <Toaster inline toasterId={toasterId} position="bottom" />
      </div>
    </>
  );
};
```

### Intent

The toast comes by default with 4 different intents:

- success
- info
- warning
- error

Each intent affects the default icon in the title and its colour. These icon slots can be overriden
to render other content such as progress spinners or avatars.

> intent determines the urgency of the screen reader aria-live narration.
> To retain default intent styles, use the`politeness` option to override the urgency or aria-live narration.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Button,
  Field,
  RadioGroup,
  Radio,
  Spinner,
  Avatar,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
  ToastIntent,
} from '@fluentui/react-components';

export const Intent = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [intent, setIntent] = React.useState<ToastIntent | 'progress' | 'avatar'>('success');
  const notify = () => {
    switch (intent) {
      case 'progress':
        dispatchToast(
          <Toast>
            <ToastTitle media={<Spinner size="tiny" />}>Progress toast</ToastTitle>
          </Toast>,
        );
        break;
      case 'avatar':
        dispatchToast(
          <Toast>
            <ToastTitle media={<Avatar name="Erika Mustermann" size={16} />}>Avatar toast</ToastTitle>
          </Toast>,
        );
        break;
      case 'error':
      case 'info':
      case 'success':
      case 'warning':
        dispatchToast(
          <Toast>
            <ToastTitle>Toast intent: {intent}</ToastTitle>
          </Toast>,
          { intent },
        );
        break;
    }
  };

  return (
    <>
      <Field label="Select a intent">
        <RadioGroup value={intent} onChange={(e, data) => setIntent(data.value as ToastIntent)}>
          <Radio label="success" value="success" />
          <Radio label="info" value="info" />
          <Radio label="warning" value="warning" />
          <Radio label="error" value="error" />
          <Radio label="progress (custom media slot)" value="progress" />
          <Radio label="avatar (custom media slot)" value="avatar" />
        </RadioGroup>
      </Field>
      <Toaster toasterId={toasterId} />
      <Button onClick={() => notify()}>Make toast</Button>
    </>
  );
};
```

### Inverted Appearance

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Link,
  Button,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
} from '@fluentui/react-components';

export const InvertedAppearance = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast appearance="inverted">
        <ToastTitle action={<Link>Undo</Link>}>Email sent</ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Multiple Toasters

> ⚠️ This use case is **not recommended**

Toasters support a `toasterId` prop to support multiple Toasters in an app.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Button,
  Field,
  RadioGroup,
  Radio,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
} from '@fluentui/react-components';

export const MultipleToasters = (): JSXElement => {
  const first = useId('toaster-1');
  const second = useId('toaster-2');
  const [toaster, setToaster] = React.useState(first);
  const { dispatchToast: dispatchFirstToast } = useToastController(first);
  const { dispatchToast: dispatchSecondToast } = useToastController(second);
  const notify = () => {
    if (toaster === first) {
      dispatchFirstToast(
        <Toast>
          <ToastTitle>First toaster</ToastTitle>
        </Toast>,
        { intent: 'info' },
      );
    } else {
      dispatchSecondToast(
        <Toast>
          <ToastTitle>Second toaster</ToastTitle>
        </Toast>,
        { intent: 'info' },
      );
    }
  };

  return (
    <>
      <Field label="Choose toaster">
        <RadioGroup value={toaster} onChange={(e, data) => setToaster(data.value)}>
          <Radio label="First toaster" value={first} />
          <Radio label="Second toaster" value={second} />
        </RadioGroup>
      </Field>
      <Toaster toasterId={first} position="bottom-end" />
      <Toaster toasterId={second} position="top-end" />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Offset

You can declare a static offset for toasts relative to the viewport. This offset can only be set on the
`Toaster` component, because it wouldn't make sense to have separate toast offsets for a toasts in a
single position.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Button,
  Field,
  SpinButton,
  RadioGroup,
  Radio,
  makeStyles,
  ToastPosition,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  playground: {
    display: 'grid',
    gridTemplateColumns: '25% 75%',
    columnGap: '20px',
    rowGap: '20px',
  },

  horizontal: {
    gridColumnEnd: 2,
  },

  vertical: {
    gridRowStart: 2,
    gridColumnEnd: 2,
  },

  positions: {
    gridRowStart: 1,
    gridRowEnd: 3,
    gridColumnStart: 2,
  },
});

export const Offset = (): JSXElement => {
  const styles = useStyles();
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [horizontal, setHorizontal] = React.useState(20);
  const [vertical, setVertical] = React.useState(16);
  const [position, setPosition] = React.useState<ToastPosition>('bottom-end');

  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>
          Offset: {horizontal}, {vertical}
        </ToastTitle>
      </Toast>,
      { position, intent: 'info' },
    );

  return (
    <>
      <div className={styles.playground}>
        <Field label="Horizontal offset" className={styles.horizontal}>
          <SpinButton
            value={horizontal}
            onChange={(e, data) => {
              if (data.value) {
                setHorizontal(data.value);
              } else if (data.displayValue !== undefined) {
                const newValue = parseFloat(data.displayValue);
                if (!Number.isNaN(newValue)) {
                  setHorizontal(newValue);
                }
              }
            }}
          />
        </Field>
        <Field label="Vertical offset" className={styles.vertical}>
          <SpinButton
            value={vertical}
            onChange={(e, data) => {
              if (data.value) {
                setVertical(data.value);
              } else if (data.displayValue !== undefined) {
                const newValue = parseFloat(data.displayValue);
                if (!Number.isNaN(newValue)) {
                  setVertical(newValue);
                }
              }
            }}
          />
        </Field>
        <Field label="Toast position" className={styles.positions}>
          <RadioGroup value={position} onChange={(e, data) => setPosition(data.value as ToastPosition)}>
            <Radio label="bottom" value="bottom" />
            <Radio label="bottom-start" value="bottom-start" />
            <Radio label="bottom-end" value="bottom-end" />
            <Radio label="top" value="top" />
            <Radio label="top-start" value="top-start" />
            <Radio label="top-end" value="top-end" />
          </RadioGroup>
        </Field>
      </div>
      <br />
      <Button onClick={() => notify()}>Make toast</Button>
      <Toaster toasterId={toasterId} offset={{ horizontal, vertical }} />
    </>
  );
};
```

### Pause And Play

Toasts can be paused and played imperatively based on the user provided id.

> ⚠️ Toasts paused this way can only be dismissed once the **app** plays it again. Make sure
> that your app will will play a toast after it has been paused.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { PlayFilled, PauseFilled } from '@fluentui/react-icons';
import {
  useId,
  Button,
  ToggleButton,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
} from '@fluentui/react-components';

export const PauseAndPlay = (): JSXElement => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const [unmounted, setUnmounted] = React.useState(true);
  const [paused, setPaused] = React.useState(false);
  const { pauseToast, playToast, dispatchToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle>This is a toast</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: 'success',
        onStatusChange: (e, { status }) => {
          setUnmounted(status === 'unmounted');
          setPaused(false);
        },
      },
    );
    setUnmounted(false);
  };

  const toggle = () => {
    if (paused) {
      playToast(toastId);
      setPaused(false);
    } else {
      pauseToast(toastId);
      setPaused(true);
    }
  };

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button disabledFocusable={!unmounted} onClick={notify}>
        Make toast
      </Button>
      <ToggleButton
        icon={paused ? <PlayFilled /> : <PauseFilled />}
        disabledFocusable={unmounted}
        onClick={toggle}
        checked={paused}
      >
        {paused ? 'Play' : 'Pause'} toast
      </ToggleButton>
    </>
  );
};
```

### Pause On Hover

The `pauseOnHover` option will enable users to pause the timeout of a toast while the mouse cursor
is inside the toast. This option can also be set on the Toaster as a default.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const PauseOnHover = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Hover me!</ToastTitle>
      </Toast>,
      { pauseOnHover: true, intent: 'info' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Pause On Window Blur

Use `pauseOnWindowBlur` option to pause the dismiss timeout of a Toast when the user moves focus
to another window. This option can also be set on the Toaster as a default.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const PauseOnWindowBlur = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Click on another window!</ToastTitle>
      </Toast>,
      { pauseOnWindowBlur: true, intent: 'info' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Progress Toast

In order to avoid excessive toast updates and optimize performance, we recommend encapsulating
progress bars with any state or remove data sources. That way the progress bar can tick independently
and trigger the toast dismiss when it finishes. You can pass a callback to your toast content
to dismiss to the toast based on any side effects.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Link,
  Button,
  ProgressBar,
  Text,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
  ToastTrigger,
} from '@fluentui/react-components';

const intervalDelay = 100;
const intervalIncrement = 5;

const DownloadProgressBar: React.FC<{ onDownloadEnd: () => void }> = ({ onDownloadEnd }) => {
  const [value, setValue] = React.useState(100);
  // This effect simulates progress value based on state/remote data
  React.useEffect(() => {
    if (value > 0) {
      const timeout = setTimeout(() => {
        setValue(v => Math.max(v - intervalIncrement, 0));
      }, intervalDelay);

      return () => clearTimeout(timeout);
    }

    if (value === 0) {
      onDownloadEnd();
    }
  }, [value, onDownloadEnd]);

  return <ProgressBar value={value} max={100} />;
};

export const ProgressToast = (): JSXElement => {
  const toasterId = useId('toaster');
  const toastId = useId('toast');
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, dismissToast } = useToastController(toasterId);

  const dismiss = React.useCallback(() => dismissToast(toastId), [dismissToast, toastId]);

  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          }
        >
          Downloading file
        </ToastTitle>
        <ToastBody>
          <Text>This may take a while</Text>
          <DownloadProgressBar onDownloadEnd={dismiss} />
        </ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      {
        intent: 'success',
        timeout: -1,
        toastId,
        onStatusChange: (e, { status }) => setUnmounted(status === 'unmounted'),
      },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button disabledFocusable={!unmounted} onClick={notify}>
        Make toast
      </Button>
    </>
  );
};
```

### Toast Lifecycle

Since toasts are imperative, the way they are mapped to React is internal, and not reflective of its usage.
The Toast API exposes its own lifecycle that users can hook into, and is already used in other
documentation examples. The lifecycle stages are:

- queued - The toast is queued until it can be made visible
- visible - The toast is mounted and rendered, this is instance if the toast limit is not reached
- dismissed - The toast is visually invisible but still mounted
- unounted - The toast has been completely unmounted and no longer exists

Use the `onStatusChange` option when dispatching a toast to listen to lifecycle changes.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Link,
  Button,
  Text,
  makeStyles,
  tokens,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
  ToastStatus,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: '20px',
  },

  button: {
    display: 'block',
  },

  logContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  logLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorBrandBackground,
    width: 'fit-content',
    fontWeight: tokens.fontWeightBold,
    padding: '2px 12px',
  },

  log: {
    overflowY: 'auto',
    boxShadow: tokens.shadow16,
    position: 'relative',
    minWidth: '200px',
    height: '200px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '12px',
  },
});

export const ToastLifecycle = (): JSXElement => {
  const styles = useStyles();
  const toasterId = useId('toaster');
  const labelId = useId();
  const { dispatchToast } = useToastController(toasterId);
  const [statusLog, setStatusLog] = React.useState<[number, ToastStatus][]>([]);
  const [dismissed, setDismissed] = React.useState(true);
  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle action={<Link>Undo</Link>}>Email sent</ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      {
        timeout: 1000,
        intent: 'success',
        onStatusChange: (e, { status: toastStatus }) => {
          setDismissed(toastStatus === 'unmounted');
          setStatusLog(prev => [[Date.now(), toastStatus], ...prev]);
        },
      },
    );
  };

  return (
    <>
      <div className={styles.root}>
        <div>
          <Button className={styles.button} disabledFocusable={!dismissed} onClick={notify}>
            Make toast
          </Button>
          <Button className={styles.button} onClick={() => setStatusLog([])}>
            Clear log
          </Button>
        </div>
        <div className={styles.logContainer}>
          <div className={styles.logLabel} id={labelId}>
            Status log
          </div>
          <div role="log" aria-labelledby={labelId} className={styles.log}>
            {statusLog.map(([time, toastStatus], i) => {
              const date = new Date(time);
              return (
                <div key={i}>
                  {date.toLocaleTimeString()} <Text weight="bold">{toastStatus}</Text>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Toaster toasterId={toasterId} />
    </>
  );
};
```

### Toast Positions

Toasts can be dispatched to all four corners of a page. We do not recommend to use more than one
position for toasts in an application because that could be disorienting for users. Pick
one desired position and configure it in the `Toaster`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Button,
  Field,
  RadioGroup,
  Radio,
  Toaster,
  useToastController,
  ToastPosition,
  ToastTitle,
  Toast,
} from '@fluentui/react-components';

export const ToastPositions = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [position, setPosition] = React.useState<ToastPosition>('top');
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>This toast is {position}</ToastTitle>
      </Toast>,
      { position, intent: 'success' },
    );

  return (
    <>
      <Field label="Select a position">
        <RadioGroup value={position} onChange={(e, data) => setPosition(data.value as ToastPosition)}>
          <Radio label="bottom" value="bottom" />
          <Radio label="bottom-start" value="bottom-start" />
          <Radio label="bottom-end" value="bottom-end" />
          <Radio label="top" value="top" />
          <Radio label="top-start" value="top-start" />
          <Radio label="top-end" value="top-end" />
        </RadioGroup>
      </Field>
      <Toaster toasterId={toasterId} />
      <Button onClick={() => notify()}>Make toast</Button>
    </>
  );
};
```

### Toaster Limit

Use the `limit` prop on the `Toaster` to define the maximum number of toasts that can be rendered
at any one time. Any extra toasts will be queued and rendered when a toast has been dismissed.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  useId,
  Button,
  Field,
  SpinButton,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
} from '@fluentui/react-components';

export const ToasterLimit = (): JSXElement => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [limit, setLimit] = React.useState(3);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Limited to 3 toasts</ToastTitle>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Field label="Toaster Limit">
        <SpinButton
          value={limit}
          onChange={(e, data) => {
            if (data.value) {
              setLimit(data.value);
            } else if (data.displayValue !== undefined) {
              const newValue = parseFloat(data.displayValue);
              if (!Number.isNaN(newValue)) {
                setLimit(newValue);
              }
            }
          }}
        />
      </Field>
      <br />
      <Toaster toasterId={toasterId} limit={limit} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
```

### Update Toast

Use the `updateToast` imperative API to make changes to a Toast that is already visible. To do this
you **must** provide an id when dispatching the toast. Almost all options of a Toast can be updated.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const UpdateToast = (): JSXElement => {
  const toastId = useId('toast');
  const toasterId = useId('toaster');
  const [unmounted, setUnmounted] = React.useState(true);

  const { dispatchToast, updateToast } = useToastController(toasterId);
  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle>This toast never closes</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: 'warning',
        timeout: -1,
        onStatusChange: (e, { status }) => setUnmounted(status === 'unmounted'),
      },
    );
    setUnmounted(false);
  };
  const update = () =>
    updateToast({
      content: (
        <Toast>
          <ToastTitle>This toast will close soon</ToastTitle>
        </Toast>
      ),

      intent: 'success',
      toastId,
      timeout: 2000,
    });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={unmounted ? notify : update}>{unmounted ? 'Make toast' : 'Update toast'}</Button>
    </>
  );
};
```
