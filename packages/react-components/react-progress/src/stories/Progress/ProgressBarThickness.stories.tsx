import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    ...shorthands.margin('20px', '0px'),
  },
});

export const Thickness = () => {
  const styles = useStyles();

  return (
    <div>
      <Progress className={styles.container} thickness="medium" />

      <Progress className={styles.container} thickness="large" />
    </div>
  );
};

Thickness.parameters = {
  docs: {
    description: {
      story: `Progress can be one of two sizes.\n` + `It can be shown as the medium or large`,
    },
  },
};
