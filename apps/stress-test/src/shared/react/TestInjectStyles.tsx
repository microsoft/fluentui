import * as React from 'react';
import { styleInjector } from '../css/injectStyles';
import { performanceMeasure } from '../utils/performanceMeasure';
import { ReactSelectorTree } from './ReactSelectorTree';
import type { TestProps } from './types';

export const TestInjectStyles: React.FC<TestProps> = ({ tree, selectors, componentRenderer }) => {
  React.useEffect(() => {
    setTimeout(() => {
      styleInjector(selectors);
      performanceMeasure();
    }, 2000);
  }, []);

  return <ReactSelectorTree tree={tree} componentRenderer={componentRenderer} />;
};
