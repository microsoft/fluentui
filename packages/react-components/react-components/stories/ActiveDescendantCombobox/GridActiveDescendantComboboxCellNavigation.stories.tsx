import * as React from 'react';
import { Prototype } from './utils';
import { GridActiveDescendantComboboxCellNavigationRenderer } from './GridActiveDescendantComboboxCellNavigationRenderer';

export const GridActiveDescendantComboboxCellNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Grid with cell navigation (Variant C)">
      <h1>Combobox opening grid with cell navigation (Variant C)</h1>
      <GridActiveDescendantComboboxCellNavigationRenderer />
    </Prototype>
  );
};
