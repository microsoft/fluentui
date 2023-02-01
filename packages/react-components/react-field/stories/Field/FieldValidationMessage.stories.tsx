import * as React from 'react';

import { Input, makeResetStyles, tokens } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';
import { SparkleFilled } from '@fluentui/react-icons';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const ValidationMessage = () => (
  <div className={useStackClassName()}>
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

ValidationMessage.parameters = {
  docs: {
    description: {
      story:
        '<p>The `validationMessage` is used to display messages about about the value the user entered.</p>' +
        '<p>The `validationState` affects the behavior and appearance of the message: ' +
        '<ul>' +
        '  <li>`error` - (default) The validation message has red text with a red error icon. It has `role="alert"` ' +
        '   so it is announced by accessibility tools. Additionally, the control inside the field has `aria-invalid` ' +
        '   set, which adds a red border to some field components (such as `Input`).</li>' +
        '  <li>`success` - The validation message has gray text with a green checkmark icon.</li>' +
        '  <li>`warning` - The validation message has gray text with a yellow exclamation icon.</li>' +
        '  <li>`none` - The validation message has no icon by default and gray text.</li>' +
        '</ul></p>' +
        '<p>You can optionally override the default icon with `validationMessageIcon`.</p>',
    },
  },
};
