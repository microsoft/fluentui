import * as React from 'react';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <ToggleButton size="small">Size: small</ToggleButton>
      <ToggleButton size="medium">Size: medium</ToggleButton>
      <ToggleButton size="large">Size: large</ToggleButton>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A toggle button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
