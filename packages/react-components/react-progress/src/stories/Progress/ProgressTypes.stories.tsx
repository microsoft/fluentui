import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
  },
});

export const Types = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Progress label="Indeterminate Progress" />

      <Progress determinate percentComplete={0.5} label="Determinate Progress" />
    </div>
  );
};
