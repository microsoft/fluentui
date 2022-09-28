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

export const Thickness = () => {
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
    <div className={styles.container}>
      <Progress thickness="medium" label="Medium Progress" percentComplete={percentComplete} />

      <Progress thickness="large" label="Large Progress" percentComplete={percentComplete} />
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
