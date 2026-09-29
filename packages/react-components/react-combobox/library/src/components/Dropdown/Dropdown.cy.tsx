import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { useTabsterAttributes } from '@fluentui/react-tabster';

import { Dropdown, Option } from '@fluentui/react-combobox';
import type { DropdownProps } from '@fluentui/react-combobox';

import { triggerSelector, listboxSelector, triggerId } from '../../testing/selectors';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('Dropdown - controlling open/close state', () => {
  const ControlledOpenCloseStateDropdown = (props: Partial<DropdownProps>) => {
    const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

    const [open, setOpen] = React.useState(false);
    const handleOpenChange: DropdownProps['onOpenChange'] = (e, data) => setOpen(data.open);
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => setOpen(!!event.target.checked);

    return (
      <>
        <label>
          <input id={triggerId} type="checkbox" name="state" value="open" checked={open} onChange={handleInputChange} />
          Open/Close
        </label>

        <Dropdown placeholder="Select an animal" open={open} onOpenChange={handleOpenChange}>
          {options.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </Dropdown>
      </>
    );
  };

  it('should open/close dropdown when the controlled input state changes', () => {
    mount(<ControlledOpenCloseStateDropdown />);

    cy.get(triggerSelector).check();
    cy.get(listboxSelector).should('be.visible');

    cy.get(triggerSelector).uncheck();
    cy.get(listboxSelector).should('not.exist');
  });

  it('should close dropdown when clicked outside', () => {
    mount(<ControlledOpenCloseStateDropdown />);

    cy.get(triggerSelector).check();
    cy.get(listboxSelector).should('be.visible');

    cy.get('body').click({ force: true });
    cy.get(listboxSelector).should('not.exist');
  });
});

describe('Dropdown - tab navigation', () => {
  const TabsterRoot = (props: { children?: React.ReactNode }) => {
    const tabsterAttrs = useTabsterAttributes({ root: {} });
    return <div {...tabsterAttrs}>{props.children}</div>;
  };

  const DropdownComponent = (props: Partial<DropdownProps>) => {
    const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

    return (
      <Dropdown placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Dropdown>
    );
  };

  (['Tab', ['Shift', 'Tab'] as ['Shift', 'Tab']] as const).forEach(keypress => {
    it(`selects the active option on ${keypress.toString()} when between focusable elements`, () => {
      const onOptionSelect = cy.stub().as('onOptionSelect');

      mount(
        <TabsterRoot>
          <button id="before">Before</button>
          <DropdownComponent id="dropdown" onOptionSelect={onOptionSelect} />
          <button id="after">After</button>
        </TabsterRoot>,
      );

      cy.get('#dropdown').realClick().should('have.attr', 'aria-activedescendant');
      cy.get('#dropdown').realPress(keypress);

      cy.get('@onOptionSelect').should('have.been.calledOnce');
      cy.get('#dropdown').should('contain.text', 'Cat').and('have.attr', 'aria-expanded', 'false');
      cy.focused().should('have.id', keypress === 'Tab' ? 'after' : 'before');
    });
  });

  it('selects the active option once when tabbing from the end of a Tabster root', () => {
    const onOptionSelect = cy.stub().as('onOptionSelect');

    mount(
      <>
        <TabsterRoot>
          <DropdownComponent id="dropdown" onOptionSelect={onOptionSelect} />
        </TabsterRoot>
        <button id="after">After</button>
      </>,
    );

    cy.get('#dropdown').realClick().should('have.attr', 'aria-activedescendant');
    cy.get('#dropdown').realPress('Tab');

    cy.get('@onOptionSelect').should('have.been.calledOnce');
    cy.get('#dropdown').should('contain.text', 'Cat').and('have.attr', 'aria-expanded', 'false');
    cy.focused().should('have.id', 'after');
  });

  it('prevents the Tabster movefocus event when onOptionSelect calls preventDefault', () => {
    const onOptionSelect = cy
      .stub()
      .callsFake((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault())
      .as('onOptionSelect');

    mount(
      <TabsterRoot>
        <button id="before">Before</button>
        <DropdownComponent id="dropdown" onOptionSelect={onOptionSelect} />
        <button id="after">After</button>
      </TabsterRoot>,
    );

    cy.get('#dropdown').realClick().should('have.attr', 'aria-activedescendant');
    cy.get('#dropdown').realPress('Tab');

    cy.get('@onOptionSelect').should('have.been.calledOnce');
    cy.focused().should('have.id', 'dropdown');
  });

  it('does not select the active option when focus is moved with a pointer', () => {
    const onOptionSelect = cy.stub().as('onOptionSelect');

    mount(
      <TabsterRoot>
        <DropdownComponent id="dropdown" onOptionSelect={onOptionSelect} />
        <button id="after">After</button>
      </TabsterRoot>,
    );

    cy.get('#dropdown').realClick().should('have.attr', 'aria-activedescendant');
    cy.get('#after').realClick();

    cy.get('@onOptionSelect').should('not.have.been.called');
    cy.get('#dropdown').should('contain.text', 'Select an animal').and('have.attr', 'aria-expanded', 'false');
  });

  it('does not select the active option on Tab in multiselect mode', () => {
    const onOptionSelect = cy.stub().as('onOptionSelect');

    mount(
      <TabsterRoot>
        <DropdownComponent id="dropdown" multiselect onOptionSelect={onOptionSelect} />
        <button id="after">After</button>
      </TabsterRoot>,
    );

    cy.get('#dropdown').realClick().should('have.attr', 'aria-activedescendant').realPress('Tab');

    cy.get('@onOptionSelect').should('not.have.been.called');
    cy.focused().should('have.id', 'after');
  });

  it('can tab between multiple dropdowns', () => {
    mount(
      <TabsterRoot>
        <DropdownComponent id="first" />
        <DropdownComponent id="second" />
        <DropdownComponent id="third" />
      </TabsterRoot>,
    );

    // Focus the first dropdown
    cy.get('#first').focus();

    // Navigate to the next dropdown
    cy.realPress('Tab');
    cy.focused().should('have.id', 'second');

    // Navigate to the next dropdown
    cy.realPress('Tab');
    cy.focused().should('have.id', 'third');

    // Loop back to the previous dropdown
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should('have.id', 'second');
  });

  it('can tab between multiple dropdowns (clearable)', () => {
    mount(
      <TabsterRoot>
        <DropdownComponent id="first" clearable selectedOptions={['Cat']} />
        <DropdownComponent id="second" />
        <DropdownComponent id="third" />
      </TabsterRoot>,
    );

    // Focus the first dropdown
    cy.get('#first').focus();

    // Navigates to the clear button, since the dropdown is clearable and has selected options
    cy.realPress('Tab');
    cy.focused().should('have.attr', 'aria-label', 'Clear selection');

    // Navigate to the next dropdown
    cy.realPress('Tab');
    cy.focused().should('have.id', 'second');

    // Navigate to the next dropdown
    cy.realPress('Tab');
    cy.focused().should('have.id', 'third');
  });

  it('can tab between multiple dropdowns (skip disabled)', () => {
    mount(
      <TabsterRoot>
        <DropdownComponent id="first" />
        <DropdownComponent id="second" disabled />
        <DropdownComponent id="third" />
        <DropdownComponent id="fourth" />
      </TabsterRoot>,
    );

    // Focus the first dropdown
    cy.get('#first').focus();

    // Navigate to the next dropdown and skip disabled one
    cy.realPress('Tab');
    cy.focused().should('have.id', 'third');

    // Navigate to the previous dropdown and skip disabled one
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should('have.id', 'first');
  });
});
