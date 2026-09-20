import * as React from 'react';

import { makeStyles } from '@fluentui/react-components';
import { Spinner } from '@fluentui/react-modern-components-preview/spinner';

const useStyles = makeStyles({
  container: {
    '> div': { padding: '20px' },
  },
});

export const Labels = (): React.ReactNode => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Spinner labelPosition="before" label="Label Position Before..." />

      <Spinner labelPosition="after" label="Label Position After..." />

      <Spinner labelPosition="above" label="Label Position Above..." />

      <Spinner labelPosition="below" label="Label Position Below..." />
    </div>
  );
};
