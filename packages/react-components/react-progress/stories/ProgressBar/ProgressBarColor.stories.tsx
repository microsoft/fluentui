import * as React from 'react';
import { Field, ProgressBar, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
});

export const Color = () => {
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

Color.parameters = {
  docs: {
    name: 'Validation State',
    description: {
      story:
        'The `color` prop can be used to indicate a `"brand"` state (default), `"error"` state (red), `"warning"` state (orange), ' +
        'or `"success"` state (green).',
    },
  },
};
