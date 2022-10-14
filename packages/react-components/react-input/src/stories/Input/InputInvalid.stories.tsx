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
      <Label htmlFor={inputId}>Input with an invalid value</Label>
      <Input id={inputId} aria-invalid aria-errormessage={errormessageId} />
      <div id={errormessageId}>Example error message</div>
    </div>
  );
};

Invalid.parameters = {
  docs: {
    description: {
      story:
        'When the `aria-invalid` prop is set, the Input has a red border. It is recommended to also set ' +
        '`aria-errormessage` pointing to an element that describes the error.<br />' +
        'Alternatively, consider using `<InputField validationState="error" validationMessage="..." />` to handle ' +
        'the error message and aria props.',
    },
  },
};
