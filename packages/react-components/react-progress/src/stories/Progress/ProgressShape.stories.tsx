import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    ...shorthands.margin('20px', '0px'),
  },
});

export const Shape = () => {
  const styles = useStyles();

  return (
    <div>
      <Progress className={styles.container} shape="rounded" thickness="large" value={0.5} />

      <Progress className={styles.container} shape="rectangular" thickness="large" value={0.5} />
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'Progress supports different shapes. `rounded` is the default.',
    },
  },
};
