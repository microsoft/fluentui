import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarGroup,
  MessageBarTitle,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import type { JSXElement, MessageBarIntent } from '@fluentui/react-components';
import {
  CheckmarkCircleRegular,
  DismissRegular,
  ErrorCircleRegular,
  InfoRegular,
  WarningRegular,
} from '@fluentui/react-icons';
import { MessageBar as V8MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Link as V8Link } from '@fluentui/react/lib/Link';
import { MessageBarButton as V8MessageBarButton } from '@fluentui/react/lib/Button';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/MessageBar Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type V8IntentDefinition = {
  body: string;
  title: string;
  type: MessageBarType;
};

type V9IntentDefinition = {
  body: string;
  intent: MessageBarIntent;
  title: string;
};

const v8IntentDefinitions: V8IntentDefinition[] = [
  {
    title: 'Info',
    body: 'The default info MessageBar uses the neutral informational treatment.',
    type: MessageBarType.info,
  },
  {
    title: 'Warning',
    body: 'Warning keeps attention on a recoverable issue.',
    type: MessageBarType.warning,
  },
  {
    title: 'Error',
    body: 'Error keeps the stronger problem styling for failed work.',
    type: MessageBarType.error,
  },
  {
    title: 'Success',
    body: 'Success confirms the completed operation.',
    type: MessageBarType.success,
  },
  {
    title: 'Blocked',
    body: 'Blocked signals that users cannot continue until the issue is resolved.',
    type: MessageBarType.blocked,
  },
  {
    title: 'Severe warning',
    body: 'Severe warning calls out urgent caution without claiming the workflow is blocked.',
    type: MessageBarType.severeWarning,
  },
];

const v9IntentDefinitions: V9IntentDefinition[] = [
  {
    title: 'Info intent',
    body: 'Info remains the lightweight page-level announcement and stays politely announced.',
    intent: 'info',
  },
  {
    title: 'Warning intent',
    body: 'Use warning for cautionary messaging and as the documented fallback for severeWarning content.',
    intent: 'warning',
  },
  {
    title: 'Error intent',
    body: 'Use error for failure states and as the documented fallback for blocked scenarios that stop progress.',
    intent: 'error',
  },
  {
    title: 'Success intent',
    body: 'Success keeps positive confirmation styling while still using the compound child structure.',
    intent: 'success',
  },
];

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalL,
  },
  section: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  actionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  note: {
    margin: 0,
    color: tokens.colorNeutralForeground3,
  },
  list: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  group: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  inlineSummary: {
    display: 'inline',
  },
  clampedMessage: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '1',
    overflow: 'hidden',
  },
});

const DismissMessageBarButton = ({ onClick }: { onClick: () => void }): JSXElement => (
  <Button appearance="transparent" aria-label="Dismiss message" icon={<DismissRegular />} onClick={onClick} />
);

const V8BasicExample = (): JSXElement => (
  <V8MessageBar messageBarType={MessageBarType.warning}>
    Warning message for the current work item.{' '}
    <V8Link href="https://react.fluentui.dev" target="_blank" underline>
      Review the Fluent UI guidance.
    </V8Link>
  </V8MessageBar>
);

const V9BasicExample = (): JSXElement => (
  <MessageBar intent="warning">
    <MessageBarBody>
      <MessageBarTitle>Warning message</MessageBarTitle>
      Review the current work item before you continue.{' '}
      <Link href="https://react.fluentui.dev" inline>
        Review the Fluent UI guidance.
      </Link>
    </MessageBarBody>
  </MessageBar>
);

const V8IntentTypesExample = (): JSXElement => (
  <div className={useStyles().list}>
    {v8IntentDefinitions.map(definition => (
      <V8MessageBar key={definition.title} messageBarType={definition.type}>
        <strong>{definition.title}.</strong> {definition.body}
      </V8MessageBar>
    ))}
  </div>
);

const V9IntentValuesExample = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.list}>
      {v9IntentDefinitions.map(definition => (
        <MessageBar
          key={definition.title}
          intent={definition.intent}
          icon={
            definition.intent === 'info'
              ? { children: <InfoRegular aria-hidden="true" /> }
              : definition.intent === 'warning'
              ? { children: <WarningRegular aria-hidden="true" /> }
              : definition.intent === 'error'
              ? { children: <ErrorCircleRegular aria-hidden="true" /> }
              : { children: <CheckmarkCircleRegular aria-hidden="true" /> }
          }
        >
          <MessageBarBody>
            <MessageBarTitle>{definition.title}</MessageBarTitle>
            {definition.body}
          </MessageBarBody>
        </MessageBar>
      ))}
      <p className={styles.note}>
        `blocked` does not exist in v9, so migrate it to `intent="error"`. `severeWarning` does not exist either, so
        migrate it to `intent="warning"` unless the content truly needs error styling.
      </p>
    </div>
  );
};

const V8ActionsAndDismissExample = (): JSXElement => {
  const styles = useStyles();
  const [visible, setVisible] = React.useState(true);

  if (!visible) {
    return <p className={styles.note}>The v8 MessageBar was dismissed after `onDismiss` ran.</p>;
  }

  return (
    <V8MessageBar
      actions={
        <div className={styles.actionRow}>
          <V8MessageBarButton>Retry</V8MessageBarButton>
          <V8MessageBarButton>Open logs</V8MessageBarButton>
        </div>
      }
      dismissButtonAriaLabel="Dismiss message"
      messageBarType={MessageBarType.error}
      onDismiss={() => setVisible(false)}
    >
      Error message that includes both action buttons and the built-in dismiss button.
    </V8MessageBar>
  );
};

