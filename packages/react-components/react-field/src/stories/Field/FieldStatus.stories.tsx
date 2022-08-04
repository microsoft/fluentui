import * as React from 'react';
import { Input, makeStyles, tokens } from '@fluentui/react-components';
import { Field } from '@fluentui/react-field';
import { SparkleFilled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  stack: {
    display: 'inline-grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const Status = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field label="Error status" status="error" statusText="This is an error message" labelPosition="before">
        <Input />
      </Field>
      <Field label="Warning status" status="warning" statusText="This is a warning message" labelPosition="before">
        <Input />
      </Field>
      <Field label="Success status" status="success" statusText="This is a success message" labelPosition="before">
        <Input />
      </Field>
      <Field
        label="Custom status"
        statusIcon={<SparkleFilled />}
        statusText="This status message has a custom icon"
        labelPosition="before"
      >
        <Input />
      </Field>
    </div>
  );
};

Status.parameters = {
  docs: {
    description: {
      story:
        'The `status` property modifies the appearance of the status text, and for some input types, ' +
        'an error status also applies visual indication such as a red border.' +
        '<br />' +
        'Use the `statusText` property to display an associated message. ' +
        'You can optionally override the default icon with `statusIcon`.',
    },
  },
};
