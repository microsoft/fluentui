import * as React from 'react';
import { Prototype } from './../utils';

import { TreeGridBase } from './TreeGridBase';

export const TreeGridWithEnterInputs: React.FC = () => {
  return (
    <Prototype pageTitle="TreeGrid with Enter Inputs">
      <TreeGridBase variant="enterInputs" />
    </Prototype>
  );
};
