`useAnnounce()` is a React hook that provides a function that can be used to announce messages to screen readers.

If you need to announce messages at the same time as a user is typing, we recommend using `useTypingAnnounce` instead.

**Note:** This hook requires an aria-live announcer implementation that is configured through the `<AnnounceProvider />` (for custom live region implementations), or `<AriaLiveAnnouncer>` (for the out-of-the-box Fluent live region implementation). Define this context near the top level of your application.

For live region debugging information, check our [Debugging Notifications](./?path=/docs/concepts-developer-accessibility-notification-debugging--docs) docs page.

## useAnnounce

`useAnnounce(message, options)`

- `message` `[string]` is a message to announce
- `options` is an optional options object
  - `batchId` `[string]` is a unique identifier for the message. If a message with the same id is already announced, it will be replaced.
  - `polite` `[boolean]` indicates that the message announcement can be interrupted by another message and will be announced only user is idle.
  - `priority` `[number]` defines the priority of the message. Higher priority messages will be announced first.

#### Example

```tsx
import { useAnnounce } from '@fluentui/react-components';

function Example() {
  const { announce } = useAnnounce();

  return <button onClick={() => announce('Hello world!', { polite: true })}>Announce</button>;
}
```

## AnnounceProvider

`<AnnounceProvider />` is a React component that allows to provide `announce()` function implementation that will be consumed by `useAnnounce()`.

#### Example

```tsx
import { AnnounceProvider, useAnnounce } from '@fluentui/react-components';

function AnnounceConsumer() {
  const { announce } = useAnnounce();

  // ...
  // component that triggers announcement
}

function Announcer(props) {
  const announce = message => {
    // ...
    // implementation of announcement
  };
  const contextValue = React.useMemo(() => ({ announce }), [announce]);

  return <AnnounceProvider value={contextValue}>{props.children}</AnnounceProvider>;
}

function App() {
  return (
    <AnnounceProvider>
      <AnnounceConsumer />
    </AnnounceProvider>
  );
}
```
