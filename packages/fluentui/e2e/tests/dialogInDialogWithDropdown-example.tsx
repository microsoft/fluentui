import * as React from 'react';
import { Button, Dialog, Dropdown } from '@fluentui/react-northstar';

export const selectors = {
  outerClose: 'outer-close',
  outerHeader: 'outer-header',
  outerTrigger: 'outer-trigger',

  innerClose: 'inner-close',
  innerHeader: 'inner-header',
  innerTrigger: 'inner-trigger',

  dropdown: 'dropdown-id',
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
    items={inputItems}
    id={selectors.dropdown}
    placeholder="Start typing a name"
    noResultsMessage="We couldn't find any matches."
    getA11ySelectionMessage={{
      onAdd: item => `${item} has been selected.`,
    }}
  />
);

const DialogInPopupExample = () => (
  <Dialog
    cancelButton={{ content: 'Close', id: selectors.outerClose }}
    content={
      <Dialog
        cancelButton={{ content: 'Close', id: selectors.innerClose }}
        header={{ content: 'An inner', id: selectors.innerHeader }}
        content={<DropdownExampleSearch />}
        trigger={<Button id={selectors.innerTrigger} content="Open a dialog" />}
      />
    }
    header={{ content: 'An outer', id: selectors.outerHeader }}
    trigger={<Button id={selectors.outerTrigger} content="Open a dialog" />}
  />
);

export default DialogInPopupExample;
