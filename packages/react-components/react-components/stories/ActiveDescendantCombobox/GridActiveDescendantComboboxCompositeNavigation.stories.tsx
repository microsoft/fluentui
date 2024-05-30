import * as React from 'react';
import { Prototype } from './utils';
import { GridActiveDescendantComboboxCompositeNavigationRenderer } from './GridActiveDescendantComboboxCompositeNavigationRenderer';

export const GridActiveDescendantComboboxCompositeNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Grid with composite navigation and first cell narration (Variant B)">
      <h1>Combobox opening grid with composite navigation and first cell narration (Variant B)</h1>
      <GridActiveDescendantComboboxCompositeNavigationRenderer />
    </Prototype>
  );
};
