import * as React from 'react';
import { ReactSelectorTree } from './ReactSelectorTree';
import type { TestProps } from './types';

export const TestInjectStyles: React.FC<TestProps> = ({
  minBreadth,
  maxBreadth,
  minDepth,
  maxDepth,
  seed,
  componentRenderer,
}) => {
  const [injectStyles, setInjectStyles] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setInjectStyles(true);
    }, 2000);
  }, []);

  return (
    <ReactSelectorTree
      minBreadth={minBreadth}
      maxBreadth={maxBreadth}
      minDepth={minDepth}
      maxDepth={maxDepth}
      seed={seed}
      componentRenderer={componentRenderer}
      injectStyles={injectStyles}
    />
  );
};
