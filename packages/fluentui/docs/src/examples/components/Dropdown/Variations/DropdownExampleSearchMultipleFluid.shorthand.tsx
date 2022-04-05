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

const DropdownExampleSearchMultipleFluid = () => (
  <Dropdown
    multiple
    search
    fluid
    items={inputItems}
    placeholder="Start typing a name"
    getA11ySelectionMessage={getA11ySelectionMessage}
    noResultsMessage="We couldn't find any matches."
    a11ySelectedItemsMessage="Press Delete or Backspace to remove"
  />
);

const getA11ySelectionMessage = {
  onAdd: item => `${item} selected. Press left or right arrow keys to navigate selected items.`,
  onRemove: item => `${item} has been removed.`,
};

export default DropdownExampleSearchMultipleFluid;
