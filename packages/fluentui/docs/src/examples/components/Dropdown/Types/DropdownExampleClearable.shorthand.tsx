import { Dropdown } from '@fluentui/react-northstar';
import * as React from 'react';

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

const DropdownClearableExample = () => <Dropdown clearable items={inputItems} placeholder="Select your hero" />;

export default DropdownClearableExample;
