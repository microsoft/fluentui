import { Dropdown } from '@fluentui/react';
import * as React from 'react';

const inputItems = [
  'Bruce Wayne',
  'Natasha Romanoff',
  'Steven Strange',
  'Alfred Pennyworth',
  `Scarlett O'Hara`,
  'Imperator Furiosa',
  'Bruce Banner',
  'Peter Parker',
  'Selina Kyle'
];

const DropdownClearableExample = () => <Dropdown clearable items={inputItems} placeholder="Select your hero" />;

export default DropdownClearableExample;
