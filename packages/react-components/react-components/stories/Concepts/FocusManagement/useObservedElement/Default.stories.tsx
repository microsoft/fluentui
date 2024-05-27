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
