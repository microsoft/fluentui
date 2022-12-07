import * as React from 'react';
import { makeStyles, tokens, useId, Label, Textarea } from '@fluentui/react-components';

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
