import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
  },
});

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Progress appearance="primary" label="Primary Progress" />

      <Progress appearance="inverted" label="Inverted Progress" />
    </div>
  );
};
