import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';

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

const DropdownExample = () => (
  <Dropdown
    items={inputItems}
    placeholder="Select your hero"
    checkable
    getA11ySelectionMessage={{ onAdd: item => `${item} has been selected.` }}
  />
);

export default DropdownExample;
