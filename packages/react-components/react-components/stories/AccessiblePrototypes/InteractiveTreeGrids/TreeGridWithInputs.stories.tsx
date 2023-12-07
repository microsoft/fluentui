import * as React from 'react';
import { Prototype } from './../utils';

import { TreeGridBase } from './TreeGridBase';

export const TreeGridWithInputs: React.FC = () => {
  return (
    <Prototype pageTitle="TreeGrid with Inputs">
      <TreeGridBase variant="inputs" />
    </Prototype>
  );
};
