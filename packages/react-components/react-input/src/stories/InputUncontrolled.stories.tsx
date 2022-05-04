import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';
import { Input } from '../index';
import type { InputProps } from '../index';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap('2px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
});

const onChange: InputProps['onChange'] = (ev, data) => {
  // Uncontrolled inputs can be notified of changes to the value
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = () => {
  const inputId = useId('input');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId}>Uncontrolled input with default value</Label>
      <Input defaultValue="default value" onChange={onChange} id={inputId} />
    </div>
  );
};

Uncontrolled.parameters = {
  docs: {
    description: {
      story:
        'By default, an input is uncontrolled: it tracks all updates internally. ' +
        'You can optionally provide a default value.',
    },
  },
};
