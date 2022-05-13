import * as React from 'react';
import { Textarea } from '../Textarea';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    '& > label': {
      marginBottom: tokens.spacingVerticalMNudge,
    },
  },
});

export const Placeholder = () => {
  const styles = useStyles();
  const textareaId = useId('textarea');
  return (
    <div className={styles.base}>
      <Label htmlFor={textareaId}>Textarea with placeholder.</Label>
      <Textarea id={textareaId} placeholder="type here..." />
    </div>
  );
};
