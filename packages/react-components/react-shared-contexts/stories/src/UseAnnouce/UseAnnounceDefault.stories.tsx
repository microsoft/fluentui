import * as React from 'react';
import {
  AnnounceProvider,
  Button,
  Divider,
  Field,
  Input,
  Radio,
  RadioGroup,
  useAnnounce,
} from '@fluentui/react-components';
import type { AnnounceContextValue } from '@fluentui/react-components';

const AnnouncePlayground: React.FC = () => {
  const { announce } = useAnnounce();

  const [message, setMessage] = React.useState('Hello world');
  const [messageType, setMessageType] = React.useState<'polite' | 'assertive'>('polite');

  return (
    <>
      <Field label="A message for annoucement">
        <Input onChange={(ev, data) => setMessage(data.value)} value={message} />
      </Field>
      <Field label="Message type">
        <RadioGroup onChange={(ev, data) => setMessageType(data.value as 'polite' | 'assertive')} value={messageType}>
          <Radio label="assertive" value="assertive" />
          <Radio label="polite" value="polite" />
        </RadioGroup>
      </Field>

      <Button
        onClick={() => {
          announce(message, {
            polite: messageType === 'polite',
          });
        }}
      >
        Announce message
      </Button>
    </>
  );
};

export const Default = () => {
  const announce: AnnounceContextValue['announce'] = React.useCallback((message, options) => {
    alert(`Announced {polite: ${String(options?.polite ?? false)}}: ${message}`);
  }, []);
  const value: AnnounceContextValue = React.useMemo(() => ({ announce }), [announce]);

  return (
    <AnnounceProvider value={value}>
      <p>
        This example shows how to use the <code>useAnnounce()</code> hook, however it does not implement `aria-live`
        regions.
      </p>

      <Divider />
      <AnnouncePlayground />
    </AnnounceProvider>
  );
};
