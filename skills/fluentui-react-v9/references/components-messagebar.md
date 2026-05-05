# Components/MessageBar

Communicates important information about the state of the entire application or surface.
For example, the status of a page, panel, dialog or card. The information shouldn't require someone
to take immediate action, but should persist until the user performs one of the required actions.

> ⚠️ For `aria-live` announcements to work correctly you should configure you application with a
> <a href="https://react.fluentui.dev/?path=/docs/utilities-aria-live-arialiveannouncer--docs">AriaLiveAnnouncer</a>
> towards the top of the React tree.

## Best practices

### Do

- Use MessageBar components inside MesssageBarGroup
- Include a dismiss button as the container action
- Reduce number of actions in the MessageBar
- Use preset intents

### Don't

- Use enter animations on page load
- Use manual layout if possible - this is a built-in feature
- Use long messages for content - keep content to under 100 characters
- Customize announcement politeness - check with your a11y champ

## Props

| Name                 | Type                                                                                                                                      | Required | Default | Description                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon`               | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`    | No      |                                                                                        |                                                                                                                                                                                                                                                                                                                                                                             |
| `bottomReflowSpacer` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`    | No      |                                                                                        | Rendered when the component is in multiline layout to guarantee correct spacing even if no actions are rendered. When actions are rendered, the default actions grid area will render over this element NOTE: If you are using this slot, this probably means that you are using the MessageBar without actions, this is not recommended from an accesibility point of view |
| `as`                 | `"div"`                                                                                                                                   | No       |         |                                                                                        |
| `layout`             | `"auto" "multiline" "singleline"`                                                                                                         | No       |         |                                                                                        |
| `intent`             | `"success" "warning" "error" "info"`                                                                                                      | No       | info    | Default designs announcement presets                                                   |
| `politeness`         | `"assertive" "polite"`                                                                                                                    | No       |         | @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions |
| `shape`              | `"square" "rounded"`                                                                                                                      | No       | rounded | Use squal for page level messages and rounded for component level messages             |
| `ref`                | `Ref<HTMLDivElement>`                                                                                                                     | No       |         |                                                                                        |

## Subcomponents

### MessageBarGroup

MessageBarGroup component

#### Props

| Name      | Type                  | Required | Default | Description |
| --------- | --------------------- | -------- | ------- | ----------- |
| `as`      | `"div"`               | No       |         |             |
| `animate` | `"both" "exit-only"`  | No       |         |             |
| `ref`     | `Ref<HTMLDivElement>` | No       |         |             |

### MessageBarBody

MessageBarBody component

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### MessageBarTitle

MessageBarTitle component

#### Props

| Name  | Type                   | Required | Default | Description |
| ----- | ---------------------- | -------- | ------- | ----------- |
| `as`  | `"span"`               | No       |         |             |
| `ref` | `Ref<HTMLSpanElement>` | No       |         |             |

### MessageBarActions

MessageBarActions component

#### Props

| Name              | Type                                                                                                                                      | Required | Default | Description |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | ------------------------------------------------- |
| `containerAction` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`    | No      |             | Generally the 'Dismiss' button for the MessageBar |
| `as`              | `"div"`                                                                                                                                   | No       |         |             |
| `ref`             | `Ref<HTMLDivElement>`                                                                                                                     | No       |         |             |

## Examples

### Actions

The `MessageBar` can have different actions.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  Button,
  Link,
} from '@fluentui/react-components';

