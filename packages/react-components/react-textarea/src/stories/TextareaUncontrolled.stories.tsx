import * as React from 'react';
import { Textarea, TextareaProps } from '../index';
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

const onChange: TextareaProps['onChange'] = (ev, data) => {
  // Uncontrolled inputs can be notified of changes to the value
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = () => {
  const textareaId = useId('textarea');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <Label htmlFor={textareaId}>Uncontrolled Textarea.</Label>
      <Textarea id={textareaId} aria-describedby="desc" onChange={onChange} placeholder="type here..." />
      <span id="desc">Check console for new value.</span>
    </div>
  );
};
