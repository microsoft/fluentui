import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { Textarea } from '../Textarea';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    '& > div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('10px'), ...shorthands.padding('10px') },
  },
});

export const Disabled = () => {
  const disabledId = useId('textarea-disabled');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Label htmlFor={disabledId}>Disabled Textarea.</Label>
      <Textarea id={disabledId} disabled />
    </div>
  );
};
