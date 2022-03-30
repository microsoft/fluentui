import * as React from 'react';
import { Textarea } from '../Textarea';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
});

export const Placeholder = () => {
  const styles = useStyles();
  const textareaId = useId('textarea');
  return (
    <div className={styles.container}>
      <Label htmlFor={textareaId}>Textarea with placeholder.</Label>
      <Textarea id={textareaId} placeholder="type here..." />
    </div>
  );
};
