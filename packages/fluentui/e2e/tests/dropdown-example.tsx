import * as React from 'react';
import { Dropdown, dropdownSlotClassNames } from '@fluentui/react-northstar';

const inputItems = [
  'Bruce Wayne',
  'Natasha Romanoff',
  'Steven Strange',
  'Alfred Pennyworth',
  `Scarlett O'Hara`,
  'Imperator Furiosa',
  'Bruce Banner',
  'Peter Parker',
  'Selina Kyle',
];

export const selectors = {
  triggerButtonClass: dropdownSlotClassNames.triggerButton,
};

const DropdownExample = () => <Dropdown multiple items={inputItems} placeholder="Select your heroes" />;

export default DropdownExample;
