import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { ProgressBar } from '@fluentui/react-progress';
import { Field } from '@fluentui/react-field';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
});

export const ValidationState = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Field validationMessage="Error ProgressBar">
        <ProgressBar value={0.75} color="error" />
      </Field>

      <Field validationMessage="Warning ProgressBar" validationState="warning">
        <ProgressBar value={0.95} color="warning" />
      </Field>

      <Field validationMessage="Success ProgressBar" validationState="success">
        <ProgressBar value={1} color="success" />
      </Field>
    </div>
  );
};

ValidationState.parameters = {
  docs: {
    name: 'Validation State',
    description: {
      story:
        'The `color` prop can be used to indicate a `"brand"` state(default) `"error"` state (red), `"warning"` state (orange), ' +
        'or `"success"` state (green).',
    },
  },
};
