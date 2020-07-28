import * as React from 'react';
import { Button, Dialog, Dropdown } from '@fluentui/react-northstar';

export const selectors = {
  outerTrigger: 'outer-trigger',
  dropdown: 'dropdown-id',
  closer: 'dialog-close',
  dialogHeader: 'header',
};

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
    id={selectors.dropdown}
    items={inputItems}
    placeholder="Start typing a name"
    noResultsMessage="We couldn't find any matches."
    getA11ySelectionMessage={{
      onAdd: item => `${item} has been selected.`,
    }}
  />
);

const DialogWithDropdown = () => (
  <Dialog
    cancelButton={{ content: 'Close', id: selectors.closer }}
    content={<DropdownExampleSearch />}
    header={{ content: 'An outer', id: selectors.dialogHeader }}
    trigger={<Button id={selectors.outerTrigger} content="Open a dialog" />}
  />
);

export default DialogWithDropdown;
