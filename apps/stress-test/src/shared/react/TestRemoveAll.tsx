import * as React from 'react';
import { styleInjector } from '../css/injectStyles';
import { performanceMeasure } from '../utils/performanceMeasure';
import { ReactSelectorTree } from './ReactSelectorTree';
import type { TestProps } from './types';

export const TestRemoveAll: React.FC<TestProps> = ({ tree, selectors, componentRenderer, testOptions }) => {
  const [theTree, setTheTree] = React.useState<TestProps['tree'] | undefined>();

  React.useEffect(() => {
    if (testOptions.withStyles === 'true') {
      styleInjector(selectors);
    }
  }, []);

  React.useEffect(() => {
    if (theTree === undefined && tree) {
      setTheTree(tree);

      setTimeout(() => {
        setTheTree(undefined);
        performanceMeasure();
      }, 2000);
    }
  }, [tree]);

  return <ReactSelectorTree tree={theTree} componentRenderer={componentRenderer} />;
};
