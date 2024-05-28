import * as React from 'react';
import { Prototype } from './utils/stories';
import { SelectionManipulationPickerRenderer } from './SelectionManipulationPickerRenderer';

export const SelectionManipulationPicker: React.FC = () => {
  return (
    <Prototype pageTitle="Selection manipulation">
      <h1>Selection manipulation picker</h1>
      <SelectionManipulationPickerRenderer />
    </Prototype>
  );
};
