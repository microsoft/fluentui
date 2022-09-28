import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
  },
});

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Progress />

      <Progress label="Progress Label" description="Progress Description" />

      <Progress label="Label and ProgressBar" />

      <Progress description="Description and ProgressBar" />
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        `Progress can be shown in a few different ways.\n` +
        `It can be shown as just the bar, with the bar,label, and description, with just the bar and label, and with
        just the bar and description`,
    },
  },
};
