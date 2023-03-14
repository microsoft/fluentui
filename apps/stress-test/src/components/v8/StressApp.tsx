import * as React from 'react';
import { getTestOptions } from '../../shared/utils/testOptions';
import { performanceMeasure } from '../../shared/utils/performanceMeasure';
import { StressContainer } from './StressContainer';

export const StressApp = () => {
  const [numChildren, setNumChildren] = React.useState(Number(getTestOptions().numStartNodes));

  React.useEffect(() => {
    const { test, numStartNodes, numAddNodes, numRemoveNodes } = getTestOptions();
    if (test === 'add-node') {
      performanceMeasure('stress', 'start');
      setNumChildren(Number(numStartNodes) + Number(numAddNodes));
    } else if (test === 'removeNode') {
      performanceMeasure('stress', 'start');
      setNumChildren(Number(numStartNodes) - Number(numRemoveNodes));
    }
  }, []);

  return <StressContainer numChildren={numChildren} />;
};
