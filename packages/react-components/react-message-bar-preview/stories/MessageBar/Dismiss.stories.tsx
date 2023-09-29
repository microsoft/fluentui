import * as React from 'react';
import { Button, Link, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { MessageBar, MessageBarActions, MessageBarTitle, MessageBarBody } from '@fluentui/react-message-bar-preview';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    ...shorthands.gap('10px'),
    height: '300px',
    ...shorthands.overflow('auto'),
    ...shorthands.border('2px', 'solid', tokens.colorBrandForeground1),
  },
});

const intents = ['info', 'warning', 'error', 'success'] as const;

interface Entry {
  intent: (typeof intents)[number];
  id: number;
  visible: boolean;
}

export const Dismiss = () => {
  const styles = useStyles();
  const counterRef = React.useRef(0);
  const [messages, setMessages] = React.useState<Entry[]>([]);
  const prepend = () => {
    const intentPos = Math.floor(Math.random() * intents.length);
    const newEntry = {
      intent: intents[intentPos],
      visible: true,
      id: counterRef.current++,
    };

    setMessages(s => [newEntry, ...s]);
  };

  const clear = () => {
    setMessages(s => {
      return s.map(entry => {
        return {
          ...entry,
          visible: false,
        };
      });
    });
  };

  const onDismiss = (id: number) => () => {
    setMessages(s => {
      const newState = s.map(entry => ({ ...entry }));
      return newState.filter(entry => entry.id !== id);
    });
  };

  const dismiss = (id: number) => () => {
    setMessages(s => {
      return s.map(entry => {
        return {
          ...entry,
          visible: entry.id === id ? false : entry.visible,
        };
      });
    });
  };

  return (
    <>
      <Button onClick={prepend}>Notify</Button>
      <Button onClick={clear}>Clear</Button>
      <div className={styles.container}>
        {messages.map(({ intent, visible, id }) => (
          <MessageBar
            key={`${intent}-${id}`}
            intent={intent}
            visible={visible}
            onDismiss={onDismiss(id)}
            animate="exit-only"
          >
            <MessageBarBody>
              <MessageBarTitle>Descriptive title</MessageBarTitle>
              Message providing information to the user with actionable insights. <Link>Link</Link>
            </MessageBarBody>
            <MessageBarActions
              containerAction={<Button onClick={dismiss(id)} appearance="transparent" icon={<DismissRegular />} />}
            />
          </MessageBar>
        ))}
      </div>
    </>
  );
};
