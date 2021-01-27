import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

const intervalDelay = 100;
const intervalIncrement = 0.01;

export const ProgressIndicatorBasicExample: React.FunctionComponent = () => {
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
    <ProgressIndicator label="Example title" description="Example description" percentComplete={percentComplete} />
  );
};
