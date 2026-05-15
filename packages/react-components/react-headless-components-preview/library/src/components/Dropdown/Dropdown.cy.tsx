import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';

import { Dropdown, Option, OptionGroup } from '.';
import type { DropdownProps } from '.';

// ---- Selectors ----
// The Dropdown `id` prop maps to the trigger <button> element.
const trigger = '#dropdown';
const listbox = '[role="listbox"]';
const option = '[role="option"]';
const multiselectPopup = '[role="menu"]';
const multiselectOption = '[role="menuitemcheckbox"]';
const group = '[role="group"]';
const groupLabel = '[role="presentation"]';

// ---- Fixtures ----

const BasicDropdown = (props: Partial<DropdownProps>) => (
  <Dropdown id="dropdown" placeholder="Select an animal" {...props}>
    <Option>Cat</Option>
    <Option>Dog</Option>
    <Option disabled>Ferret</Option>
    <Option>Fish</Option>
    <Option>Hamster</Option>
  </Dropdown>
);

// ---- Tests ----

describe('Dropdown', () => {
  describe('listbox visibility', () => {
    it('is closed by default', () => {
      mount(<BasicDropdown />);
      cy.get(listbox).should('not.exist');
    });

    it('opens on trigger click', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).realClick();
      cy.get(listbox).should('exist');
    });

    it('opens on Space key', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).focus().realPress('Space');
      cy.get(listbox).should('exist');
    });

    it('opens on ArrowDown key', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).focus().realPress('ArrowDown');
      cy.get(listbox).should('exist');
    });

    it('closes on Escape key', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).realClick();
      cy.get(listbox).should('exist');
      cy.realPress('Escape');
      cy.get(listbox).should('not.exist');
    });

    it('closes on click outside', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).realClick();
      cy.get(listbox).should('exist');
      cy.get('body').realClick({ position: 'bottomRight' });
      cy.get(listbox).should('not.exist');
    });
  });

  describe('option selection', () => {
    it('closes listbox and shows selected value in trigger after option click', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get(listbox).should('not.exist');
      cy.get(trigger).should('contain.text', 'Cat');
    });

    it('cannot select a disabled option', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Ferret').realClick();
      cy.get(trigger).should('not.contain.text', 'Ferret');
    });

    it('returns focus to trigger after selection', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get(trigger).should('be.focused');
    });
  });

  describe('keyboard navigation', () => {
    it('selects first option with ArrowDown then Enter', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).focus().realPress('ArrowDown');
      cy.realPress('Enter');
      cy.get(trigger).should('contain.text', 'Cat');
    });

    it('navigates to subsequent options with repeated ArrowDown', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).focus().realPress('ArrowDown'); // Cat
      cy.realPress('ArrowDown'); // Dog
      cy.realPress('Enter');
      cy.get(trigger).should('contain.text', 'Dog');
    });

    it('navigates back with ArrowUp', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).focus().realPress('ArrowDown'); // Cat
      cy.realPress('ArrowDown'); // Dog
      cy.realPress('ArrowUp'); // back to Cat
      cy.realPress('Enter');
      cy.get(trigger).should('contain.text', 'Cat');
    });

    it('Home key jumps to first option', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).focus().realPress('ArrowDown');
      cy.realPress('ArrowDown'); // Dog
      cy.realPress('Home');
      cy.realPress('Enter');
      cy.get(trigger).should('contain.text', 'Cat');
    });

    it('End key jumps to last option', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).focus().realPress('ArrowDown');
      cy.realPress('End');
      cy.realPress('Enter');
      cy.get(trigger).should('contain.text', 'Hamster');
    });

    it('Escape closes without changing selection', () => {
      mount(<BasicDropdown />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get(trigger).realClick();
      cy.realPress('ArrowDown');
      cy.realPress('Escape');
      cy.get(trigger).should('contain.text', 'Cat');
    });
  });

  describe('clearable', () => {
    const ClearableDropdown = () => (
      <Dropdown
        id="dropdown"
        placeholder="Select an animal"
        clearable
        clearButton={{ 'data-testid': 'clear-btn', children: 'x' } as React.HTMLAttributes<HTMLButtonElement>}
      >
        <Option>Cat</Option>
        <Option>Dog</Option>
      </Dropdown>
    );

    it('clears selection when clear button is clicked', () => {
      mount(<ClearableDropdown />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get(trigger).should('contain.text', 'Cat');
      cy.get('[data-testid="clear-btn"]').realClick();
      cy.get(trigger).should('contain.text', 'Select an animal');
    });

    it('returns focus to trigger after clearing', () => {
      mount(<ClearableDropdown />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get('[data-testid="clear-btn"]').realClick();
      cy.get(trigger).should('be.focused');
    });
  });

  describe('controlled open state', () => {
    const ControlledDropdown = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button id="toggle" onClick={() => setOpen(o => !o)}>
            Toggle
          </button>
          <Dropdown id="dropdown" placeholder="Select" open={open} onOpenChange={(_, data) => setOpen(data.open)}>
            <Option>Cat</Option>
            <Option>Dog</Option>
          </Dropdown>
        </>
      );
    };

    it('opens via external state', () => {
      mount(<ControlledDropdown />);
      cy.get(listbox).should('not.exist');
      cy.get('#toggle').realClick();
      cy.get(listbox).should('exist');
    });

    it('closes via external state', () => {
      mount(<ControlledDropdown />);
      cy.get('#toggle').realClick();
      cy.get(listbox).should('exist');
      cy.get('#toggle').realClick();
      cy.get(listbox).should('not.exist');
    });

    it('syncs open state with onOpenChange when Escape is pressed', () => {
      mount(<ControlledDropdown />);
      cy.get('#toggle').realClick();
      cy.get(listbox).should('exist');
      cy.get(trigger).focus().realPress('Escape');
      cy.get(listbox).should('not.exist');
    });
  });

  describe('multiselect', () => {
    it('keeps listbox open after selecting an option', () => {
      mount(
        <Dropdown id="dropdown" multiselect placeholder="Select animals">
          <Option>Cat</Option>
          <Option>Dog</Option>
        </Dropdown>,
      );
      cy.get(trigger).realClick();
      cy.contains(multiselectOption, 'Cat').realClick();
      cy.get(multiselectPopup).should('exist');
    });

    it('shows comma-separated values in trigger for multiple selections', () => {
      mount(
        <Dropdown id="dropdown" multiselect placeholder="Select animals">
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Fish</Option>
        </Dropdown>,
      );
      cy.get(trigger).realClick();
      cy.contains(multiselectOption, 'Cat').realClick();
      cy.contains(multiselectOption, 'Dog').realClick();
      cy.get(trigger).should('contain.text', 'Cat');
      cy.get(trigger).should('contain.text', 'Dog');
    });

    it('deselects an already-selected option on second click', () => {
      mount(
        <Dropdown id="dropdown" multiselect placeholder="Select animals">
          <Option>Cat</Option>
          <Option>Dog</Option>
        </Dropdown>,
      );
      cy.get(trigger).realClick();
      cy.contains(multiselectOption, 'Cat').realClick();
      cy.contains(multiselectOption, 'Cat').realClick(); // deselect
      cy.get(trigger).should('not.contain.text', 'Cat');
    });
  });

  describe('disabled', () => {
    it('does not open when the trigger is disabled', () => {
      mount(<BasicDropdown disabled />);
      cy.get(trigger).should('be.disabled');
      cy.get(listbox).should('not.exist');
    });
  });

  describe('option groups', () => {
    beforeEach(() => {
      mount(
        <Dropdown id="dropdown" placeholder="Select">
          <OptionGroup label="Land">
            <Option>Cat</Option>
            <Option>Dog</Option>
          </OptionGroup>
          <OptionGroup label="Sea">
            <Option>Fish</Option>
          </OptionGroup>
        </Dropdown>,
      );
      cy.get(trigger).realClick();
    });

    it('renders the correct number of groups', () => {
      cy.get(group).should('have.length', 2);
    });

    it('renders group labels', () => {
      cy.get(groupLabel).first().should('contain.text', 'Land');
      cy.get(groupLabel).last().should('contain.text', 'Sea');
    });

    it('options inside groups are selectable', () => {
      cy.contains(option, 'Fish').realClick();
      cy.get(trigger).should('contain.text', 'Fish');
    });
  });
});
