import * as React from 'react';
import { makeStyles, shorthands, useId, Input, Label } from '@fluentui/react-components';

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

export const Invalid = () => {
  const inputId = useId('input');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId}>Input that has failed form validation</Label>
      <Input id={inputId} defaultValue="invalid value" invalid />
    </div>
  );
};

Invalid.parameters = {
  docs: {
    description: {
      story:
        'When the `invalid` prop is set, the Input has a red border. It is recommended to also set ' +
        '`aria-invalid`, and `aria-errormessage` with an element that describes the error.',
    },
  },
};
