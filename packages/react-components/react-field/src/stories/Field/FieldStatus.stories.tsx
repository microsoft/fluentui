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
      <Field label="Input with error" status="error" statusText="This is an error message" labelPosition="before">
        <Input />
      </Field>
      <Field label="Input with warning" status="warning" statusText="This is a warning message" labelPosition="before">
        <Input />
      </Field>
      <Field label="Input with success" status="success" statusText="This is a success message" labelPosition="before">
        <Input />
      </Field>
      <Field
        label="Input with custom status"
        statusIcon={<SparkleFilled />}
        statusText="This is a custom status message, with a custom icon"
        labelPosition="before"
      >
        <Input />
      </Field>
    </div>
  );
};