export const Actions = (): JSXElement => (
  <MessageBar>
    <MessageBarBody>
      <MessageBarTitle>Descriptive title</MessageBarTitle>
      Message providing information to the user with actionable insights. <Link>Link</Link>
    </MessageBarBody>
    <MessageBarActions
      containerAction={<Button appearance="transparent" aria-label="Dismiss" icon={<DismissRegular />} />}
    >
      <Button>Action</Button>
      <Button>Action</Button>
    </MessageBarActions>
  </MessageBar>
);
```

### Animation

Enter animations are also handled within the `MessageBarGroup`. However avoid entry animations for MessageBar
components on page load. However, MessageBar components that are mounted during the lifecycle of an
app can use enter animations.

> ⚠️ Animation will only function if the only children of `MessageBarGroup` are `MessageBar` components.
> Do not wrap `MessageBar` with other components. This is a known limitation we are actively working on.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  MessageBarGroup,
  MessageBarGroupProps,
  MessageBarIntent,
  Button,
  Link,
  makeStyles,
  tokens,
  Field,
  RadioGroup,
  Radio,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  controlsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  messageBarGroup: {
    padding: tokens.spacingHorizontalMNudge,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    gap: '10px',

    height: '300px',
    overflow: 'auto',
    border: `2px solid ${tokens.colorBrandForeground1}`,
  },
  field: {
    flexGrow: 1,
    alignItems: 'center',
    gridTemplateColumns: 'max-content auto',
  },
  buttonGroup: {
    display: 'flex',
    gap: '5px',
  },
});

const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

interface ExampleMessage {
  intent: MessageBarIntent;
  id: number;
}

export const Animation = (): JSXElement => {
  const styles = useStyles();
  const counterRef = React.useRef(0);

  const [animate, setAnimate] = React.useState<MessageBarGroupProps['animate']>('both');
  const [messages, setMessages] = React.useState<ExampleMessage[]>([]);

  const addMessage = () => {
    const intent = intents[Math.floor(Math.random() * intents.length)];
    const newMessage = { intent, id: counterRef.current++ };

    setMessages(s => [newMessage, ...s]);
  };
  const clearMessages = () => setMessages([]);
  const dismissMessage = (messageId: number) => setMessages(s => s.filter(entry => entry.id !== messageId));

  return (
    <div>
      <div className={styles.controlsContainer}>
        <Field className={styles.field} label="Select animation type:" orientation="horizontal">
          <RadioGroup
            layout="horizontal"
            onChange={(_, { value }) => setAnimate(value as MessageBarGroupProps['animate'])}
            value={animate}
          >
            <Radio label="both" value="both" />
            <Radio label="exit-only" value="exit-only" />
          </RadioGroup>
        </Field>

        <div className={styles.buttonGroup}>
          <Button appearance="primary" onClick={addMessage}>
            Add message
          </Button>
          <Button onClick={clearMessages}>Clear</Button>
        </div>
      </div>

      <MessageBarGroup animate={animate} className={styles.messageBarGroup}>
        {messages.map(({ intent, id }) => (
          <MessageBar key={`${intent}-${id}`} intent={intent}>
            <MessageBarBody>
              <MessageBarTitle>Descriptive title</MessageBarTitle>
              Message providing information to the user with actionable insights. <Link>Link</Link>
            </MessageBarBody>
            <MessageBarActions
              containerAction={
                <Button
                  onClick={() => dismissMessage(id)}
                  aria-label="dismiss"
                  appearance="transparent"
                  icon={<DismissRegular />}
                />
              }
            />
          </MessageBar>
        ))}
      </MessageBarGroup>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  Button,
  Link,
} from '@fluentui/react-components';

export const Default = (): JSXElement => (
  <MessageBar>
    <MessageBarBody>
      <MessageBarTitle>Descriptive title</MessageBarTitle>
      Message providing information to the user with actionable insights. <Link>Link</Link>
    </MessageBarBody>
    <MessageBarActions
      containerAction={<Button aria-label="dismiss" appearance="transparent" icon={<DismissRegular />} />}
    >
      <Button>Action</Button>
      <Button>Action</Button>
    </MessageBarActions>
  </MessageBar>
);
```

### Dismiss

MessageBar components should be used in a `MessageBarGroup` when possible to enable exit animations.
Once inside a `MessageBarGroup` component, the default exit animation will trigger automatically when the
component is unmounted from DOM.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  MessageBarGroup,
  MessageBarIntent,
  Button,
  Link,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  messageBarGroup: {
    padding: tokens.spacingHorizontalMNudge,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    gap: '10px',

    height: '300px',
    overflow: 'auto',
    border: `2px solid ${tokens.colorBrandForeground1}`,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'end',
    gap: '5px',
  },
});

const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

interface ExampleMessage {
  intent: MessageBarIntent;
  id: number;
}

