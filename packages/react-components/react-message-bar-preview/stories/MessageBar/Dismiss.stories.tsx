import * as React from 'react';
import { Button, Link, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  MessageBarGroup,
} from '@fluentui/react-message-bar-preview';

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
}

export const Dismiss = () => {
  const styles = useStyles();
  const counterRef = React.useRef(0);
  const [messages, setMessages] = React.useState<Entry[]>([]);
  const prepend = () => {
    const intentPos = Math.floor(Math.random() * intents.length);
    const newEntry = {
      intent: intents[intentPos],
      id: counterRef.current++,
    };

    setMessages(s => [newEntry, ...s]);
  };

  const clear = () => {
    setMessages([]);
  };

  const dismiss = (id: number) => () => {
    setMessages(s => {
      const newState = s.map(entry => ({ ...entry }));
      return newState.filter(entry => entry.id !== id);
    });
  };

  console.log(messages.length);
  return (
    <>
      <Button onClick={prepend}>Notify</Button>
      <Button onClick={clear}>Clear</Button>
      <MessageBarGroup className={styles.container}>
        {messages.map(({ intent, id }) => (
          <MessageBar key={`${intent}-${id}`} intent={intent}>
            <MessageBarBody>
              <MessageBarTitle>Descriptive title</MessageBarTitle>
              Message providing information to the user with actionable insights. <Link>Link</Link>
            </MessageBarBody>
            <MessageBarActions
              containerAction={<Button onClick={dismiss(id)} appearance="transparent" icon={<DismissRegular />} />}
            />
          </MessageBar>
        ))}
      </MessageBarGroup>
    </>
  );
};
