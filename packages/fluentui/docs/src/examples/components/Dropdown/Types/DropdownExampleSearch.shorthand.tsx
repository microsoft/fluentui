import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';

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

const DropdownExampleSearch = () => (
  <Dropdown
    search
    items={inputItems}
    placeholder="Start typing a name"
    noResultsMessage="We couldn't find any matches."
    getA11ySelectionMessage={{ onAdd: item => `${item} has been selected.` }}
  />
);

export default DropdownExampleSearch;
