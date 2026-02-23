# Utilities/ARIA live/AriaLiveAnnouncer

`AriaLiveAnnouncer` provides a sample implementation of an `aria-live` region that can be used to announce messages to screen readers.

It injects announcements into the DOM, and also exposes a function (to its children in a React tree) that can be used to announce messages. It's designed to be used with `useAnnounce()` or `useTypingAnnounce()` hooks.

For debugging information, check our [Debugging Notifications](./?path=/docs/concepts-developer-accessibility-notification-debugging--docs) docs page.

To learn more about `aria-live` regions, see [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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

export const Default = (): JSXElement => {
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
```
