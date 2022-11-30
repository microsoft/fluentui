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

export const Disabled = () => {
  const disabledId = useId('textarea-disabled');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <Label htmlFor={disabledId}>Disabled Textarea.</Label>
      <Textarea id={disabledId} disabled />
    </div>
  );
};
