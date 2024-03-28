import * as React from 'react';
import { Prototype } from './../utils';

import { TreeGridBase } from './TreeGridBase';

export const TreeGridWithWrappedComponents: React.FC = () => {
  return (
    <Prototype pageTitle="TreeGrid with Wrapped Components">
      <TreeGridBase variant="wrappedComponents" />
    </Prototype>
  );
};
