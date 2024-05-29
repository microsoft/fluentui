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

MultipleNames.parameters = {
  docs: {
    description: {
      story: ['You can assign multiple names to an element and use any of them to focus.'].join('\n'),
    },
  },
};
