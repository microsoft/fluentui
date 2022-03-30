import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';
import { Spinner } from '../index';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
});

export const Appearance = () => {
  const invertedId = useId('inverted');
  const primaryId = useId('primary');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Label htmlFor={primaryId}>Primary Appearance</Label>
      <Spinner appearance="primary" id={primaryId} />

      <Label htmlFor={invertedId}>Inverted Appearance</Label>
      <Spinner appearance="inverted" id={invertedId} />
    </div>
  );
};
