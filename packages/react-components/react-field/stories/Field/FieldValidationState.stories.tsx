import * as React from 'react';
import { Field } from '../../src/index';
import { Input, makeStyles, tokens } from '@fluentui/react-components';
import { SparkleFilled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const ValidationState = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field
        label="Error state"
        validationState="error"
        validationMessage="This is an error message."
        orientation="horizontal"
      >
        <Input />
      </Field>
      <Field
        label="Warning state"
        validationState="warning"
        validationMessage="This is a warning message."
        orientation="horizontal"
      >
        <Input />
      </Field>
      <Field
        label="Success state"
        validationState="success"
        validationMessage="This is a success message."
        orientation="horizontal"
      >
        <Input />
      </Field>
      <Field
        label="Custom state"
        validationMessageIcon={<SparkleFilled />}
        validationMessage="This validation message has a custom icon."
        orientation="horizontal"
      >
        <Input />
      </Field>
    </div>
  );
};

ValidationState.parameters = {
  docs: {
    description: {
      story:
        'The `validationState` property modifies the appearance of the validation message, and for some input types, ' +
        'an error validationState also applies visual indication such as a red border.' +
        '<br />' +
        'Use the `validationMessage` property to display an associated message. ' +
        'You can optionally override the default icon with `validationMessageIcon`.',
    },
  },
};
