import * as React from 'react';
import { Prototype } from './utils';
import { GridActiveDescendantComboboxCompositeNavigationRenderer } from './GridActiveDescendantComboboxCompositeNavigationRenderer';

export const GridActiveDescendantComboboxCompositeNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Grid with composite navigation (Variant A)">
      <h1>Combobox opening grid with composite navigation (Variant A)</h1>
      <GridActiveDescendantComboboxCompositeNavigationRenderer />
    </Prototype>
  );
};
