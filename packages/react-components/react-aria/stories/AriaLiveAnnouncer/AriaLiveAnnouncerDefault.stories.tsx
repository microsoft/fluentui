import * as React from 'react';
import { AriaLiveAnnouncer, Button, Field, Input, makeStyles, tokens, useAnnounce } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: '4px',
  },
});

const AnnouncePlayground: React.FC = () => {
  const classes = useClasses();
  const { announce } = useAnnounce();

  const [message, setMessage] = React.useState('Hello world');

  return (
    <div className={classes.container}>
      <Field label="A message for annoucement">
        <Input onChange={(ev, data) => setMessage(data.value)} value={message} />
      </Field>
      <Button
        onClick={() => {
          announce(message);
        }}
      >
        Announce message
      </Button>
    </div>
  );
};

export const Default = () => {
  return (
    <AriaLiveAnnouncer>
      <p>
        This example shows how to use the <code>useAnnounce()</code> hook connected with `AriaLiveAnnouncer` component.
        To check results, open the screen reader and click the button below.
      </p>

      <AnnouncePlayground />
    </AriaLiveAnnouncer>
  );
};
