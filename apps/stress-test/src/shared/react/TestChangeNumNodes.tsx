import * as React from 'react';
import { performanceMeasure } from '../performanceMeasure';
import { getTestParams } from '../testParams';
import { ReactSelectorTree } from './ReactSelectorTree';
import type { TestProps } from './types';

export const TestChangeNumNodes: React.FC<TestProps> = ({
  minBreadth,
  maxBreadth,
  minDepth,
  maxDepth,
  seed,
  componentRenderer,
}) => {
  const [treeParams, setTreeParams] = React.useState({
    minBreadth,
    maxBreadth,
    minDepth,
    maxDepth,
    seed,
  });

  React.useEffect(() => {
    const { test, addBreadth, removeBreadth, addDepth, removeDepth } = getTestParams();

    let newBreadth: number = 0;
    let newDepth: number = 0;
    if (test === 'add-node') {
      newBreadth = Number(addBreadth);
      newDepth = Number(addDepth);
    } else if (test === 'remove-node') {
      newBreadth = Number(removeBreadth);
      newDepth = Number(removeDepth);
    }

    setTimeout(() => {
      performanceMeasure();
      setTreeParams({
        ...treeParams,
        maxBreadth: Number(maxBreadth) + newBreadth,
        maxDepth: Number(maxDepth) + newDepth,
      });
    }, 2000);
  }, []);

  return <ReactSelectorTree {...treeParams} componentRenderer={componentRenderer} />;
};
