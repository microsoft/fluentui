import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Spinner } from '../index';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
  },
});

export const Labels = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Spinner labelPosition="before" label="Label Position Before..." />

      <Spinner labelPosition="after" label="Label Position After..." />

      <Spinner labelPosition="above" label="Label Position Above..." />

      <Spinner labelPosition="below" label="Label Position Below..." />
    </div>
  );
};
