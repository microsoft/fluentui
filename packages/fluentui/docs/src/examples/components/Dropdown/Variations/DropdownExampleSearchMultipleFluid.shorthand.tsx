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

const DropdownExampleSearchMultipleFluid = () => (
  <Dropdown
    multiple
    search
    fluid
    items={inputItems}
    placeholder="Start typing a name"
    getA11ySelectionMessage={getA11ySelectionMessage}
    noResultsMessage="We couldn't find any matches."
    a11ySelectedItemsMessage="Press Delete or Backspace to remove the user from selection"
  />
);

const getA11ySelectionMessage = {
  onAdd: item => `${item} selected. Press left or right arrow keys to navigate selected items.`,
  onRemove: item => `${item} has been removed.`,
};

export default DropdownExampleSearchMultipleFluid;
