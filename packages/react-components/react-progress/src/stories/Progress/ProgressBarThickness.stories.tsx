import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
  },
});

export const Thickness = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Progress barThickness="default" label="Default Progress" />

      <Progress barThickness="large" label="Large Progress" />
    </div>
  );
};
