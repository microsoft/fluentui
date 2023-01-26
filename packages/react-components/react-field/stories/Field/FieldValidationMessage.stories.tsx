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
        label="Neutral state"
        validationState="neutral"
        validationMessage={{ icon: <SparkleFilled />, children: 'This is a neutral message with a custom icon.' }}
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
        '<p>By default, it is an `error` message, but the `validationState` prop can be used to ' +
        'change it to `warning`, `success`, or `neutral`.</p>' +
        '<p>You can optionally override the default icon with the `icon` slot prop on `validationMessage`.</p>',
    },
  },
};
