import * as React from 'react';
import { Progress } from '@fluentui/react-progress';

const intervalDelay = 100;
const intervalIncrement = 0.01;

export const Default = () => {
  const [percentComplete, setPercentComplete] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setPercentComplete((intervalIncrement + percentComplete) % 1);
    }, intervalDelay);
    return () => {
      clearInterval(id);
    };
  });

  return <Progress percentComplete={percentComplete} {...props} />;
};

Default.parameters = {
  docs: {
    description: {
      story: `Default determinate Progress bar`,
    },
  },
};
