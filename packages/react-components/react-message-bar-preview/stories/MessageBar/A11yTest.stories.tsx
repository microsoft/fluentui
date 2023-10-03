import * as React from 'react';
import {
  Button,
  Checkbox,
  Field,
  Link,
  Radio,
  RadioGroup,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  MessageBarGroup,
  MessageBarIntent,
} from '@fluentui/react-message-bar-preview';
import { createPriorityQueue, useEventCallback } from '@fluentui/react-utilities';
import { AnnounceContextValue_unstable, AnnounceProvider_unstable } from '@fluentui/react-shared-contexts';

const useStyles = makeStyles({
  container: {
    ...shorthands.padding(tokens.spacingHorizontalMNudge),
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    ...shorthands.gap('10px'),
    height: '300px',
    ...shorthands.overflow('auto'),
    ...shorthands.border('2px', 'solid', tokens.colorBrandForeground1),
  },
});

const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

interface Entry {
  intent: MessageBarIntent;
  id: number;
  renderActions: boolean;
}

export const A11yTest = () => {
  const styles = useStyles();
  const counterRef = React.useRef(0);
  const [messages, setMessages] = React.useState<Entry[]>([]);
  const [intent, setIntent] = React.useState<MessageBarIntent>('info');
  const [hasActions, setHasActions] = React.useState<boolean>(false);
  const prepend = () => {
    const newEntry = {
      intent,
      id: counterRef.current++,
      renderActions: hasActions,
    };

    setMessages(s => [newEntry, ...s]);
  };

  const clear = () => {
    setMessages([]);
  };

  const dismiss = (id: number) => () => {
    setMessages(s => {
      return s.filter(entry => entry.id !== id);
    });
  };

  const announceRef = React.useRef<AnnounceContextValue_unstable['announce']>(() => null);
  const announce: AnnounceContextValue_unstable['announce'] = React.useCallback(
    (message, options) => announceRef.current(message, options),
    [],
  );

  return (
    <>
      <Field label="Select intent">
        <RadioGroup value={intent} onChange={(_, { value }) => setIntent(value as MessageBarIntent)}>
          {intents.map(intent => (
            <Radio key={intent} label={intent} value={intent} />
          ))}
        </RadioGroup>
      </Field>
      <Checkbox
        label="Has actions?"
        checked={hasActions}
        onChange={(e, { checked }) => setHasActions(checked as boolean)}
      />
      <div>
        <Button onClick={prepend}>Notify</Button>
        <Button onClick={clear}>Clear</Button>
      </div>
      <AriaLive announceRef={announceRef} />
      <AnnounceProvider_unstable value={{ announce }}>
        <MessageBarGroup className={styles.container}>
          {messages.map(({ intent, id, renderActions }) => (
            <MessageBar key={`${intent}-${id}`} intent={intent}>
              <MessageBarBody>
                <MessageBarTitle>Descriptive title {id}</MessageBarTitle>
                Message providing information to the user with actionable insights. <Link>Link</Link>
              </MessageBarBody>
              <MessageBarActions
                containerAction={
                  <Button
                    onClick={dismiss(id)}
                    appearance="transparent"
                    icon={<DismissRegular />}
                    aria-label="Dismiss"
                  />
                }
              >
                {renderActions && (
                  <>
                    <Button>Action 1</Button> <Button>Action 2</Button>
                  </>
                )}
              </MessageBarActions>
            </MessageBar>
          ))}
        </MessageBarGroup>
      </AnnounceProvider_unstable>
    </>
  );
};

type LiveMessage = {
  message: string;
  createdAt: number;
  politeness: 'polite' | 'assertive';
};

const AriaLive: React.FC<{ announceRef: React.Ref<AnnounceContextValue_unstable['announce']> }> = props => {
  const [currentMessage, setCurrentMessage] = React.useState<LiveMessage | undefined>(undefined);
  // Can't rely on Date.now() if user invokes announce more than once in a code block
  const order = React.useRef(0);
  const [messageQueue] = React.useState(() =>
    createPriorityQueue<LiveMessage>((a, b) => {
      if (a.politeness === b.politeness) {
        return a.createdAt - b.createdAt;
      }

      return a.politeness === 'assertive' ? -1 : 1;
    }),
  );

  const announce: AnnounceContextValue_unstable['announce'] = useEventCallback((message, options = {}) => {
    const { alert } = options;
    if (message === currentMessage?.message) {
      return;
    }

    const liveMessage = {
      message,
      politeness: alert ? ('assertive' as const) : ('polite' as const),
      createdAt: order.current++,
    };

    if (!currentMessage) {
      setCurrentMessage(liveMessage);
    } else {
      messageQueue.enqueue(liveMessage);
    }
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (messageQueue.peek()) {
        setCurrentMessage(messageQueue.dequeue());
      } else {
        setCurrentMessage(undefined);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentMessage, messageQueue]);

  React.useImperativeHandle(props.announceRef, () => announce);

  const politeMessage = currentMessage?.politeness === 'polite' ? currentMessage.message : undefined;
  const assertiveMessage = currentMessage?.politeness === 'assertive' ? currentMessage.message : undefined;

  const styles = {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0px',
    width: '1px',
    position: 'absolute' as const,
  };

  return (
    <>
      <div style={styles} aria-live="polite">
        {politeMessage}
      </div>
      <div style={styles} aria-live="assertive">
        {assertiveMessage}
      </div>
    </>
  );
};
