import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    ...shorthands.padding('20px'),
  },
});

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div>
      <Progress className={styles.container} percentComplete={50} />

      <Progress
        className={styles.container}
        label="Progress Label"
        description="Progress Description"
        percentComplete={50}
      />

      <Progress className={styles.container} label="Label and ProgressBar" percentComplete={50} />

      <Progress className={styles.container} description="Description and ProgressBar" percentComplete={50} />
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        `Progress can be shown in a few different ways.\n` +
        `It can be shown as just the bar, with the bar, label and description, with just the bar and label, and with
        just the bar and description`,
    },
  },
};
