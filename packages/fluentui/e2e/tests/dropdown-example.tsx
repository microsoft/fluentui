import * as React from 'react';
import { Dropdown, dropdownSlotClassNames } from '@fluentui/react-northstar';

const inputItems = [
  'Robert Tolbert',
  'Wanda Howard',
  'Tim Deboer',
  'Amanda Brady',
  'Ashley McCarthy',
  'Cameron Evans',
  'Carlos Slattery',
  'Carole Poland',
  'Robin Counts',
];

export const selectors = {
  triggerButtonClass: dropdownSlotClassNames.triggerButton,
};

const DropdownExample = () => <Dropdown multiple items={inputItems} placeholder="Select your heroes" />;

export default DropdownExample;
