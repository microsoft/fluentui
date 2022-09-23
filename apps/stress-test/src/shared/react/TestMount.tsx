import * as React from 'react';
import { styleInjector } from '../css/injectStyles';
import { performanceMeasure } from '../utils/performanceMeasure';
import { ReactSelectorTree } from './ReactSelectorTree';
import type { TestProps } from './types';

export const TestMount: React.FC<TestProps> = ({ tree, selectors, componentRenderer, testOptions }) => {
  // eslint-disable-next-line no-restricted-properties
  React.useLayoutEffect(() => {
    if (testOptions.withStyles === 'true') {
      styleInjector(selectors);
    }
    performanceMeasure();
  }, []);

  return <ReactSelectorTree tree={tree} componentRenderer={componentRenderer} />;
};
