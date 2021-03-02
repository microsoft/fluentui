import * as React from 'react';
import { Button, Dialog, Dropdown } from '@fluentui/react-northstar';

export const selectors = {
  dialogTrigger: 'outer-trigger',
  dropdown: 'dropdown-id',
  dialogClose: 'dialog-close',
  dialogHeader: 'header',
};

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
    cancelButton={{ content: 'Close', id: selectors.dialogClose }}
    content={<DropdownExampleSearch />}
    header={{ content: 'An outer', id: selectors.dialogHeader }}
    trigger={<Button id={selectors.dialogTrigger} content="Open a dialog" />}
  />
);

export default DialogWithDropdown;
