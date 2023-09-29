import * as React from 'react';
import { Button, Link, makeStyles, shorthands, tokens, Field, RadioGroup, Radio } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  MessageBarProps,
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
  visible: boolean;
}

export const Animation = () => {
  const styles = useStyles();
  const counterRef = React.useRef(0);
  const [animate, setAnimate] = React.useState<MessageBarProps['animate']>('exit-only');
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
      <Field label="Select animation type">
        <RadioGroup value={animate} onChange={(_, { value }) => setAnimate(value as MessageBarProps['animate'])}>
          <Radio label="exit-only" value="exit-only" />
          <Radio label="both" value="both" />
        </RadioGroup>
      </Field>
      <div className={styles.container}>
        {messages.map(({ intent, visible, id }) => (
          <MessageBar
            key={`${intent}-${id}`}
            intent={intent}
            visible={visible}
            onDismiss={onDismiss(id)}
            animate={animate}
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
