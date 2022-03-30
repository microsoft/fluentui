import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';
import { Input } from '../index';

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

export const Disabled = () => {
  const inputId = useId('input');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label disabled htmlFor={inputId}>
        Disabled input
      </Label>
      <Input disabled id={inputId} defaultValue="disabled value" />
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'An input can be disabled.',
    },
  },
};
