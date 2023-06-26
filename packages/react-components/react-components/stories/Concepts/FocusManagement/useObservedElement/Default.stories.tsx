import * as React from 'react';
import { Button, useObservedElement, useFocusObserved, useId } from '@fluentui/react-components';

export const Default = () => {
  const observedName = useId('observed');
  const attr = useObservedElement(observedName);
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
      <Button onClick={onClick}>{mounted ? 'Reset' : 'Load and Focus'}</Button>
      {mounted ? <Button {...attr}>LoadAndFocus</Button> : null}
    </div>
  );
};
