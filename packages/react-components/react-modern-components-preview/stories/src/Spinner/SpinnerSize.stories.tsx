import * as React from 'react';

import { makeStyles } from '@fluentui/react-components';
import { Spinner } from '@fluentui/react-modern-components-preview/spinner';

const useStyles = makeStyles({
  container: {
    '> div': { padding: '20px' },
  },
});

export const Size = (): React.ReactNode => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Spinner size="extra-tiny" label="Extra Tiny Spinner" />

      <Spinner size="tiny" label="Tiny Spinner" />

      <Spinner size="extra-small" label="Extra Small Spinner" />

      <Spinner size="small" label="Small Spinner" />

      <Spinner size="medium" label="Medium Spinner" />

      <Spinner size="large" label="Large Spinner" />

      <Spinner size="extra-large" label="Extra Large Spinner" />

      <Spinner size="huge" label="Huge Spinner" />
    </div>
  );
};
