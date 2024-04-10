import * as React from 'react';
import { Prototype } from './utils';
import { GridActiveDescendantComboboxRenderer } from './GridActiveDescendantComboboxRenderer';

export const GridActiveDescendantCombobox: React.FC = () => {
  return (
    <Prototype pageTitle="Grid">
      <h1>Grid opening Combobox</h1>
      <GridActiveDescendantComboboxRenderer />
    </Prototype>
  );
};
