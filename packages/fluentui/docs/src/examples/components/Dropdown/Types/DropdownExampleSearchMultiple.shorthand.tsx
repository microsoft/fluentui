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

const DropdownExampleSearchMultiple = () => (
  <Dropdown
    search
    multiple
    items={inputItems}
    placeholder="Start typing a name"
    getA11ySelectionMessage={getA11ySelectionMessage}
    noResultsMessage="We couldn't find any matches."
    a11ySelectedItemsMessage="delete user by press Delete key or Backspace"
  />
);

const getA11ySelectionMessage = {
  onAdd: item => `${item} has been selected.`,
  onRemove: item => `${item} has been removed.`,
};

export default DropdownExampleSearchMultiple;
