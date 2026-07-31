import * as React from 'react';
import { Button, useObservedElement, useFocusObserved, useId, ToggleButton, Title3 } from '@fluentui/react-components';

import styles from './Default.module.css';

export const Default = () => {
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
