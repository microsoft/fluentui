import * as React from 'react';
import { Button, Link, makeStyles, shorthands, tokens, Field, RadioGroup, Radio } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  MessageBarGroup,
  MessageBarGroupProps,
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

export const Animation = () => {
  const styles = useStyles();
  const counterRef = React.useRef(0);
  const [animate, setAnimate] = React.useState<MessageBarGroupProps['animate']>('exit-only');
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
      return s.filter(entry => entry.id !== id);
    });
  };

  return (
    <>
      <Button onClick={prepend}>Notify</Button>
      <Button onClick={clear}>Clear</Button>
      <Field label="Select animation type">
        <RadioGroup value={animate} onChange={(_, { value }) => setAnimate(value as MessageBarGroupProps['animate'])}>
          <Radio label="exit-only" value="exit-only" />
          <Radio label="both" value="both" />
        </RadioGroup>
      </Field>
      <MessageBarGroup animate={animate} className={styles.container}>
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