export const Dismiss = (): JSXElement => {
  const styles = useStyles();

  const counterRef = React.useRef(0);
  const [messages, setMessages] = React.useState<ExampleMessage[]>([]);

  const addMessage = () => {
    const intent = intents[Math.floor(Math.random() * intents.length)];
    const newMessage = { intent, id: counterRef.current++ };

    setMessages(s => [newMessage, ...s]);
  };
  const clearMessages = () => setMessages([]);
  const dismissMessage = (messageId: number) => setMessages(s => s.filter(entry => entry.id !== messageId));

  return (
    <>
      <div className={styles.buttonGroup}>
        <Button appearance="primary" onClick={addMessage}>
          Add message
        </Button>
        <Button onClick={clearMessages}>Clear</Button>
      </div>

      <MessageBarGroup className={styles.messageBarGroup}>
        {messages.map(({ intent, id }) => (
          <MessageBar key={`${intent}-${id}`} intent={intent}>
            <MessageBarBody>
              <MessageBarTitle>Descriptive title</MessageBarTitle>
              Message providing information to the user with actionable insights. <Link>Link</Link>
            </MessageBarBody>
            <MessageBarActions
              containerAction={
                <Button
                  onClick={() => dismissMessage(id)}
                  aria-label="dismiss"
                  appearance="transparent"
                  icon={<DismissRegular />}
                />
              }
            />
          </MessageBar>
        ))}
      </MessageBarGroup>
    </>
  );
};
```

### Intent

MessageBar components come built-in with preset intents that determine the design and aria live announcement,
While it is recommended to use the preset intents, it's possible to configure the aria live politeness
with the `politeness` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  MessageBarIntent,
  Link,
  makeStyles,
} from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});
const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

export const Intent = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      {intents.map(intent => (
        <MessageBar key={intent} intent={intent}>
          <MessageBarBody>
            <MessageBarTitle>Intent {intent}</MessageBarTitle>
            Message providing information to the user with actionable insights. <Link>Link</Link>
          </MessageBarBody>
        </MessageBar>
      ))}
    </div>
  );
};
```

### Manual Layout

It's possible to opt out of automatic reflow with the `layout` prop. This can be useful if an application
has an existing responsive design mechanism.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  Button,
  Link,
  Switch,
} from '@fluentui/react-components';

const intents = ['info', 'warning', 'error', 'success'] as const;
export const ManualLayout = (): JSXElement => {
  const [single, setSingle] = React.useState(true);
  return (
    <>
      <Switch
        label={single ? 'Single line layout' : 'Multi line layout'}
        checked={single}
        onChange={(_, { checked }) => setSingle(checked)}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {intents.map(intent => (
          <MessageBar key={intent} layout={single ? 'singleline' : 'multiline'} intent={intent}>
            <MessageBarBody>
              <MessageBarTitle>Descriptive title</MessageBarTitle>
              Message providing information to the user with actionable insights. <Link>Link</Link>
            </MessageBarBody>
            <MessageBarActions
              containerAction={<Button aria-label="dismiss" appearance="transparent" icon={<DismissRegular />} />}
            >
              <Button>Action</Button>
              <Button>Action</Button>
            </MessageBarActions>
          </MessageBar>
        ))}
      </div>
    </>
  );
};
```

### Reflow

The `MessageBar` will reflow by default once the body content wraps to a second line. This changes the layout
of the actions in the MessageBar.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Link,
  makeStyles,
  tokens,
  Switch,
  mergeClasses,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  compact: {
    width: '600px',
  },
  resizableArea: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 10px',
    gap: '10px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    position: 'relative',
    overflow: 'hidden',

    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

export const Reflow = (): JSXElement => {
  const styles = useStyles();
  const [compact, setCompact] = React.useState(true);
  return (
    <>
      <Switch
        label={compact ? 'Compact width' : 'Full width'}
        checked={compact}
        onChange={(_, { checked }) => setCompact(checked)}
      />

      <div className={mergeClasses(styles.resizableArea, compact && styles.compact)}>
        <MessageBar intent="success">
          <MessageBarBody>
            <MessageBarTitle>Descriptive title</MessageBarTitle>
            Message providing information to the user with actionable insights. <Link>Link</Link>
          </MessageBarBody>
          <MessageBarActions
            containerAction={<Button aria-label="dismiss" appearance="transparent" icon={<DismissRegular />} />}
          >
            <Button>Action</Button>
            <Button>Action</Button>
          </MessageBarActions>
        </MessageBar>
      </div>
    </>
  );
};
```

### Shape

MessageBar can have either rounded or square corners, please follow the usage guidance for these shapes:

- **_rounded_** used for component level message bars
- **_square_** used for page/app level message bars

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, MessageBar, MessageBarTitle, MessageBarBody } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Shape = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <MessageBar shape="rounded">
        <MessageBarBody>
          <MessageBarTitle>Rounded shape</MessageBarTitle>
          This message has rounded shape.
        </MessageBarBody>
      </MessageBar>
      <MessageBar shape="square">
        <MessageBarBody>
          <MessageBarTitle>Square shape</MessageBarTitle>
          This message has square shape.
        </MessageBarBody>
      </MessageBar>
    </div>
  );
};
```
