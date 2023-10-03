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

  return (
    <>
      <Field label="Select intent">
        <RadioGroup value={intent} onChange={(_, { value }) => setIntent(value as MessageBarIntent)}>
          {intents.map(intent => (
            <Radio label={intent} value={intent} />
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
      <MessageBarGroup className={styles.container}>
        {messages.map(({ intent, id, renderActions }) => (
          <MessageBar key={`${intent}-${id}`} intent={intent}>
            <MessageBarBody>
              <MessageBarTitle>Descriptive title</MessageBarTitle>
              Message providing information to the user with actionable insights. <Link>Link</Link>
            </MessageBarBody>
            <MessageBarActions
              containerAction={
                <Button onClick={dismiss(id)} appearance="transparent" icon={<DismissRegular />} aria-label="Dismiss" />
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
    </>
  );
};
