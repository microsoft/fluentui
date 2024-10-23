import * as React from 'react';
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

export const Dismiss = () => {
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

Dismiss.parameters = {
  docs: {
    description: {
      story: [
        'MessageBar components should be used in a `MessageBarGroup` when possible to enable exit animations.',
        'Once inside a `MessageBarGroup` component, the default exit animation will trigger automatically when the',
        'component is unmounted from DOM.',
      ].join('\n'),
    },
  },
};
