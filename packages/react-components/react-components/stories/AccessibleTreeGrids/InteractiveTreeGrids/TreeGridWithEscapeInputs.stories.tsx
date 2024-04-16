import * as React from 'react';
import { Prototype } from './../utils';

import { TreeGridBase } from './TreeGridBase';

export const TreeGridWithEscapeInputs: React.FC = () => {
  return (
    <Prototype pageTitle="Variant A: TreeGrid with Escape Inputs">
      <TreeGridBase variant="escapeInputs" />
    </Prototype>
  );
};
