import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';
import { Spinner } from '../index';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
});

export const Labels = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Spinner labelPosition="before" label={<Label>Label Position Before...</Label>} />

      <Spinner labelPosition="after" label={<Label>Label Position After...</Label>} />

      <Spinner labelPosition="above" label={<Label>Label Position Above...</Label>} />

      <Spinner labelPosition="below" label={<Label>Label Position Below...</Label>} />
    </div>
  );
};