const V9ComposedActionsAndDismissExample = (): JSXElement => {
  const styles = useStyles();
  const [visible, setVisible] = React.useState(true);

  if (!visible) {
    return <p className={styles.note}>The v9 MessageBar was dismissed by removing it from React state.</p>;
  }

  return (
    <MessageBar intent="error">
      <MessageBarBody>
        <MessageBarTitle>Sync failed</MessageBarTitle>
        Retry the sync or inspect the logs to understand why the job failed.
      </MessageBarBody>
      <MessageBarActions containerAction={<DismissMessageBarButton onClick={() => setVisible(false)} />}>
        <Button appearance="primary">Retry</Button>
        <Button>Open logs</Button>
      </MessageBarActions>
    </MessageBar>
  );
};

const V8MultilineExample = (): JSXElement => (
  <V8MessageBar
    actions={
      <div>
        <V8MessageBarButton>Review details</V8MessageBarButton>
      </div>
    }
    isMultiline
    messageBarType={MessageBarType.warning}
  >
    <strong>Multiline layout.</strong> This v8 example keeps a long body message on multiple lines so the text, action,
    and supporting guidance can all stay visible together without clipping or truncating the content.
  </V8MessageBar>
);

const V9LayoutExample = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <MessageBar intent="warning" layout="singleline">
        <MessageBarBody>
          <MessageBarTitle>Singleline layout</MessageBarTitle>
          Use `layout="singleline"` when your layout should stay on one line and let content clip or truncate through
          your own composition.
        </MessageBarBody>
        <MessageBarActions containerAction={<DismissMessageBarButton onClick={() => undefined} />}>
          <Button>Review details</Button>
        </MessageBarActions>
      </MessageBar>
      <MessageBar intent="warning" layout="multiline">
        <MessageBarBody>
          <MessageBarTitle>Multiline layout</MessageBarTitle>
          Use `layout="multiline"` when the title, body, and actions should stack like the v8 multiline variant, or
          leave `layout="auto"` to let the component reflow itself.
        </MessageBarBody>
        <MessageBarActions containerAction={<DismissMessageBarButton onClick={() => undefined} />}>
          <Button>Review details</Button>
        </MessageBarActions>
      </MessageBar>
    </div>
  );
};

const V8MultipleMessagesExample = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.list}>
      <V8MessageBar messageBarType={MessageBarType.info}>A page-level info message is visible.</V8MessageBar>
      <V8MessageBar messageBarType={MessageBarType.success}>
        A follow-up success confirmation is also visible.
      </V8MessageBar>
    </div>
  );
};

const V9MessageBarGroupExample = (): JSXElement => {
  const styles = useStyles();

  return (
    <MessageBarGroup className={styles.group}>
      <MessageBar intent="info">
        <MessageBarBody>
          <MessageBarTitle>Info message</MessageBarTitle>
          Use `MessageBarGroup` when several related v9 MessageBars need shared spacing or exit animations.
        </MessageBarBody>
      </MessageBar>
      <MessageBar intent="success">
        <MessageBarBody>
          <MessageBarTitle>Success message</MessageBarTitle>
          Grouping keeps multiple announcements organized without inventing a new wrapper API on the root bar.
        </MessageBarBody>
      </MessageBar>
    </MessageBarGroup>
  );
};

const V8TruncatedExample = (): JSXElement => (
  <V8MessageBar
    dismissButtonAriaLabel="Dismiss message"
    isMultiline={false}
    messageBarType={MessageBarType.blocked}
    onDismiss={() => undefined}
    overflowButtonAriaLabel="Show the full message"
    truncated
  >
    Blocked work item. This message demonstrates the v8 built-in truncation experience, which can toggle between a
    clipped single line and the full body without any custom composition from the app.
  </V8MessageBar>
);

const V9CustomTruncationExample = (): JSXElement => {
  const styles = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  if (!visible) {
    return <p className={styles.note}>The custom truncation example was dismissed from consumer state.</p>;
  }

  return (
    <MessageBar intent="error" layout="singleline">
      <MessageBarBody>
        <MessageBarTitle>Blocked work item</MessageBarTitle>
        <span className={expanded ? styles.inlineSummary : styles.clampedMessage}>
          This v9 MessageBar composes its own overflow state. Add a custom toggle action, clamp or expand the body
          content yourself, and name the toggle and dismiss buttons explicitly for assistive technology.
        </span>
      </MessageBarBody>
      <MessageBarActions containerAction={<DismissMessageBarButton onClick={() => setVisible(false)} />}>
        <Button onClick={() => setExpanded(current => !current)}>{expanded ? 'Collapse' : 'Show full message'}</Button>
      </MessageBarActions>
    </MessageBar>
  );
};

export const V8Basic: Story = {
  render: () => <V8BasicExample />,
};

export const V9Basic: Story = {
  render: () => <V9BasicExample />,
};

export const V8IntentTypes: Story = {
  render: () => <V8IntentTypesExample />,
};

export const V9IntentValues: Story = {
  render: () => <V9IntentValuesExample />,
};

export const V8ActionsAndDismiss: Story = {
  render: () => <V8ActionsAndDismissExample />,
};

export const V9ComposedActionsAndDismiss: Story = {
  render: () => <V9ComposedActionsAndDismissExample />,
};

export const V8Multiline: Story = {
  render: () => <V8MultilineExample />,
};

export const V9Layout: Story = {
  render: () => <V9LayoutExample />,
};

export const V8MultipleMessages: Story = {
  render: () => <V8MultipleMessagesExample />,
};

export const V9MessageBarGroup: Story = {
  render: () => <V9MessageBarGroupExample />,
};

export const V8Truncated: Story = {
  render: () => <V8TruncatedExample />,
};

export const V9CustomTruncation: Story = {
  render: () => <V9CustomTruncationExample />,
};
