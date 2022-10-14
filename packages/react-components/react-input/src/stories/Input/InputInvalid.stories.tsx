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
  const errormessageId = useId('errormessage');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId}>Input that has failed form validation</Label>
      <Input id={inputId} defaultValue="invalid value" invalid aria-errormessage={errormessageId} />
      <div id={errormessageId}>This is an example error message</div>
    </div>
  );
};

Invalid.parameters = {
  docs: {
    description: {
      story:
        'When the `invalid` prop is set, the Input has a red border and is marked as `aria-invalid`. It is ' +
        'recommended to also set `aria-errormessage` with an element that describes the error. Consider using ' +
        '`InputField` to handle the layout and styling of the error message.',
    },
  },
};
