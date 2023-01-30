import * as React from 'react';

import { Input, makeStyles, tokens } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';
import { SparkleFilled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const ValidationMessage = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field label="Error state" validationMessage="This is an error message.">
        <Input />
      </Field>
      <Field label="Warning state" validationState="warning" validationMessage="This is a warning message.">
        <Input />
      </Field>
      <Field label="Success state" validationState="success" validationMessage="This is a success message.">
        <Input />
      </Field>
      <Field
        label="Custom state"
        validationState="none"
        validationMessageIcon={<SparkleFilled />}
        validationMessage="This is a custom message."
      >
        <Input />
      </Field>
    </div>
  );
};

ValidationMessage.parameters = {
  docs: {
    description: {
      story:
        '<p>The `validationMessage` is used to display messages about about the value the user entered.</p>' +
        '<p>The `validationState` affects the behavior and appearance of the message: ' +
        '<ul>' +
        '  <li>`error` - (default) The validation message has a red error icon and red text, with `role="alert"` so ' +
        '   it is announced by accessibility tools. Additionally, the control inside the field has `aria-invalid` ' +
        '   set, which adds a red border to some field components (such as `Input`).</li>' +
        '  <li>`success` - The validation message has a green checkmark icon and gray text.</li>' +
        '  <li>`warning` - The validation message has a yellow exclamation icon and gray text.</li>' +
        '  <li>`none` - The validation message has no icon and gray text.</li>' +
        '</ul></p>' +
        '<p>You can optionally override the default icon with `validationMessageIcon`.</p>',
    },
  },
};
