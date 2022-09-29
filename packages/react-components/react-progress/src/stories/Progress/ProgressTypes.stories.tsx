import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Progress } from '@fluentui/react-progress';

const intervalDelay = 100;
const intervalIncrement = 0.01;

const useStyles = makeStyles({
  container: {
    ...shorthands.padding('20px', '0px'),
  },
});

export const Types = () => {
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
      <Progress className={styles.container} indeterminate={true} label="Indeterminate Progress" />

      <Progress className={styles.container} label="Determinate Progress" percentComplete={percentComplete} />
    </div>
  );
};

Types.parameters = {
  docs: {
    description: {
      story: `Progress can come in a determinate form or an indeterminate form. The determinate form
      is useful for tracking the progress of an asset being uploaded or downloaded, or for keeping
      track of capacity. The indeterminate form is useful for showing a buffer or loading state.`,
    },
  },
};
