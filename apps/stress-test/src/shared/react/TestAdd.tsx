import * as React from 'react';
import { styleInjector } from '../css/injectStyles';
import { performanceMeasure } from '../utils/performanceMeasure';
import { ReactSelectorTree } from './ReactSelectorTree';
import type { TestProps } from './types';

export const TestAdd: React.FC<TestProps> = ({ tree, selectors, componentRenderer, testOptions }) => {
  const [added, setAdded] = React.useState(false);

  React.useEffect(() => {
    if (testOptions.withStyles === 'true') {
      styleInjector(selectors);
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setAdded(true);
      performanceMeasure();
    }, 2000);
  }, []);

  return (
    <>
      <ReactSelectorTree tree={tree} componentRenderer={componentRenderer} />
      {added && <ReactSelectorTree tree={tree} componentRenderer={componentRenderer} />}
    </>
  );
};
