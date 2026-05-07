import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';

import { Combobox, Option, OptionGroup } from '.';
import type { ComboboxProps } from '.';

// ---- Selectors ----
// The Combobox `id` prop maps to the trigger <input> element.
const trigger = '#combobox';
const listbox = '[role="listbox"]';
const option = '[role="option"]';
const multiselectPopup = '[role="menu"]';
const multiselectOption = '[role="menuitemcheckbox"]';
const group = '[role="group"]';
const groupLabel = '[role="presentation"]';

// ---- Fixtures ----

const BasicCombobox = (props: Partial<ComboboxProps>) => (
  <Combobox id="combobox" placeholder="Select an animal" {...props}>
    <Option>Cat</Option>
    <Option>Dog</Option>
    <Option disabled>Ferret</Option>
    <Option>Fish</Option>
    <Option>Hamster</Option>
  </Combobox>
);

// ---- Tests ----

describe('Combobox', () => {
  describe('listbox visibility', () => {
    it('is closed by default', () => {
      mount(<BasicCombobox />);
      cy.get(listbox).should('not.exist');
    });

    it('opens on trigger click', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).realClick();
      cy.get(listbox).should('exist');
    });

    it('opens on ArrowDown key', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).focus().realPress('ArrowDown');
      cy.get(listbox).should('exist');
    });

    it('closes on Escape key', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).realClick();
      cy.get(listbox).should('exist');
      cy.realPress('Escape');
      cy.get(listbox).should('not.exist');
    });

    it('closes on click outside', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).realClick();
      cy.get(listbox).should('exist');
      cy.get('body').realClick({ position: 'bottomRight' });
      cy.get(listbox).should('not.exist');
    });
  });

  describe('option selection', () => {
    it('closes listbox and shows selected value in trigger after option click', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get(listbox).should('not.exist');
      cy.get(trigger).should('have.value', 'Cat');
    });

    it('cannot select a disabled option', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Ferret').realClick();
      cy.get(trigger).should('not.have.value', 'Ferret');
    });

    it('returns focus to trigger after selection', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get(trigger).should('be.focused');
    });
  });

  describe('keyboard navigation', () => {
    it('selects first option with ArrowDown then Enter', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).focus().realPress('ArrowDown');
      cy.realPress('Enter');
      cy.get(trigger).should('have.value', 'Cat');
    });

    it('navigates to subsequent options with repeated ArrowDown', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).focus().realPress('ArrowDown'); // Cat
      cy.realPress('ArrowDown'); // Dog
      cy.realPress('Enter');
      cy.get(trigger).should('have.value', 'Dog');
    });

    it('navigates back with ArrowUp', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).focus().realPress('ArrowDown'); // Cat
      cy.realPress('ArrowDown'); // Dog
      cy.realPress('ArrowUp'); // back to Cat
      cy.realPress('Enter');
      cy.get(trigger).should('have.value', 'Cat');
    });

    it('Home key jumps to first option', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).focus().realPress('ArrowDown');
      cy.realPress('ArrowDown'); // Dog
      cy.realPress('Home');
      cy.realPress('Enter');
      cy.get(trigger).should('have.value', 'Cat');
    });

    it('End key jumps to last option', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).focus().realPress('ArrowDown');
      cy.realPress('End');
      cy.realPress('Enter');
      cy.get(trigger).should('have.value', 'Hamster');
    });

    it('Escape closes without changing selection', () => {
      mount(<BasicCombobox />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get(trigger).realClick();
      cy.realPress('ArrowDown');
      cy.realPress('Escape');
      cy.get(trigger).should('have.value', 'Cat');
    });
  });

  describe('clearable', () => {
    const ClearableCombobox = () => (
      <Combobox
        id="combobox"
        placeholder="Select an animal"
        clearable
        clearIcon={{ id: 'clear-icon', children: 'X', 'aria-label': 'Clear selection' }}
      >
        <Option>Cat</Option>
        <Option>Dog</Option>
      </Combobox>
    );

    it('clears selection when clear icon is clicked', () => {
      mount(<ClearableCombobox />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get(trigger).should('have.value', 'Cat');
      cy.get('#clear-icon').realClick();
      cy.get(trigger).should('have.value', '');
    });

    it('returns focus to trigger after clearing', () => {
      mount(<ClearableCombobox />);
      cy.get(trigger).realClick();
      cy.contains(option, 'Cat').realClick();
      cy.get('#clear-icon').realClick();
      cy.get(trigger).should('be.focused');
    });
  });

  describe('controlled open state', () => {
    const ControlledCombobox = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button id="toggle" onClick={() => setOpen(o => !o)}>
            Toggle
          </button>
          <Combobox id="combobox" placeholder="Select" open={open} onOpenChange={(_, data) => setOpen(data.open)}>
            <Option>Cat</Option>
            <Option>Dog</Option>
          </Combobox>
        </>
      );
    };

    it('opens via external state', () => {
      mount(<ControlledCombobox />);
      cy.get(listbox).should('not.exist');
      cy.get('#toggle').realClick();
      cy.get(listbox).should('exist');
    });

    it('closes via external state', () => {
      mount(<ControlledCombobox />);
      cy.get('#toggle').realClick();
      cy.get(listbox).should('exist');
      cy.get('#toggle').realClick();
      cy.get(listbox).should('not.exist');
    });

    it('syncs open state with onOpenChange when Escape is pressed', () => {
      mount(<ControlledCombobox />);
      cy.get('#toggle').realClick();
      cy.get(listbox).should('exist');
      cy.get(trigger).focus().realPress('Escape');
      cy.get(listbox).should('not.exist');
    });
  });

  describe('freeform', () => {
    it('preserves typed value that does not match any option', () => {
      mount(
        <Combobox id="combobox" placeholder="Type anything…" freeform>
          <Option>Cat</Option>
          <Option>Dog</Option>
        </Combobox>,
      );
      cy.get(trigger).realClick().realType('Unicorn');
      cy.realPress('Escape');
      cy.get(trigger).should('have.value', 'Unicorn');
    });

    it('selects a matching option from typed input', () => {
      mount(
        <Combobox id="combobox" placeholder="Type anything…" freeform>
          <Option>Cat</Option>
          <Option>Dog</Option>
        </Combobox>,
      );
      cy.get(trigger).realClick().realType('Cat');
      cy.contains(option, 'Cat').realClick();
      cy.get(trigger).should('have.value', 'Cat');
    });
  });

  describe('multiselect', () => {
    it('keeps listbox open after selecting an option', () => {
      mount(
        <Combobox id="combobox" multiselect placeholder="Select animals">
          <Option>Cat</Option>
          <Option>Dog</Option>
        </Combobox>,
      );
      cy.get(trigger).realClick();
      cy.contains(multiselectOption, 'Cat').realClick();
      cy.get(multiselectPopup).should('exist');
    });

    it('shows comma-separated values in trigger for multiple selections', () => {
      mount(
        <Combobox id="combobox" multiselect placeholder="Select animals">
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Fish</Option>
        </Combobox>,
      );
      cy.get(trigger).realClick();
      cy.contains(multiselectOption, 'Cat').realClick();
      cy.contains(multiselectOption, 'Dog').realClick();
      cy.get(trigger).invoke('val').should('include', 'Cat');
      cy.get(trigger).invoke('val').should('include', 'Dog');
    });

    it('deselects an already-selected option on second click', () => {
      mount(
        <Combobox id="combobox" multiselect placeholder="Select animals">
          <Option>Cat</Option>
          <Option>Dog</Option>
        </Combobox>,
      );
      cy.get(trigger).realClick();
      cy.contains(multiselectOption, 'Cat').realClick();
      cy.contains(multiselectOption, 'Cat').realClick(); // deselect
      cy.get(trigger).should('have.value', '');
    });
  });

  describe('disabled', () => {
    it('does not open when the trigger is disabled', () => {
      mount(<BasicCombobox disabled />);
      cy.get(trigger).should('be.disabled');
      cy.get(listbox).should('not.exist');
    });
  });

  describe('option groups', () => {
    beforeEach(() => {
      mount(
        <Combobox id="combobox" placeholder="Select">
          <OptionGroup label="Land">
            <Option>Cat</Option>
            <Option>Dog</Option>
          </OptionGroup>
          <OptionGroup label="Sea">
            <Option>Fish</Option>
          </OptionGroup>
        </Combobox>,
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
      cy.get(trigger).should('have.value', 'Fish');
    });
  });
});
