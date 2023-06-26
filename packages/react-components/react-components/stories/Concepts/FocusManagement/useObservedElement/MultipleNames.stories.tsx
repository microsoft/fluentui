import * as React from 'react';
import { Button, useObservedElement, useFocusObserved, Field, RadioGroup, Radio } from '@fluentui/react-components';

type ObservedNames = 'first' | 'second';

export const MultipleNames = () => {
  const firstName = 'first' as const;
  const secondName = 'second' as const;
  const [observedName, setObservedName] = React.useState<ObservedNames>('first');
  const attr = useObservedElement([firstName, secondName]);
  const focus = useFocusObserved(observedName);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (mounted) {
      focus();
    }
  }, [mounted, focus]);

  const onClick = () => {
    focus();
    if (mounted) {
      setMounted(false);
    } else {
      setTimeout(() => setMounted(true), 1000);
    }
  };

  return (
    <div>
      <Field label="Select a position">
        <RadioGroup value={observedName} onChange={(e, data) => setObservedName(data.value as ObservedNames)}>
          <Radio label="First observed name" value="first" />
          <Radio label="Second observed name" value="second" />
        </RadioGroup>
      </Field>
      <Button onClick={onClick}>{mounted ? 'Reset' : 'Load and Focus'}</Button>
      {mounted ? <Button {...attr}>Observed</Button> : null}
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
