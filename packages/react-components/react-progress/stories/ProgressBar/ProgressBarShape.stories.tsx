import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { ProgressBar } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    ...shorthands.margin('20px', '0px'),
  },
});

export const Shape = () => {
  const styles = useStyles();

  return (
    <div>
      <ProgressBar className={styles.container} shape="rounded" thickness="large" value={0.5} />

      <ProgressBar className={styles.container} shape="square" thickness="large" value={0.5} />
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'ProgressBar supports different shapes. `rounded` is the default.',
    },
  },
};
