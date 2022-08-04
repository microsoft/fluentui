import * as React from 'react';
import { makeStyles, shorthands, Spinner } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
  },
});

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Spinner appearance="primary" label="Primary Spinner" />

      <Spinner appearance="inverted" label="Inverted Spinner" />
    </div>
  );
};
