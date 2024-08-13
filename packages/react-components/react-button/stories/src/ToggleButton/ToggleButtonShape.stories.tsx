import * as React from 'react';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Shape = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <ToggleButton>Rounded</ToggleButton>
      <ToggleButton shape="circular">Circular</ToggleButton>
      <ToggleButton shape="square">Square</ToggleButton>
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'A toggle button can be rounded, circular, or square.',
    },
  },
};
