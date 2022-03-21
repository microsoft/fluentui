import * as React from 'react';
import { TextArea, TextAreaProps } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
});

const onChange: TextAreaProps['onChange'] = (ev, data) => {
  // Uncontrolled inputs can be notified of changes to the value
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = () => {
  const textareaId = useId('textarea');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Label htmlFor={textareaId}>Uncontrolled TextArea.</Label>
      <TextArea id={textareaId} aria-describedby="desc" onChange={onChange} placeholder="type here..." />
      <span id="desc">Check console for new value.</span>
    </div>
  );
};
