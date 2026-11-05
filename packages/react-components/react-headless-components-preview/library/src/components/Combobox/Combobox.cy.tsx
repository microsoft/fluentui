import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';

import { Combobox, Option, OptionGroup } from '.';
import type { ComboboxProps } from '.';

// ---- Selectors ----
// The Combobox `id` prop maps to the trigger <input> element.
const trigger = '#combobox';
const expandIcon = '#expand-icon';
const listbox = '[role="listbox"]';
const option = '[role="option"]';
const multiselectPopup = '[role="menu"]';
const multiselectOption = '[role="menuitemcheckbox"]';
const group = '[role="group"]';
const groupLabel = '[role="presentation"]';

// ---- Fixtures ----

const BasicCombobox = (props: Partial<ComboboxProps>) => (
  <Combobox
    id="combobox"
    placeholder="Select an animal"
    expandIcon={{ id: 'expand-icon', children: 'Open' }}
    {...props}
  >
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

    it('toggles on click-only expand icon activation', () => {
      mount(<BasicCombobox />);

      cy.get(expandIcon).trigger('click');
      cy.get('[data-open]').should('exist');
      cy.get(expandIcon).trigger('click');
      cy.get('[data-open]').should('not.exist');
    });

    it('toggles on expand icon keyboard activation', () => {
      mount(<BasicCombobox />);

      cy.get(expandIcon).focus().realPress('Enter');
      cy.get('[data-open]').should('exist');
      cy.get(expandIcon).focus().realPress('Space');
      cy.get('[data-open]').should('not.exist');
      cy.get(trigger).should('be.focused');
    });

    it('closes on Escape from the expand icon without bubbling to a parent dialog', () => {
      const onDialogKeyDown = cy.stub().as('onDialogKeyDown');
      mount(
        <div role="dialog" onKeyDown={onDialogKeyDown}>
          <BasicCombobox defaultOpen />
        </div>,
      );

      cy.get(expandIcon).focus().realPress('Escape');
      cy.get(listbox).should('not.exist');
      cy.get(trigger).should('be.focused');
      cy.get('@onDialogKeyDown').should('not.have.been.called');
    });

    it('clears focus state when focus leaves from the expand icon', () => {
      mount(<BasicCombobox />);

      cy.get(trigger).realClick();
      cy.get(listbox).should('exist');
      cy.get(expandIcon).focus();
      cy.get(listbox).should('exist');
      cy.realPress('Tab');
      cy.get(listbox).should('not.exist');
    });

    (['auto', 'manual'] as const).forEach(popover => {
      it(`does not suppress click-only activation after a canceled pointer gesture for ${popover} popovers`, () => {
        const onOpenChange = cy.stub().as('onOpenChange');
        mount(<BasicCombobox listbox={{ popover }} onOpenChange={onOpenChange} />);

        cy.get(expandIcon).realMouseDown();
        cy.get('body').realMouseMove(0, 0, { position: 'bottomRight' }).realMouseUp({ position: 'bottomRight' });
        cy.get('@onOpenChange').should('not.have.been.called');

        cy.get(trigger).realClick();
        cy.get(listbox).should('be.visible');
        cy.get(trigger).should('have.attr', 'aria-expanded', 'true');
        cy.get('@onOpenChange').should('have.been.calledOnce');

        cy.get(expandIcon).then($icon => $icon[0].click());
        cy.get(listbox).should('not.exist');
        cy.get(trigger).should('have.attr', 'aria-expanded', 'false').and('be.focused');
        cy.get('@onOpenChange').should('have.been.calledTwice');

        cy.get(expandIcon).realClick();
        cy.get(listbox).should('be.visible');
        cy.get('@onOpenChange').should('have.been.calledThrice');
        cy.get(expandIcon).realClick();
        cy.get(listbox).should('not.exist');
        cy.get('@onOpenChange').should('have.callCount', 4);
      });

      it(`toggles the ${popover} popover on pointer activation with one notification per change`, () => {
        const onOpenChange = cy.stub().as('onOpenChange');
        mount(<BasicCombobox listbox={{ popover }} onOpenChange={onOpenChange} />);

        cy.get(expandIcon).realClick();
        cy.get(listbox).should('be.visible');
        cy.get(trigger).should('have.attr', 'aria-expanded', 'true').and('be.focused');
        cy.get('@onOpenChange').should('have.been.calledOnce');
        cy.get(expandIcon).realClick();
        cy.get(listbox).should('not.exist');
        cy.get(trigger).should('have.attr', 'aria-expanded', 'false').and('be.focused');
        cy.get('[data-open]').should('not.exist');
        cy.get('@onOpenChange').should('have.been.calledTwice');
        cy.get(expandIcon).realClick();
        cy.get(listbox).should('be.visible');
        cy.get(trigger).should('have.attr', 'aria-expanded', 'true');
        cy.get('@onOpenChange').should('have.been.calledThrice');
      });
    });

    it('closes on input blur with a null relatedTarget when the expand icon is absent', () => {
      const onOpenChange = cy.stub().as('onOpenChange');
      mount(<BasicCombobox defaultOpen expandIcon={null} onOpenChange={onOpenChange} />);

      cy.get(expandIcon).should('not.exist');
      cy.get(listbox).should('be.visible');
      cy.get(trigger).focus().should('be.focused').blur();
      cy.get(listbox).should('not.exist');
      cy.get(trigger).should('have.attr', 'aria-expanded', 'false');
      cy.get('[data-open]').should('not.exist');
      cy.get('@onOpenChange').should('have.been.calledOnce');
    });

    it('notifies of an input blur close only once', () => {
      const onOpenChange = cy.stub().as('onOpenChange');
      mount(<BasicCombobox defaultOpen onOpenChange={onOpenChange} />);

      cy.get(trigger).focus().blur();
      cy.get('[data-open]').should('not.exist');
      cy.get('@onOpenChange').should('have.been.calledOnce');
    });

    it('removes the visually hidden expand icon from the tab order', () => {
      mount(<BasicCombobox clearable defaultSelectedOptions={['Cat']} defaultValue="Cat" />);

      cy.get(expandIcon).should('have.attr', 'tabindex', '-1');
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
      <Combobox id="combobox" placeholder="Select an animal" clearable clearIcon={{ id: 'clear-icon', children: 'X' }}>
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
