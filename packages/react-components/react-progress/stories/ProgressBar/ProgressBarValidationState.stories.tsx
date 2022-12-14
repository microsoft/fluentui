import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { ProgressBar } from '@fluentui/react-progress';

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
      <ProgressBar value={0.75} validationState="error" />
      <ProgressBar value={0.95} validationState="warning" />
      <ProgressBar value={1} validationState="success" />
    </div>
  );
};

ValidationState.parameters = {
  docs: {
    name: 'Validation State',
    description: {
      story:
        'The `validationState` prop can be used to indicate an `"error"` state (red), `"warning"` state (orange), ' +
        'or `"success"` state (green).',
    },
  },
};
