import * as React from 'react';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Checked = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <ToggleButton checked={true}>Controlled checked state</ToggleButton>
      <ToggleButton checked={false}>Controlled unchecked state</ToggleButton>
    </div>
  );
};

Checked.parameters = {
  docs: {
    description: {
      story: `A toggle button can be checked or unchecked. Unchecked is default.
      If a checked value is given, the button is 'controlled' and will only change state when the
      props value changes.`,
    },
  },
};
