import * as React from 'react';
import { getTestParams } from '../testParams';
import { ReactSelectorTreeComponentRenderer } from './ReactSelectorTree';
import { TestChangeNumNodes } from './TestChangeNumNodes';
import { TestInjectStyles } from './TestInjectStyles';

export type TestProps = {
  componentRenderer: ReactSelectorTreeComponentRenderer;
};

export const TestTree: React.FC<TestProps> = ({ componentRenderer }) => {
  const { test, ...testOptions } = getTestParams();

  return (
    <>
      {test === 'inject-styles' && <TestInjectStyles {...testOptions} componentRenderer={componentRenderer} />}
      {(test === 'add-node' || test === 'remove-node') && (
        <TestChangeNumNodes {...testOptions} componentRenderer={componentRenderer} />
      )}
    </>
  );
};
