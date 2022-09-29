import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const intervalDelay = 100;
const intervalIncrement = 0.01;

const useStyles = makeStyles({
  container: {
    ...shorthands.padding('20px'),
  },
});

export const Appearance = () => {
  const styles = useStyles();
  const [percentComplete, setPercentComplete] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setPercentComplete((intervalIncrement + percentComplete) % 1);
    }, intervalDelay);
    return () => {
      clearInterval(id);
    };
  });

  return (
    <div>
      <Progress className={styles.container} percentComplete={percentComplete} />

      <Progress
        className={styles.container}
        label="Progress Label"
        description="Progress Description"
        percentComplete={percentComplete}
      />

      <Progress className={styles.container} label="Label and ProgressBar" percentComplete={percentComplete} />

      <Progress
        className={styles.container}
        description="Description and ProgressBar"
        percentComplete={percentComplete}
      />
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
