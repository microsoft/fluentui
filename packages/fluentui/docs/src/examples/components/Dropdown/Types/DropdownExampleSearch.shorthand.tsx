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
