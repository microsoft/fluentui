import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    ...shorthands.margin('20px', '0px'),
  },
});

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div>
      <Progress className={styles.container} appearance="rounded" thickness="large" value={0.5} />

      <Progress className={styles.container} appearance="rectangular" thickness="large" value={0.5} />
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: "Progress supports different appearances. `rounded` is the default.",
    },
  },
};
