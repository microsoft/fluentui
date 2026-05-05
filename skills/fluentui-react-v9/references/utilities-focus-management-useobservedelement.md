# Utilities/Focus Management/useObservedElement

Observed elements are a way to assign a name to an element that is not a
[HTML id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) which can be used for focusing.
Observed elements are powered by [tabster](http://tabster.io/docs/observed/) and can be used for deterministic
focusing as each element can support multiple observed names.

Observed elements can also be used to focus asynchronously. Any focus attempts will be retried until a configurable
timeout is reached. This can be useful for loading or virtualization scenarios where the element to be focused might
not yet exist in DOM.

The `useObservedElement` hook assigns a name to an element and should be used alongside `useFocusObserved` that will
actually return the imperative method to focus the element.

## Examples

### Default

```tsx
import * as React from 'react';
import {
  Button,
  useObservedElement,
  useFocusObserved,
  useId,
  makeStyles,
  tokens,
  ToggleButton,
  Title3,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',

    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },
});

export const Default = () => {
  const styles = useStyles();
  const observedName = useId('observed');

  const attributes = useObservedElement(observedName);
  const focus = useFocusObserved(observedName);

  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (mounted) {
      focus();
    }
  }, [mounted, focus]);

  const onClick = () => {
    if (mounted) {
      setMounted(false);
      setLoading(false);
    } else {
      setLoading(true);
      setTimeout(() => {
        setMounted(true);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <ToggleButton checked={mounted} disabledFocusable={loading} onClick={onClick}>
          {mounted ? 'Reset' : 'Load and Focus'}
        </ToggleButton>
      </div>

      {mounted ? (
        <div className={styles.card}>
          <Title3>Hello world!</Title3>
          <div>
            <Button {...attributes}>Focused on load</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
```

### Multiple Names

You can assign multiple names to an element and use any of them to focus.

```tsx
import * as React from 'react';
import {
  Button,
  useObservedElement,
  useFocusObserved,
  Field,
  RadioGroup,
  Radio,
  makeStyles,
  tokens,
  Title3,
  ToggleButton,
} from '@fluentui/react-components';

type ObservedNames = 'first' | 'second';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',

    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },
});

export const MultipleNames = () => {
  const styles = useStyles();
  const firstName = 'first' as const;
  const secondName = 'second' as const;
  const [observedName, setObservedName] = React.useState<ObservedNames>('first');
  const attributes = useObservedElement([firstName, secondName]);
  const focus = useFocusObserved(observedName);

  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (mounted) {
      focus();
    }
  }, [mounted, focus]);

  const onClick = () => {
    if (mounted) {
      setMounted(false);
      setLoading(false);
    } else {
      setLoading(true);
      setTimeout(() => {
        setMounted(true);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <Field label="Select a name">
        <RadioGroup value={observedName} onChange={(e, data) => setObservedName(data.value as ObservedNames)}>
          <Radio label="First observed name" value="first" />
          <Radio label="Second observed name" value="second" />
        </RadioGroup>
      </Field>
      <div>
        <ToggleButton checked={mounted} disabledFocusable={loading} onClick={onClick}>
          {mounted ? 'Reset' : 'Load and Focus'}
        </ToggleButton>
      </div>
      {mounted ? (
        <div className={styles.card}>
          <Title3>Hello world!</Title3>
          <div>
            <Button {...attributes}>Focused on load</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
```
