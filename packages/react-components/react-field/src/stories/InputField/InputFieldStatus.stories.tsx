import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { InputField } from '@fluentui/react-field';
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
      <InputField label="Error status" status="error" statusText="This is an error message" orientation="horizontal" />
      <InputField
        label="Warning status"
        status="warning"
        statusText="This is a warning message"
        orientation="horizontal"
      />
      <InputField
        label="Success status"
        status="success"
        statusText="This is a success message"
        orientation="horizontal"
      />
      <InputField
        label="Custom status"
        statusIcon={<SparkleFilled />}
        statusText="This status message has a custom icon"
        orientation="horizontal"
      />
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
