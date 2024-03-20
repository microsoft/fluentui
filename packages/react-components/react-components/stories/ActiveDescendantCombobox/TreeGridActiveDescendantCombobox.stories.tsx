import * as React from 'react';
import { Prototype } from './utils';
import { TreeGridActiveDescendantComboboxRenderer } from './TreeGridActiveDescendantComboboxRenderer';

export const TreeGridActiveDescendantCombobox: React.FC = () => {
  return (
    <Prototype pageTitle="TreeGrid">
      <TreeGridActiveDescendantComboboxRenderer />
    </Prototype>
  );
};
