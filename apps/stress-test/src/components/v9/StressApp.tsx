import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { getTestParams } from '../../shared/testParams';
import { performanceMeasure } from '../../shared/performanceMeasure';
import { StressContainer } from './StressContainer';

export const StressApp = () => {
  const [numChildren, setNumChildren] = React.useState(getTestParams().numStartNodes);

  React.useEffect(() => {
    const { test, numStartNodes, numAddNodes, numRemoveNodes } = getTestParams();
    if (test === 'add-node') {
      performanceMeasure('stress', 'start');
      setNumChildren(numStartNodes + numAddNodes);
    } else if (test === 'removeNode') {
      performanceMeasure('stress', 'start');
      setNumChildren(numStartNodes - numRemoveNodes);
    }
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <StressContainer numChildren={numChildren} />
    </FluentProvider>
  );
};

export default StressApp;
